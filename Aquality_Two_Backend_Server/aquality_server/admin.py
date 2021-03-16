from django.contrib import admin
from aquality_server.models import *
from rest_framework import serializers
from django.db.models.functions import Lower
# Register your models here.

admin.site.register(DataHistoryImageImage)
admin.site.register(River)
admin.site.register(AllInsectUserUpload)
admin.site.register(RiverEnvironmentImage)

@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ('data_id','arduino_id','latitude','longitude','ph','temp','date_captured')

@admin.register(Insect)
class InsectAdmin(admin.ModelAdmin):
    list_display = ('insect_id', 'insect_name','insect_group')

@admin.register(InsectGroup)
class InsectGroupAdmin(admin.ModelAdmin):
    list_display = ('group_id','group_name')
    def get_ordering(self, request):
        return ['group_id']  

@admin.register(SampleRecord)
class SampleRecordAdmin(admin.ModelAdmin):
    list_display = ('sample_id','sample_user','sample_ph','sample_tmp','sample_river','sample_date')
    
@admin.register(SampleRecordInsectDetail)
class SampleRecordInsectDetail(admin.ModelAdmin):
    list_display = ('sample_record_data','get_sample_record_insect','insect_number')
    
    def get_sample_record_insect(self, obj):
        return obj.sample_record_insect.insect_name
    get_sample_record_insect.short_description = 'Insect Name'  #Renames column head
    
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ("user","user_group","occupation","bio","profile_pic","date_of_birth","term_condition_accept_state","safety_guide_accept_state")