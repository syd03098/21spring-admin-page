import hashlib

from django.contrib.auth.backends import ModelBackend

from api.model.models import Usr


class UsrBackend(ModelBackend):

    def authenticate(self, request, username, password, **kwargs):
        try:
            user = Usr.objects.get(usr_id=username)
        except Usr.DoesNotExist:
            return None
        else:
            if user.usr_password == hashlib.sha256(
                    password.encode()).hexdigest():
                return user
        return None
