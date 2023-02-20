from django.contrib.auth.models import UserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE, SET_NULL
from django.utils import timezone
from datetime import timedelta
from counter.models import (
    Place
)

class CustomUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
class ReferralCode(models.Model):
    """"""
    COUNTER = 'counter'
    CUSTOMER = 'customer'
    USER_ROLES = (
        (COUNTER, 'Counter'),
        (CUSTOMER,'Customer'),
        )
    code = models.CharField(
        max_length=128,
        verbose_name='Referral code',
    )
    place = models.ForeignKey(
        Place,
        on_delete=SET_NULL,
        related_name='referral_code',
        blank=True,
        null=True,
    )
    role = models.CharField(
        max_length=20,
        choices=USER_ROLES,
        default=CUSTOMER,
        blank=True,
        null=True,
    )
    expiration_date = models.DateTimeField(
        verbose_name='Expiration date',
        default=timezone.now() + timedelta(hours=10)
    )
    current = models.BooleanField(
        verbose_name='Is current code',
        default=True
    )

class CustomUser(AbstractUser):
    objects = CustomUserManager()  
    COUNTER = 'counter'
    CUSTOMER = 'customer'
    USER_ROLES = (
        (COUNTER, 'Counter'),
        (CUSTOMER,'Customer'),
        )
     
    username = models.CharField(
        max_length=150, 
        unique=True, 
        blank=True, 
        null=True
    )

    email = models.EmailField(
        unique=True,
    )
    role = models.CharField(
        max_length=20,
        choices=USER_ROLES,
        default=CUSTOMER,
        blank=True,
        null=True
    )
    password = models.CharField(db_column='userPassword', max_length=256)

    place = models.ForeignKey(
        Place,
        on_delete=SET_NULL,
        related_name='users',
        blank=True,
        null=True,
    )


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def get_place(self) ->object:
        return
