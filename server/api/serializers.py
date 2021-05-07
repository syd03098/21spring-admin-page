import re

from rest_framework import serializers
from rest_framework.serializers import ValidationError


class UsrCreateSerializer(serializers.Serializer):
    userid = serializers.CharField(max_length=16)
    username = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=20)

    def validate_userid(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class UsrLoginSerializer(serializers.Serializer):
    userid = serializers.CharField(max_length=16)
    password = serializers.CharField(max_length=20)

    def validate_userid(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class UsrSerializer(serializers.Serializer):
    userid = serializers.CharField(max_length=16)
    username = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)
    point = serializers.IntegerField()
    isAdmin = serializers.BooleanField()
