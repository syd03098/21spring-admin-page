from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model

from api.model.user.models import User


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    user_manager = get_user_model()._default_manager

    def pre_social_login(self, request, sociallogin):
        email = sociallogin.user.email
        try:
            user = User.objects.get(email=email)
            try:
                SocialAccount.objects.get(user=user)
            except SocialAccount.DoesNotExist as _:
                sociallogin.connect(request, user)
        except User.DoesNotExist as _:
            # Skip pre_social_login hook if User does not exist
            pass

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)

        if 'xjuny1996' in sociallogin.user.email:
            user.usertype = 1  # ADMIN
            user.is_staff = True
            user.save(update_fields=['type', 'is_staff'])
        else:
            user.usertype = 2 # CUSTOMER
            user.is_staff = False
            user.save(update_fields=['type', 'is_staff'])
