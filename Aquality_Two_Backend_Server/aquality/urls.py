from django.urls import include, path
from . import views

app_name= 'aquality'

urlpatterns = [
    path('',views.index,name='indexPage')
]
