from dotenv import load_dotenv
import os
import logging
from pathlib import Path

# Load environment variables
load_dotenv()

# Logging config (log to console)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-override-this-in-production')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Allowed hosts
ALLOWED_HOSTS = list(filter(None, [
    "localhost",
    "127.0.0.1",
    os.environ.get('BACKEND_HOST'),
    os.environ.get('AWS_EB_HOST'),
    os.environ.get('AWS_EB_HTTPS_DOM_ONE'),
    os.environ.get('AWS_EB_HTTPS_DOM_TWO'),
]))

# Log allowed hosts to verify inside container
logger.info(f"🚀 ALLOWED_HOSTS = {ALLOWED_HOSTS}")

CSRF_TRUSTED_ORIGINS = list(filter(None, [
    f"http://localhost:{os.environ.get('BACKEND_PORT')}" if os.environ.get('BACKEND_PORT') else None,
    f"http://{os.environ.get('AWS_EB_HOST')}" if os.environ.get('AWS_EB_HOST') else None,
    f"https://{os.environ.get('AWS_EB_HOST')}" if os.environ.get('AWS_EB_HOST') else None,
    f"https://{os.environ.get('AWS_EB_HTTPS_DOM_ONE')}" if os.environ.get('AWS_EB_HTTPS_DOM_ONE') else None,
    f"https://{os.environ.get('AWS_EB_HTTPS_DOM_TWO')}" if os.environ.get('AWS_EB_HTTPS_DOM_TWO') else None,
]))

# CORS settings
CORS_ALLOWED_ORIGINS = list(filter(None, [
    "http://localhost:3000",
    os.environ.get('VERCEL_HOST'),
]))

# Application definition
INSTALLED_APPS = [
    'StockAPICRUD.apps.StockapicrudConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'ebhealthcheck.apps.EBHealthCheckConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'StockAPI.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'StockAPI.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MARIADB_DATABASE'),
        'USER': os.environ.get('MARIADB_USER'),
        'PASSWORD': os.environ.get('MARIADB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = 'static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Needed for collectstatic in prod

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# DRF Configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'firebase.firebase_auth.FirebaseAuthentication',
        'nonfirebase.internal_auth.InternalAPIKeyAuthentication',
    )
}
