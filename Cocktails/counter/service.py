from dataclasses import field, fields
from decimal import Decimal
# from multiprocessing.dummy import Manager
from pyexpat import model
from unicodedata import name
from django_filters import rest_framework as filters
from django_filters import DateRangeFilter
from .models import (
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


'''Filters'''
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
