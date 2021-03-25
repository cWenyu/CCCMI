from django.contrib import admin
from aquality_server.models import *

# Register your models here.

admin.site.register(User_Account)
admin.site.register(Data)
admin.site.register(DataHistoryImageImage)
admin.site.register(River)
admin.site.register(InsectGroup)
admin.site.register(SampleRecord)
admin.site.register(SampleRecordInsectDetail)

@admin.register(Insect)
class InsectAdmin(admin.ModelAdmin):
    list_display = ('insect_id', 'insect_name','insect_group')