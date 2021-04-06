"""
Django settings for Aquality2 project.

Generated by 'django-admin startproject' using Django 3.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
from decouple import config
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# False if not in os.environ
DEBUG = config('DEBUG')

# Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ
SECRET_KEY = config('SECRET_KEY')


ALLOWED_HOSTS = ["127.0.0.1","aquality-server.eba-rxqnbumy.eu-west-1.elasticbeanstalk.com","cccmi-aquality.tk"]

# Application definition

INSTALLED_APPS = [    
    'simpleui',
    'aquality.apps.AqualityConfig',
    'aquality_server.apps.AqualityServerConfig',
    'aquality_admin.apps.AqualityAdminConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'rest_framework',
    'storages',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Aquality2.urls'

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

WSGI_APPLICATION = 'Aquality2.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USERNAME'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': config('DATABASE_HOST'),
        'PORT': config('DATABASE_PORT')
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

GOOGLE_MAPS_API_KEY = config('GOOGLEMAP_APIKEY')

AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_LOCATION = 'static'

STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN, AWS_LOCATION)

STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
DEFAULT_FILE_STORAGE = 'Aquality2.storage_backends.MediaStorage'

# STATIC_ROOT = 'static'
# STATIC_URL = '/static/'

MEDIA_ROOT = 'media'
MEDIA_URL = '/media/'

REST_FRAMEWORK = {}

# Simple UI Configuration
SIMPLEUI_LOGO = 'https://aquality-server-assets.s3.eu-west-1.amazonaws.com/static/aquality_admin/images/Apps%20Logo.png'
SIMPLEUI_HOME_INFO = False
SIMPLEUI_ANALYSIS = False

SIMPLEUI_CONFIG = {
    # 在自定义菜单的基础上保留系统模块
    'system_keep': False,
    'menus': [
    {
        # 自2021.02.01+ 支持多级菜单，models 为子菜单名
        'name': 'Aquality Data',
        'icon': 'fas fa-folder-open',
        'models': [
            {
            'name': 'Insect',
            'icon': 'fas fa-bug',
            'url' : '/admin/aquality_server/insect/'
            }, 
            {
            'name': 'Rivers',
            'icon': 'fas fa-water',
            'url' : '/admin/aquality_server/river/'
            }, 
            {
            'name': 'Sample Record',
            'icon': 'fas fa-file-medical-alt',
            'url' : '/admin/aquality_server/samplerecord/'
            },
            {
            'name': 'Hardware Data',
            'icon': 'fas fa-microchip',
            'url' : '/admin/aquality_server/data/'
            },
            {
            'name': 'Report Problem',
            'icon': 'fas fa-wrench',
            'url' : '/admin/aquality_server/reportproblemrecord/'
            }
        ]
    }, {
        'app': 'auth',
        'name': 'Authorization',
        'icon': 'fas fa-shield-alt',
        'models': [
        {
            'name': 'Group',
            'icon': 'fas fa-user-shield',
            'url': 'auth/group/'
        },
        {
            'name': 'User',
            'icon': 'fa fa-user',
            'url': 'auth/user/'
        },
        {
            'name':'UserAccount',
            'icon':'fas fa-users',
            'url' : '/admin/aquality_server/useraccount'
        }]
    }, {
        'name': 'Activity Map',
        'icon': 'fas fa-globe-europe',
        'url' : '/aquality_admin/maps'
    },{
        'name': 'Generate List of User',
        'icon': 'fas fa-user-plus',
        'url' : '/aquality_admin/upload-csv'
    }]
}
