from ..serializers import *
from rest_framework.response import Response
from rest_framework import status
from aquality_server.filter import *
from rest_framework import viewsets


class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = AllDataSerializerWithDate
    serializer_class_save = DataSerializer

    def create(self, request):
        if request.method == 'POST':
            save_serialize = self.serializer_class_save(data=request.data)
            if save_serialize.is_valid():
                save_serialize.save()
                return Response(save_serialize.data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': 'Data could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        if self.request.query_params.get('arduino_id'):
            arduino_id_get = self.request.query_params.get('arduino_id')
            return Data.objects.filter(arduino_id=arduino_id_get).order_by('-date_captured')[0:1]
        else:
            return Data.objects.all()

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except status.HTTP_400_BAD_REQUEST:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)


class AllDataViewset(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = AllDataSerializerWithDate

    def get_queryset(self):
        # return Data.objects.all().order_by('river_id')
        pnt = get_location_point(self.request)
        # return Data.objects.filter(location__distance_lt=(pnt,D(m=10000)))
        return get_nearby_list_hardware(pnt)


class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all().order_by('river_id')
    serializer_class = RiverSerializer

    def get_queryset(self):
        # return River.objects.all().order_by('river_id')
        pnt = get_location_point(self.request)
        # return River.objects.filter(location__distance_lt=(pnt,D(m=10000)))
        return get_nearby_list(pnt)


class InsectGroupViewSet(viewsets.ModelViewSet):
    queryset = InsectGroup.objects.all().order_by('group_id')
    serializer_class = InsectGroupSerializer

    def get_queryset(self):
        return InsectGroup.objects.all().order_by('group_id')


class InsectViewSet(viewsets.ModelViewSet):
    queryset = Insect.objects.all().order_by('insect_id')
    serializer_class = InsectSerializer

    def get_queryset(self):
        if self.request.query_params.get('group'):
            return Insect.objects.filter(insect_group=self.request.query_params.get('group')).order_by('insect_id')
        else:
            return Insect.objects.all().order_by('insect_id')


class SampleRecordViewSet(viewsets.ModelViewSet):
    queryset = SampleRecord.objects.all().order_by('-sample_date')
    serializer_class = SampleRecordDataSerializer

    def get_queryset(self):
        if self.request.query_params.get('username'):
            username_get = self.request.GET['username']
            user_get = User.objects.get(username=username_get)
            if user_get.is_superuser:
                return SampleRecord.objects.all().order_by('-sample_date')
            elif user_get.is_staff:
                user_get_sub = UserAccount.objects.get(user=user_get)
                return SampleRecord.objects.filter(sample_river__local_authority=user_get_sub.user_group).order_by('-sample_date')
            elif self.request.query_params.get('rivername'):
                river_name = self.request.GET['rivername']
                river_get = River.objects.get(river_name=river_name)
                return SampleRecord.objects.filter(sample_user=user_get, sample_river=river_get).order_by('-sample_date')
            else:
                return SampleRecord.objects.filter(sample_user=user_get).order_by('-sample_date')
        else:
            return SampleRecord.objects.none()


class SampleRecordInsectViewSet(viewsets.ModelViewSet):
    queryset = SampleRecordInsectDetail.objects.all()
    serializer_class = SampleRecordInsectDetailSerializer

    def get_queryset(self):
        if self.request.query_params.get('sample_id'):
            sample_id_get = self.request.GET('sample_id')
            sample_record = SampleRecord.objects.get(sample_id=sample_id_get)
            return SampleRecordInsectDetail.objects.filter(sample_record_data=sample_record)
        return SampleRecordInsectDetail.objects.all()


class ReportProblemRecordViewSet(viewsets.ModelViewSet):
    queryset = ReportProblemRecord.objects.all()
    serializer_class = ReportProblemRecordSerializer
