from django.conf.urls import include, url
from rest_framework import routers

# from api.views import MovieViewSet, AccountViewSet, SignInViewSet
from api.views import UsrViewSet, LoginViewSet

router = routers.DefaultRouter()
router.register(r'auth/create', UsrViewSet, basename='usrcreate')
router.register(r'auth/login', LoginViewSet, basename='login')
# router.register(r'movies', MovieViewSet, basename='movies')

urlpatterns = [
    url(r'^', include(router.urls)),
]
