# Generated by Django 4.0.4 on 2022-05-25 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('counter', '0007_alter_product_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total_price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7, verbose_name='Total'),
            preserve_default=False,
        ),
    ]
