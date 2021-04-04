from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'aquality/index.html', {})

def policy(request):
    return render(request, 'aquality/privacy.html',{})
