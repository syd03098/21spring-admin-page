from django.conf.urls import include, url
from rest_framework import routers

from api.views import MovieViewSet, AccountViewSet, SignInViewSet

router = routers.DefaultRouter()
router.register(r'movies', MovieViewSet, basename='movies')
router.register(r'account', AccountViewSet, basename='account')
router.register(r'signin', SignInViewSet, basename='signin')

urlpatterns = [
    url(r'^', include(router.urls)),
]
