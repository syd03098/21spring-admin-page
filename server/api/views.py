import hashlib

from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response

from api.model.movie.models import Movie
from api.model.account_test.models import Account

from .serializers import MovieSerializer, AccountSerializer, SignInSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_url_kwarg = 'id'


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    http_method_names = ['post', 'get']


class SignInViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = SignInSerializer
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userid = request.data.get('userid')
        passwd = hashlib.sha256(request.data.get('passwd').encode()).hexdigest()
        name = request.data.get('name')

        account = Account.objects.filter(userid=userid).first()
        if not account:
            return Response(status=404, data='존재하지 않는 아이디 입니다.')
        if account.passwd != passwd:
            return Response(status=401, data='비밀번호가 틀렸습니다.')

        return JsonResponse({'userid': userid, 'name': name}, status=200)
