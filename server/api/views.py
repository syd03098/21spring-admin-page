from django.http import JsonResponse
from rest_framework import viewsets


class MovieViewSet(viewsets.ViewSet):

    def retrieve(self, request):
        return JsonResponse({'test': True})
