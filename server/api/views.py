import hashlib
import jwt

from django.conf import settings
from django.db import connection
from django.http.response import HttpResponse, JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, viewsets
from rest_framework.response import Response

from api.model.models import (
    Movie,
    Usr,
)

from .serializers import (
    MovieSerializer,
    UsrCreateSerializer,
    UsrLoginSerializer,
    UsrSerializer,
)


class UsrViewSet(viewsets.ModelViewSet):
    queryset = Usr.objects.all()
    serializer_class = UsrCreateSerializer
    http_method_names = ['post']

    @swagger_auto_schema(responses={201: UsrSerializer})
    def create(self, request, *args, **kwargs):
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
                response.set_cookie('jwt', token)
                return response

        return Response(status=409, data='이미 존재하는 아이디입니다.')


class LoginViewSet(viewsets.ModelViewSet):
    queryset = Usr.objects.all()
    serializer_class = UsrLoginSerializer
    http_method_names = ['post']

    @swagger_auto_schema(responses={200: UsrSerializer})
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userid = request.data.get('userid')
        password = hashlib.sha256(
            request.data.get('password').encode()).hexdigest()

        try:
            account = Usr.objects.raw(
                f'SELECT * FROM (SELECT * FROM USR WHERE USR_ID=\'{userid}\') WHERE ROWNUM=1;'
            )[0]
        except IndexError:
            return Response(status=404, data='존재하지 않는 아이디입니다.')
        else:
            if account.usr_password != password:
                return Response(status=401, data='비밀번호가 틀렸습니다.')
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
            response.set_cookie('jwt', token)
            return response


class LogoutViewSet(viewsets.ViewSet):
    http_method_names = ['post']

    @swagger_auto_schema(responses={200: serializers.Serializer})
    def create(self, request, *args, **kwargs):
        response = HttpResponse(status=200)
        response.delete_cookie('jwt')
        return response


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie
    serializer_class = MovieSerializer
    http_method_names = ['get', 'post', 'patch', 'delete']

    @swagger_auto_schema(responses={201: serializers.Serializer})
    def create(self, request, *args, **kwargs):
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
