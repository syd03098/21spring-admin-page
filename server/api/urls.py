from django.conf.urls import include, url
from rest_framework import routers

# from api.views import MovieViewSet, AccountViewSet, SignInViewSet
from api.views import UsrViewSet

router = routers.DefaultRouter()
router.register(r'auth/create', UsrViewSet, basename='usrcreate')
# router.register(r'movies', MovieViewSet, basename='movies')
# router.register(r'account', AccountViewSet, basename='account')
# router.register(r'signin', SignInViewSet, basename='signin')

urlpatterns = [
    url(r'^', include(router.urls)),
]
