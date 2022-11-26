from dataclasses import field, fields
from decimal import Decimal
# from multiprocessing.dummy import Manager
from pyexpat import model
from unicodedata import name
from django_filters import rest_framework as filters
from django_filters import DateRangeFilter
from .models import (
    Place,
    ManagerOfPlace,
    Menu, 
    MenuPosition,
    Invoice, 
    Order, 
    OrderItem,
    Product,
    )

'''Const'''
class Rate():
    __VAT_RATE = Decimal("1.17")
    VAT_RATE = __VAT_RATE.quantize(Decimal("0.01"))

'''Default images'''
class DeafaultImages():
    
    def __init__(self):
        __DEFAULT_PRODUCT_IMAGE = "https://craftshake.s3.eu-central-1.amazonaws.com/Product_photo/cocktailDefault.jpeg"
        __DEFAULT_ORDER_IMAGE = 'https://craftshake.s3.eu-central-1.amazonaws.com/Order_photo/default_order.webp'
        self.DEFAULT_PRODUCT_IMAGE = __DEFAULT_PRODUCT_IMAGE
        self.DEFAULT_ORDER_IMAGE = __DEFAULT_ORDER_IMAGE

    
    def get_product_photo(self):
        return self.DEFAULT_PRODUCT_IMAGE
    def get_order_image(self):
        return self.DEFAULT_ORDER_IMAGE

'''Filters'''
class PlaceFilter(filters.FilterSet):
    user = filters.BaseInFilter()

    class Meta:
        model = Place
        fields = ['user']


class ManagerFilter(filters.FilterSet):
    place = filters.BaseInFilter()

    class Meta:
        model = ManagerOfPlace
        fields = ['place']


class MenuFilter(filters.FilterSet):
    place = filters.BaseInFilter()
    
    class Meta: 
        model=Menu
        fields=['place']


class MenuPositionFilter(filters.FilterSet):
    position = filters.BaseInFilter()
    
    class Meta: 
        model = MenuPosition
        fields = ['menu']


class OrderFilter(filters.FilterSet):
    place = filters.BaseInFilter()
    date = filters.DateFromToRangeFilter()

    class Meta:
        model = Order
        fields = ['place','date',]


class OrderItemFilter(filters.FilterSet):
    order = filters.BaseInFilter()

    class Meta:
        model = OrderItem
        fields = ['order']


class InvoiceFilter(filters.FilterSet):
    place = filters.BaseInFilter()
    date = filters.DateFromToRangeFilter()

    class Meta:
        model = Invoice
        fields = ['place','date']


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter()
    class Meta:
        model = Product
        fields = ['name']
