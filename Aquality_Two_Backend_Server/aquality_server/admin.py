from django.contrib import admin
from aquality_server.models import *
from rest_framework import serializers
# Register your models here.

admin.site.register(Data)
admin.site.register(DataHistoryImageImage)
admin.site.register(River)
admin.site.register(InsectGroup)

@admin.register(Insect)
class InsectAdmin(admin.ModelAdmin):
    list_display = ('insect_id', 'insect_name','insect_group')

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
    list_display = ("user_group","user","occupation","bio","profile_pic","date_of_birth","term_condition_accept_state","safety_guide_accept_state")