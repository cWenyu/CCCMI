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
def testingPage(request):
    # request_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=River&inputtype=textquery&fields=geometry&key=" + config('GOOGLEMAP_APIKEY')
    # locationfound = requests.get(request_url)
    # data = locationfound.json().get("candidates")[0].get("geometry").get("location")
    return render(request, 'aquality_server/testing.html', {'request': request})

@csrf_exempt
def testingInsectPage(request):
    data = json.loads(request.body)
    dataTo = data['data_get']
    insectList = data['insect_list']
    return render(request, 'aquality_server/testingInsectSave.html', {'data': dataTo,'insectList':insectList})


def testingPageForPatrick(request):
    return JsonResponse({
        'status': 'Image Accepted',
        'message': {'image': 'http//......', 'class_label': ['Ecdyonurus'], 'confidence': [0.9999022483825684]}
    })

