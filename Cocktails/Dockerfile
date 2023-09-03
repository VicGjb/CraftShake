FROM python:3.10.9

WORKDIR /project

# RUN pip install django
# RUN pip install Pillow
# RUN pip install djangorestframework
# RUN pip install django-filter
# RUN pip install drf-yasg
# RUN pip install reportlab

# RUN pip install django_compressor
# RUN pip install django-libsass

# RUN pip install xhtml2pdf

# RUN pip install pdfkit 

# RUN pip install djoser

# RUN pip install djangorestframework_simplejwt

# RUN pip install django-storages
# RUN pip install boto3

# # RUN pip install -U aiogram
# RUN pip install pytelegrambotapi

# RUN pip install django-fsm 
# RUN pip install django-allauth
# RUN pip install dj-rest-auth

# RUN pip install django-cors-headers

# RUN pip install psycopg2-binary
# # RUN pip install psycopg2
# RUN pip install python-dotenv

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . /project/
ENTRYPOINT ["python", "/project/manage.py", "runserver", "0.0.0.0:8000","--settings=Cocktails.settings_production"]

# FROM python:3.10.2
# COPY ./requirements.txt /root/requirements.txt
# RUN pip install --upgrade pip && \
#     pip install -r /root/requirements.txt
# WORKDIR /root/docker
# COPY . /root/docker
# CMD ["python", "src/bot.py"]