# Generated by Django 4.0.4 on 2022-09-14 14:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('counter', '0016_alter_order_invoice'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='name',
            field=models.CharField(default='unknow name', max_length=50, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='position',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='counter.menuposition', verbose_name='Position'),
        ),
    ]
