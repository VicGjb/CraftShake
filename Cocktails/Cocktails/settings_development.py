from .settings_common import *
from dotenv import load_dotenv
load_dotenv()

DEBUG = True

ALLOWED_HOSTS = [
    '127.0.0.1',
]


CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8000',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }

#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': os.environ.get('POSTGRES_DB'),
#         'USER': os.environ.get('POSTGRES_USER'),
#         'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
#         'HOST': os.environ.get('POSTGRES_URL'),
#         'PORT': '5432',
#   }
}


