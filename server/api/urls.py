from django.conf.urls import include, url
from rest_framework import routers

from api.views import (
    UsrViewSet,
    MovieViewSet,
)

router = routers.DefaultRouter(trailing_slash=False)

auth = routers.DefaultRouter(trailing_slash=False)
auth.register(r'', UsrViewSet, basename='auth')

movie = routers.DefaultRouter(trailing_slash=False)
movie.register(r'movies', MovieViewSet, basename='movie')

router.registry.extend(movie.registry)

urlpatterns = [
    url(r'^auth/', include(auth.urls)),
    # url(r'^movies/', include(movie.urls)),
    url(r'^', include(router.urls)),
]
