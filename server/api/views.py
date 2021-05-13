import hashlib
import jwt

from django.conf import settings
from django.db import connection
from django.http.response import HttpResponse, JsonResponse
from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from api.model.models import (
    Movie,
    Usr,
)

from .serializers import (
    MovieRetrieveSerializer,
    MovieSerializer,
    MovieCreateSerializer,
    UsrCreateSerializer,
    UsrLoginSerializer,
    UsrSerializer,
)


# {{{ UsrViewSet
class UsrViewSet(viewsets.ModelViewSet):
    queryset = Usr.objects.all()
    http_method_names = ['post', 'get']

    def get_serializer_class(self):
        action = self.action
        if action == 'signup':
            return UsrCreateSerializer
        elif action == 'login':
            return UsrLoginSerializer
        return serializers.Serializer

    @swagger_auto_schema(auto_schema=None)
    def list(self, request, *args, **kwargs):
        return

    @swagger_auto_schema(auto_schema=None)
    def create(self, request, *args, **kwargs):
        return

    @swagger_auto_schema(auto_schema=None)
    def retrieve(self, request, *args, **kwargs):
        return

    @swagger_auto_schema(responses={200: UsrSerializer})
    @action(detail=False, methods=['get'])
    def info(self, request, *args, **kwargs):
        if not request.COOKIES.get('jwt'):
            return HttpResponse(status=401)
        try:
            token = jwt.decode(request.COOKIES.get('jwt'), settings.SECRET_KEY,
                               settings.ALGORITHM)
        except jwt.InvalidSignatureError:
            return HttpResponse(status=401)
        userid = token['userid']

        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userid}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return HttpResponse(status=401)
        else:
            email = account.usr_email
            username = account.usr_name
            point = account.usr_point
            isAdmin = account.usr_type
            res = {
                'userid': userid,
                'username': username,
                'email': email,
                'point': point,
                'isAdmin': isAdmin == 0
            }
            token = jwt.encode(res, settings.SECRET_KEY,
                               settings.ALGORITHM).decode('utf-8')
            response = JsonResponse(res, status=200)
            response.set_cookie('jwt', token, httponly=False)
            return response

    @swagger_auto_schema(responses={201: UsrSerializer})
    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userid = request.data.get('userid')
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()
        username = request.data.get('username')
        email = request.data.get('email')

        try:
            Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userid}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO USR (USR_ID, USR_PASSWORD, USR_EMAIL, USR_NAME, USR_TYPE) " \
                            f"VALUES ('{userid}', '{password}', '{email}', '{username}', 1);"
                )
                res = {
                    'userid': userid,
                    'username': username,
                    'email': email,
                    'point': 0,
                    'isAdmin': False
                }
                token = jwt.encode(res, settings.SECRET_KEY,
                                   settings.ALGORITHM).decode('utf-8')
                response = JsonResponse(res, status=201)
                response.set_cookie('jwt', token, httponly=False)
                return response

        return Response(status=409, data='이미 존재하는 아이디입니다.')

    @swagger_auto_schema(responses={200: UsrSerializer})
    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userid = request.data.get('userid')
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()

        response = Response(status=401, data='아이디 혹은 비밀번호가 일치하지 않습니다.')
        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userid}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return response
        else:
            if account.usr_password != password:
                return response
            email = account.usr_email
            username = account.usr_name
            point = account.usr_point
            isAdmin = account.usr_type
            res = {
                'userid': userid,
                'username': username,
                'email': email,
                'point': point,
                'isAdmin': isAdmin == 0
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
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        m = self.request.method
        if m == 'POST':
            return MovieCreateSerializer
        elif self.action == 'retrieve':
            return MovieRetrieveSerializer
        return MovieSerializer

    @swagger_auto_schema(responses={201: serializers.Serializer})
    def create(self, request, *args, **kwargs):
        if not request.COOKIES.get('jwt'):
            return Response(status=401, data='권한이 없습니다.')
        token = jwt.decode(request.COOKIES.get('jwt'), settings.SECRET_KEY,
                           settings.ALGORITHM)
        admin = token['isAdmin']
        if not admin:
            return Response(status=401, data='권한이 없습니다.')

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        movie_name = request.data.get('movieName')
        movie_time = request.data.get('movieTime')  # Nullable
        movie_desc = request.data.get('movieDescription')  # Nullable
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
                                + (f"{movie_gen}, " if movie_gen else "NULL, ") \
                                + (f"0, ") \
                                + (f"'{directors}', " if directors else "NULL, ") \
                                + (f"'{actors}', " if actors else "NULL, ") \
                                + (f"'{poster_url}', " if poster_url else "NULL, ") \
                                + (f"'{movie_grade}');" if movie_grade else "NULL);")
                    )
        return HttpResponse(status=201)

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

    def destroy(self, request, pk, *args, **kwargs):
        if not request.COOKIES.get('jwt'):
            return Response(status=401, data='권한이 없습니다.')
        token = jwt.decode(request.COOKIES.get('jwt'), settings.SECRET_KEY,
                           settings.ALGORITHM)
        admin = token['isAdmin']

        if not admin:
            return Response(status=401, data='권한이 없습니다.')
        movie_id = pk
        with connection.cursor() as cursor:
            cursor.execute(f"DELETE FROM MOVIE WHERE MOVIE_ID={movie_id}")
        return HttpResponse(status=204)


# }}}
