import os
from .settings_common import *
from dotenv import load_dotenv
load_dotenv()

SECRET_KEY=os.environ.get("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = [
    'craft-shake.com',
    'django.craft-shake.com',
]

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

CSRF_TRUSTED_ORIGINS = (
    'https://craft-shake.com',
    'https://django.craft-shake.com',
)
CSRF_COOKIE_DOMAIN='.craft-shake.com'

CORS_ALLOWED_ORIGINS = [
    'https://craft-shake.com',
    'https://django.craft-shake.com',
]

DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': os.environ.get('POSTGRES_DB'),
#         'USER': os.environ.get('POSTGRES_USER'),
#         'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
#         'HOST': os.environ.get('POSTGRES_URL'),
#         'PORT': '5432',
#   }
  'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test',
        'USER': 'admin',
        'PASSWORD': 'test',
        'HOST': 'static.95.158.90.157.clients.your-server.de',
        'PORT': '5433',
  }
}