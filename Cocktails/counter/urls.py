from django.db import router
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import(
    
    PlaceView,
    PlaceDeleteView,
    PlaceCreateView,
    PlaceUpdateView,
    ManagerOfPlaceView,
    ManagerOfPlaceCreateView,
    ProductView,
    ProductDeleteView,
    ProductCreateView,
    ProductUpdateView,
    ProductUploadPhotoView,
    MenuView,   
    MenuCreateView,
    MenuDeleteView,
    MenuUpdateView,
    MenuPositionView,
    MenuPositionCreateView,
    MenuPositionDeleteView,
    InvoiceView,
    InvoiceCreateView,
    InvoiceDeleteView,
    InvoiceUpdateView,
    OrderView,
    OrderCreateView,
    OrderDeleteView,
    OrderUpdateView,
    OrderItemView,
    OrderItemCreateView,
    OrderItemDeleteView,

    BlacklistTokenUpdateView
)


urlpatterns = format_suffix_patterns(
    [
        path('places/', PlaceView.as_view({'get':'list'})),
        path('place/<int:pk>', PlaceView.as_view({'get':'retrieve'})),
        path('place/update/<int:pk>', PlaceUpdateView.as_view({'post':'update'})),
        path('place/delete/<int:pk>', PlaceDeleteView.as_view({'post':'destroy'})),
        path('place/create/', PlaceCreateView.as_view({'post':'create'})),

        path('manager/', ManagerOfPlaceView.as_view({'get':'list'})),
        path('manager/<int:pk>', ManagerOfPlaceView.as_view({'get':'retrieve'})),
        path('manager/create/', ManagerOfPlaceCreateView.as_view({'post':'create'})),
        path('manager/delete/<int:pk>', ManagerOfPlaceView.as_view({'post':'destroy'})),

        path('product/', ProductView.as_view({'get':'list'})),
        path('product/<int:pk>', ProductView.as_view({'get':'retrieve'})),
        path('product/update/<int:pk>',ProductUpdateView.as_view({'post':'update'})),
        path('product/<int:pk>/delete', ProductDeleteView.as_view({'post':'destroy'})),
        path('product/upload-photo/<int:pk>', ProductUploadPhotoView.as_view({'post':'update'})),
        path('product/create/', ProductCreateView.as_view({'post':'create'})),

        path('menu/', MenuView.as_view({'get':'list'})),
        path('menu/?place=<int:pk>/',MenuView.as_view({'get':'list'})),
        path('menu/<int:pk>/', MenuView.as_view({'get':'retrieve'})),
        path('menu/update/<int:pk>',MenuUpdateView.as_view({'post':'update'})),
        path('menu/delete/<int:pk>/', MenuDeleteView.as_view({'post':'destroy'})),
        path('menu/create/', MenuCreateView.as_view({'post':'create'})),

        path('menu-position/', MenuPositionView.as_view({'get':'list'})),
        path('menu-position/?menu=<int:pk>/', MenuPositionView.as_view({'get':'list'})),
        path('menu-position/<int:pk>/', MenuPositionView.as_view({'get':'retrieve'})),
        path('menu-position/delete/<int:pk>/', MenuPositionDeleteView.as_view({'post':'destroy'})),
        path('menu-position/create/', MenuPositionCreateView.as_view({'post':'create'})),
        
        path('invoice/', InvoiceView.as_view({'get':'list'})),
        path('invoice/<int:pk>/', InvoiceView.as_view({'get':'retrieve'})),
        path('invoice/create/', InvoiceCreateView.as_view({'post':'create'})),
        path('invoice/delete/<int:pk>/', InvoiceDeleteView.as_view({'post':'destroy'})),
        path('invoice/create_pdf/<int:pk>/', InvoiceView.as_view({'get':'create_pdf'})),
        path('invoice/update/<int:pk>/', InvoiceUpdateView.as_view({'post':'update'})),
        path('invoice/html/<int:pk>/', InvoiceView.as_view({'get':'html_view'})),

        path('order/', OrderView.as_view({'get':'list'})),
        path('order/<int:pk>/', OrderView.as_view({'get':'retrieve'})),
        path('order/update/<int:pk>/', OrderUpdateView.as_view({'post':'update'})),
        path('order/create/', OrderCreateView.as_view({'post':'create'})),
        path('order/<int:pk>/delete/', OrderDeleteView.as_view({'post':'destroy'})),

        path('order-item/', OrderItemView.as_view({'get':'list'})),
        path('order-item/<int:pk>/', OrderItemView.as_view({'get':'retrieve'})),
        path('order-item/create/', OrderItemCreateView.as_view({'post':'create'})),
        path('order-item/<int:pk>/delete/', OrderItemDeleteView.as_view({'post':'destroy'})),

        path('logout/blacklist/',BlacklistTokenUpdateView.as_view(), name='blacklist')
    ]
) 