from django.contrib import admin
from aquality_server.models import *
from rest_framework import serializers
from django.db.models.functions import Lower
# Register your models here.
import json
from pygments import highlight
from pygments.lexers import JsonLexer
from pygments.formatters import HtmlFormatter
from django.utils.safestring import mark_safe
from django.db import models
import datetime
from django.contrib.admin.widgets import AdminFileWidget
from django.utils.html import format_html

# admin.site.register(DataHistoryImageImage)
admin.site.register(RiverEnvironmentImage)

@admin.register(AllInsectUserUpload)
class AllInsectUserUploadAdmin(admin.ModelAdmin):
    exclude = ()

class SampleRecordInsectDetailInline(admin.StackedInline):
    model = SampleRecordInsectDetail
    readonly_fields = ('insect_number',)
    exclude = ('sample_record_insect',)
    extra = 0

class AllInsectImageUserUploadInline(admin.StackedInline):
    model = AllInsectUserUpload
    max_num=0
    extra = 0

class RiverEnviromentImageInline(admin.StackedInline):
    model = RiverEnvironmentImage
    max_num=0
    extra = 0

@admin.register(River)
class RiverAdmin(admin.ModelAdmin):
    list_display = ('river_code','river_name','river_catchments_code','river_catchments','local_authority')
    list_filter = ('river_catchments_code','river_catchments','local_authority',)

@admin.register(Data)
class DataAdmin(admin.ModelAdmin):
    list_display = ('data_id','arduino_id','latitude','longitude','pH','temp','date_captured')
    list_filter = ('arduino_id',)

@admin.register(Insect)
class InsectAdmin(admin.ModelAdmin):
    list_display = ('insect_id', 'insect_name','insect_group')
    list_filter = ('insect_group',)
    def get_ordering(self, request):
        return ['insect_id'] 


@admin.register(InsectGroup)
class InsectGroupAdmin(admin.ModelAdmin):
    list_display = ('group_id','group_name')

    def get_ordering(self, request):
        return ['group_id']  
    

@admin.register(SampleRecord)
class SampleRecordAdmin(admin.ModelAdmin):
    list_display = ('sample_id','sample_river','sample_score','sample_date','sample_user','sample_pH','sample_tmp','sample_coor_lat','sample_coor_lng','sample_local_authority')
    exclude = ('sample_survey',)
    readonly_fields = ('sample_id','sample_user','sample_pH','sample_tmp','sample_river','sample_date','sample_score','river_enviroment','sample_weather','sample_coor_lat','sample_coor_lng')
    inlines = [SampleRecordInsectDetailInline,AllInsectImageUserUploadInline,RiverEnviromentImageInline]

    def river_enviroment(self, instance):
        """Function to display pretty version of our data"""
        # Convert the data to sorted, indented JSON
        response = json.dumps(instance.sample_survey, sort_keys=True, indent=2)
        # Truncate the data. Alter as needed
        response = response[:5000]
        # Get the Pygments formatter
        formatter = HtmlFormatter(style='colorful')
        # Highlight the data
        response = highlight(response, JsonLexer(), formatter)
        # Get the stylesheet
        style = "<style>" + formatter.get_style_defs() + "</style><br>"
        # Safe the output
        return mark_safe(style + response)

    def sample_weather(self,instance):
        """Function to display pretty version of our data"""
        # Convert the data to sorted, indented JSON
        response = json.dumps(instance.sample_survey, sort_keys=True, indent=2)
        # Truncate the data. Alter as needed
        response = response[:5000]
        # Get the Pygments formatter
        formatter = HtmlFormatter(style='colorful')
        # Highlight the data
        response = highlight(response, JsonLexer(), formatter)
        # Get the stylesheet
        style = "<style>" + formatter.get_style_defs() + "</style><br>"
        # Safe the output
        return mark_safe(style + response)        

    river_enviroment.short_description = 'river enviroment'
    sample_weather.short_description = 'Weather At Time'

@admin.register(SampleRecordInsectDetail)
class SampleRecordInsectDetail(admin.ModelAdmin):
    list_display = ('sample_record_data','get_sample_record_insect','insect_number')
    
    def get_sample_record_insect(self, obj):
        return obj.sample_record_insect.insect_name
    get_sample_record_insect.short_description = 'Insect Name'  #Renames column head
    
@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ("user","user_group","occupation","bio","profile_pic","date_of_birth","term_condition_accept_state","safety_guide_accept_state")

@admin.register(ReportProblemRecord)
class ReportProblemRecordAdmin(admin.ModelAdmin):
    list_display = ("report_id","report_problem")