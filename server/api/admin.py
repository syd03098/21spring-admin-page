from django.contrib import admin

from .model.movie.models import Movie, MovieImage

admin.site.register(Movie)
admin.site.register(MovieImage)