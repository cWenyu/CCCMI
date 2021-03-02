from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, 'aquality_admin/index.html', {})
    else:
        return redirect('/aquality_admin/login/')
