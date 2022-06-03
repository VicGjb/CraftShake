from dataclasses import field
from rest_framework import serializers

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

"""Customer serializers"""
class CustomerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = (
            'name',
            'address',
            'phone',
            'is_current_customer'
        )


class CustomerDetailSerializer (serializers.ModelSerializer):

    class Meta:
        model = Customer
        fields = '__all__'


"""Manager serializers"""
class ManagerOfPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ManagerOfPlace
        fields = '__all__'


"""Product serializers"""
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('name', 'cost_price','discription', 'photo')


class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

"""MenuPosition serializers"""
class MenuPositionSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuPosition
        fields = '__all__'


"""Menu serializers"""
class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'


"""Invoice serializers"""
class InvoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'


"""Order serializers"""
class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


"""OrderItem serializers"""
class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'
