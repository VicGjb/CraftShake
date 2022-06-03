from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ManyToManyField
from django.utils import timezone


class Customer(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'


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
    is_current_customer = models.BooleanField(
        default=True,
        verbose_name='Current customer'
    )

    def __str__ (self)  -> str:
        return self.name


class ManagerOfPlace(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Manager'
        verbose_name_plural = 'Managers'
    

    place = models.ForeignKey(
        Customer,
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
        'Photo',
        upload_to='Product_photo',
        blank=True
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
    customer = models.ForeignKey(
        Customer, 
        on_delete=CASCADE
    )
    is_current_menu = models.BooleanField(
        default=True,
        verbose_name='Current menu'
    )

    def __str__ (self)  -> str:
        return f'{self.name} of {self.customer}'

    def get_customer(self) -> str:
        return self.customer_set.name()
        
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
        blank=True
    )
    product = models.ForeignKey(
        Product,
        on_delete=CASCADE,
        verbose_name='Product'
    )
    sale_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Sale price',
    )

    def __str__(self) -> str:
        return f'{self.product} in {self.menu}'

    def get_default_price (self) ->float:
        return self.product.sale_price
    

class Invoice(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Invoice'
        verbose_name_plural = 'Invoices'
    

    customer = models.ForeignKey(
        Customer,
        on_delete=CASCADE,
        verbose_name='Customer'
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
        verbose_name='Add VAT'
    )
    total_amount = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        verbose_name='Total amount'
    )

    def __str__(self) -> str:
        return f'Invoice to {self.customer} on {self.date}'

   
class Order(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'
    

    customer = models.ForeignKey(
        Customer,
        on_delete=CASCADE,
        verbose_name='Customer',
        related_name='customer_order'
    )
    invoice = models.ForeignKey(
        Invoice,
        on_delete=CASCADE,
        verbose_name='Invoice',
        related_name='order_in_invoice',
        blank=True,
        null=True,
    )
    menu = models.ForeignKey(
        Menu,
        on_delete=CASCADE,
        verbose_name='Menu'
    )
    date = models.DateField(
        verbose_name='Date',
        default=timezone.now
    )
    total_price = models.DecimalField(
        max_digits=7,
        decimal_places=2,
        verbose_name='Total'
    )
    

    def __str__(self) ->str:
        return f'Order of {self.customer} on {self.date}'


class OrderItem(models.Model):
    """Comment"""
    class Meta:
        verbose_name = 'Order item'
        verbose_name_plural = 'Order items'
    

    order = models.ForeignKey(
        Order,
        on_delete=CASCADE,
        verbose_name='Order'
    )
    position = models.ForeignKey(
        MenuPosition,
        on_delete=CASCADE,
        verbose_name='Position'
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
    
    def calculate_amount_price(self):
        self.item_price = self.quantity * self.position.sale_price 
        return self.item_price

