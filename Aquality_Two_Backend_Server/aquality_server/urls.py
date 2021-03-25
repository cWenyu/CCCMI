from django.urls import include, path
from rest_framework import routers
from . import views
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'rivers', views.RiverViewSet)
router.register(r'data',views.DataViewSet)
router.register(r'insect',views.InsectViewSet)
router.register(r'samplerecord',views.SampleRecordViewSet)
router.register(r'recordinsect',views.SampleRecordInsectViewSet)
#Application Name

app_name = 'aquality_server'
# Controlling The Path of Application

useraccount = [
    path('useraccount/loginauth', views.checkUser, name='checkUser'),
    path('useraccount/register', views.registerPage, name='registerPage'),
    path('useraccount/delete', views.del_user, name='del_user'),
    path('useraccount/checkname', views.if_username_exist, name='checkName'),
    path('useraccount/checkemail', views.if_email_exist, name='checkEmail'),
    path('insect_score/score', views.calculate_score_insect, name='get_score'),
]

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  #  path('addData', views.addData, name='addData'),
    path('testing/',views.testingPage,name='testingPage'),
    path('testingInsect/',views.testingInsectPage,name='testingInsectPage'),
    path('testingPageForPatrick',views.testingPageForPatrick,name='testingPageForPatrick'),
    path('sampledetail',views.getSampleRecord,name='sampledetail'),
    path('samplesave',views.storeRecordResult,name='samplesave')
] + useraccount
