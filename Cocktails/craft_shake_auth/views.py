from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import (
    viewsets,
    status,
    permissions
)
from rest_framework.response import Response
from counter.models import (
    OrderItemVolume
)
from counter.serializers import(
    OrderItemVolumeSerializer
)
from .models import CustomUser
from .serializers import UserSerialaizer
from counter.permissions import (
    CraftShakeCounterPermissions,
    CraftShakeCustomerPermissions,
)


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
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ConfigView(APIView):
    permission_classes = [CraftShakeCustomerPermissions]

    def get(self,request,pk=None):
        user = CustomUser.objects.get(id=pk)
        user_serialaizer = UserSerialaizer(user)
        volumes = OrderItemVolume.objects.all()
        # print(volumes)
        volumes_data = []
        for volume in volumes:
            volumes_data.append(OrderItemVolumeSerializer(volume).data)
        # volume_serializer = OrderItemVolumeSerializer(volumes)
        print(volumes_data)
        return Response({
            'user':user_serialaizer.data,
            'volumes':volumes_data
        })