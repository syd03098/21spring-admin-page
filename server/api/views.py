import hashlib
import jwt

from core.user import (get_user, is_admin)
from django.conf import settings
from django.db import connection, transaction
from django.http.response import HttpResponse, JsonResponse
from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.model.models import (
    Movie,
    Theater,
    TheaterType,
    Usr,
)

from .serializers import (
    MovieRetrieveSerializer,
    MovieCreateSerializer,
    TheaterCreateSerializer,
    UsrCreateSerializer,
    UsrLoginSerializer,
    UsrSerializer,
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
        if not userId:
            return HttpResponse(status=401)

        try:
            Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userId}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return HttpResponse(status=401)
        else:
            return HttpResponse(status=200)

    @swagger_auto_schema(request_body=UsrCreateSerializer,
                         responses={201: UsrSerializer})
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
                response = JsonResponse(res, status=201)
                response.set_cookie('jwt', token, httponly=False)
                return response

        return Response(status=409, data='이미 존재하는 아이디입니다.')

    @swagger_auto_schema(request_body=UsrLoginSerializer,
                         responses={200: UsrSerializer})
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
            response = JsonResponse(res, status=200)
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

    @swagger_auto_schema(auto_schema=None)
    def list(self, request, *args, **kwargs):
        return HttpResponse(status=501)

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
        with connection.cursor() as cursor:
            cursor.execute(f"DELETE FROM MOVIE WHERE MOVIE_ID={movie_id}")
        return HttpResponse(status=204)

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
