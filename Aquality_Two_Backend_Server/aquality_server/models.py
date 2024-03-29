from django.db import models
from django.contrib.auth.models import User
import json
import datetime

class UserAccount(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    user_group = models.CharField(max_length=200, null=True)
    profile_pic = models.ImageField(upload_to='user-profile-pic', null=True)
    date_of_birth = models.DateTimeField(default=None, blank=True, null=True)
    occupation = models.CharField(max_length=200, null=True)
    bio = models.TextField(null=True)
    term_condition_accept_state = models.BooleanField(default=False)
    safety_guide_accept_state = models.BooleanField(default=False)


class River(models.Model):
    river_id = models.AutoField(primary_key=True)
    river_code = models.CharField(max_length=200, unique=True)
    river_name = models.CharField(max_length=200)
    river_catchments_code = models.CharField(max_length=20)
    river_catchments = models.CharField(max_length=200)
    latitude = models.FloatField(default=0, null=True)
    longitude = models.FloatField(default=0, null=True)
    local_authority = models.CharField(max_length=200)
    water_body_category = models.CharField(max_length=200)
    protected_area = models.CharField(max_length=20, null=True)
    transboundary = models.CharField(max_length=20)
    canal = models.CharField(max_length=20)

    def __str__(self):
        return self.river_name


class Data(models.Model):
    '''Data Collected by Hardware Store To '''
    data_id = models.AutoField(primary_key=True)
    arduino_id = models.IntegerField()
    latitude = models.FloatField(default=0, null=True)
    longitude = models.FloatField(default=0, null=True)
    pH = models.FloatField(default=None, blank=True, null=True)
    temp = models.FloatField(default=None, blank=True, null=True)
    date_captured = models.DateTimeField(auto_now_add=True)


class DataHistoryImageImage(models.Model):
    image_id = models.AutoField(primary_key=True)
    image_path = models.ImageField(upload_to='data-insect-img', null=True)
    data = models.ForeignKey(Data, on_delete=models.CASCADE)


class InsectGroup(models.Model):
    group_id = models.IntegerField(primary_key=True)
    group_name = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return self.group_name


class Insect(models.Model):
    insect_id = models.AutoField(primary_key=True)
    insect_name = models.CharField(max_length=200, unique=True)
    insect_desc = models.TextField(null=True)
    insect_group = models.ForeignKey(InsectGroup, on_delete=models.CASCADE)
    insect_image_path = models.ImageField(upload_to='insect-img', null=True)

    # def display_group(self):
    #     """Create a name for insect group. This is used to display insect group name in Admin."""
    #     return self.insect_group.group_name
    # display_group.short_description = 'Insect Group'


class SampleRecord(models.Model):
    sample_id = models.AutoField(primary_key=True)
    sample_date = models.DateTimeField(auto_now_add=True)
    sample_score = models.IntegerField()
    sample_user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    sample_pH = models.FloatField(null=True)
    sample_tmp = models.FloatField(null=True)
    sample_river = models.ForeignKey(River, on_delete=models.CASCADE)
    sample_survey = models.JSONField(null=True, encoder=json.JSONEncoder, decoder=json.JSONDecoder)

    def __str__(self):
        return "Sample" + str(self.sample_id) + "At Date " + str(self.sample_date)
    
    def sample_local_authority(self):
        """Create a field for local authority that sample belong to. This is used to display in Admin and used in Map filter. """
        return self.sample_river.local_authority

    sample_local_authority.short_description = "Local Authority"


class SampleRecordInsectDetail(models.Model):
    class Meta:
        unique_together = (('sample_record_data', 'sample_record_insect'))

    sample_record_data = models.ForeignKey(SampleRecord, on_delete=models.CASCADE)
    sample_record_insect = models.ForeignKey(Insect, on_delete=models.CASCADE)
    insect_number = models.IntegerField()

    def __str__(self):
        return self.sample_record_insect.insect_name


class AllInsectUserUpload(models.Model):
    all_insect_image_id = models.AutoField(primary_key=True)
    sample_record_data = models.ForeignKey(SampleRecord, on_delete=models.CASCADE)
    insect_image_path = models.ImageField(upload_to='user-insect-img', null=True, default= None)
    
    def __str__(self):
        return "Insect Image In Sample" + str(self.sample_record_data)


class RiverEnvironmentImage(models.Model):
    river_environment_image_id = models.AutoField(primary_key=True)
    sample_record_data = models.ForeignKey(SampleRecord, on_delete=models.CASCADE)
    river_image_path = models.ImageField(upload_to='river-environment-img', null=True, default=None)
    
    def __str__(self):
        return "River Image In Sample" + str(self.sample_record_data)
    
class ReportProblemRecord(models.Model):
    report_id = models.AutoField(primary_key=True)
    report_image_path = models.ImageField(upload_to='report-insect-img', null=True)
    report_problem = models.CharField(max_length=200)
    report_problem_description = models.TextField()
