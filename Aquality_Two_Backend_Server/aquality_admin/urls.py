from django.urls import include, path
from . import views

app_name= 'aquality_admin'

urlpatterns = [
    path('',views.index,name='indexPage')
]
