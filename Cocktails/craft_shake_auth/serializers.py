from rest_framework import serializers
from .models import (
    CustomUser
)
# from counter.serializers import PlaceDetailSerializer
"""User serializers"""
class UserSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'role',
            'email',
            'user_permissions',
            'place',
            )