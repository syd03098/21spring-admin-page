import re
from urllib import parse
import json
import base64

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.conf import settings
from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_auth.registration.serializers import SocialLoginSerializer
from rest_auth.registration.views import SocialLoginView
from rest_framework import viewsets
from rest_framework.permissions import AllowAny


class GoogleLoginViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)

    def retrieve(self, request, *args, **kwargs):
        token_request_uri = GoogleOAuth2Adapter.authorize_url
        response_type = 'code'
        client_id = settings.CLIENT_ID
        if request.get_host().split(':')[0] in ['localhost', '127.0.0.1']:
            scheme = 'http'
        else:
            scheme = request.scheme
        redirect_uri = f'{scheme}://{request.get_host()}{reverse("google_callback")}'
        scope = 'profile email openid'

        params = parse.urlencode({
            'response_type': response_type,
            'client_id': client_id,
            'redirect_uri': redirect_uri,
            'scope': scope
        })
        url = f'{token_request_uri}?' \
              f'{params}'
        return HttpResponseRedirect(url)


class GoogleCallbackViewSet(SocialLoginView, viewsets.ModelViewSet):
    client_class = OAuth2Client
    adapter_class = GoogleOAuth2Adapter
    serializer_class = SocialLoginSerializer

    @property
    def callback_url(self):
        url = self.adapter_class(self.request).get_callback_url(
            self.request,
            None,
        )
        if self.request.get_host().split(':')[0] in ['localhost', '127.0.0.1']:
            url = re.sub('^.*?:', 'http:', url)

        return url

    def retrieve(self, request, *args, **kwargs):
        self.request = request
        print(self.request.query_params)
        print('0000000000000000000000000000000000000000000000000')
        print(self.request.data)
        # print(dir(self.request))
        print('0000000000000000000000000000000000000000000000000')
        self.serializer = self.get_serializer(data=self.request.query_params,
                                              context={'request': request})
        print('0000000000000000000000000000000000000000000000000')
        self.serializer.is_valid(raise_exception=True)
        print('0000000000000000000000000000000000000000000000000')
        self.login()
        print('0000000000000000000000000000000000000000000000000')

        if request.get_host().split(':')[0] in ['localhost', '127.0.0.1']:
            scheme = 'http'
        else:
            scheme = request.scheme

        redirect_to = f'{scheme}://{request.get_host()}/'
        redirect = HttpResponseRedirect(redirect_to)
        redirect.cookies = self.get_response().cookies
        return redirect
