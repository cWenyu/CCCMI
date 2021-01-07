from django.shortcuts import get_object_or_404, render
from aquality_server.actions import *
from rest_framework import viewsets
from .serializers import *
from .models import River
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
#from django.contrib.gis.geos import Point
from decouple import config
# from django.contrib.gis.geos import GEOSGeometry
# from django.contrib.gis.measure import D # ``D`` is a shortcut for ``Distance``
from aquality_server.filter import *

# Controlling The View Access To
def index(request):
    return render(request, 'aquality_server/index.html', {})

class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    def create(self,request):
        if request.method == 'POST':
            saveSerialize = self.serializer_class(data = request.data)
            if saveSerialize.is_valid():
                saveSerialize.save()
                return Response( saveSerialize.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
    def get_queryset(self):
        return self.queryset
               

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer
    def get_queryset(self):
        # return River.objects.all().order_by('river_id')
        pnt = getLocationPoint(self.request)
        # return River.objects.filter(location__distance_lt=(pnt,D(m=10000)))
        query = """SELECT 
    river_id,
	longitute,
	latitute,
 
 
	ROUND(
		6378.138 * 2 * ASIN(
			SQRT(
				POW(
					SIN(
						(
							%f * PI() / 180 - latitute * PI() / 180
						) / 2
					),
					2
				) + COS(%f * PI() / 180) * COS(latitute * PI() / 180) * POW(
					SIN(
						(
							%f * PI() / 180 - 	longitute * PI() / 180
						) / 2
					),
					2
				)
			)
		) * 1000
	) AS distance
FROM
aquality_server_river
ORDER BY
	distance ASC""" % (pnt[0],pnt[0],pnt[1])
        
        return River.objects.raw(query)[0:5]


# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

def testingPage(request):
    request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=River&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    locationfound = requests.get(request_url)
    data = locationfound.json().get("candidates")[0].get("geometry").get("location")
    return render(request,'aquality_server/testing.html',{'request':data})