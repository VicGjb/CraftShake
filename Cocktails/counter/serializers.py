from pyexpat import model
from re import S
from django.db.models import Sum
from rest_framework import serializers
from .models import (
    Place, 
    ManagerOfPlace,
    Product,
    MenuPosition, 
    Menu, 
    Invoice,
    CustomerStatement,
    Order,
    OrderItem,
    OrderItemVolume,
)
from craft_shake_auth.serializers import(
    UserSerialaizer
)

"""Place serializers"""
class PlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'address',
            'phone',
            'is_current_place',
            'users'
        )


class PlaceDetailSerializer (serializers.ModelSerializer):
    
        class Meta:
            model = Place
            fields = (
            'id',
            'name',
            'address',
            'phone',
            'is_current_place',
            'users'
        )


"""Manager serializers"""
class ManagerOfPlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ManagerOfPlace
        fields = '__all__'


"""Product serializers"""
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = (
            'id',
            'name', 
            'cost_price',
            'discription', 
            'photo'
            )


class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class ProductUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('id',)


class ProductUploadPhotoSerializer(serializers.ModelSerializer):
     
     class Meta:
         model = Product
         fields = ('photo',)


"""MenuPosition serializers"""
class MenuPositionCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuPosition
        fields = '__all__'


class MenuPositionSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='get_product_name')
    photo = serializers.ImageField(source='get_photo')
    discription = serializers.CharField(source='get_discription')
    
    class Meta:
        model = MenuPosition
        fields = '__all__'
        # read_only_fields = (
        # 'name',
        # )    

        
"""Menu serializers"""

class MenuSerializer(serializers.ModelSerializer):
    position_in_menu = MenuPositionSerializer(many=True)

    class Meta:
        model = Menu
        fields = '__all__'
        read_only_fields = (
            'position_in_menu',
        )

class MenuCreteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = '__all__'

class MenuUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = (
            'is_current_menu',
            )


"""OrderItemVolume serializers"""
class OrderItemVolumeSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source = 'get_name')

    class Meta:
        model = OrderItemVolume
        fields = '__all__'


"""OrderItem serializers"""
class OrderItemSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = OrderItem
        fields = '__all__'
        # exclude = ('item_price',)


class OrderItemVeiwSerializer(OrderItemSerializer):
    pass
    # position_name = serializers.CharField(source='get_name_position')


class OrderItemCreateSerializer(OrderItemSerializer):
    # name = serializers.CharField(source='get_name_position')
    pass




"""Order serializers"""
class OrderSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Order
        fields = '__all__'
    


class OrderViewSerializer(OrderSerializer):
    menus = MenuSerializer(source='get_menus',many=True)
    users = UserSerialaizer(source='get_users',many=True)
    order_item = OrderItemVeiwSerializer(many=True)
    place_name = serializers.CharField(source='get_place_name')


class OrderCreateSerializer(OrderSerializer):
    menus=None
    class Meta:
        model = Order
        exclude = ('invoice','customer_statement',)


class OrderUpdateSerializer(OrderSerializer):
    
    class Meta:
        model = Order
        fields = ('total_price',)


"""Invoice serializers"""
class InvoiceSerializer(serializers.ModelSerializer):
    orders = OrderViewSerializer(many=True)
    place_name = serializers.CharField(source='get_place_name')
    is_vat = serializers.BooleanField(required=True)
    class Meta:
        model = Invoice
        fields = '__all__'
        extra_kwargs = {'is_vat':{'required': True, 'allow_null': False}}
        read_only_fields = (
            'orders     ',
        )


class InvoiceUpdateSerializer(serializers.ModelSerializer):
    is_vat = serializers.BooleanField(required=True)
    class Meta:
        model = Invoice
        fields = ('state','is_vat')
        extra_kwargs = {'is_vat':{'required': True, 'allow_null': False}}


class InvoiceCreateSerializer(serializers.ModelSerializer):
    from_date = serializers.DateField()
    until_date = serializers.DateField()
    
    class Meta:
        model = Invoice
        fields = (
            'place',
            'date', 
            'from_date', 
            'until_date',
            'is_vat'
            )


"""Customer Statement views"""
class CustomerStatementCreateSerializer(serializers.ModelSerializer):
    from_date = serializers.DateField()
    until_date = serializers.DateField()
    
    class Meta:
        model = CustomerStatement
        fields = (
            'place',
            'date', 
            'from_date', 
            'until_date',
            )


class CustomerStatementSerializer(serializers.ModelSerializer):
    orders_customer_statement = OrderViewSerializer(many=True)
    place_name = serializers.CharField(source='get_place_name')
    class Meta:
        model = CustomerStatement
        fields = '__all__'
        read_only_fields = (
            'orders_customer_statement',
        )

