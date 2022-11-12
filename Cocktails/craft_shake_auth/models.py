from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE, SET_NULL
from counter.models import (
    Place
)


class UserRole(models.Model):
    class Meta:
        verbose_name="User role"
        verbose_name_plural = 'User roles'


    name = models.CharField(max_length=20, verbose_name='Name')

    def __str__(self) -> str:
        return self.name



class CustomUser(AbstractUser):
    email = models.EmailField(
        unique=True,
    )
    role = models.ForeignKey(
        UserRole,
        related_name='user',
        verbose_name='role',
        blank=True,
        null=True,
        on_delete=SET_NULL,
    )
    place = models.ForeignKey(
        Place,
        on_delete=SET_NULL,
        related_name='users',
        blank=True,
        null=True,
    )

    def get_place(self) ->object:
        return

    def get_role_name(self) ->str:
        return self.role.name