from dataclasses import field
from webbrowser import get
from django import forms
from django.contrib import admin
from .service import DeafaultImages
from django.utils.safestring import mark_safe
from .models import (
    Place, 
    ManagerOfPlace,
    Product,
    MenuPosition, 
    Menu, 
    Invoice,
    CustomerStatement,
    Order,
    OrderState,
    OrderItem,
    OrderItemVolume,
)
from craft_shake_auth.models import(
    CustomUser,
)
from rest_framework_simplejwt import token_blacklist

default_images = DeafaultImages()


"""Forms"""
class InvoiceForm(forms.ModelForm):
    """Comment"""
    class Meta:
        model = Invoice
        fields = '__all__'

    orders = forms.ModelChoiceField(queryset=Order.objects.all())


"""Inlaines"""
class UserInLine(admin.TabularInline):
    model = CustomUser
    extra = 0
    fieldsets = (
        (None, {
            'fields':(
                (('place', 'email'),)
            )
        }),
    )


class ManagerOfPlaceInLine(admin.TabularInline):
    model = ManagerOfPlace
    extra = 0
    fieldsets = (
        (None, {
            'fields':(
                (('name','phone'),)
            )
        }),
    )


class MenuInLine(admin.TabularInline):
    model = Menu
    show_change_link = True
    extra = 0
    readonly_fields = ('name',)
    fieldsets = (
        (None, {
            'fields':(
                (('name','is_current_menu'),)
            )
        }),
    )


class MenuPositionInLine(admin.TabularInline):
    model = MenuPosition
    extra = 0
    show_change_link = True
    fieldsets = (
        (None, {
            'fields':(
                (('product','sale_price'),)
            )
        }),
    )


class InvoiceInLine(admin.TabularInline):
    model = Invoice
    show_change_link = True
    extra = 0
    fieldsets = (
        (None, {
            'fields':(
                (('place','date','amount','is_vat','total_amount'),)
            )
        }),
    )


class OrderInline(admin.TabularInline):
    model = Order
    show_change_link = True
    extra = 0
    fieldsets = (
        (None, {
            'fields':(
                (('place', 'date', 'total_price',))
            )
        }),
    )


class OrderItemInLine(admin.TabularInline):
    model = OrderItem
    extra = 0
    fieldsets = (
        (None, {
            'fields':(
                (('position','quantity','item_price'),)
            )
        }),
    )


"""Admin Modeles"""
@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    """Place admin"""
    list_display = ('name', 'address', 'phone')
    list_display_links = ('name',)
    save_on_top = True
    inlines = [UserInLine, ManagerOfPlaceInLine, MenuInLine, InvoiceInLine]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'cost_price','get_image',)
    list_display_links = ('name',)
    search_fields = ('name',)
    save_on_top = True
    readonly_fields = ('get_image',)
    
    def get_image(self, obj):
        if obj.photo:
            return mark_safe(f'<img src={obj.photo.url} width="110" height="110"')
        else:
            return mark_safe(f'<img src={default_images.get_product_photo()} width="110" height="110"') 
    get_image.short_description='Photo'


@admin.register(ManagerOfPlace)
class ManagerOfPlace(admin.ModelAdmin):
    list_display = ('name','place','phone')
    list_display_links = ('name',)
    save_on_top = True


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuPositionInLine]
    list_display = ('name','place','is_current_menu')
    list_display_links = ('name',)
    save_on_top = True


@admin.register(MenuPosition)
class MenuPositionAdmin(admin.ModelAdmin):
    list_display = ('get_name', 'menu', 'sale_price')
    list_display_links =  ('get_name',)
    save_on_top = True

    def get_name(self,obj) -> str:
        return obj.product.name


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('place', 'date', 'total_amount')
    list_display_links = ('place',)
    inlines = [OrderInline]
    save_on_top = True
    

@admin.register(OrderState)
class OrderStateAdmin(admin.ModelAdmin):
    list_display = ('id','name')
    list_display_links = ('id','name')
    save_on_top = True

    
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = ('id','place', 'date','state', 'total_price','get_image')
    list_display_links = ('place',)
    inlines = [OrderItemInLine]
    search_fields = ('place','date')
    save_on_top = True
    readonly_fields = ('state',)
    fieldsets = (
        (None, {
            "fields": (
                (('place', 'date',),)
            ),
        }),
        (None, {
            "fields": (
                (('state'),)
            ),
        }),
        (None, {
            "fields": (
                (('open_to_customer'),)
            ),
        }),
        (None, {
            "fields": (
                (('photo',),)
            ),
        }),
        
        (None, {
            "fields": (
                (('invoice','customer_statement'),)
            ),
        }),
        (None, {
            "fields": (
                (('total_price'),)
            ),
        }),
    )

    def get_image(self, obj):
        if obj.photo:
            return mark_safe(f'<img src={obj.photo.url} width="110" height="110"')
        else:
            return mark_safe(f'<img src={default_images.get_order_image()} width="200" height="110"')
    get_image.short_description='Photo'


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'quantity', 'item_price')
    list_display_links = ('order',)
    save_on_top = True

    def get_price(self, obj):
        result = obj.item_price * obj.quantity
        return result

@admin.register(CustomerStatement)
class CustomerStatementAdmin(admin.ModelAdmin):
    list_display = ('place', 'date', 'total_amount')
    list_display_links = ('place',)
    # inlines = [OrderInline]
    save_on_top = True

@admin.register(OrderItemVolume)
class OrderItemValue(admin.ModelAdmin):
    list_display = ('id','value')
    list_display_links = ('id','value')


class OutstandingTokenAdmin(token_blacklist.admin.OutstandingTokenAdmin):

    def has_delete_permission(self, *args, **kwargs):
        return True 
admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)