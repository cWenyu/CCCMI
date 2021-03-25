import json
from ..utils.utils import count_score_by_insect
from Cython import typeof
from ..serializers import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def getSampleRecord(request):
    sample_id_get = request.POST['sample_id']
    sample_record = SampleRecord.objects.get(sample_id=sample_id_get)
    insect_list = SampleRecordInsectDetail.objects.filter(sample_record_data = sample_record)
    return JsonResponse({
        'data_get' :SampleRecordDataSerializer(sample_record).data,
        'insect_list' : SampleRecordInsectDetailSerializer(insect_list,many=True).data
    })

@csrf_exempt
def storeRecordResult(request):
    try:
        data = json.loads(request.body)
        sample_detail = data['data_get']
        if request.method =="POST":
            try:
                user = User.objects.get(id=sample_detail['sample_user'])
                river = River.objects.get(river_id = sample_detail['sample_river_id'])
                record_save = SampleRecord.objects.create(
                    sample_score = sample_detail['sample_score'],
                    sample_user = user,
                    sample_ph = sample_detail['sample_ph'],
                    sample_tmp = sample_detail['sample_tmp'],
                    sample_river = river
                )
                record_save_id = record_save.sample_id
                for insect in data['insect_list']:
                    insect_to_save = Insect.objects.get(insect_name = insect['sample_record_insect'])
                    SampleRecordInsectDetail.objects.create(
                        sample_record_data = record_save,
                        sample_record_insect = insect_to_save,
                        insect_number = insect['insect_number']
                    )
                
                return JsonResponse({
                    'status_code':201,
                    'message':'store_success'
                    })
            except Exception as e:
                return HttpResponse(e)
    except KeyError:
        pass
    return JsonResponse({
        'status_code':202,
        'message':'Error Occur'
    })

@csrf_exempt
def calculate_score_insect(request):
    # json_object variable is create and initialized
    json_object = {'success': 404}
    try:
        data = json.loads(request.body)
        # if statement checking if POST request is sent and no other
        if request.method == "POST":
            # if the list section of the POST request is set to None no list is sent, skip
            if not len(data['list']) == 0:
                # set json_object to found as POST request was accepted and url meets criteria
                json_object['success'] = 200
                json_object['data_in_list'] = True
                # set score that is returned
                json_object['object'] = count_score_by_insect(data['list'])
            else:
                json_object['success'] = 200
                json_object['data_in_list'] = False
                json_object['object'] = 'N/A'
        else:
            json_object['data_in_list'] = False
            json_object['object'] = 'N/A'

    except ValueError:
        json_object['json'] = False
        json_object['object'] = 'N/A'
    except KeyError:
        json_object['list'] = False
        json_object['object'] = 'N/A'

    # return json_object and a JSON response
    return JsonResponse(json_object)
