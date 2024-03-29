"""Aquality2 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
import aquality_admin

admin.site.site_title = 'Aquality'
admin.site.site_header = 'Aquality Admin'

urlpatterns = [
    path('aquality_server/', include('aquality_server.urls')),
    path('aquality_admin/',include('aquality_admin.urls')),
    path('',include('aquality.urls')),
    path('admin/', admin.site.urls),
]

handler403 = 'aquality_server.views.custom_permission_denied_view'

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
