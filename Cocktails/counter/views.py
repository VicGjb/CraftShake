from decimal import  Decimal, ROUND_HALF_UP
from django.shortcuts import render
from django.db.models import Sum
from datetime import datetime
from .service import ProductFilter, Rate
from Cocktails.aws_manager import remove_file_from_aws_3

from django.db import models
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
import sys

# import pdfkit
from rest_framework.views import APIView
from rest_framework import (
    permissions,
    viewsets,
    generics,
)
from rest_framework.response import Response
from rest_framework.decorators import (
    action, 
    permission_classes
)
from django_filters.rest_framework import DjangoFilterBackend  
from .service import (
    PlaceFilter,
    ManagerFilter,
    MenuFilter,
    MenuPositionFilter,
    InvoiceFilter,
    OrderFilter,
    OrderItemFilter
)
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
    OrderItemVolume
)
from .serializers import(
    PlaceSerializer,
    PlaceDetailSerializer,
    PlaceCreateSerializer,
    ManagerOfPlaceSerializer,
    ProductSerializer,
    ProductDetailSerializer,
    ProductUpdateSerializer,
    MenuPositionSerializer,
    MenuPositionCreateSerializer,   
    MenuSerializer,
    MenuCreateSerializer,
    MenuUpdateSerializer,
    InvoiceSerializer,
    InvoiceCreateSerializer,
    InvoiceUpdateSerializer,
    CustomerStatementSerializer,
    CustomerStatementCreateSerializer,
    OrderViewSerializer,
    OrderCreateSerializer,
    OrderUpdateSerializer,
    OrderChangeStateSerializer,
    OrderAndItemCreateSerializer,
    OrderUploadPhotoSerializer,
    OrderItemVeiwSerializer,
    OrderItemCreateSerializer,
    OrderItemVolumeSerializer,
    ProductUploadPhotoSerializer,
)
from .invoice_pdf import PdfCreator
from .permissions import (
    CraftShakeCounterPermissions,
    CraftShakeCustomerPermissions,
)
from .telegram_alarm import (
    telegram_send_massege_new_order,
    telegram_send_massege_update_order
)

"""Place views"""
class PlaceAPIListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Place.objects.all().order_by('name')
    serializer_class = PlaceSerializer

class PlaceAPIDetaileView(generics.RetrieveAPIView):
    permission_classes = [CraftShakeCustomerPermissions]
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer


class PlaceView(viewsets.ReadOnlyModelViewSet):
    pass
    # # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # permission_classes = [CraftShakeCustomerPermissions]
    # filter_backends = (DjangoFilterBackend,)
    # filterset_class = PlaceFilter

    # def get_queryset(self):
    #     place = Place.objects.all()
    #     return place

    # def get_serializer_class(self):
    #     if self.action == 'list':                                                                                                                           
    #         return PlaceSerializer
    #     elif self.action == "retrieve":
    #         return PlaceDetailSerializer

class PlaceUpdateView(viewsets.ModelViewSet):
    serializer_class = PlaceDetailSerializer
    permission_classes = [CraftShakeCustomerPermissions]
    
    def get_queryset(self):
        product = Place.objects.all() 
        return product

class PlaceCreateView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = PlaceCreateSerializer

    @action(detail=True, method=['post'])
    def create(self, request, pk=None):
        print(request.data)
        place = PlaceCreateSerializer(data=request.data)
        if place.is_valid():
            new_place=Place.objects.create(**request.data)
            place_list = Place.objects.all().order_by('name')
            serializer = PlaceSerializer(place_list, many=True)
            return Response(status=201, data=serializer.data)
        return Response(status=403)


    @action(detail=True, method=['post'])
    def update(self, request, pk=None):
        place = Place.objects.get(id=pk)
        update_data = PlaceDetailSerializer(data=request.data)
        if update_data.is_valid():
            place.name = update_data.data['name']
            place.address = update_data.data['address']
            place.phone = update_data.data['phone']
            place.email = update_data.data['email']
            place.is_current_place = update_data.data['is_current_place']
            place.save()
            serializer = PlaceDetailSerializer(place)
            return Response(status=201, data=serializer.data)
        return Response(status=403)


