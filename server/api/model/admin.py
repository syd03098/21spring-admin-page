# import sys, inspect

from django.contrib import admin

from .models import *


@admin.register(CustomerType)
class CustomerTypeAdmin(admin.ModelAdmin):
    list_display = ('customer_type_id', 'customer_type_name')


@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ('theater_type', 'customer_type', 'movie_fee')


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('movie_id', 'movie_name', 'movie_time', 'movie_release',
                    'show_total_count')


@admin.register(Pay)
class PayAdmin(admin.ModelAdmin):
    list_display = ('pay_id', 'pay_type', 'pay_state', 'pay_price',
                    'pay_aprv_num', 'pay_date')


@admin.register(Seat)
class SeatAdmin(admin.ModelAdmin):
    list_display = ('seat_id', 'seat_row', 'seat_col', 'theater', 'seat_type')


@admin.register(Show)
class ShowAdmin(admin.ModelAdmin):
    list_display = ('show_id', 'theater', 'show_start_time', 'show_count',
                    'movie')


@admin.register(TheaterType)
class TheaterTypeAdmin(admin.ModelAdmin):
    list_display = ('theater_type_id', 'theater_type_name')


@admin.register(Theater)
class TheaterAdmin(admin.ModelAdmin):
    list_display = ('theater_id', 'theater_row', 'theater_col', 'theater_cap',
                    'theater_name')


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_id', 'ticket_state', 'pay', 'seat', 'usr', 'show',
                    'customer_type')


@admin.register(Usr)
class UsrAdmin(admin.ModelAdmin):
    list_display = ('usr_id', 'usr_name', 'usr_email', 'usr_point', 'usr_type')
