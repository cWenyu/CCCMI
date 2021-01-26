# from django.contrib.gis.db import models
# from django.contrib.gis.geos import Point
# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Login Account Model
class Login_Account(models.Model):
    account_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=200,unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)

#User Account Models
class User_Account(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE
    )
    user_group = models.CharField(max_length = 200,null=True)
    profile_pic = models.ImageField(upload_to = 'user-profile-pic',null=True)
    date_of_birth = models.DateTimeField(default=None, blank=True, null=True)
    occupation = models.CharField(max_length = 200, null =True)
    bio = models.TextField(null=True)
    
#River Models
class River(models.Model):
    river_id = models.AutoField(primary_key = True)
    river_code = models.CharField(max_length = 200,unique=True)
    river_name = models.CharField(max_length = 200)
    river_catchments_code = models.CharField(max_length = 20)
    river_catchments = models.CharField(max_length = 200)
    # location = models.PointField(geography=True, default=Point(0.0, 0.0),null=True)
    latitude = models.FloatField(default = 0,null=True)
    longitude = models.FloatField(default = 0,null=True)
    local_authority = models.CharField(max_length = 200)
    water_body_category  = models.CharField(max_length = 200)
    protected_area = models.CharField(max_length = 20,null=True)
    transboundary = models.CharField(max_length = 20)
    canal = models.CharField(max_length = 20)
    
#Data Collected Model
class Data(models.Model):
    data_id = models.AutoField(primary_key = True) 
    river = models.ForeignKey(
        River,
        on_delete=models.CASCADE,
        default=None, 
        blank=True, 
        null=True
    )   
    # location = models.PointField(geography=True, default=Point(0.0, 0.0),null=True)
    arduino_id = models.IntegerField()
    latitude = models.FloatField(default = 0,null=True)
    longitude = models.FloatField(default = 0,null=True)
    ph = models.FloatField(default=None, blank=True, null=True)
    temp = models.FloatField(default=None, blank=True, null=True)
    date_captured = models.DateTimeField(auto_now_add=True)
    ecological_status = models.CharField(max_length = 200,default=None, blank=True, null=True)
    score_by_insect = models.IntegerField(default=None, blank=True, null=True)

#Image Model
class Image(models.Model):
    image_id = models.AutoField(primary_key = True)
    image_path = models.CharField(max_length =200)
    data = models.ForeignKey(Data,on_delete=models.CASCADE)

class InsectGroup(models.Model):
    group_id = models.IntegerField(primary_key=True)
    group_name = models.CharField(max_length = 200, unique= True)

class Insect(models.Model):
    insect_id = models.AutoField(primary_key = True)
    insect_name = models.CharField(max_length = 200,unique = True)
    insect_desc = models.TextField(null=True)
    insect_group = models.ForeignKey(InsectGroup,on_delete=models.CASCADE)


