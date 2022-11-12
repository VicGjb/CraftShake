from rest_framework import permissions
from .models import Place

class CraftShakeCounterPermissions(permissions.BasePermission):
   pass
    # def has_object_permission(self, request, view, obj):
        
        # if (request.user and request.user.is_staff):
        #     return True

class CraftShakeCustomerPermissions(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     if (request.user and request.user.is_staff):
    #         return True
        # permitted_methods = ('GET', 'HEAD', 'OPTIONS','POST')
        # if (request.method in permitted_methods):
        #     print(request.user.place)
        #     print('---------------------------------------------s')
        #     print()
            # print(Place.objects.get(pk=view['dad']))
            # place = Place.objects.get(pk=view)
            # print(place)
            # # print(request.user.id)
            # print(obj.users.filter(id=request.user.id))
            # user = obj.users.filter(id=request.user.id)
            # if (user or request.user.is_staff):
            #     return True


    
    def has_object_permission(self, request, view, obj):
        permitted_methods = ('GET', 'HEAD', 'OPTIONS','POST')
        if (request.method in permitted_methods):
            print(request.user)
            print('---------------------------------------------s')
            # print(request.user.id)
            print(obj.users.filter(id=request.user.id))
            user = obj.users.filter(id=request.user.id)
            if (user or request.user.is_staff):
                return True
            # return  request.user == obj.users
