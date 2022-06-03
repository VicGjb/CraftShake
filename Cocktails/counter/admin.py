from dataclasses import field
from webbrowser import get
from django import forms
from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import (
    Customer, 
    ManagerOfPlace,
    Product,
    MenuPosition, 
    Menu, 
    Invoice,
    Order,
    OrderItem,
)

"""Forms"""
class InvoiceForm(forms.ModelForm):
    """Comment"""
    class Meta:
        model = Invoice
        fields = '__all__'

    orders = forms.ModelChoiceField(queryset=Order.objects.all())


"""Inlaines"""
class ManagerOfPlaceInLine(admin.TabularInline):
    model = ManagerOfPlace
    extra = 1
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
    extra = 1
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
    extra = 1
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
    extra = 1
    fieldsets = (
        (None, {
            'fields':(
                (('customer','date','amount','is_vat','total_amount'),)
            )
        }),
    )


class OrderInline(admin.TabularInline):
    model = Order
    show_change_link = True
    extra = 1
    fieldsets = (
        (None, {
            'fields':(
                (('customer', 'menu', 'date', 'total_price',))
            )
        }),
    )


class OrderItemInLine(admin.TabularInline):
    model = OrderItem
    extra = 1
    fieldsets = (
        (None, {
            'fields':(
                (('position','quantity','item_price'),)
            )
        }),
    )


"""Admin Modeles"""
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    """Customer admin"""
    list_display = ('name','address', 'phone')
    list_display_links = ('name',)
    save_on_top = True
    inlines = [ManagerOfPlaceInLine, MenuInLine, InvoiceInLine]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'discription', 'cost_price', 'get_image',)
    list_display_links = ('name',)
    search_fields = ('name',)
    save_on_top = True
    readonly_fields = ('get_image',)
    
    def get_image(self, obj):
        if obj.photo.url:
            return mark_safe(f'<img src={obj.photo.url} width="110" height="110"')
    get_image.short_description='Photo'


@admin.register(ManagerOfPlace)
class ManagerOfPlace(admin.ModelAdmin):
    list_display = ('name','place','phone')
    list_display_links = ('name',)
    save_on_top = True


@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    inlines = [MenuPositionInLine]
    list_display = ('name','customer','is_current_menu')
    list_display_links = ('name',)
    save_on_top = True


@admin.register(MenuPosition)
class MenuPositionAdmin(admin.ModelAdmin):
    list_display = ('product', 'menu', 'sale_price')
    list_display_links =  ('product',)
    save_on_top =True


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ('customer', 'date', 'total_amount')
    list_display_links = ('customer',)
    inlines = [OrderInline]
    save_on_top = True
    # form = InvoiceForm
    

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('customer', 'date', 'total_price')
    list_display_links = ('customer',)
    inlines = [OrderItemInLine]
    search_fields = ('customer','date')
    save_on_top = True


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    # readonly_fields = ('item_price',)
    list_display = ('order', 'quantity', 'item_price')
    list_display_links = ('order',)
    save_on_top = True
    # prepopulated_fields = {'item_price':'get_price'}

    def get_price(self, obj):
        result = obj.item_price * obj.quantity
        return result