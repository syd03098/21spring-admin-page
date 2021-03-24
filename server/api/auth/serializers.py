from rest_framework import serializers
from api.model.user.models import User


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'pk',
            'email',
            'first_name',
            'last_name',
        )
        read_only_fields = ('email',)
