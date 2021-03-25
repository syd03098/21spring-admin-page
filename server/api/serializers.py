import hashlib
import re

from rest_framework import serializers
from rest_framework.exceptions import APIException
from rest_framework.serializers import ValidationError

from api.model.movie.models import Movie
from api.model.account_test.models import Account


class MovieSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    userid = serializers.CharField(max_length=16)
    passwd = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=30)

    def validate_userid(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value

    def create(self, validated_data):
        userid = validated_data['userid']
        passwd = hashlib.sha256(validated_data['passwd'].encode()).hexdigest()
        if Account.objects.filter(userid=userid).exists():

            class ConflictException(APIException):
                status_code = 409
                default_detail = '중복된 아이디가 존재합니다.'
                default_code = '409 Conflict'

            raise ConflictException()
        return Account.objects.create(userid=userid,
                                      passwd=passwd,
                                      name=validated_data['name'])

    class Meta:
        model = Account
        fields = '__all__'


class SignInSerializer(serializers.ModelSerializer):
    userid = serializers.CharField(max_length=16)
    passwd = serializers.CharField(max_length=20)

    class Meta:
        model = Account
        fields = (
            'userid',
            'passwd',
        )
