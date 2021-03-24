from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = [
        'id',
        'is_superuser',
        'email',
        'first_name',
        'last_name',
        'rrn',
        'phone',
        'usertype',
    ]
    search_fields = [
        'id',
        'email',
        'first_name',
        'last_name',
        'rrn',
        'phone',
        'usertype',
    ]
