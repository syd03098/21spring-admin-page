from django.conf.urls import include, url
from rest_framework import routers

from api.views import (
    UsrViewSet,
    MovieViewSet,
    TheaterViewSet,
)

router = routers.DefaultRouter(trailing_slash=False)

auth = routers.DefaultRouter(trailing_slash=False)
auth.register(r'', UsrViewSet, basename='auth')

router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'theaters', TheaterViewSet, basename='theater')

urlpatterns = [
    url(r'^auth/', include(auth.urls)),
    url(r'^', include(router.urls)),
]
