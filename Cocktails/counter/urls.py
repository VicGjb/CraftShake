from django.db import router
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import(
    # PlaceView,
    PlaceDeleteView,
    PlaceCreateView,
    PlaceUpdateView,
    PlaceByNameView,

    ManagerOfPlaceView,
    ManagerOfPlaceCreateView,
    
    ProductView,
    ProductDeleteView,
    ProductCreateView,
    ProductUploadPhotoView,
    ProductByNameView,

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

    CustomerStatementView,
    CustomerStatementCreateView,
    
    OrderView,
    OrderCreateView,
    OrderUpdateView,
    
    OrderItemView,
    OrderItemCreateView,
    OrderItemDeleteView,
    OrderItemVolumeView,


    PlaceAPIDetaileView,
    PlaceAPIListView
)


urlpatterns = format_suffix_patterns(
    [
        # path('places/', PlaceView.as_view({'get':'list'})),
        # path('place/<int:pk>', PlaceView.as_view({'get':'retrieve'})),

        path('places/', PlaceAPIListView.as_view()),
        path('place/<int:pk>', PlaceAPIDetaileView.as_view()),
        path('place/by-name/<str:name>', PlaceByNameView.as_view()),

        path('place/update/<int:pk>', PlaceUpdateView.as_view({'post':'update'})),
        path('place/delete/<int:pk>', PlaceDeleteView.as_view({'post':'destroy'})),
        path('place/create/', PlaceCreateView.as_view({'post':'create'})),

        path('manager/', ManagerOfPlaceView.as_view({'get':'list'})),
        path('manager/<int:pk>', ManagerOfPlaceView.as_view({'get':'retrieve'})),
        path('manager/create/', ManagerOfPlaceCreateView.as_view({'post':'add_manager'})),
        path('manager/update/<int:pk>/', ManagerOfPlaceCreateView.as_view({'post':'update'})),
        path('manager/delete/<int:pk>', ManagerOfPlaceView.as_view({'post':'destroy'})),

        path('product/', ProductView.as_view({'get':'list'})),
        path('product/by-name/<str:name>', ProductByNameView.as_view()),
        path('product/<int:pk>', ProductView.as_view({'get':'retrieve'})),
        path('product/update/<int:pk>',ProductCreateView.as_view({'post':'update'})),
        path('product/<int:pk>/delete', ProductDeleteView.as_view({'post':'destroy'})),
        path('product/upload-photo/<int:pk>', ProductUploadPhotoView.as_view({'post':'update'})),
        path('product/create/', ProductCreateView.as_view({'post':'add_product'})),

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
        path('invoice/<int:pk>/set-invoiced/',InvoiceUpdateView.as_view({'post':'invoiced'})),
        path('invoice/<int:pk>/set-paid/',InvoiceUpdateView.as_view({'post':'paid'})),
        path('invoice/<int:pk>/add_vat/',InvoiceUpdateView.as_view({'post':'add_vat'})),
        path('invoice/<int:pk>/remove_vat/',InvoiceUpdateView.as_view({'post':'remove_vat'})),
        path('invoice/html/<int:pk>/', InvoiceView.as_view({'get':'html_view'})),

        path('order/', OrderView.as_view({'get':'list'})),
        path('order/<int:pk>/', OrderView.as_view({'get':'retrieve'})),
        path('order/update/<int:pk>/', OrderUpdateView.as_view({'post':'update'})),
        path('order/create/', OrderCreateView.as_view({'post':'create_new'})),
        path('order/<int:pk>/delete/', OrderView.as_view({'post':'destroy'})),
        path('order/<int:pk>/set-approve/',OrderView.as_view({'post':'approve'})),
        path('order/<int:pk>/set-delivered/',OrderView.as_view({'post':'delivered'})),
        path('order/<int:pk>/set-paid/',OrderView.as_view({'post':'paid'})),
        # path('order/<int:pk>/upload_photo/',OrderView.as_view({'post':'upload_photo'})),

        path('order-item/', OrderItemView.as_view({'get':'list'})),
        path('order-item/<int:pk>/', OrderItemView.as_view({'get':'retrieve'})),
        path('order-item/create/', OrderItemCreateView.as_view({'post':'create'})),
        path('order-item/<int:pk>/delete/', OrderItemDeleteView.as_view({'post':'destroy'})),
        
        path('order-item-volume/', OrderItemVolumeView.as_view({'get':'list'})),
        path('order-item-volume/<int:pk>/', OrderItemVolumeView.as_view({'get':'retrieve'})),

        path('customer-statement/create/', CustomerStatementCreateView.as_view({'post':'create'})),
        path('customer-statement/create_pdf/<int:pk>', CustomerStatementView.as_view({'get':'create_pdf'})),
    ]
) 