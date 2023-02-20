from rest_framework import serializers
from .models import (
    CustomUser,
    ReferralCode,
)
from dj_rest_auth.registration.serializers import SocialLoginSerializer
# from rest_auth.serializers import SocialLoginSerializer

"""User serializers"""
class UserSerialaizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'first_name',
            'last_name',
            'role',
            'email',
            'user_permissions',
            'place',
            )

class UserCreateSerializer(serializers.ModelSerializer):
    referral_code = serializers.CharField(max_length=128)
    class Meta:
        model = CustomUser
        fields = (
            'email',
            'referral_code',
            'password',
        )
        # extra_kwargs = {'password': {'write_only': True}}

class ReferralCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReferralCode
        fields = (
            # 'code',
            'place',
            'role',
        )

class ReferralCodeSerializerFull(serializers.ModelSerializer):

    class Meta:
        model = ReferralCode
        fields = (
            'code',
            'place',
            'role',
            'expiration_date',
        )


class CraftShakeSocialLoginSerializer(SocialLoginSerializer):
    referral_code = serializers.CharField(required=False,allow_blank=True)

    def create(self, validated_data):
        request = self.context.get("request")
        referral_code = validated_data.get("referral_code")
        print(f'R{referral_code}')
        self.context["referral_code"] = referral_code
        return super().create(validated_data)