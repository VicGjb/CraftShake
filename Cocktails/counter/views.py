from decimal import ROUND_05UP, Decimal, ROUND_HALF_UP
from django.shortcuts import render
from django.db.models import Sum
from django.http import HttpResponse, JsonResponse
from .service import ProductFilter, Rate
# import pdfkit
from rest_framework import (
    serializers,
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
    OrderItem
)
from .serializers import(
    PlaceSerializer,
    PlaceDetailSerializer,
    ManagerOfPlaceSerializer,
    ProductSerializer,
    ProductDetailSerializer,
    ProductUpdateSerializer,
    MenuPositionSerializer,
    MenuPositionCreateSerializer,   
    MenuSerializer,
    MenuCreteSerializer,
    MenuUpdateSerializer,
    InvoiceSerializer,
    InvoiceCreateSerializer,
    InvoiceUpdateSerializer,
    CustomerStatementSerializer,
    CustomerStatementCreateSerializer,
    OrderViewSerializer,
    OrderCreateSerializer,
    OrderUpdateSerializer,
    OrderItemVeiwSerializer,
    OrderItemCreateSerializer,
    ProductUploadPhotoSerializer,
)
from .invoice_pdf import PdfCreator
from .permissions import (
    CraftShakeCounterPermissions,
    CraftShakeCustomerPermissions,
)

"""Place views"""
class PlaceAPIListView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Place.objects.all()
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
    # permission_classes = [CraftShakeCustomerPermissions, CraftShakeCounterPermissions]
    serializer_class = PlaceDetailSerializer

    @action(detail=True, method=['post'])
    def add_place(self, request, pk=None):
        place = PlaceDetailSerializer(data=request.data)
        if place.is_valid():
            return Response(status=201)


class PlaceDeleteView(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    # permission_classes = [CraftShakeCounterPermissions]
    queryset = Place.objects.all()
    serializer_class = PlaceDetailSerializer

"""Manager of place views"""
class ManagerOfPlaceView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ManagerFilter

    def get_queryset(self):
        manager = ManagerOfPlace.objects.all()
        return manager
    
    def get_serializer_class(self):                                                                                                                       
        return ManagerOfPlaceSerializer


class ManagerOfPlaceCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = ManagerOfPlaceSerializer
    @action(detail=True, method=['post'])
    def add_manager(self, request, pk=None):
        manager_of_place = ManagerOfPlaceSerializer(data=request.data)
        if manager_of_place.is_valid():
            return Response(status=201)


"""Product views"""
class ProductView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

    def get_queryset(self):
        product = Product.objects.all()
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
        product = PlaceDetailSerializer(data=request.data)
        if product.is_valid():
            return Response(status=201)


class ProductUpdateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = ProductUpdateSerializer
    
    
    def get_queryset(self):
        product = Product.objects.all() 
        return product


class ProductDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer


class ProductUploadPhotoView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = ProductUploadPhotoSerializer
    queryset = Product.objects.all()

    @action (detail=True, method=['post'])
    def upload_photo(self, request, pk=None):
        photo = ProductUploadPhotoSerializer(data=request.data)
        if photo.is_valid():
            return Response(status=201)


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
    serializer_class = MenuCreteSerializer

    @action(detail=True, methods=['post'])
    def add_menu(self, request, pk=None):
        menu = MenuSerializer(data=request.data)
        if menu.is_valid():
            return Response(status=201)


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
    def add_menu_position(self,request,pk=None):
        menu_position = MenuPositionCreateSerializer(data=request.data)
        if menu_position.is_valid():
            return Response(status=201)




"""Invoice views""" 
class InvoiceView(viewsets.ReadOnlyModelViewSet):
    serializer_class = InvoiceSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = InvoiceFilter

    def get_queryset(self):
        invoice = Invoice.objects.all() 
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
        if request.user in users:
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
            return Response(status=403)


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



class InvoiceCreateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    serializer_class = InvoiceCreateSerializer

    @action(detail=True, methods=['create'])
    def  create(self, request):
        invoice_create_data = InvoiceCreateSerializer(data=request.data)

        if invoice_create_data.is_valid():

            data_for_new_invioce = invoice_create_data.data
            orders = Order.objects.filter(
                date__gte = data_for_new_invioce['from_date'],
                date__lte = data_for_new_invioce['until_date'],
                place = data_for_new_invioce['place'],
                invoice = None 
                ).order_by('date')
            print(orders)
            amount = Decimal(f'{orders.aggregate(Sum("total_price"))["total_price__sum"]}')
            
            if data_for_new_invioce['is_vat']:
                total_amount = amount * Rate.VAT_RATE
            else:
                total_amount = amount
            
            new_invoice = Invoice.objects.create(
                place=Place.objects.get(id=data_for_new_invioce['place']),
                date=data_for_new_invioce['date'],
                amount=amount.quantize(Decimal("0.01"), ROUND_HALF_UP),
                is_vat=data_for_new_invioce['is_vat'],
                total_amount=total_amount.quantize(Decimal('0.01'), ROUND_HALF_UP)
            )   
            new_invoice.save()
            orders.update(invoice=new_invoice)
            serializer = InvoiceSerializer(new_invoice)
            return Response(serializer.data)
    



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
        if request.user in users or request.user.is_staff:
            # print(f'HAKUNA MATATA {statement.date_from}') 
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
class OrderView(viewsets.ReadOnlyModelViewSet):

    serializer_class = OrderViewSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = OrderFilter

    def get_queryset(self):
        order = Order.objects.all().order_by('-date')
        return order

class OrderCreateView(viewsets.ModelViewSet):
    """Dont forget to close the order"""
    serializer_class = OrderCreateSerializer
    permission_classes = [CraftShakeCustomerPermissions]
    @action(detail=True, methods=['post', 'create'])
    def add_order(self, request, pk=None):
        order = OrderCreateSerializer(data=request.data)
        if order.is_valid():
            return Response(status=201) 


class OrderDeleteView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCounterPermissions]
    queryset = Order.objects.all()
    serializer_class = OrderViewSerializer
    
    
