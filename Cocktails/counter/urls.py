from django import views
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from .views import(
    CustomerView,
    CustomerCreateView,
    ManagerOfPlaceView,
    ManagerOfPlaceCreateView,
    ProductView,
    ProductCreateView,
    MenuView,
    MenuCreateView,
    MenuPositionView,
    MenuPositionCreateView,
    InvoiceView,
    InvoiceCreateView,
    OrderView,
    OrderCreateView,
    OrderItemView,
    OrderItemCreateView,

)

urlpatterns = format_suffix_patterns(
    [
        path('customers/', CustomerView.as_view({'get':'list'})),
        path('customer/<int:pk>', CustomerView.as_view({'get':'retrieve'})),
        path('customer/create/', CustomerCreateView.as_view({'post':'create'})),

        path('manager/', ManagerOfPlaceView.as_view({'get':'list'})),
        path('manager/<int:pk>', ManagerOfPlaceView.as_view({'get':'retrieve'})),
        path('manager/create/', ManagerOfPlaceCreateView.as_view({'post':'create'})),

        path('product/', ProductView.as_view({'get':'list'})),
        path('product/<int:pk>', ProductView.as_view({'get':'retrieve'})),
        path('product/create/', ProductCreateView.as_view({'post':'create'})),

        path('menu/', MenuView.as_view({'get':'list'})),
        path('menu/<int:pk>/', MenuView.as_view({'get':'retrieve'})),
        path('menu/create/', MenuCreateView.as_view({'post':'create'})),

        path('menu-position/', MenuPositionView.as_view({'get':'list'})),
        path('menu-position/<int:pk>/', MenuPositionView.as_view({'get':'retrieve'})),
        path('menu-position/create/', MenuPositionCreateView.as_view({'post':'create'})),
        
        path('invoice/', InvoiceView.as_view({'get':'list'})),
        path('invoice/<int:pk>/', InvoiceView.as_view({'get':'retrieve'})),
        path('invoice/create/', InvoiceCreateView.as_view({'post':'create'})),

        path('order/', OrderView.as_view({'get':'list'})),
        path('order/<int:pk>/', OrderView.as_view({'get':'retrieve'})),
        path('order/create/', OrderCreateView.as_view({'post':'create'})),

        path('order-item/', OrderItemView.as_view({'get':'list'})),
        path('order-item/<int:pk>/', OrderItemView.as_view({'get':'retrieve'})),
        path('order-item/create/', OrderItemCreateView.as_view({'post':'create'})),
    ]
)