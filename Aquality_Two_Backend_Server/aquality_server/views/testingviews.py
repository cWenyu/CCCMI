from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'aquality_server/index.html', {})


# def addData(request):
#     returnMessage = saveRiverListToDbFromWFA()
#     return render(request, 'aquality_server/addData.html',{'returnMessage': returnMessage})

@csrf_exempt
def testing_page(request):
    return render(request, 'aquality_server/testing.html', {'request': request})

@csrf_exempt
def testing_insect_page(request):
    data = json.loads(request.body)
    data_to = data['data_get']
    insect_list = data['insect_list']
    return render(request, 'aquality_server/testingInsectSave.html', {'data': data_to,'insectList':insect_list})


def testing_page_for_patrick(request):
    return JsonResponse({
        'status': 'Image Accepted',
        'message': {'image': 'http//......', 'class_label': ['Ecdyonurus'], 'confidence': [0.9999022483825684]}
    })

