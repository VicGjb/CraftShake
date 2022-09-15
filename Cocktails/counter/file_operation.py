import io
from decimal import ROUND_05UP, Decimal, ROUND_HALF_UP
from reportlab.lib.pagesizes import  A4
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph, 
    Spacer
    )
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle   
from reportlab.lib import colors
from django.http import FileResponse
from .models import Invoice, Order
from .service import Rate


def get_invoice_pdf(pk):
        invoice = Invoice.objects.get(id=pk)
        orders = Order.objects.filter(invoice=pk)
        buffer = io.BytesIO()
        pdf = SimpleDocTemplate(
            buffer,
            pagesize = A4
            )
        styles = getSampleStyleSheet()
        styles.add(ParagraphStyle(name='Total', alignment=TA_RIGHT, fontSize=18))
        styles.add(ParagraphStyle(name='Right', alignment=TA_RIGHT, fontSize=14))
        styles.add(ParagraphStyle(name='Test', alignment=TA_RIGHT, fontSize=14))
        elems=[]
        
        text_place = f'CraftChake'
        elems.append(Paragraph(text_place, styles["Title"],))
        elems.append(Spacer(1, 5))

        text_place = f'Place: {invoice.place}'
        elems.append(Paragraph(text_place, styles["Right"],))
        elems.append(Spacer(1, 5))

        text_place = f'Date: {invoice.date}'
        elems.append(Paragraph(text_place, styles["Test"],))
        elems.append(Spacer(1, 20))

        for order in orders:
            row_counter = 0     
            data_order = [[f'Date: {order.date}'],['Cocktail','Qty','Price']]
            for item in order.order_item.all():
                row_counter += 1     
                data_order.append([f'{item.position.product}',  f'{item.quantity}', f'{item.item_price}'])
            data_order.append(['','Total for order:',f'{order.total_price}'])
            table_order = Table(data=data_order, colWidths=[150])
            style_test = TableStyle([
                ('ALIGN',(0,0),(-1,-1),'LEFT'),
                ('BOTTOMPADDING', (0,0), (-1,0), 12),
                # ('FONTNAME', (0,0), (-1,0), 'Courier-Bold'),
                ('FONTSIZE', (0,0), (-1,0), 14),
                ('FONTSIZE', (0,row_counter+2),(2,-1), 12),
                ('FONTNAME', (0,row_counter+2),(2,-1), 'Courier-Bold'),
                ('ALIGN',(0,row_counter+2),(2,-1),'CENTER'),
                # ('BOTTOMPADDING', (0,row_counter+2),(2,-1), 12),
            ])
            table_order.setStyle(style_test)
            row = len(data_order)
            for i in range(1, row):
                if i % 2 == 0:
                    back_color = colors.lightblue
                else:
                    back_color = colors.aliceblue
                style_test = TableStyle(
                    [('BACKGROUND', (0,i),(-1,i), back_color)]
                )
                table_order.setStyle(style_test)
            elems.append(table_order)
            elems.append(Spacer(1, 20))
        elems.append(Spacer(1, 12))
        text_amount = f'Amount: {invoice.amount}'
        elems.append(Paragraph(text_amount, styles["Right"],))
        elems.append(Spacer(1, 12))
        if invoice.is_vat:
            vat = invoice.amount * Rate.VAT_RATE - invoice.amount
            text_vat = f'VAT 17%: {vat.quantize(Decimal("0.01"), ROUND_HALF_UP)}'
            elems.append(Paragraph(text_vat, styles["Right"],))
            elems.append(Spacer(1, 12))
        text_total = f'TOTAL {invoice.total_amount}'
        elems.append(Paragraph(text_total, styles["Total"],))
        pdf.build(elems)
        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename='ACAB.pdf') 



# http://127.0.0.1:8000/api/counter/invoice/57/
# http://127.0.0.1:8000/api/counter/invoice/create_pdf/57/
