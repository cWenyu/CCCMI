from django.urls import include, path
from rest_framework import routers
from . import views
from django.contrib.auth import views as auth_views

router = routers.DefaultRouter()
router.register(r'rivers', views.RiverViewSet)
router.register(r'data',views.DataViewSet)
router.register(r'all_hardware_near',views.AllDataViewset)
router.register(r'insect',views.InsectViewSet)
router.register(r'samplerecord',views.SampleRecordViewSet)
router.register(r'recordinsect',views.SampleRecordInsectViewSet)
router.register(r'reportrecord',views.ReportProblemRecordViewSet)
router.register(r'insectgroup',views.InsectGroupViewSet)
#Application Name
app_name = 'aquality_server'

useraccount = [
    path('useraccount/loginauth', views.check_user, name='checkUser'),
    path('useraccount/register', views.register_page, name='registerPage'),
    path('useraccount/delete', views.del_user, name='del_user'),
    path('useraccount/checkname', views.if_username_exist, name='checkName'),
    path('useraccount/checkemail', views.if_email_exist, name='checkEmail'),
    path('useraccount/userdetail',views.get_user_detail,name='userDetail'),
    path('useraccount/trueterm',views.turn_true_term,name='termCondi'),
    path('useraccount/safetyterm',views.turn_safety_term,name='safetyTerm'),
    path('useraccount/firstlogin',views.turn_first_login_false,name='first_login'),
    path('useraccount/firstlogintotrue',views.turn_first_login_true,name='first_login_true'),
    path('useraccount/change-password', views.change_password_view, name='change-password'),
    path("useraccount/password_reset", views.password_reset_request, name="password_reset"),
    path('useraccount/password_reset/done/',
         auth_views.PasswordResetDoneView.as_view(template_name='./password/password_reset_done.html'),
         name='password_reset_done'),
    path('useraccount/password_reset/<uidb64>/<token>/',
         auth_views.PasswordResetConfirmView.as_view(template_name="./password/password_reset_confirm.html"),
         name='password_reset_confirm')
]

# Controlling The Path of Application
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  #  path('addData', views.addData, name='addData'),
    path('testing/',views.testing_page,name='testingPage'),
    path('testingInsect/',views.testing_insect_page,name='testingInsectPage'),
    path('testingPageForPatrick',views.testing_page_for_patrick,name='testingPageForPatrick'),
    path('sampledetail',views.get_sample_record,name='sampledetail'),
    path('samplesave',views.store_record_result,name='samplesave'),
    path('insect_score/score', views.calculate_score_insect, name='get_score')
] + useraccount
