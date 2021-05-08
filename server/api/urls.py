from django.conf.urls import include, url
from rest_framework import routers

# from api.views import MovieViewSet, AccountViewSet, SignInViewSet
from api.views import (
    UsrViewSet,
    LoginViewSet,
    LogoutViewSet,
    MovieViewSet,
)

router = routers.DefaultRouter()

auth = routers.DefaultRouter(trailing_slash=False)
auth.register(r'create', UsrViewSet, basename='usrcreate')
auth.register(r'login', LoginViewSet, basename='login')
auth.register(r'logout', LogoutViewSet, basename='logout')

movie = routers.DefaultRouter(trailing_slash=False)
movie.register(r'', MovieViewSet, basename='movie')

# router.register(r'movies', MovieViewSet, basename='movies')

urlpatterns = [
    url(r'^auth/', include(auth.urls)),
    url(r'^movies/', include(movie.urls)),
    url(r'^', include(router.urls)),
]
