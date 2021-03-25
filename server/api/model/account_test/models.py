from django.db import models


class Account(models.Model):
    userid = models.CharField(primary_key=True, max_length=16)
    passwd = models.CharField(max_length=64, blank=False, null=False)
    name = models.CharField(max_length=30, blank=True, null=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = 'account_test'
