from json import JSONDecodeError

from django.contrib.auth import authenticate, login
from django.contrib.auth.password_validation import validate_password, password_validators_help_texts
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse

from ..models import River, UserAccount
from django.db import IntegrityError
from django.shortcuts import redirect
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from botocore.exceptions import ClientError


@csrf_exempt
def change_password_view(request):
    try:

        old_password = request.POST.get('old_password')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')
        username = request.POST.get('username')

        user_get = authenticate(username=username, password=old_password)

        check_equals = new_password == confirm_password
        check_same_as_old = old_password == new_password

        if request.method == "POST":

            validate_password(new_password, user=None, password_validators=None)

            if user_get is not None:
                if not check_equals:

                    response = {
                        'status_code': 400,
                        'status': 'Confirm Password and New Password do not match'
                    }

                elif check_same_as_old:

                    response = {
                        'status_code': 400,
                        'status': 'Can not use old password'
                    }

                else:
                    # set_password also hashes the password that the user will get
                    user = User.objects.get(username=username)
                    user.set_password(new_password)
                    user.save()

                    response = {
                        'status_code': 200,
                        'status': 'success',
                        'message': 'Password updated successfully'
                    }
            else:

                response = {
                    'status_code': 400,
                    'status': 'Check Username and Password'
                }
    except JSONDecodeError as j:
        response = {
            'status_code': 400,
            'status': "POST method not found"
        }
    except ValidationError as e:
        response = {
            'status_code': 400,
            'status': list(e.messages)
        }

    return JsonResponse(response)


@csrf_exempt
def check_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user_get = authenticate(username=username, password=password)
    if user_get is not None:
        user_account = UserAccount.objects.filter(user=user_get)[0]
        return JsonResponse({
            'status': 'Login Success',
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
            'user_safety_guide_accept_state': user_account.safety_guide_accept_state,
            'user_first_time_login': user_account.first_time_login
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
                'Message': 'Username or Email already Exist'
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
        return JsonResponse({
            'status': 'Email Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def turn_true_term(request):
    try:
        user_id = request.POST['user_id']
        if (user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code': 400,
                    'status': 'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(term_condition_accept_state=True)
                return JsonResponse({
                    'status_code': 202,
                    'status': 'Term & Condition State Updated'
                })
    except User.DoesNotExist:
        return JsonResponse({
            'status_code': 400,
            'status': 'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def turn_safety_term(request):
    try:
        user_id = request.POST['user_id']
        if (user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code': 400,
                    'status': 'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(safety_guide_accept_state=True)
                return JsonResponse({
                    'status_code': 202,
                    'status': 'Safety Guide State Updated'
                })
    except User.DoesNotExist:
        return JsonResponse({
            'status_code': 400,
            'status': 'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def turn_first_login_true(request):
    try:
        user_id = request.POST['user_id']
        if (user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code': 400,
                    'status': 'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(first_time_login=True)
                return JsonResponse({
                    'status_code': 202,
                    'status': 'First Time Login State Updated to True'
                })
    except User.DoesNotExist:
        return JsonResponse({
            'status_code': 400,
            'status': 'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def turn_first_login_false(request):
    try:
        user_id = request.POST['user_id']
        if (user_id is not None):
            u = User.objects.get(id=user_id)
            if u is None:
                return JsonResponse({
                    'status_code': 400,
                    'status': 'User Does Not Exist'
                })
            else:
                UserAccount.objects.filter(user=u).update(first_time_login=False)
                return JsonResponse({
                    'status_code': 202,
                    'status': 'First Time Login State Updated to False'
                })
    except User.DoesNotExist:
        return JsonResponse({
            'status_code': 400,
            'status': 'User Does Not Exist'
        })
    except Exception as e:
        return HttpResponse(e)


@csrf_exempt
def password_reset_request(request):
    try:
        email = request.POST.get("email")
        print("email:", email)
        if request.method == "POST":
            if email is not "":
                associated_users = User.objects.filter(Q(email=email))

                if associated_users.exists():
                    for user in associated_users:
                        subject = "Password Reset Requested"
                        email_template_name = "./password/password_reset_email.txt"
                        context = {
                            "email": user.email,
                            'domain': 'cccmi-aquality.tk',
                            'site_name': 'Aquality',
                            "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                            "user": user,
                            'token': default_token_generator.make_token(user),
                            'protocol': 'https',
                        }
                        email_render = render_to_string(email_template_name, context)
                        try:
                            send_mail(subject, email_render, 'aquality.v2@gmail.com', [user.email], fail_silently=True)
                        except BadHeaderError:
                            return HttpResponse('Invalid header found.')
                        return redirect("password_reset/done/")
                else:
                    return JsonResponse({
                        'status_code': 400,
                        'status': "Something went wrong try again"
                    })
            else:
                return JsonResponse({
                    'status_code': 400,
                    'status': "Please input an email in the space provided"
                })
        else:
            return JsonResponse({
                'status_code': 400,
                'status': "POST method not found"
            })

    except ValueError as e:
        return HttpResponse(e)

    except ClientError:
        return JsonResponse({
            'status_code': 400,
            'status': "Contact admin to verify email"
        })
