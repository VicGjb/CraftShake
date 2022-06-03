from itertools import product
from rest_framework import (
    serializers,
    permissions,
    viewsets,
)
from rest_framework.response import Response
from rest_framework.decorators import (
    action, 
    permission_classes
)
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .models import (
    Customer, 
    ManagerOfPlace,
    Product,
    MenuPosition, 
    Menu, 
    Invoice,
    Order,
    OrderItem
)
from .serializers import(
    CustomerSerializer,
    CustomerDetailSerializer,
    ManagerOfPlaceSerializer,
    ProductSerializer,
    ProductDetailSerializer,
    MenuPositionSerializer,
    MenuSerializer,
    InvoiceSerializer,
    OrderSerializer,
    OrderItemSerializer
)

"""Customer views"""
class CustomerView(viewsets.ReadOnlyModelViewSet):

    def get_queryset(self):
        customer = Customer.objects.all()
        return customer

    def get_serializer_class(self):
        if self.action == 'list':                                                                                                                           
            return CustomerSerializer
        elif self.action == "retrieve":
            return CustomerDetailSerializer
    

class CustomerCreateView(viewsets.ModelViewSet):

    serializer_class = CustomerDetailSerializer

    @action(detail=True, method=['post'])
    def add_customer(self, request, pk=None):
        customer = CustomerDetailSerializer(data=request.data)
        if customer.is_valid:
            return Response(status=201)


"""Manager of place views"""
class ManagerOfPlaceView(viewsets.ModelViewSet):

    def get_queryset(self):
        manager = ManagerOfPlace.objects.all()
        return manager
    
    def get_serializer_class(self):                                                                                                                       
        return ManagerOfPlaceSerializer


class ManagerOfPlaceCreateView(viewsets.ModelViewSet):
    serializer_class = ManagerOfPlaceSerializer
    @action(detail=True, method=['post'])
    def add_manager(self, request, pk=None):
        manager_of_place = ManagerOfPlaceSerializer(data=request.data)
        if manager_of_place.is_valid:
            return Response(status=201)


"""Product views"""
class ProductView(viewsets.ReadOnlyModelViewSet):

    def get_queryset(self):
        product = Product.objects.all()
        return product

    def get_serializer_class(self):
        if self.action == 'list':                                                                                                                           
            return ProductSerializer
        elif self.action == "retrieve":
            return ProductDetailSerializer


class ProductCreateView(viewsets.ModelViewSet):
    serializer_class = ProductDetailSerializer

    @action(detail=True, method=['post'])
    def add_product(self, request, pk=None):
        product = CustomerDetailSerializer(data=request.data)
        if product.is_valid:
            return Response(status=201)


"""Menu views"""
class MenuView(viewsets.ReadOnlyModelViewSet):

    serializer_class = MenuSerializer

    def get_queryset(self):
        menu = Menu.objects.all()
        return menu


class MenuCreateView(viewsets.ModelViewSet):

    serializer_class = MenuSerializer

    @action(detail=True, methods=['post'])
    def add_menu(self, request, pk=None):
        menu = MenuSerializer(data=request.data)
        if product.is_valid:
            return Response(status=201)


"""Menu position views""" 
class MenuPositionView(viewsets.ReadOnlyModelViewSet):

     serializer_class = MenuPositionSerializer

     def get_queryset(self):
        menu_position = MenuPosition.objects.all()
        return menu_position


class MenuPositionCreateView(viewsets.ModelViewSet):

    serializer_class = MenuPositionSerializer

    @action(detail=True, methods=['post'])
    def add_menu_position(self,request,pk=None):
        menu_position = MenuPositionSerializer(data=request.data)
        if menu_position.is_valid:
            return Response(status=201)


"""Invoice views"""
class InvoiceView(viewsets.ReadOnlyModelViewSet):

    serializer_class = InvoiceSerializer

    def get_queryset(self):
        invoice = Invoice.objects.all()
        return invoice


class InvoiceCreateView(viewsets.ModelViewSet):
    
    serializer_class = InvoiceSerializer

    @action(detail=True, methods=['post'])
    def add_invoice(self, request, pk=None):
        invoice = InvoiceSerializer(data=request.data)
        if invoice.is_valid():
            return Response(status=201)


"""Order views"""
class OrderView(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        order = Order.objects.all()
        return order


class OrderCreateView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    @action(detail=True, methods=['post'])
    def add_order(self, request, pk=None):
        order = OrderSerializer(data=request.data)
        if order.is_valid:
            return Response(status=201)


"""Order item views"""
class OrderItemView(viewsets.ReadOnlyModelViewSet):
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        order_item = OrderItem.objects.all()
        return order_item


class OrderItemCreateView(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer

    @action(detail=True,methods=['post'])
    def add_order_item(self,request, pk=None):
        order_item = OrderItemSerializer(data=request.data)
        if order_item.is_valid:
            return Response(status=201)