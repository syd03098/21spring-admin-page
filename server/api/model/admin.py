# import sys, inspect

from django.contrib import admin

from .models import *


@admin.register(CustomerType)
class CustomerTypeAdmin(admin.ModelAdmin):
    list_display = ('customer_type_id', 'customer_type_name')


@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):

    def _theater_type(self, obj):
        return obj.theater_type.theater_type_name

    def _customer_type(self, obj):
        return obj.customer_type.customer_type_name

    list_display = ('_theater_type', '_customer_type', 'movie_fee')


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):

    def _movie_time(self, obj):
        rtime = obj.movie_time
        if not rtime:
            return None
        return rtime.strftime("%H:%M:%S")

    def _movie_release(self, obj):
        release_date = obj.movie_release
        if not release_date:
            return None
        return release_date.strftime("%Y-%m-%d")

    list_display = ('movie_id', 'movie_name', '_movie_time', '_movie_release',
                    'show_total_count')


@admin.register(Pay)
class PayAdmin(admin.ModelAdmin):

    def _pay_type(self, obj):
        _type = obj.pay_type
        if _type == 1:
            return "카드"
        elif _type == 2:
            return "포인트"
        elif _type == 3:
            return "현금"
        else:
            return _type

    def _pay_state(self, obj):
        state = obj.pay_state
        if state == 1:
            return "진행중"
        elif state == 2:
            return "성공"
        elif state == 3:
            return "실패"
        elif state == 4:
            return "취소"
        elif state == 5:
            return "관리자가 취소"
        else:
            return state

    def _pay_date(self, obj):
        pay_date = obj.pay_date
        if not pay_date:
            return None
        return pay_date.strftime("%Y-%m-%d %H:%M:%S")

    list_display = ('pay_id', '_pay_type', '_pay_state', 'pay_price',
                    'pay_aprv_num', '_pay_date')


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):

    list_display = ('seat_id', 'seat_row', 'seat_col', 'theater', 'seat_type')


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):

    def _show_start_time(self, obj):
        show_date = obj.show_start_time
        if not show_date:
            return None
        return show_date.strftime("%Y-%m-%d %H:%M:%S")

    def _movie_name(self, obj):
        return obj.movie.movie_name

    list_display = ('show_id', 'theater', '_show_start_time', 'show_count',
                    '_movie_name')


@admin.register(TheaterType)
class TheaterTypeAdmin(admin.ModelAdmin):
    list_display = ('theater_type_id', 'theater_type_name')


@admin.register(Theater)
class TheaterAdmin(admin.ModelAdmin):
    list_display = ('theater_id', 'theater_row', 'theater_col', 'theater_cap',
                    'theater_name')


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):

    def _ticket_state(self, obj):
        _state = {1: "정상", 2: "취소", 3: "관리자에 의한 취소"}
        return _state.get(obj.ticket_state, "알수없음")

    def _usr(self, obj):
        return str(obj.usr)

    list_display = ('ticket_id', '_ticket_state', 'pay', 'seat', '_usr', 'show',
                    'customer_type')
    search_fields = ('ticket_state',)


@admin.register(Usr)
class UsrAdmin(admin.ModelAdmin):

    def _usr_type(self, obj):
        _type = {0: "관리자", 1: "회원", 2: "비회원"}
        return _type.get(obj.usr_type, "알수없음")

    list_display = ('usr_id', 'usr_name', 'usr_email', 'usr_point', '_usr_type')
    search_fields = ('usr_type',)
