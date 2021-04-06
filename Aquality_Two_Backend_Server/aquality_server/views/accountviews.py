from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from ..models import River, UserAccount
from django.contrib.auth.models import User
from django.db import IntegrityError

@csrf_exempt
def check_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user_get = authenticate(username=username, password=password)
    if user_get is not None:
        user_account = UserAccount.objects.filter(user=user_get)[0]
        return JsonResponse({
            'status': 'Login Success',
            'user_id':user_get.id,
            'user_username': user_get.username,
            'date_joined': user_get.date_joined,
            'user_first_name': user_get.first_name,
            'user_last_name': user_get.last_name,
            'user_email': user_get.email,
            'user_group': user_account.user_group,
            'user_profic': str(user_account.profile_pic),
            'user_dob': user_account.date_of_birth,
            'user_occupation': user_account.occupation,
            'user_bio': user_account.bio,
            'user_term_condition_accept_state': user_account.term_condition_accept_state,
            'user_safety_guide_accept_state': user_account.safety_guide_accept_state
        })
    else:
        return JsonResponse({
            'status': 'Invalid Login',
            'message': 'Wrong Username Or Password'
        })

@csrf_exempt
def get_user_detail(request):
    username_in = request.POST['username']
    user_get = User.objects.get(username=username_in)
    if user_get is not None:
        user_account = UserAccount.objects.filter(user=user_get)[0]
        return JsonResponse({
            'user_id': user_get.id,
            'user_username': user_get.username,
            'date_joined': user_get.date_joined,
            'user_first_name': user_get.first_name,
            'user_last_name': user_get.last_name,
            'user_email': user_get.email,
            'user_group': user_account.user_group,
            'user_profic': str(user_account.profile_pic),
            'user_dob': user_account.date_of_birth,
            'user_occupation': user_account.occupation,
            'user_bio': user_account.bio,
            'user_term_condition_accept_state': user_account.term_condition_accept_state,
            'user_safety_guide_accept_state': user_account.safety_guide_accept_state
        })
    else:
        return JsonResponse({
            'status': 'Invalid Login',
            'message': 'Wrong Username Or Password'
        })

@csrf_exempt
def register_page(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    if username is not None and email is not None and password is not None:
        try:
            user = User.objects.create_user(username, email, password)
            entry = UserAccount.objects.create(user=user)
            return JsonResponse({
                'status': 'Register Success',
                'Message': 'User Created',
                'username': user.username
            })
        except IntegrityError:
            return JsonResponse({
                'status': 'Register Fail',
                'Message' : 'Username or Email already Exist'
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

@csrf_exempt
def turn_true_term(request):
    try:
        user_id = request.POST['user_id']
        if(user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code':400,
                    'status':'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(term_condition_accept_state=True)
                return JsonResponse({
                    'status_code':202,
                    'status':'Term & Condition State Updated'
                })    
    except User.DoesNotExist:
        return JsonResponse ({
            'status_code':400,
            'status':'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)
    
@csrf_exempt
def turn_safety_term(request):
    try:
        user_id = request.POST['user_id']
        if(user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code':400,
                    'status':'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(safety_guide_accept_state=True)
                return JsonResponse({
                    'status_code':202,
                    'status':'Safety Guide State Updated'
                })                
    except User.DoesNotExist:
        return JsonResponse ({
            'status_code':400,
            'status':'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)