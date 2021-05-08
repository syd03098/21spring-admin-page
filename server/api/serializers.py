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


class MovieSerializer(serializers.Serializer):
    movieName = serializers.CharField(max_length=60)
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(max_length=4000, required=False)
    movieDistribute = serializers.CharField(max_length=60, required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.IntegerField(required=False)
    directors = serializers.CharField(max_length=60, required=False)
    actors = serializers.CharField(max_length=300, required=False)
    moviePosterUrl = serializers.CharField(max_length=500, required=False)
    movieGrade = serializers.CharField(max_length=2, required=False)

    def validate_movieGrade(self, value):
        if not re.match('^\\d{2}$', value):
            raise ValidationError('영화등급은 숫자 두자리만 올 수 있습니다.')
        return value
