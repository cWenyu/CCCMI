from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.contrib import messages
from aquality_server.models import UserAccount,User
from django.db import IntegrityError
# Create your views here.
import csv,io,random

def index(request):
    if request.user.is_authenticated:
        return render(request, 'aquality_admin/index.html', {})
    else:
        return redirect('/aquality_admin/login/')

def maps(request):
    GOOGLE_MAP_API = settings.GOOGLE_MAPS_API_KEY
    username_json = request.user.username
    return render(request,'aquality_admin/maps.html',{'map_api':GOOGLE_MAP_API,"username":username_json})

# def index(request):
#     GOOGLE_MAP_API = settings.GOOGLE_MAPS_API_KEY
#     return render(request,'aquality_admin/mapsAdmin.html',{'map_api':GOOGLE_MAP_API})

def process_csv(request):
    template = "aquality_admin/importUser.html"
    data = UserAccount.objects.all()
    # prompt is a context variable that can have different values      depending on their context
    prompt = {
        'order': 'Order of the CSV should be name, email',
        'profiles': data,
        'generated':False
        }
    # GET request returns the value of the data with the specified key.
    if request.method == "GET":
        return render(request, template, prompt)
    csv_file = request.FILES['file']
    # let's check if it is a csv file
    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'THIS IS NOT A CSV FILE')
    data_set = csv_file.read().decode('UTF-8')
    # setup a stream which is when we loop through each line we are able to handle a data in a stream
    io_string = io.StringIO(data_set)
    next(io_string)
    account_list = []
    for column in csv.reader(io_string, delimiter=',', quotechar="|"):
        account_list.append({'username':column[0],'email':column[1],'password':generate_random_password(8)})

    for account in account_list:
        try:
            user_create = User.objects.create_user(account['username'],account['email'],account['password'])
            UserAccount.objects.create(user=user_create)
            account['status'] = "success"
        except IntegrityError:
            account['status'] = 'Username or Email Exist'

    context = {'account_list':account_list,'generated':True}


    return render(request, template, context)

def generate_random_password(password_length):
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    temporarypassword = ''

    #generates 15-character random string. change 6 to whatever you want
    for i in range(0, password_length):
        temporarypassword += random.choice(characters)

    return temporarypassword