class PlaceDeleteView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [CraftShakeCounterPermissions]
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer


class PlaceByNameView(generics.ListAPIView):
    serializer_class = PlaceSerializer
    def get_queryset(self):
        name = self.kwargs["name"]
        return Place.objects.filter(name__contains=name)


"""Manager of place views"""
class ManagerOfPlaceView(viewsets.ModelViewSet):
    # permission_classes = [CraftShakeCustomerPermissions]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ManagerFilter

    def get_queryset(self):
        manager = ManagerOfPlace.objects.all()
        return manager
    
    def get_serializer_class(self):                                                                                                                       
        return ManagerOfPlaceSerializer

    @action(detail=True, methods=['post'])
    def destroy(self, request, pk=None, *args, **kwargs):
        manager = ManagerOfPlace.objects.get(id=pk)
        place = manager.place.id
        manager.delete()
        managers = ManagerOfPlace.objects.filter(place=place)
        serializer = ManagerOfPlaceSerializer(managers, many=True)
        return Response(status=201, data=serializer.data)

class ManagerOfPlaceCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = ManagerOfPlaceSerializer
    
    @action(detail=True, method=['post'])
    def add_manager(self, request, pk=None):
        print(request.data)
        manager_of_place = ManagerOfPlaceSerializer(data=request.data)
        if manager_of_place.is_valid():
            
            new_manager = ManagerOfPlace.objects.create(
                                                        name=manager_of_place.data['name'],
                                                        phone=manager_of_place.data['phone'],
                                                        description=manager_of_place.data['description'],
                                                        place=Place.objects.get(id=manager_of_place.data['place']),
                                                        )
            managers = ManagerOfPlace.objects.filter(place=new_manager.place)
            serializer = ManagerOfPlaceSerializer(managers, many=True)
            print(serializer.data)
            return Response(status=201, data=serializer.data)


    @action (detail=True, method=['post','update'])
    def update(self, request, pk=None):
        print('hello')
        manager_of_place_update = ManagerOfPlaceSerializer(data=request.data)
        if manager_of_place_update.is_valid():
            manager_of_place = ManagerOfPlace.objects.get(id=pk)
            manager_of_place.name = manager_of_place_update.data['name']
            manager_of_place.phone = manager_of_place_update.data['phone']
            manager_of_place.description = manager_of_place_update.data['description']
            manager_of_place.save()
            managers = ManagerOfPlace.objects.filter(place=manager_of_place.place)
            serializer = ManagerOfPlaceSerializer(managers,many=True)
            return Response(status=201, data=serializer.data)


"""Product views"""
class ProductView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

    def get_queryset(self):
        product = Product.objects.all().order_by('name')
        return product

    def get_serializer_class(self):
        if self.action == 'list':                                                                                                                           
            return ProductSerializer
        elif self.action == "retrieve":
            return ProductDetailSerializer


class ProductCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = ProductDetailSerializer
    

    @action(detail=True, method=['post'])
    def add_product(self, request, pk=None):
        product = ProductDetailSerializer(data=request.data)
        if product.is_valid():
            new_product = Product.objects.create(
                                                name=product.data['name'],
                                                cost_price=product.data['cost_price'],
                                                description=product.data['description'],
                                                sale_price=product.data['sale_price'],
                                                )
            products = Product.objects.all().order_by('name')
            serializer = ProductDetailSerializer(products, many=True)
            return Response(status=201, data=serializer.data)
    
    @action(detail=True, method=['post'])
    def update(self, request, pk=None):
        product_update = ProductDetailSerializer(data=request.data)
        if product_update.is_valid():
            product = Product.objects.get(id=pk)
            product.name = product_update.data['name']
            product.cost_price = product_update.data['cost_price']
            product.sale_price = product_update.data['sale_price']
            product.description = product_update.data['description']
            product.save()
            serializer = ProductDetailSerializer(product)
            return Response(status=201, data=serializer.data)


