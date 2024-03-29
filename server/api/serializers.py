import re

from rest_framework import serializers
from rest_framework.serializers import ValidationError


def validate_max_length(max_length):

    def _validate_max_length(value):
        if len(value.encode('utf-8')) > max_length:
            raise ValidationError(f"해당 필드는 {max_length}바이트까지만 올 수 있습니다.")

    return _validate_max_length


class UsrCreateSerializer(serializers.Serializer):
    userId = serializers.CharField(validators=[validate_max_length(16)])
    userName = serializers.CharField(validators=[validate_max_length(30)])
    email = serializers.CharField(validators=[validate_max_length(50)])
    password = serializers.CharField(min_length=6)

    def validate_userId(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class UsrLoginSerializer(serializers.Serializer):
    userId = serializers.CharField(validators=[validate_max_length(16)])
    password = serializers.CharField(min_length=6)

    def validate_userId(self, value):
        if re.match('.*[^A-Za-z0-9_.].*', value):
            raise ValidationError('아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다.')
        return value


class MovieCreateSerializer(serializers.Serializer):
    movieName = serializers.CharField(validators=[validate_max_length(60)])
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(
        validators=[validate_max_length(4000)], required=False)
    movieDistribute = serializers.CharField(
        validators=[validate_max_length(60)], required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.CharField(validators=[validate_max_length(60)],
                                     required=False)
    directors = serializers.CharField(validators=[validate_max_length(60)],
                                      required=False)
    actors = serializers.CharField(validators=[validate_max_length(300)],
                                   required=False)
    moviePosterUrl = serializers.CharField(
        validators=[validate_max_length(500)], required=False)
    movieGrade = serializers.CharField(validators=[validate_max_length(2)],
                                       required=False)

    def validate_movieGrade(self, value):
        if not re.match('^\\d{2}$', value):
            raise ValidationError('영화등급은 숫자 두자리만 올 수 있습니다.')
        return value


class MovieRetrieveSerializer(serializers.Serializer):
    movieId = serializers.IntegerField()
    movieName = serializers.CharField(validators=[validate_max_length(60)])
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(
        validators=[validate_max_length(4000)], required=False)
    movieDistribute = serializers.CharField(
        validators=[validate_max_length(60)], required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.CharField(validators=[validate_max_length(60)],
                                     required=False)
    directors = serializers.CharField(validators=[validate_max_length(60)],
                                      required=False)
    actors = serializers.CharField(validators=[validate_max_length(300)],
                                   required=False)
    moviePosterUrl = serializers.CharField(
        validators=[validate_max_length(500)], required=False)
    movieGrade = serializers.CharField(validators=[validate_max_length(2)],
                                       required=False)


class MoviePatchSerializer(serializers.Serializer):
    movieName = serializers.CharField(validators=[validate_max_length(60)],
                                      required=False)
    movieTime = serializers.TimeField(required=False)
    movieDescription = serializers.CharField(
        validators=[validate_max_length(4000)], required=False)
    movieDistribute = serializers.CharField(
        validators=[validate_max_length(60)], required=False)
    movieRelease = serializers.DateField(required=False)
    movieGen = serializers.CharField(validators=[validate_max_length(60)],
                                     required=False)
    directors = serializers.CharField(validators=[validate_max_length(60)],
                                      required=False)
    actors = serializers.CharField(validators=[validate_max_length(300)],
                                   required=False)
    moviePosterUrl = serializers.CharField(
        validators=[validate_max_length(500)], required=False)
    movieGrade = serializers.CharField(validators=[validate_max_length(2)],
                                       required=False)

    def validate_movieGrade(self, value):
        if not re.match('^\\d{2}$', value):
            raise ValidationError('영화등급은 숫자 두자리만 올 수 있습니다.')
        return value

    def validate(self, data):
        if len(data) == 0:
            raise ValidationError('하나 이상의 값이 와야 합니다.')
        return data


class MovieSerializer(serializers.Serializer):
    movieId = serializers.IntegerField()
    movieName = serializers.CharField(validators=[validate_max_length(60)])
    movieGrade = serializers.CharField(validators=[validate_max_length(2)])
    moviePosterUrl = serializers.CharField(
        validators=[validate_max_length(500)])


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


class ShowListSerializer(serializers.Serializer):
    showId = serializers.IntegerField()
    theaterName = serializers.CharField()
    showStartTime = serializers.DateTimeField()
    showEndTime = serializers.DateTimeField()
    seatsCapacity = serializers.IntegerField()
    seatsAvailable = serializers.IntegerField()


class ShowScheduleSerializer(serializers.Serializer):
    showDate = serializers.DateField()
    showList = ShowListSerializer(many=True)


class ShowSerializer(serializers.Serializer):
    movieName = serializers.CharField()
    movieGrade = serializers.CharField()
    showSchedule = ShowScheduleSerializer(many=True)


class ShowInfoSerializer(serializers.Serializer):
    movieName = serializers.CharField()
    movieGrade = serializers.CharField()
    moviePosterUrl = serializers.CharField()
    showId = serializers.IntegerField()
    showStartTime = serializers.DateTimeField()
    showEndTime = serializers.DateTimeField()
    theaterId = serializers.IntegerField()
    theaterName = serializers.CharField()
    theaterCapacity = serializers.IntegerField()
    bookingCount = serializers.IntegerField()


class SeatFeeSerializer(serializers.Serializer):
    customerTypeId = serializers.IntegerField()
    movieFee = serializers.IntegerField()


class SeatSerializer(serializers.Serializer):
    seatNo = serializers.IntegerField()
    seatRow = serializers.IntegerField()
    seatColumn = serializers.IntegerField()
    seatType = serializers.IntegerField()


class ShowSeatSerializer(serializers.Serializer):
    showInfo = ShowInfoSerializer()
    seatFee = SeatFeeSerializer(many=True)
    seats = serializers.ListField(child=SeatSerializer(many=True))


class TicketAmountSerializer(serializers.Serializer):
    customerTypeId = serializers.IntegerField()
    amount = serializers.IntegerField()


class TicketingSerializer(serializers.Serializer):
    email = serializers.CharField(validators=[validate_max_length(50)],
                                  required=False)
    password = serializers.CharField(min_length=6, required=False)
    payType = serializers.IntegerField()
    ticketAmount = TicketAmountSerializer(many=True)
    seatIds = serializers.ListField(child=serializers.IntegerField())

    def validate_seatIds(self, value):
        if len(value) == 0:
            raise ValidationError('seatIds의 길이가 0일 수 없습니다.')
        if len(value) != len(set(value)):
            raise ValidationError('seatIds에 중복된 seatNo가 있습니다.')
        return value

    def validate(self, data):
        if sum([ctype["amount"] for ctype in data["ticketAmount"]]) != len(
                data["seatIds"]):
            raise ValidationError('seatIds의 길이와 ticketAmount의 합이 다릅니다.')
        return data


class TheaterCreateSerializer(serializers.Serializer):
    theaterType = serializers.IntegerField()
    theaterRow = serializers.IntegerField(required=False)
    theaterCol = serializers.IntegerField(required=False)
    theaterName = serializers.CharField(validators=[validate_max_length(30)],
                                        required=False)
    impSeats = serializers.ListField(child=serializers.ListField(
        child=serializers.IntegerField(), min_length=2, max_length=2),
                                     required=False)


class UserPointSerializer(serializers.Serializer):
    point = serializers.IntegerField()


class UserProfileSerializer(serializers.Serializer):
    userId = serializers.CharField(validators=[validate_max_length(16)])
    userName = serializers.CharField(validators=[validate_max_length(30)])
    email = serializers.CharField(validators=[validate_max_length(50)])


class UserPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6)
    newPassword = serializers.CharField(min_length=6)


class PaySeatSerializer(serializers.Serializer):
    seatRow = serializers.IntegerField()
    seatCol = serializers.IntegerField()
    customerType = serializers.IntegerField()


class PayTicketSerializer(serializers.Serializer):
    payId = serializers.IntegerField()
    payState = serializers.IntegerField()
    theaterName = serializers.CharField()
    moviename = serializers.CharField()
    showStartTime = serializers.DateTimeField()
    showCount = serializers.IntegerField()
    seatsList = PaySeatSerializer(many=True)
    payDate = serializers.DateTimeField()
    payPrice = serializers.IntegerField()


class UserTicketSerializer(serializers.Serializer):
    tickets = PayTicketSerializer(many=True)
    canceled = PayTicketSerializer(many=True)
