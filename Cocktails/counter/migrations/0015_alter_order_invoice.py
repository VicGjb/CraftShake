# Generated by Django 4.0.4 on 2022-09-14 13:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('counter', '0014_alter_menuposition_menu_alter_orderitem_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='invoice',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='counter.invoice', verbose_name='Invoice'),
        ),
    ]