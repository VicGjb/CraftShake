import uuid
import os
from django.shortcuts import render
from django.contrib.auth import logout
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import (
    viewsets,
    status,
    permissions,
    generics
)
from rest_framework.decorators import (
    action,
)
from rest_framework.response import Response
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from allauth.account.models import EmailAddress
from counter.models import (
    OrderItemVolume
)
from counter.serializers import(
    OrderItemVolumeSerializer
)
from counter.models import Place
from .models import CustomUser, ReferralCode
from .serializers import (
    UserSerialaizer,
    UserCreateSerializer,
    ReferralCodeSerializer,
    ReferralCodeSerializerFull,
    CraftShakeSocialLoginSerializer,
        )
from counter.permissions import (
    CraftShakeCounterPermissions,
    CraftShakeCustomerPermissions,
)
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

class UserView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerialaizer
    
    def get_queryset(self):
        user = CustomUser.objects.all()
        return user
    


class BlacklistTokenUpdateView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            request.session.clear()
            logout(request=request)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ConfigView(APIView):
    permission_classes = [CraftShakeCustomerPermissions]

    def get(self,request,pk=None):
        user = CustomUser.objects.get(id=pk)
        user_serialaizer = UserSerialaizer(user)
        volumes = OrderItemVolume.objects.all()
        volumes_data = []
        for volume in volumes:
            volumes_data.append(OrderItemVolumeSerializer(volume).data)
        return Response({
            'user':user_serialaizer.data,
            'volumes':volumes_data
        })


class ReferralRegistrationView(viewsets.ModelViewSet):
    serializer_class = UserCreateSerializer

    @action(detail=True, method=['post'])
    def create(self,request, pk=None):

        print(f'create user data {request.data}')
        user = UserCreateSerializer(data=request.data)
        print(f'USER {user}')
        if user.is_valid():
            code = ReferralCode.objects.get(code=user.data['referral_code'])
            if code.expiration_date > timezone.now() and code.current:
                print(user.data)
                place = code.place
                new_user = CustomUser.objects.create_user(
                    email = user.data['email'],
                    password = user.data['password'],
                    place = place,
                    role = code.role
                )
                print(f'code role {code.role}')
                if code.role =='counter':
                    new_user.is_staff = True
                    new_user.save()
                serializer = UserSerialaizer(new_user)
                EmailAddress.objects.create(user=new_user, email=user.data['email'], primary=True, verified=True)
                code.current = False
                code.save()
                return Response(status=200,data=serializer.data)
            else:
                if code.current:
                    code.current = False
                    code.save()
                return Response(status=400, data='ErrorExpiredCode')
        else:
            return Response(status=400, data='ErrorNotValid')



class ReferralCodeView(viewsets.ModelViewSet):
    serializer_class = ReferralCodeSerializer

    @action(detail=True, methods=['post'])
    def create(self, request):
        referral_code = ReferralCodeSerializer(data=request.data)
        if referral_code.is_valid():
            code = uuid.uuid4()
            if referral_code.data['place']:
                place = Place.objects.get(id=referral_code.data['place'])
            else:
                place = None    
            new_referral_code = ReferralCode.objects.create(
                code=code,
                place=place,
                role=referral_code.data['role']
            )
            serialaizer = ReferralCodeSerializerFull(new_referral_code)
            return Response(status=200, data=serialaizer.data)
        else:
            return Response(status=400, data="ErrorNotValid")
    



class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):

    def pre_social_login(self, request, sociallogin):

        user = sociallogin.user
        if user.id:  
            return          
        try:
            user = CustomUser.objects.get(email=user.email)
            user.username = user.email
            sociallogin.connect(request, user)
            
        except CustomUser.DoesNotExist:
            pass


    def populate_user(self, request, sociallogin, data, **kwargs):
        response = super().populate_user(request, sociallogin, data)
        if request.session.get('referral_code'):
            referral_code = ReferralCode.objects.get(code=request.session.get('referral_code'))
            user = sociallogin.user
            if referral_code.expiration_date > timezone.now() and referral_code.current:
                user.place = referral_code.place
                user.role = referral_code.role
                user.username = user.email
                if user.role == 'counter':
                    user.is_staff = True
                return response
        return response

    


class CraftShakeGoogleLogin(SocialLoginView):
    serializer_class = CraftShakeSocialLoginSerializer


class GoogleLogin(CraftShakeGoogleLogin):
    adapter_class = GoogleOAuth2Adapter
    callback_url = os.environ.get('GOOGLE_CALLBACK_URL')
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        if request.data.get('referral_code'):
            print('YEEEEES')
            print(f"WTF {request.data.get('referral_code')}")
            request.session['referral_code'] = request.data.get('referral_code')
            referral_code = ReferralCode.objects.get(code=request.data.get('referral_code')) 
            print(f'referral_code {referral_code}')
            print(f'request.session in post method {request.session["referral_code"]}')
            if  referral_code.expiration_date > timezone.now() and referral_code.current:
                response = super().post(request, *args, **kwargs)
                referral_code.current = False
                referral_code.save()
                return response
            else:
                referral_code.current = False
                referral_code.save()
                return Response(status=400, data={'error': 'Referral code has expired or is no longer valid.'})
        else:
            return super().post(request, *args, **kwargs)