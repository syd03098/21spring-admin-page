from django.urls import path
from rest_auth.views import LogoutView

from .views import GoogleLoginViewSet, GoogleCallbackViewSet

urlpatterns = [
    path('logout', LogoutView.as_view(), name='logout'),
    path('login/google',
         GoogleLoginViewSet.as_view({'get': 'retrieve'}),
         name='google_login'),
    path('login/google/callback',
         GoogleCallbackViewSet.as_view({'get': 'retrieve'}),
         name='google_callback')
]
