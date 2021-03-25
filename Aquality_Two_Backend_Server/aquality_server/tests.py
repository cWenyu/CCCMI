from django.test import TestCase
from aquality_server.models import *
from .filter import *
# Create your tests here.
class AccountTestCase(TestCase):
    def setUp(self):
        Login_Account.objects.create(
            username="TestUser1",
            email = "TestingUser@email.com",
            password = "123456"
            )
    
    def testAccountPrint(self):
        self.assertEqual(0,0)
        
class RiverTestCase(TestCase):
    def setUp(self):
        River.objects.create(
            river_id= 1,
            river_code= "IE_NW_01S010280",
            river_name= "ST JOHNSTON_010",
            river_catchments_code= "01",
            river_catchments= "Foyle",
            latitude=-7.5032474,
            longitude=54.9246646,
            local_authority= "Donegal County Council",
            water_body_category= "River",
            protected_area= None,
            transboundary= "No",
            canal= False
        )
        River.objects.create(
            river_id= 2,
            river_code= "IE_NW_01S030200",
            river_name= "SWILLY BURN_010",
            river_catchments_code= "01",
            river_catchments= "Foyle",
            latitude=-57.5032474,
            longitude=4.9246646,
            local_authority= "Donegal County Council",
            water_body_category= "River",
            protected_area= None,
            transboundary= "No",
            canal= False
        )
        
    def testFindNearBy(self):
        pnt = [-7.55,54.93] 
        result = getNearbyList(pnt)
        expectResult = River.objects.get(river_id = 1)
        check = River.objects.create(
            river_id= 12,
            river_code= "IE_NW_01S22010280",
            river_name= "ST JOHNSTON_010",
            river_catchments_code= "01",
            river_catchments= "Foyle",
            latitude=-7.5032474,
            longitude=54.9246646,
            local_authority= "Donegal County Council",
            water_body_category= "River",
            protected_area= None,
            transboundary= "No",
            canal= False
        )        
        print(check.river_id)
        self.assertEqual(result[0],expectResult)
        