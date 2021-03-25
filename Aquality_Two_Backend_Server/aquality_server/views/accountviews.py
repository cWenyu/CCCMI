from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from ..models import River, User_Account
from django.contrib.auth.models import User


@csrf_exempt
def checkUser(request):
    username = request.POST['username']
    password = request.POST['password']
    userGet = authenticate(username=username, password=password)
    if userGet is not None:
        user_account = User_Account.objects.filter(user=userGet)[0]
        return JsonResponse({
            'status': 'Login Success',
            'user_username': userGet.username,
            'date_joined': userGet.date_joined,
            'user_first_name': userGet.first_name,
            'user_last_name': userGet.last_name,
            'user_email': userGet.email,
            'user_group': user_account.user_group,
            'user_profic': str(user_account.profile_pic),
            'user_dob': user_account.date_of_birth,
            'user_occupation': user_account.occupation,
            'user_bio': user_account.bio
        })
    else:
        return JsonResponse({
            'status': 'Invalid Login',
            'message': 'Wrong Username Or Password'
        })


@csrf_exempt
def registerPage(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    if username is not None and email is not None and password is not None:
        user = User.objects.create_user(username, email, password)
        entry = User_Account.objects.create(user=user)
        return JsonResponse({
            'status': 'Register Success',
            'Message': 'User Created',
            'username': user.username
        })
    else:
        return JsonResponse({
            'status': 'Register Fail',
            'message': 'Field Missing'
        })


@csrf_exempt
def del_user(request):
    try:
        username_get = request.POST['username']
        u = User.objects.get(username=username_get)
        u.delete()
        return JsonResponse({
            'status': 'User with username : ' + username_get + ' Deleted'
        })

    except User.DoesNotExist:
        return JsonResponse({
            'status': 'User with username : ' + username_get + ' Not Found'
        })

    except Exception as e:
        return JsonResponse({
            'status': 'Error Occur',
            'error': str(e)
        })


@csrf_exempt
def if_username_exist(request):
    try:
        username_get = request.POST['username']
        if (username_get is not None):
            u = User.objects.get(username=username_get)
            if u is None:
                return JsonResponse({
                    'status': 'Username Not Exist'
                })
            else:
                return JsonResponse({
                    'status': 'Username Exist'
                })
        else:
            return JsonResponse({
                'status': 'Username not Receive'
            })
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'Username Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def if_email_exist(request):
    try:
        email_get = request.POST['email']
        if (email_get is not None):
            u = User.objects.get(email=email_get)
            if u is None:
                return JsonResponse({
                    'status': 'email Not Exist'
                })
            else:
                return JsonResponse({
                    'status': 'email Exist'
                })
        else:
            return JsonResponse({
                'status': 'email not Receive'
            })
    except User.DoesNotExist:
        return JsonResponse ({
            'status':'Email Not Exist'
        })     
    except Exception as e: 
        return HttpResponse(e)