class ProductByNameView(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        name = self.kwargs["name"]
        return Product.objects.filter(name__contains=name)


class ProductDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

    @action(detail=True, methods=['post','destroy'])
    def destroy(self, request,pk=None, *args, **kwargs):
        product = Product.objects.get(id=pk)
        print(product.photo)
        remove_file_from_aws_3(product.photo)
        return super().destroy(request, *args, **kwargs)


class ProductUploadPhotoView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = ProductUploadPhotoSerializer
    queryset = Product.objects.all()

    @action (detail=True, method=['post'])
    def update(self, request, pk=None):
        product = Product.objects.get(id=pk)
        photo = ProductUploadPhotoSerializer(data=request.data)
        if photo.is_valid():
            print(f'Heyyyy photo {request.data}')
            if product.photo:   
                remove_file_from_aws_3(product.photo)
            print(f'photo {request.data["photo"].name}')
            filename_parts = request.data["photo"].name.split('.')
            filename =f'{product.id}-'+ filename_parts[0]+'.'+filename_parts[1]
            # request.data["photo"].name = filename
            temp_image = Image.open(request.data['photo'])
            output = BytesIO()
            temp_image.resize((300, 300))
            temp_image.save(output, format='JPEG', quality=80)
            print(f'TEMP IMAGE {temp_image}')
            product.photo = InMemoryUploadedFile(output, 'ImageField', filename, 'image/jpeg',  sys.getsizeof(output), None)
            product.save()
            serializer = ProductDetailSerializer(product)
            print('HEYY okey')
            return Response(status=201,data=serializer.data)


"""Menu views"""
class MenuView(viewsets.ReadOnlyModelViewSet):

    serializer_class = MenuSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MenuFilter

    def get_queryset(self,):
        menu = Menu.objects.all()
        return menu


class MenuUpdateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = MenuUpdateSerializer
    queryset = Menu.objects.all()


class MenuDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class MenuCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = MenuCreateSerializer

    @action(detail=True, methods=['post'])
    def create(self, request, pk=None):
        print(request.data)
        menu = MenuCreateSerializer(data=request.data)
        if menu.is_valid():
            place = Place.objects.get(id=menu.data['place'])
            new_menu = Menu.objects.create(
                place = place,
                name = menu.data['name'],
                is_current_menu = menu.data['is_current_menu'],
            )
            menu_list = Menu.objects.filter(place = menu.data['place'])
            serializer = MenuSerializer(menu_list, many=True)
            return Response(status=201, data=serializer.data)
        else:
            return Response(status=403,data='NotValidError')

"""Menu position views""" 
class MenuPositionView(viewsets.ReadOnlyModelViewSet):

    serializer_class = MenuPositionSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MenuPositionFilter

    def get_queryset(self):
        menu_position = MenuPosition.objects.all()
        return menu_position


class MenuPositionDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = MenuPosition.objects.all()
    serializer_class = MenuPositionCreateSerializer


class MenuPositionCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = MenuPositionCreateSerializer

    @action(detail=True, methods=['post'])
    def create(self,request,pk=None):
        menu_position = MenuPositionCreateSerializer(data=request.data)
        if menu_position.is_valid():
            new_menu_position = MenuPosition.objects.create(
                                    name = menu_position.data['name'],
                                    volume = menu_position.data['volume'],
                                    sale_price = menu_position.data['sale_price'],
                                    menu = Menu.objects.get(id=menu_position.data['menu']),
                                    product = Product.objects.get(id=menu_position.data['product']),
                                    )
            print(new_menu_position)
            data = MenuPositionSerializer(new_menu_position)
            return Response(status=201, data=data.data)
        else:
            return Response(status=400, data='ErrorNotValid')




"""Invoice views""" 
class InvoiceView(viewsets.ReadOnlyModelViewSet):
    serializer_class = InvoiceSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = InvoiceFilter

    def get_queryset(self):
        invoice = Invoice.objects.all().order_by('-date')
        return invoice  

    
    @action(detail=True, methods=['get','html_view'])
    def html_view(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        orders = Order.objects.filter(invoice = pk).order_by('date')
        return render(request, 'invoice.html', {'invoice': invoice, 'orders':orders})


    @action(detail=True, methods=['get','create_pdf'])
    def create_pdf(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        users = invoice.place.users.filter(place=invoice.place)
        print(f' hello im user in create_pfd invoice {request.user}')
        if request.user in users or request.user.is_staff:
            print('HAKUNA MATATA')
            print(f'USERS create pdf {invoice.place.users.filter(place=invoice.place)}')

            orders = Order.objects.filter(invoice = pk).order_by('date')
            context = {'invoice': invoice, 'orders':orders}
            place_name = invoice.get_place_name()
            date = invoice.date
            print(f'place name: {place_name}, date: {date}')
            return PdfCreator.render_pdf_invoice(
                request=request, 
                context=context, 
                place_name=place_name, 
                date=date,
                )
        else:
            return Response(status=403,data='NoUser')


class InvoiceDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


class InvoiceUpdateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = InvoiceUpdateSerializer

    @action(detail=True, methods=['update'])
    def update(self, request, pk=None):
        invoice_update_data = InvoiceUpdateSerializer(data=request.data)
        invoice = Invoice.objects.get(id = pk)
        if invoice_update_data.is_valid():
            if invoice_update_data.data['is_vat']:
                total_amount = invoice.amount * Rate.VAT_RATE
                invoice.total_amount=total_amount
            else:
                total_amount = invoice.amount
                invoice.total_amount=total_amount
            invoice.is_vat=invoice_update_data.data['is_vat']
            invoice.state=invoice_update_data.data['state']
            invoice.save()
        return Response(status=201)

    @action(detail=True, methods=['post','invoiced'])
    def invoiced(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        orders = Order.objects.filter(invoice=pk)
        for order in orders:
            if order.state != 'Delivered' and order.state != 'Paid':
                return Response(status=400, data='OrderStateError')
        invoice.invoiced()
        invoice.save()
        data = InvoiceSerializer(invoice)
        return Response(status=201, data=data.data)


    @action(detail=True, methods=['post','paid'])
    def paid(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        orders = Order.objects.filter(invoice=pk)
        for order in orders:
            if order.state == 'Delivered':
                order.paid()
                order.save()
        invoice.paid()
        invoice.save()
        data = InvoiceSerializer(invoice)
        return Response(status=201, data=data.data)


    @action(detail=True, methods=['post','add_vat'])
    def add_vat(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        if invoice.is_vat:
            data = InvoiceSerializer(invoice)
            return Response(status=201,data=data.data)
        else:
            amount = invoice.amount
            total_amount = amount * Rate.VAT_RATE
            invoice.total_amount = total_amount
            invoice.is_vat = True
            invoice.save()
            data = InvoiceSerializer(invoice)
            return Response(status=201, data=data.data)

    @action(detail=True, methods=['post','remove_vat'])
    def remove_vat(self, request, pk=None):
        invoice = Invoice.objects.get(id=pk)
        if invoice.is_vat:
            invoice.total_amount = invoice.amount
            invoice.is_vat = False
            invoice.save()
            data = InvoiceSerializer(invoice)
            return Response(status=201, data=data.data)
        else:
            data = InvoiceSerializer(invoice)
            return Response(status=201, data=data.data)





class InvoiceCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = InvoiceCreateSerializer

    @action(detail=True, methods=['create'])
    def  create(self, request):
        invoice_create_data = InvoiceCreateSerializer(data=request.data)

        if invoice_create_data.is_valid():

            data_for_new_invioce = invoice_create_data.data
            print(data_for_new_invioce['place'])
            orders = Order.objects.filter(
                date__gte = data_for_new_invioce['from_date'],
                date__lte = data_for_new_invioce['until_date'],
                place = data_for_new_invioce['place'],
                invoice = None 
                ).order_by('date')
            print(orders)

            if orders:
                amount = Decimal(f'{orders.aggregate(Sum("total_price"))["total_price__sum"]}')
                
                if data_for_new_invioce['is_vat']:
                    total_amount = amount * Rate.VAT_RATE
                else:
                    total_amount = amount
                place=Place.objects.get(id=data_for_new_invioce['place'])
                new_invoice = Invoice.objects.create(
                    place=place,
                    date=data_for_new_invioce['date'],
                    amount=amount.quantize(Decimal("0.01"), ROUND_HALF_UP),
                    is_vat=data_for_new_invioce['is_vat'],
                    total_amount=total_amount.quantize(Decimal('0.01'), ROUND_HALF_UP)
                )   
                new_invoice.save()
                orders.update(invoice=new_invoice)
                invoices = Invoice.objects.filter(place=place)
                serializer = InvoiceSerializer(invoices, many=True)
                return Response(status=201,data=serializer.data)
            else:
                return Response(status=404,data='NotOrdersInRange')
    



"""Customer statements views"""
class CustomerStatementCreateView(viewsets.ModelViewSet):
    # permission_classes = [CraftShakeCounterPermissions]
    serializer_class = CustomerStatementCreateSerializer

    @action(detail=True, methods=['create'])
    def  create(self, request):
        statement_data = CustomerStatementCreateSerializer(data=request.data)

        if statement_data.is_valid():

            new_statement_data = statement_data.data
            orders = Order.objects.filter(
                date__gte = new_statement_data['from_date'],
                date__lte = new_statement_data['until_date'],
                place = new_statement_data['place'], 
                ).order_by('date')
            print(orders)
            amount = Decimal(f'{orders.aggregate(Sum("total_price"))["total_price__sum"]}')            
            new_statement = CustomerStatement.objects.create(
                place=Place.objects.get(id=new_statement_data['place']),
                date=new_statement_data['date'],
                amount=amount.quantize(Decimal("0.01"), ROUND_HALF_UP),
                total_amount=amount.quantize(Decimal("0.01"), ROUND_HALF_UP),
            )   
            new_statement.save()
            orders.update(customer_statement=new_statement)
            serializer = CustomerStatementSerializer(new_statement)
            return Response(serializer.data)

class CustomerStatementView(viewsets.ReadOnlyModelViewSet):
    serializer_class = CustomerStatement
    filter_backends = (DjangoFilterBackend,)

    def get_queryset(self):
        statement = CustomerStatement.objects.all() 
        return statement  


    @action(detail=True, methods=['get','create_pdf'])
    def create_pdf(self, request, pk=None):
        statement = CustomerStatement.objects.get(id=pk)
        users = statement.place.users.filter(place=statement.place)
        print(f' hello im user in create_pdf{request.user}')
        if request.user in users or request.user.is_staff:

            orders = Order.objects.filter(customer_statement = pk).order_by('date')
            context = {'statement': statement, 'orders':orders}
            place_name = statement.get_place_name()
            date = statement.date
            print(f'place name: {place_name}, date: {date}')
            
            return PdfCreator.render_pdf_customer_statement(
                request=request, 
                context=context, 
                place_name=place_name, 
                date=date,
                )
        else:
            return Response(status=403)


"""Order views"""
class OrderView(viewsets.ModelViewSet):

    serializer_class = OrderViewSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter
    def get_queryset(self):
        order = Order.objects.all().order_by('-date')
        return order

    @action(detail=True, methods=['post','destroy'])
    def destroy(self, request,pk=None, *args, **kwargs):
        order = Order.objects.get(id=pk)
        if order.open_to_customer or request.user.is_staff:
            if order.photo:
                print('order have photo')
                remove_file_from_aws_3(order.photo)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response(status=403)


class OrderStatesView(viewsets.ModelViewSet):
    serializer_class = OrderViewSerializer
    permission_classes = [CraftShakeCounterPermissions]

    @action(detail=True, methods=['post','approve'])
    def approve(self, request, pk=None):
        order = Order.objects.get(id=pk)
        order.open_to_customer = False
        order.approve()
        order.save()
        data = OrderViewSerializer(order)
        return Response(status=201, data=data.data)

    @action(detail=True, methods=['post','delivered'])
    def delivered(self, request, pk=None):
        order = Order.objects.get(id=pk)
        photo = OrderUploadPhotoSerializer(data=request.data)
        if photo.is_valid and request.data['photo']:
            filename_parts = request.data["photo"].name.split('.')
            filename = f'{order.id}-'+ f'{order.place}-'+f'{order.date}'+'.'+filename_parts[1]
            request.data["photo"].name = filename
            print(f'requestPhoto {request.data["photo"]}')
            temp_image = Image.open(request.data['photo'])
            output = BytesIO()
            temp_image.resize((200, 200))
            temp_image.save(output, format='JPEG', quality=80)
            print(f'TEMP IMAGE {temp_image}')
            order.photo = InMemoryUploadedFile(output, 'ImageField', filename, 'image/jpeg',  sys.getsizeof(output), None)
            print(f'ORDER PHOTO {order.photo}')
            order.delivered()
            order.save()
            data = OrderViewSerializer(order)
            return Response(status=201,data=data.data)
        else:
            print('no photo')
            return Response(status=403)
        
    @action(detail=True, methods=['post','paid'])
    def paid(self, request, pk=None):
        order = Order.objects.get(id=pk)
        order.paid()
        order.save()
        data = OrderViewSerializer(order)
        return Response(status=201,data=data.data)




class OrderCreateView(viewsets.ModelViewSet):
    """Dont forget to close the order"""
    serializer_class = OrderAndItemCreateSerializer
    # permission_classes = [CraftShakeCustomerPermissions]
    
    @action(detail=True, methods=['post', 'create_new'])
    def create_new(self, request, pk=None):
        request_data = OrderAndItemCreateSerializer(data=request.data)
        print(request.data)
        
        if request_data.is_valid() and request.data["order_item_list"]:
            order_item_list = request.data["order_item_list"]
            for item in order_item_list:
                item_serializer = OrderItemCreateSerializer(data=item)
                if item_serializer.is_valid() :
                    item['position'] = MenuPosition.objects.get(id=item['position'])
                    if not item['position'].get_is_current_menu():
                        return Response(status=400, data='ErrorNotCurrentMenu')
                else:
                    return Response(status=400,data='ErrorOrderItemNotValid')
            place = Place.objects.get(id=request.data['order'].pop('place'))
            order = Order.objects.create(place=place, **request.data['order'])
            for item in order_item_list:
                volume = OrderItemVolume.objects.get(id=item['volume'])
                OrderItem.objects.create(
                    order=order,
                    name=item['name'],
                    position=item['position'],
                    quantity=item['quantity'],
                    volume=volume,
                    item_price=item['item_price']
                )
            data = OrderViewSerializer(order)
            telegram_send_massege_new_order(order,order_item_list)
            return  Response(status=201, data=data.data) 
        else:
            return Response(status=400, data='ErrorOrderFormNotValid')


class OrderUpdateView(viewsets.ModelViewSet):

    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = OrderUpdateSerializer

    @action(detail=True, methods=['post','update'])
    def update(self, request, pk=None, *args, **kwargs):
        order = Order.objects.get(id=pk)
        if order.open_to_customer or request.user.is_staff:
            order_items_in_order = list(OrderItem.objects.filter(order=order.id).values_list('id', flat=True))
            old_order_items_in_request = []
            new_order_items_in_request =[]
            delete_items = []
            for item in request.data:
                item_serialaizer = OrderItemCreateSerializer(data=item)
                if item_serialaizer.is_valid():
                    key = 'id'
                    if key in item:
                        old_order_items_in_request.append(item['id'])
                    else:
                        new_order_items_in_request.append(item)         
                else:
                    return Response(status=400)

            for item in new_order_items_in_request:
                item['position'] = MenuPosition.objects.get(id=item['position'])
                if not item['position'].get_is_current_menu():
                    return Response(status=400, data='ErrorNotCurrentMenu')      

            delete_items = list(set(order_items_in_order)-set(old_order_items_in_request))
            message_delete = []
            for item in delete_items:
                item = OrderItem.objects.get(id=item)
                message_delete.append(item)
                item.delete()

            for item in new_order_items_in_request:
                volume = OrderItemVolume.objects.get(id=item['volume'])
                OrderItem.objects.create(
                        order=order,
                        name=item['name'],
                        position=item['position'],
                        quantity=item['quantity'],
                        volume=volume,
                        item_price=item['item_price']
                    )
            
            new_order_items = OrderItem.objects.filter(order=order.id)
            if new_order_items.exists():
                total_price = Decimal(f'{new_order_items.aggregate(Sum("item_price"))["item_price__sum"]}')
                
                order.total_price = total_price.quantize(Decimal('0.01'),ROUND_HALF_UP)
            else:
                order.total_price = Decimal('0.00')
            
            order.save()
            telegram_send_massege_update_order(order,new_order_items_in_request,message_delete)
            return Response(status=201)
        else:
            return Response(status=403) 

    def get_queryset(self):
        order = Order.objects.all() 
        return order



"""Order item volume views"""
class OrderItemVolumeView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = OrderItemVolumeSerializer

    def get_queryset(self):
        order_item_volume = OrderItemVolume.objects.all()
        return order_item_volume


"""Order item views"""
class OrderItemView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = OrderItemVeiwSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderItemFilter


    def get_queryset(self):
        order_item = OrderItem.objects.all()
        return order_item


class OrderItemDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = OrderItemVeiwSerializer
    @action(detail=True, methods=['post','destroy'])
    def destroy(self, request, pk=None, *args, **kwargs):
        order_item =  OrderItem.objects.get(id=pk)
        if order_item.order.open_to_customer or request.user.is_staff:
            print('Hello Im destryoer')
            order_item.delete()
            return Response(status=201)
        else:
            return Response(status=401)   
    

class OrderItemCreateView(viewsets.ModelViewSet):   
    serializer_class = OrderItemCreateSerializer
    permission_classes = [CraftShakeCustomerPermissions]

    @action(detail=True,methods=['create'])
    def create(self,request, pk=None):
        order_item = OrderItemCreateSerializer(data=request.data)
        # print(f'order_intem_create_request {request.data}')
        if order_item.is_valid():
            print(f"rrrr {request.data}")
            order = Order.objects.get(id=request.data['order'])
            if order.open_to_customer or request.user.is_staff:
                # print(f'order {order.id} open')
                menu_position = MenuPosition.objects.get(
                    id = order_item.data['position']
                )
                print(f'Hei you {menu_position.get_is_current_menu()}')
                if menu_position.get_is_current_menu() == False:
                    return Response(status=400, data='ErorrNotCurrentMenu')

                # print(f'Hey {menu_position.name}')
                volume = OrderItemVolume.objects.get(
                    id=order_item.data['volume']
                )
                # print(f"volume {volume.value}")
                item_amout_volume = Decimal(order_item.data['quantity'])*Decimal(volume.value)
                # print(f'Volume {item_amout_volume}')
                item_price = Decimal(item_amout_volume) / Decimal(menu_position.volume) * Decimal(menu_position.sale_price)
                item_price = item_price.quantize(Decimal('0.01'), ROUND_HALF_UP)
                # print(f'item price  {item_price}')
                if str(item_price) == order_item.data['item_price']:
                    print('everything ok')
                new_order_item = OrderItem.objects.create(
                    name=menu_position.name,
                    quantity=order_item.data['quantity'],
                    item_price = item_price,
                    order=Order.objects.get(id=request.data['order']),
                    position=menu_position,
                    volume = volume,
                )
                new_order_item.save()
                return Response(status=201)
            else:
                return Response(status=403)