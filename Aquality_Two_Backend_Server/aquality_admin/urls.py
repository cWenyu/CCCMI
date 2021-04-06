from django.urls import include, path
from . import views

app_name= 'aquality_admin'

urlpatterns = [
    path('',views.index,name='indexPage'),
    path('index',views.index,name='indexPage'),
    path('maps',views.maps,name='mapPage'),
    path('', include('django.contrib.auth.urls')),
    path('upload-csv/',views.process_csv,name='generateUser'),
    path('generate-csv/',views.generate_csv,name='generate_csv_page'),
]