class OrderUpdateView(viewsets.ModelViewSet):
    permission_classes = [CraftShakeCustomerPermissions]
    serializer_class = OrderUpdateSerializer

    @action(detail=True, methods=['post','update'])
    def update(self, request, pk=None, *args, **kwargs):
        order = Order.objects.get(id=pk)
        print(f'Update reqest{request}')
        if order.open_to_customer or request.user.is_staff:
            order_update_data = OrderUpdateSerializer(data=request.data)
            if order_update_data.is_valid():
                order.total_price = order_update_data.data['total_price']
                order.save()
                return Response(status=201)
        else:
            return Response(status=403)
    
    def get_queryset(self):
        order = Order.objects.all() 
        return order
    

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
            return Response(status=403)   
    

class OrderItemCreateView(viewsets.ModelViewSet):   
    serializer_class = OrderItemCreateSerializer
    permission_classes = [CraftShakeCustomerPermissions]

    @action(detail=True,methods=['create'])
    def create(self,request, pk=None):
        order_item = OrderItemCreateSerializer(data=request.data)
        # print(f'order_intem_create_request {request.data}')
        if order_item.is_valid():
            order = Order.objects.get(id=order_item.data['order'])
            if order.open_to_customer or request.user.is_staff:
                # print(f'order {order.id} open')
                menu_position = MenuPosition.objects.get(
                    id = order_item.data['position']
                )
                # print(f'Hey {menu_position.name}')
                new_order_item = OrderItem.objects.create(
                    name=menu_position.name,
                    quantity=order_item.data['quantity'],
                    item_price=order_item.data['item_price'],
                    order=Order.objects.get(id=order_item.data['order']),
                    position=MenuPosition.objects.get(id=order_item.data['position']),
                )
                new_order_item.save()
                return Response(status=201)
            else:
                return Response(status=403)
