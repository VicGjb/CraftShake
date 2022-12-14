# Generated by Django 4.0.4 on 2022-05-31 12:58

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('counter', '0009_remove_orderitem_position_orderitem_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date',
            field=models.DateField(default=datetime.date(2022, 5, 31), verbose_name='Date'),
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date(2022, 5, 31), verbose_name='Date')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Amount without VAT')),
                ('is_vat', models.BooleanField(default=False, verbose_name='Add VAT')),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Total amount')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='counter.customer', verbose_name='Customer')),
            ],
            options={
                'verbose_name': 'Invoice',
                'verbose_name_plural': 'Invoices',
            },
        ),
        migrations.AddField(
            model_name='order',
            name='invoice',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='order_in_invoice', to='counter.invoice', verbose_name='Invoice'),
            preserve_default=False,
        ),
    ]
