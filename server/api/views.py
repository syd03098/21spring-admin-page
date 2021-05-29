import datetime
import hashlib
import itertools
import jwt

from core.user import (get_user, is_admin)
from core.pay import pay
from django.conf import settings
from django.db import connection, transaction
from django.http.response import HttpResponse, JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.model.models import (
    Movie,
    Show,
    Theater,
    TheaterType,
    Usr,
)

from .serializers import (
    MovieListSerializer,
    MovieRetrieveSerializer,
    MovieCreateSerializer,
    ShowCreateSerializer,
    ShowSeatSerializer,
    ShowSerializer,
    TheaterCreateSerializer,
    TicketingSerializer,
    UsrCreateSerializer,
    UsrLoginSerializer,
    UserPointSerializer,
    UserProfileSerializer,
    UserPasswordSerializer,
)


# {{{ AuthViewSet
class AuthViewSet(viewsets.ViewSet):

    # def get_serializer_class(self):
    #     action = self.action
    #     if action == 'signup':
    #         return UsrCreateSerializer
    #     elif action == 'login':
    #         return UsrLoginSerializer
    #     return serializers.Serializer

    @action(detail=False, methods=['get'])
    def validation(self, request, *args, **kwargs):
        userId = get_user(request)
        response = HttpResponse(status=401)
        response.delete_cookie('jwt')
        if not userId:
            return response

        try:
            Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            return HttpResponse(status=200)

    @swagger_auto_schema(request_body=UsrCreateSerializer,
                         responses={201: None})
    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        serializer = UsrCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userId = request.data.get('userId')
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()
        userName = request.data.get('userName')
        email = request.data.get('email')

        try:
            Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO USR (USR_ID, USR_PASSWORD, USR_EMAIL, USR_NAME) " \
                            f"VALUES ('{userId}', '{password}', '{email}', '{userName}');"
                )
                res = {
                    'userId': userId,
                    'userName': userName,
                    'email': email,
                    'isAdmin': False
                }
                token = jwt.encode(res, settings.SECRET_KEY,
                                   settings.ALGORITHM).decode('utf-8')
                # response = JsonResponse(res, status=201)
                response = HttpResponse(status=201)
                response.set_cookie('jwt', token, httponly=False)
                return response

        return Response(status=409, data='이미 존재하는 아이디입니다.')

    @swagger_auto_schema(request_body=UsrLoginSerializer, responses={200: None})
    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        serializer = UsrLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userId = request.data.get('userId')
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()

        response = Response(status=401, data='아이디 또는 패스워드를 다시 확인해주세요.')
        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if account.usr_password != password:
                return response
            email = account.usr_email
            userName = account.usr_name
            isAdmin = account.usr_type == 0
            res = {
                'userId': userId,
                'userName': userName,
                'email': email,
                'isAdmin': isAdmin
            }
            token = jwt.encode(res, settings.SECRET_KEY,
                               settings.ALGORITHM).decode('utf-8')
            # response = JsonResponse(res, status=200)
            response = HttpResponse(status=200)
            response.set_cookie('jwt', token, httponly=False)
            return response

    @swagger_auto_schema(request_body=no_body, responses={200: None})
    @action(detail=False, methods=['post'])
    def logout(self, request, *args, **kwargs):
        response = HttpResponse(status=200)
        response.delete_cookie('jwt')
        return response


# }}}


