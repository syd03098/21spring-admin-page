from django.db import models


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    description = models.CharField(max_length=2000)

    def __str__(self):
        return self.title
