import re

from rest_framework import serializers
from rest_framework.serializers import ValidationError

from api.model.models import Movie, TheaterType


class UsrCreateSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=16)
    userName = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(min_length=6)

    def validate_userid(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class UsrLoginSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=16)
    password = serializers.CharField(min_length=6)

    def validate_userid(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class UsrSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=16)
    userName = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)
    isAdmin = serializers.BooleanField()


class MovieCreateSerializer(serializers.Serializer):
    movieName = serializers.CharField(max_length=60)
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(max_length=4000, required=False)
    movieDistribute = serializers.CharField(max_length=60, required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.CharField(max_length=60, required=False)
    directors = serializers.CharField(max_length=60, required=False)
    actors = serializers.CharField(max_length=300, required=False)
    moviePosterUrl = serializers.CharField(max_length=500, required=False)
    movieGrade = serializers.CharField(max_length=2, required=False)

    def validate_movieGrade(self, value):
        if not re.match('^\\d{2}$', value):
            raise ValidationError('영화등급은 숫자 두자리만 올 수 있습니다.')
        return value


class MovieRetrieveSerializer(serializers.Serializer):
    movieId = serializers.IntegerField()
    movieName = serializers.CharField(max_length=60)
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(max_length=4000, required=False)
    movieDistribute = serializers.CharField(max_length=60, required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.CharField(max_length=60, required=False)
    directors = serializers.CharField(max_length=60, required=False)
    actors = serializers.CharField(max_length=300, required=False)
    moviePosterUrl = serializers.CharField(max_length=500, required=False)
    movieGrade = serializers.CharField(max_length=2, required=False)


class MovieSerializer(serializers.Serializer):
    movieId = serializers.IntegerField()
    movieName = serializers.CharField(max_length=60)
    movieGrade = serializers.CharField(max_length=2)
    moviePosterUrl = serializers.CharField(max_length=500)


class MovieCategorySerializer(serializers.Serializer):
    categoryName = serializers.CharField()
    movies = MovieSerializer(many=True)


class MovieListSerializer(serializers.Serializer):
    currentTime = serializers.DateTimeField()
    categories = MovieCategorySerializer(many=True)


class ShowCreateSerializer(serializers.Serializer):
    movieId = serializers.IntegerField()
    theaterId = serializers.IntegerField()
    showStartTime = serializers.DateTimeField(
        input_formats=["%Y-%m-%d %H:%M:%S"])


class TheaterCreateSerializer(serializers.Serializer):
    theaterType = serializers.IntegerField()
    theaterRow = serializers.IntegerField(required=False)
    theaterCol = serializers.IntegerField(required=False)
    theaterName = serializers.CharField(max_length=30, required=False)
    impSeats = serializers.ListField(child=serializers.ListField(
        child=serializers.IntegerField(), min_length=2, max_length=2),
                                     required=False)


class UserPointSerializer(serializers.Serializer):
    point = serializers.IntegerField()


class UserProfileSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=16)
    userName = serializers.CharField(max_length=30)
    email = serializers.CharField(max_length=50)


class UserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6)
    newPassword = serializers.CharField(min_length=6)
