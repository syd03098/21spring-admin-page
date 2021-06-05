# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CustomerType(models.Model):
    customer_type_id = models.BigIntegerField(primary_key=True)
    customer_type_name = models.CharField(max_length=15)

    class Meta:
        managed = False
        db_table = 'customer_type'


class Fee(models.Model):
    theater_type = models.OneToOneField('TheaterType',
                                        models.DO_NOTHING,
                                        primary_key=True)
    customer_type = models.ForeignKey(CustomerType, models.DO_NOTHING)
    movie_fee = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'fee'
        unique_together = (('theater_type', 'customer_type'),)


class Movie(models.Model):
    movie_id = models.BigIntegerField(primary_key=True)
    movie_name = models.CharField(max_length=60)
    movie_time = models.TimeField(blank=True, null=True)
    movie_desc = models.CharField(max_length=4000, blank=True, null=True)
    movie_distr = models.CharField(max_length=60, blank=True, null=True)
    movie_release = models.DateField(blank=True, null=True)
    movie_gen = models.CharField(max_length=60, blank=True, null=True)
    show_total_count = models.BigIntegerField()
    directors = models.CharField(max_length=60, blank=True, null=True)
    actors = models.CharField(max_length=300, blank=True, null=True)
    poster_url = models.CharField(max_length=500, blank=True, null=True)
    movie_grade = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'movie'


class Pay(models.Model):
    pay_id = models.BigIntegerField(primary_key=True)
    pay_type = models.BigIntegerField()
    pay_state = models.BigIntegerField()
    pay_price = models.BigIntegerField(blank=True, null=True)
    pay_aprv_num = models.BigIntegerField(blank=True, null=True)
    pay_date = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pay'


class Seat(models.Model):
    seat_id = models.BigIntegerField(primary_key=True)
    seat_row = models.BigIntegerField()
    seat_col = models.BigIntegerField()
    theater = models.ForeignKey('Theater', models.DO_NOTHING)
    seat_type = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'seat'


class Show(models.Model):
    show_id = models.BigIntegerField(primary_key=True)
    theater = models.ForeignKey('Theater', models.DO_NOTHING)
    show_start_time = models.DateTimeField()
    show_count = models.BigIntegerField()
    movie = models.ForeignKey(Movie, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'show'


class Theater(models.Model):
    theater_id = models.BigIntegerField(primary_key=True)
    theater_type = models.ForeignKey('TheaterType', models.DO_NOTHING)
    theater_row = models.BigIntegerField()
    theater_col = models.BigIntegerField()
    theater_cap = models.BigIntegerField()
    theater_name = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'theater'


class TheaterType(models.Model):
    theater_type_id = models.BigIntegerField(primary_key=True)
    theater_type_name = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'theater_type'


class Ticket(models.Model):
    ticket_id = models.BigIntegerField(primary_key=True)
    ticket_state = models.BigIntegerField()
    pay = models.ForeignKey(Pay, models.DO_NOTHING)
    seat = models.ForeignKey(Seat, models.DO_NOTHING)
    usr = models.ForeignKey('Usr', models.DO_NOTHING)
    show = models.ForeignKey(Show, models.DO_NOTHING)
    customer_type = models.ForeignKey(CustomerType, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'ticket'


class Usr(models.Model):
    usr_id = models.CharField(primary_key=True, max_length=16)
    usr_name = models.CharField(max_length=30)
    usr_email = models.CharField(max_length=50)
    usr_password = models.CharField(max_length=64)
    usr_point = models.BigIntegerField(blank=True, null=True)
    usr_type = models.BigIntegerField()

    def __str__(self):
        return str(self.usr_id)

    @property
    def is_active(self):
        return True

    @property
    def is_staff(self):
        return self.usr_type == 0

    @property
    def last_login(self):
        from datetime import datetime
        return datetime.now()

    class Meta:
        managed = False
        db_table = 'usr'
