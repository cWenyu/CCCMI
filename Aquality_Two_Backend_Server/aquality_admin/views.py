from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
# Create your views here.

def index(request):
    if request.user.is_authenticated:
        return render(request, 'aquality_admin/index.html', {})
    else:
        return redirect('/aquality_admin/login/')

def maps(request):
    GOOGLE_MAP_API = settings.GOOGLE_MAPS_API_KEY
    return render(request,'aquality_admin/maps.html',{'map_api':GOOGLE_MAP_API})

# def index(request):
#     GOOGLE_MAP_API = settings.GOOGLE_MAPS_API_KEY
#     return render(request,'aquality_admin/mapsAdmin.html',{'map_api':GOOGLE_MAP_API})