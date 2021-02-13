from django.conf.urls import include, url
from django.urls import path
from rest_framework import routers

from api.views import MovieViewSet

router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movies')

urlpatterns = [
    url(r'^', include(router.urls)),
]
