from api.views import MovieViewSet
from django.urls import path

urlpatterns = [
    path('movie', MovieViewSet.as_view({
        'get': 'retrieve',
    })),
]
