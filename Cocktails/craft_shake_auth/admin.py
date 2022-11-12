from django.contrib import admin
from counter.models import Place
from .models import (
    CustomUser,
    UserRole,
)

""""Inlaines"""
# class PlaceInlaine(admin.TabularInline):
#     model = Place
#     extra = 0
#     fieldsets = (
#         (None,{
#             'fields':(
#                 (('name','address','phone','email'),)
#             )
#         }),
#     )
#     readonly_fields = ('name','address','phone','email')
#     can_delete = False


"""Admin Models"""
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    """User admin"""
    list_display = ('id','username','first_name','last_name','email',)
    list_display_links = ('id','username')
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()  
        if not is_superuser:
            disabled_fields |= {
                'username',
                'is_superuser',
            }
        for f in disabled_fields:
            if f in form.base_fields:
                form.base_fields[f].disabled = True
        return form


    

@admin.register(UserRole)
class UserRoleAdmin(admin.ModelAdmin):
    """User role admin"""
    list_display = ('id','name',)
    list_display_links = ('id','name')
    save_on_top = True