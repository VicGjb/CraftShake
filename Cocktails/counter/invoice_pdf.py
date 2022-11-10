import os
from django.conf import settings
from django.http import HttpResponse
from xhtml2pdf import pisa
from django.template.loader import get_template
from django.contrib.staticfiles import finders

class InvoicePdfCreator():

        def link_callback(uri, rel):
                """
                Convert HTML URIs to absolute system paths so xhtml2pdf can access those
                resources
                """
                result = finders.find(uri)
                if result:
                        if not isinstance(result, (list, tuple)):
                                result = [result]
                        result = list(os.path.realpath(path) for path in result)
                        path=result[0]
                else:
                        sUrl = settings.STATIC_URL        # Typically /static/
                        sRoot = settings.STATIC_ROOT      # Typically /home/userX/project_static/
                        mUrl = settings.MEDIA_URL         # Typically /media/
                        mRoot = settings.MEDIA_ROOT       # Typically /home/userX/project_static/media/

                        if uri.startswith(mUrl):
                                path = os.path.join(mRoot, uri.replace(mUrl, ""))
                        elif uri.startswith(sUrl):
                                path = os.path.join(sRoot, uri.replace(sUrl, ""))
                        else:
                                return uri

                # make sure that file exists
                if not os.path.isfile(path):
                        raise Exception(
                                'media URI must start with %s or %s' % (sUrl, mUrl)
                        )
                return path


        def render_pdf_view(request,context,place_name,date):
                template_path = '../templates/invoice_pdf.html'
                # Create a Django response object, and specify content_type as pdf
                response = HttpResponse(content_type='application/pdf')
                response['Content-Disposition'] = f'attachment; filename=invoice for {place_name} on {date}.pdf"'
                # find the template and render it.
                template = get_template(template_path)
                html = template.render(context)

                # create a pdf
                pisa_status = pisa.CreatePDF(
                html, dest=response, link_callback=InvoicePdfCreator.link_callback)
                # if error then show some funny view
                if pisa_status.err:
                        return HttpResponse('We had some errors <pre>' + html + '</pre>')
                return response