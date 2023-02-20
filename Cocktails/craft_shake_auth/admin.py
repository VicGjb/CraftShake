from django.contrib import admin
from counter.models import Place
from .models import (
    CustomUser,
    ReferralCode,
)


"""Admin Models"""
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    """User admin"""
    list_display = ('id','email','first_name','last_name')
    list_display_links = ('id','email')
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()  
        if not is_superuser:
            disabled_fields |= {
                'email',
                'is_superuser',
            }
        for f in disabled_fields:
            if f in form.base_fields:
                form.base_fields[f].disabled = True
        return form

@admin.register(ReferralCode)
class RefferralCodeAdmin(admin.ModelAdmin):
    """RefferralCodeAdmin"""
    list_display = ('id', 'code', 'place','expiration_date')
    list_display_links = ('id', 'code')
    