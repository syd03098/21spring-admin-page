from rest_framework import serializers, viewsets
from rest_framework.response import Response

from api.model.movie.models import Movie

from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_url_kwarg = 'id'

    def retrieve(self, request, id=None):
        movie = Movie.objects.raw(f'SELECT * FROM movie_movie WHERE id={id}')
        serializer = MovieSerializer(movie)
        return Response(movie[0].title)
