from rest_framework import serializers
from .models import (
    CustomUser
)
# from counter.serializers import PlaceDetailSerializer
"""User serializers"""
class UserSerialaizer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='get_role_name')
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
            'role_name',
            )