# {{{ MovieViewSet
class MovieViewSet(viewsets.ViewSet):
    # queryset = Movie.objects.all()
    # serializer_class = MovieSerializer
    # http_method_names = ['get', 'post', 'patch', 'delete']

    # def get_serializer_class(self):
    #     m = self.request.method
    #     if m == 'POST':
    #         return MovieCreateSerializer
    #     elif self.action == 'retrieve':
    #         return MovieRetrieveSerializer
    #     return MovieSerializer

    # {{{ list
    @swagger_auto_schema(responses={200: MovieListSerializer})
    # @transaction.atomic
    def list(self, request, *args, **kwargs):
        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        res = {
            "currentTime":
                now,
            "categories": [{
                "categoryName": "현재 개봉한 영화",
                "movies": None
            }, {
                "categoryName": "개봉 예정 영화",
                "movies": None
            }]
        }
        with connection.cursor() as cursor:
            cursor.execute(
                    "SELECT DISTINCT M.MOVIE_ID, M.MOVIE_NAME, M.MOVIE_GRADE, M.POSTER_URL " \
                            "FROM MOVIE M, SHOW S WHERE " \
                            f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') >= M.MOVIE_RELEASE AND " \
                            f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') < S.SHOW_START_TIME AND " \
                            "M.MOVIE_ID = S.MOVIE_ID;")
            res["categories"][0]["movies"] = list(
                map(
                    lambda m: {
                        "movieId": m[0],
                        "movieName": m[1],
                        "movieGrade": m[2],
                        "moviePosterUrl": m[3]
                    }, cursor.fetchall()))
            cursor.execute(
                    "SELECT DISTINCT M.MOVIE_ID, M.MOVIE_NAME, M.MOVIE_GRADE, M.POSTER_URL " \
                            "FROM MOVIE M, SHOW S WHERE " \
                            f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') < M.MOVIE_RELEASE AND " \
                            "M.MOVIE_ID = S.MOVIE_ID;")
            res["categories"][1]["movies"] = list(
                map(
                    lambda m: {
                        "movieId": m[0],
                        "movieName": m[1],
                        "movieGrade": m[2],
                        "moviePosterUrl": m[3]
                    }, cursor.fetchall()))
        return JsonResponse(res, status=200)

    # }}}

    # {{{ create
    @swagger_auto_schema(request_body=MovieCreateSerializer,
                         responses={201: None})
    def create(self, request, *args, **kwargs):
        if not is_admin(request):
            return HttpResponse(status=401)

        serializer = MovieCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        movie_name = request.data.get('movieName')
        movie_time = request.data.get('movieTime')  # Nullable
        movie_desc = request.data.get('movieDescription')  # Nullable
        if movie_desc:
            movie_desc = movie_desc.replace("'", "''")
        movie_distr = request.data.get('movieDistribute')  # Nullable
        movie_release = request.data.get('movieRelease')  # Nullable
        movie_gen = request.data.get('movieGen')  # Nullable
        directors = request.data.get('directors')  # Nullable
        actors = request.data.get('actors')  # Nullable
        poster_url = request.data.get('moviePosterUrl')  # Nullable
        movie_grade = request.data.get('movieGrade')  # Nullable

        with connection.cursor() as cursor:
            cursor.execute(
                        "INSERT INTO MOVIE " \
                                f"VALUES (MOVIE_SEQ.NEXTVAL, '{movie_name}', " \
                                + (f"(TO_DATE('{movie_time}','HH24:MI:SS')), " if movie_time else "NULL,") \
                                + (f"'{movie_desc}', " if movie_desc else "NULL, ") \
                                + (f"'{movie_distr}', " if movie_distr else "NULL, ") \
                                + (f"'{movie_release}', " if movie_release else "NULL, ") \
                                + (f"'{movie_gen}', " if movie_gen else "NULL, ") \
                                + (f"0, ") \
                                + (f"'{directors}', " if directors else "NULL, ") \
                                + (f"'{actors}', " if actors else "NULL, ") \
                                + (f"'{poster_url}', " if poster_url else "NULL, ") \
                                + (f"'{movie_grade}');" if movie_grade else "NULL);")
                    )
        return HttpResponse(status=201)

    # }}}

    # {{{ retrieve
    @swagger_auto_schema(responses={200: MovieRetrieveSerializer})
    def retrieve(self, request, pk, *args, **kwargs):
        try:
            movie = Movie.objects.raw(
                f'SELECT * FROM (SELECT * FROM MOVIE WHERE MOVIE_ID={pk}) WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return HttpResponse(status=404)
        else:
            movieId = pk
            movieName = movie.movie_name
            movieTime = movie.movie_time
            movieDescription = movie.movie_desc
            movieDistribute = movie.movie_distr
            movieRelease = movie.movie_release
            movieGen = movie.movie_gen
            directors = movie.directors
            actors = movie.actors
            moviePosterUrl = movie.poster_url
            movieGrade = movie.movie_grade
            res = {
                'movieId': movieId,
                'movieName': movieName,
                'movieTime': movieTime,
                'movieDescription': movieDescription,
                'movieDistribute': movieDistribute,
                'movieRelease': movieRelease,
                'movieGen': movieGen,
                'directors': directors,
                'actors': actors,
                'moviePosterUrl': moviePosterUrl,
                'movieGrade': movieGrade
            }
            return JsonResponse(res, status=200)

    # }}}

    @swagger_auto_schema(auto_schema=None)
    def partial_update(self, request, pk, *args, **kwargs):
        return HttpResponse(status=501)

    # {{{ destroy
    def destroy(self, request, pk, *args, **kwargs):
        if not is_admin(request):
            return HttpResponse(status=401)

        movie_id = pk
        try:
            Show.objects.raw(
                f'SELECT * FROM (SELECT * FROM SHOW WHERE MOVIE_ID={pk}) WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            pass
        else:
            return HttpResponse(status=409, content="선택한 영화에 대한 상영정보가 존재합니다.")

        with connection.cursor() as cursor:
            cursor.execute(f"DELETE FROM MOVIE WHERE MOVIE_ID={movie_id}")
        return HttpResponse(status=204)

    # }}}


# }}}


# {{{ ShowViewSet
class ShowViewSet(viewsets.ViewSet):

    # {{{ list
    @swagger_auto_schema(manual_parameters=[
        openapi.Parameter('movie_id',
                          openapi.IN_QUERY,
                          description='영화ID',
                          type=openapi.TYPE_INTEGER)
    ],
                         responses={200: ShowSerializer})
    def list(self, request, *args, **kwargs):
        movie_id = request.GET.get('movie_id')
        if not movie_id:
            return HttpResponse(status=400, content="movie_id값은 필수입니다.")

        try:
            movie = Movie.objects.raw(
                f"SELECT * FROM MOVIE WHERE MOVIE_ID={movie_id}")[0]
        except IndexError:
            return HttpResponse(status=404)

        res = {
            "movieName": movie.movie_name,
            "movieGrade": movie.movie_grade,
            "showSchedule": []
        }

        with connection.cursor() as cursor:
            cursor.execute("SELECT S.SHOW_ID, T.THEATER_NAME, S.SHOW_START_TIME, T.THEATER_CAP " \
                    "FROM SHOW S, THEATER T WHERE S.THEATER_ID=T.THEATER_ID AND " \
                    f"S.MOVIE_ID={movie_id}")
            shows = cursor.fetchall()
            cursor.execute(
                "SELECT COUNT(SHOW_ID), SHOW_ID FROM TICKET GROUP BY SHOW_ID;")
            cnt = {c[1]: c[0] for c in cursor.fetchall()}
            for _, show_group in itertools.groupby(shows,
                                                   lambda x: x[2].date()):
                showList = [{
                    "showId": show[0],
                    "theaterName": show[1],
                    "showStartTime": show[2].strftime("%Y-%m-%d %H:%M:%S"),
                    "seatsCapacity": show[3],
                    "seatsAvailable": show[3] - cnt.get(show[0], 0)
                } for show in show_group]
                showList.sort(key=lambda x: x["showStartTime"])
                res["showSchedule"].append({
                    "showDate":
                        datetime.datetime.strptime(showList[0]["showStartTime"],
                                                   "%Y-%m-%d %H:%M:%S").date(),
                    "showList":
                        showList
                })

        res["showSchedule"].sort(key=lambda x: x["showDate"])
        return JsonResponse(res, status=200)

    # }}}

    # {{{ create
    @swagger_auto_schema(request_body=ShowCreateSerializer,
                         responses={201: None})
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        if not is_admin(request):
            return HttpResponse(status=403)

        serializer = ShowCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        movie_id = request.data.get('movieId')
        theater_id = request.data.get('theaterId')
        show_start_time = request.data.get('showStartTime')

        try:
            movie = Movie.objects.raw(
                f"SELECT * FROM (SELECT * FROM MOVIE WHERE MOVIE_ID={movie_id} AND " \
                        f"MOVIE_RELEASE <= TO_DATE('{show_start_time}', " \
                        "'YYYY-MM-DD HH24:MI:SS')) WHERE ROWNUM=1;"
            )[0]
            Theater.objects.raw(
                f"SELECT * FROM (SELECT * FROM THEATER WHERE THEATER_ID={theater_id}) WHERE ROWNUM=1;"
            )[0]
        except IndexError:
            return HttpResponse(status=400)

        def delta(movie_time: datetime.time) -> datetime.timedelta:
            return datetime.datetime.combine(datetime.date.min,
                                             movie_time) - datetime.datetime.min

        start_time_dt = datetime.datetime.strptime(show_start_time,
                                                   '%Y-%m-%d %H:%M:%S')
        movie_time_delta = delta(movie.movie_time)
        show_end_time = start_time_dt + movie_time_delta

        yesterday = start_time_dt - datetime.timedelta(1)
        tomorrow = start_time_dt + datetime.timedelta(1)

        with connection.cursor() as cursor:
            cursor.execute(
                f"SELECT S.SHOW_START_TIME, M.MOVIE_TIME FROM SHOW S, MOVIE M " \
                        f"WHERE S.THEATER_ID={theater_id} AND "
                        f"TO_DATE('{yesterday}', 'YYYY-MM-DD HH24:MI:SS') < S.SHOW_START_TIME AND " \
                        f"TO_DATE('{tomorrow}', 'YYYY-MM-DD HH24:MI:SS') > S.SHOW_START_TIME AND "
                        f"S.MOVIE_ID=M.MOVIE_ID;")
            for show in cursor.fetchall():
                s_start_dt = show[0]
                s_end_dt = show[0] + delta(show[1].time())
                if (s_start_dt < start_time_dt and start_time_dt < s_end_dt
                   ) or (start_time_dt <= s_start_dt and
                         s_start_dt < show_end_time):
                    return HttpResponse(status=400, content="상영시간이 겹칩니다.")

        show_count = movie.show_total_count + 1
        with connection.cursor() as cursor:
            cursor.execute(
                    "INSERT INTO SHOW " \
                            f"VALUES (SHOW_SEQ.NEXTVAL, {theater_id}, " \
                            f"'{show_start_time}', {show_count}, {movie_id});"
                    )
            cursor.execute(
                        "UPDATE MOVIE SET " \
                                f"SHOW_TOTAL_COUNT={show_count} WHERE MOVIE_ID={movie_id};"
                    )
        return HttpResponse(status=201)

    # }}}


# }}}


# {{{ ShowSeatViewSet
class ShowSeatViewSet(viewsets.ViewSet):

    # {{{ list
    @swagger_auto_schema(responses={200: ShowSeatSerializer})
    @transaction.atomic
    def list(self, request, *args, **kwargs):
        show_id = int(self.kwargs.get('show_id'))
        try:
            show = Show.objects.raw(
                f"SELECT * FROM SHOW WHERE SHOW_ID={show_id};")[0]
            movie = Movie.objects.raw(
                    f"SELECT M.* FROM SHOW S, MOVIE M " \
                    f"WHERE S.SHOW_ID={show_id} AND S.MOVIE_ID=M.MOVIE_ID;")[0]
            theater = Theater.objects.raw(
                    f"SELECT T.* FROM SHOW S, THEATER T " \
                    f"WHERE S.SHOW_ID={show_id} AND S.THEATER_ID=T.THEATER_ID;")[0]
        except IndexError:
            return HttpResponse(status=404)

        movie_time_delta = datetime.datetime.combine(
            datetime.date.min, movie.movie_time) - datetime.datetime.min
        theater_id = theater.theater_id

        with connection.cursor() as cursor:
            cursor.execute("SELECT CUSTOMER_TYPE_ID, MOVIE_FEE FROM FEE " \
                    f"WHERE THEATER_TYPE_ID={theater.theater_type.theater_type_id} " \
                    "ORDER BY CUSTOMER_TYPE_ID;")
            seatFee = [{
                "customerTypeId": fee[0],
                "movieFee": fee[1]
            } for fee in cursor.fetchall()]

            cursor.execute(
                f"""SELECT S.SEAT_ID, S.SEAT_ROW, S.SEAT_COL, S.SEAT_TYPE, T.TICKET_STATE 
                    FROM (SELECT * FROM TICKET 
                                   WHERE SHOW_ID={show_id} AND 
                                         (TICKET_STATE=1 OR TICKET_STATE IS NULL) ) T, SEAT S 
                    WHERE T.SEAT_ID(+)=S.SEAT_ID AND S.THEATER_ID={theater_id} 
                    ORDER BY S.SEAT_ID;""")
            seats = [{
                "seatNo": seat[0],
                "seatRow": seat[1],
                "seatColumn": seat[2],
                "seatType": 2 if seat[4] else seat[3]
            } for seat in cursor.fetchall()]
        res = {
            "showInfo": {
                "movieName":
                    movie.movie_name,
                "movieGrade":
                    movie.movie_grade,
                "showId":
                    show_id,
                "showStartTime":
                    show.show_start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "showEndTime": (show.show_start_time +
                                movie_time_delta).strftime("%Y-%m-%d %H:%M:%S"),
                "theaterId":
                    theater_id,
                "theaterName":
                    theater.theater_name,
                "theaterCapacity":
                    theater.theater_cap,
                "bookingCount":
                    len(list(filter(lambda x: x["seatType"] == 2, seats)))
            },
            "seatFee":
                seatFee,
            "seats": [
                list(row)
                for _, row in itertools.groupby(seats, lambda x: x["seatRow"])
            ]
        }
        return JsonResponse(res, status=200)

    # }}}

    # {{{ create
    @swagger_auto_schema(request_body=TicketingSerializer,
                         responses={201: None})
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = TicketingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        userId = get_user(request)
        if not userId:
            # TODO: 비회원용 예매
            return HttpResponse(status=404, content="로그인이 필요합니다.")

        show_id = int(self.kwargs.get('show_id'))
        # email = request.data.get('email')
        # password = request.data.get('password')
        pay_type = request.data.get('payType')
        ticket_amount = request.data.get('ticketAmount')
        seat_ids = request.data.get('seatIds')

        try:
            show = Show.objects.raw(
                f"SELECT * FROM SHOW WHERE SHOW_ID={show_id};")[0]
        except IndexError:
            return HttpResponse(status=404)

        with connection.cursor() as cursor:
            cursor.execute("SELECT CUSTOMER_TYPE_ID, MOVIE_FEE FROM FEE " \
                    f"WHERE THEATER_TYPE_ID={show.theater.theater_type.theater_type_id} " \
                    "ORDER BY CUSTOMER_TYPE_ID;")
            fee = {f[0]: f[1] for f in cursor.fetchall()}

        money = 0
        for cus in ticket_amount:
            if cus['customerTypeId'] not in fee:
                return HttpResponse(
                    status=400,
                    content=
                    f"customerType: {cus['customerTypeId']} 은(는) 올바르지 않은 값입니다.")
            else:
                money += fee[cus['customerTypeId']] * cus['amount']

        sid = transaction.savepoint()
        try:
            pay_id = pay(pay_type, money, userId)
        except Exception as e:
            return HttpResponse(status=400, content=e)

        with connection.cursor() as cursor:
            cursor.execute(f"""SELECT S.SEAT_ID, S.SEAT_TYPE, T.TICKET_STATE 
                               FROM (SELECT * FROM TICKET
                                              WHERE SHOW_ID={show_id} AND 
                                                    (TICKET_STATE=1 OR TICKET_STATE IS NULL) ) T, SEAT S 
                               WHERE T.SEAT_ID(+)=S.SEAT_ID AND 
                                     S.THEATER_ID={show.theater.theater_id};""")
            e_seats = {
                seat[0]: (seat[1], seat[2]) for seat in cursor.fetchall()
            }

        typeslist = [[c["customerTypeId"]] * c["amount"] for c in ticket_amount]
        types = list(itertools.chain(*typeslist))
        with connection.cursor() as cursor:
            money = 0
            for i in range(len(seat_ids)):
                seat_id = seat_ids[i]
                customer_type_id = types[i]
                try:
                    # e_seats = { SEAT_ID: (SEAT_TYPE, TICKET_STATE) }
                    seat = e_seats[seat_id]
                except KeyError:
                    transaction.savepoint_rollback(sid)
                    return HttpResponse(
                        status=404, content=f"'seatNo: {seat_id}'는 존재하지 않습니다.")
                if not seat[0] or (seat[1] and seat[1] == 1):
                    transaction.savepoint_rollback(sid)
                    return HttpResponse(
                        status=400,
                        content=f"'seatNo: {seat_id}'는 예매할 수 없는 자리입니다.")
                cursor.execute(
                    f"INSERT INTO TICKET VALUES (TICKET_SEQ.NEXTVAL, 1, {pay_id}, " \
                            f"{seat_id}, '{userId}', {show_id}, {customer_type_id});")

        return HttpResponse(status=201)

    # }}}


# }}}


# {{{ TheaterViewSet
class TheaterViewSet(viewsets.ViewSet):

    @swagger_auto_schema(request_body=TheaterCreateSerializer)
    @transaction.atomic
    def create(self, request, *args, **kwargs):
        if not is_admin(request):
            return HttpResponse(status=401)

        serializer = TheaterCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        theater_type_id = request.data.get('theaterType')

        try:
            TheaterType.objects.raw(
                f'SELECT * FROM THEATER_TYPE WHERE THEATER_TYPE_ID={theater_type_id};'
            )[0]
        except IndexError:
            return HttpResponse(status=400, content='theaterType이 올바르지 않습니다.')

        theater_row = request.data.get('theaterRow', 16)  # Nullable
        theater_col = request.data.get('theaterCol', 24)  # Nullable
        theater_name = request.data.get('theaterName')  # Nullable
        imp_seats = request.data.get('impSeats', [])  # Nullable

        seats = [(r, c)
                 for r in range(1, theater_row + 1)
                 for c in range(1, theater_col + 1)]
        for i in imp_seats:
            if (i[0], i[1]) in seats:
                seats.remove((i[0], i[1]))

        with connection.cursor() as cursor:
            cursor.execute(
                        "INSERT INTO THEATER " \
                                f"VALUES (THEATER_SEQ.NEXTVAL, {theater_type_id}, " \
                                + (f"{theater_row}, {theater_col}, ") \
                                + (f"{len(seats)}, ") \
                                + (f"'{theater_name}');" if theater_name else "CONCAT(THEATER_SEQ.NEXTVAL, '관'));")
                    )
            for r in range(1, theater_row + 1):
                for c in range(1, theater_col + 1):
                    if (r, c) in seats:
                        seat_type = 1
                    else:
                        seat_type = 0
                    cursor.execute(
                                "INSERT INTO SEAT " \
                                        f"VALUES (SEAT_SEQ.NEXTVAL, {r}, {c}, THEATER_SEQ.CURRVAL, " \
                                        f"{seat_type});"
                            )
        return HttpResponse(status=201)


# }}}


# {{{ UserViewSet
class UserViewSet(viewsets.ViewSet):

    # {{{ point
    @swagger_auto_schema(responses={200: UserPointSerializer})
    @action(detail=False, methods=['get'])
    def point(self, request, *args, **kwargs):
        userId = get_user(request)
        if not userId:
            return HttpResponse(status=401)

        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return HttpResponse(status=401)
        else:
            point = account.usr_point
            res = {'point': point}
            return JsonResponse(res, status=200)

    # }}}

    # {{{ profile
    @swagger_auto_schema(responses={200: UserProfileSerializer})
    @action(detail=False, methods=['get'])
    def profile(self, request, *args, **kwargs):
        userId = get_user(request)
        if not userId:
            return HttpResponse(status=401)

        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return HttpResponse(status=401)
        else:
            userName = account.usr_name
            email = account.usr_email
            res = {'userId': userId, 'username': userName, 'email': email}
            return JsonResponse(res, status=200)

    # }}}

    # {{{ password
    @swagger_auto_schema(request_body=UserPasswordSerializer,
                         responses={200: None})
    @action(detail=False, methods=['post'])
    @transaction.atomic
    def password(self, request, *args, **kwargs):
        serializer = UserPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        userId = get_user(request)
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()
        newPassword = hashlib.sha256(
            request.data.get('newPassword').encode()).hexdigest()

        response = Response(status=401, data='아이디 또는 패스워드를 다시 확인해주세요.')
        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response

        if account.usr_password != password:
            return response
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE USR SET USR_PASSWORD = '{newPassword}' " \
                        f"WHERE USR_ID = '{userId}';"
            )
            return HttpResponse(status=200)

    # }}} password


# }}}
