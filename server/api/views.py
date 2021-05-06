import hashlib

from django.db import connection
from django.http.response import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets
from rest_framework.response import Response

from api.model.models import Usr

from .serializers import (
    UsrCreateSerializer,
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
                return JsonResponse(
                    {
                        'email': email,
                        'username': username,
                        'isAdmin': False
                    },
                    status=201)

        return Response(status=409, data='이미 존재하는 아이디입니다.')
