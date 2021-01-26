from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .utils import *


# get POST request from front-end and responds with json Object
###############
@csrf_exempt
# this needs to be removed once  csrf token is put into POST (security purpose)
# csrf token ensure that the data is sent from a legit domain (exempt because no token)
###############
def object_detection_api(api_request):
    # json_object variable is create and initialized
    json_object = {'success': 404}

    # if statement checking if POST request is sent and no other
    if api_request.method == "POST":
        # if the image section of the POST request is set to None no image is sent, skip
        if api_request.POST.get("image64", None) is not None:
            # set json_object to found as POST request was accepted and url meets criteria
            json_object['success'] = 200
            # set result and detect_time from process_image return
            result, detection_time = process_image_post(api_request)
        elif api_request.FILES.get("image", None) is not None:
            # set json_object to found as FILES request was accepted and url meets criteria
            json_object['success'] = 200
            # set result and detect_time from process_image return
            result, detection_time = process_image_files(api_request)

    # checks if POST sent correctly and data is got
    if json_object['success'] != 404:
        # set variable from result which contains if image is detected or not
        detected_image = result["detected_image"]
        # if insect is detected
        if detected_image:
            # set json_object time and analysis results
            json_object['time'], json_object['object'] \
                = json_obj(json_object, str(round(detection_time)) + " seconds", result)
        # else if insect isn't detected
        else:
            # set json_object time 0 and analysis results
            json_object['time'], json_object['object'] \
                = json_obj(json_object, 0, result)
    # if POST doesn't have image or different request is sent json_object time set to 0 and object to empty
    else:
        json_object['time'], json_object['object'] \
            = json_obj(json_object, 0, "empty")

    # return json_object and a JSON response
    return JsonResponse(json_object)
