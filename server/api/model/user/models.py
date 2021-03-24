from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from model_utils.models import TimeStampedModel

from .managers import UserManager

ADMIN = 1
CUSTOMER = 2
UserType = [
    (ADMIN, 'Admin'),
    (CUSTOMER, 'Customer'),
]


class User(AbstractBaseUser, TimeStampedModel, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=20, blank=False, null=False)
    last_name = models.CharField(max_length=20, blank=False, null=False)
    rrn = models.CharField(max_length=13, blank=True, null=True)  # 주민등록번호
    phone = models.CharField(max_length=11, blank=True, null=True)
    usertype = models.PositiveSmallIntegerField(null=False,
                                                choices=UserType,
                                                default=CUSTOMER)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('first_name', 'last_name')

    def __str__(self):
        return self.email

    class Meta:
        db_table = 'user'
        ordering = ['email']
