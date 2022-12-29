from rest_framework import permissions
from .models import Place

class CraftShakeCounterPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user.is_staff)
        if (request.user and request.user.is_staff):
            return True

class CraftShakeCustomerPermissions(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        permitted_methods = ('GET', 'HEAD', 'OPTIONS')
        if (request.method in permitted_methods):
            print(request.user)
            # print('---------------------------------------------s')
            # print(obj.users.filter(id=request.user.id))
            user = obj.users.filter(id=request.user.id)
            if (user or request.user.is_staff and request.method in permitted_methods):
                print(request.method )
                print('fefefefefefpvoks')
                return True
