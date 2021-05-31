from django.conf.urls import include, url
from rest_framework import routers

from api.views import (
    AuthViewSet,
    MovieViewSet,
    ShowViewSet,
    ShowSeatViewSet,
    TheaterViewSet,
    TicketViewSet,
    UserViewSet,
)

router = routers.DefaultRouter(trailing_slash=False)

auth = routers.DefaultRouter(trailing_slash=False)
auth.register(r'', AuthViewSet, basename='auth')

router.register(r'movies', MovieViewSet, basename='movie')
router.register(r'shows', ShowViewSet, basename='show')
router.register(r'shows/(?P<show_id>\d+)/seats',
                ShowSeatViewSet,
                basename='show.seat')
router.register(r'theaters', TheaterViewSet, basename='theater')
router.register(r'user', UserViewSet, basename='user')
router.register(r'user/tickets', TicketViewSet, basename='user')

urlpatterns = [
    url(r'^auth/', include(auth.urls)),
    url(r'^', include(router.urls)),
]
