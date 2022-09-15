from sqlite3 import Date
from unicodedata import name
from django.db import models
from django.db.models.deletion import CASCADE, SET_NULL
from django.db.models.fields.related import ManyToManyField
from django.utils import timezone

class Place(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Place'
        verbose_name_plural = 'Places'


    name = models.CharField(
        max_length=50, 
        verbose_name='Name'
        )
    address = models.CharField(
        max_length=50, 
        verbose_name='Address', 
        blank=True
        )
    phone = models.CharField(
        max_length=14, 
        verbose_name='Phone', 
        blank=True
        )
    email = models.CharField(
        max_length=50, 
        verbose_name='E-mail',
        blank=True
        )
    is_current_place = models.BooleanField(
        default=True,
        verbose_name='Current place'
    )

    def __str__ (self)  -> str:
        return self.name


class ManagerOfPlace(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Manager'
        verbose_name_plural = 'Managers'
    

    place = models.ForeignKey(
        Place,
        on_delete=CASCADE
    )
    name = models.CharField(
        max_length=25,
        verbose_name='Name'
    )
    phone =  models.CharField(
        max_length=20,
        verbose_name='Phone number'
    )
    description = models.TextField(
        max_length=500,
        verbose_name='About',
        blank=True
    )


    def __str__ (self)  -> str:
        return f'{self.name} manager of {self.place}'


class Product(models.Model):
    """Comment"""
    class Mets:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'


    name = models.CharField(
        max_length=120,
        verbose_name= 'Name'
    )
    cost_price = models.DecimalField(
        verbose_name='Cost price',
        max_digits=7,
        decimal_places=2,
    )
    discription = models.TextField(
        max_length=500,
        verbose_name='About',
        blank=True
    )
    sale_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Sale price'
    )
    photo = models.ImageField(
        verbose_name='Photo',
        upload_to='Product_photo',
        blank=True,
        default = '../media/cocktailDefault.jpeg'
    )

    def __str__ (self)  -> str:
        return self.name

    def set_price_of_poduct(self, price:float):
        self.sale_price


class Menu(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Menu'
        verbose_name_plural = 'Menus'


    name = models.CharField(
        max_length=50,
        verbose_name='Name'
    )
    place = models.ForeignKey(
        Place, 
        on_delete=SET_NULL,
        null=True
    )
    is_current_menu = models.BooleanField(
        default=True,
        verbose_name='Current menu'
    )

    def __str__ (self)  -> str:
        return f'{self.name} of {self.place}'

    def get_place(self) -> str:
        return self.place_set.name()
        
    def get_product(self) -> list:
        return self.product_set.all()


class MenuPosition(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Position for menu'
        verbose_name_plural = 'Positions for menu'

    menu = models.ForeignKey(
        Menu,
        on_delete=CASCADE,
        verbose_name='Menu',
        related_name='position_in_menu',

    )
    product = models.ForeignKey(
        Product,
        on_delete=CASCADE,
        verbose_name='Product',
    )
    name = models.CharField(
        max_length=50,
        verbose_name='Name',
        default=''
    )
    sale_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Sale price',
    )

    def __str__(self) -> str:
        return f'{self.product} in {self.menu}'

    def get_default_price (self) -> float:
        return self.product.sale_price
    
    def get_product_name(self) -> str:
        return self.product.name
    
    def get_photo(self) -> str:
        return f'http://127.0.0.1:8000/media/{self.product.photo}'
    
    def get_discription(self) -> str:
        return self.product.discription


class Invoice(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Invoice'
        verbose_name_plural = 'Invoices'
    

    place = models.ForeignKey(
        Place,
        on_delete=CASCADE,
        verbose_name='Place',
    )
    date = models.DateField(
        verbose_name='Date',
        default=timezone.now
    )
    amount = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        verbose_name='Amount without VAT'
    )
    is_vat = models.BooleanField(
        default=False,
        verbose_name='Add VAT',
    )
    total_amount = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        verbose_name='Total amount'
    )

    def __str__(self) -> str:
        return f'Invoice to {self.place} on {self.date}'

    def get_place_name(self):
        return self.place.name

    
class Order(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
    

    place = models.ForeignKey(
        Place,
        on_delete=CASCADE,
        verbose_name='Place',
        related_name='place_order'
    )
    invoice = models.ForeignKey(
        Invoice,
        on_delete=SET_NULL,
        verbose_name='Invoice',
        related_name='orders',
        blank=True,
        null=True

    )
    date = models.DateField(
        verbose_name='Date',
        default=timezone.now
    )
    total_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Total',
        default = 0
    )
    
    def __str__(self) ->str:
        return f'Order of {self.place} on {self.date}'

    def get_place_name(self):
        return self.place.name



class OrderItem(models.Model):
    """Comment"""
    
    class Meta:
        verbose_name = 'Order item'
        verbose_name_plural = 'Order items'
    

    order = models.ForeignKey(
        Order,
        on_delete=CASCADE,
        verbose_name='Order',
        related_name='order_item',
    )
    name = models.CharField(
        max_length=50, 
        verbose_name='Name',
        default='unknow name',
        blank=True
    )
    position = models.ForeignKey(
        MenuPosition,
        on_delete=SET_NULL,
        verbose_name='Position',
        null=True
    )
    quantity = models.PositiveIntegerField(
        default=1,
        verbose_name='Quantity'
    )
    item_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Amount price'
    )

    def __str__(self) ->str:
        return f'{self.position} in {self.order}'

    def get_name_position(self):
        return self.position.product
    
    