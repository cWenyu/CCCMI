from rest_framework import serializers
from .models import River, Data, UserAccount, Insect, InsectGroup, SampleRecord, \
    SampleRecordInsectDetail, User,AllInsectUserUpload, RiverEnvironmentImage, ReportProblemRecord


class RiverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = River
        fields = ("river_id",
                  "river_code",
                  "river_name",
                  "river_catchments_code",
                  "river_catchments",
                  "latitude",
                  "longitude",
                  "local_authority",
                  "water_body_category",
                  "protected_area",
                  "transboundary",
                  "canal")


class DataSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ("data_id", "arduino_id", "latitude", "longitude", "ph", "temp")


class AllDataSerializerWithDate(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Data
        fields = ("data_id", "arduino_id", "latitude", "longitude", "ph", "temp", "date_captured")


class UserAccountSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserAccount
        fields = (
        "user_group", "user", "occupation", "bio", "profile_pic", "date_of_birth", "term_condition_accept_state",
        "safety_guide_accept_state")


class InsectSerializer(serializers.HyperlinkedModelSerializer):
    insect_group = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Insect
        fields = ('insect_id', 'insect_name', 'insect_desc', 'insect_group', 'insect_image_path')

class AllInsectUserUploadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AllInsectUserUpload
        fields = ('insect_id', 'insect_image_path')


class RiverEnvironmentImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RiverEnvironmentImage
        fields = ('river_id', 'river_image_path')


class SampleRecordDataSerializer(serializers.HyperlinkedModelSerializer):
    sample_river = serializers.CharField(source='sample_river.river_name')
    sample_river = RiverSerializer(sample_river)
    sample_user = serializers.CharField(source='sample_user.username')

    class Meta:
        model = SampleRecord
        fields = ('sample_id', 'sample_date', 'sample_score', 'sample_user', 'sample_ph', 'sample_tmp','sample_survey', 'sample_river',)


class SampleRecordInsectDetailSerializer(serializers.HyperlinkedModelSerializer):
    sample_record_data = serializers.PrimaryKeyRelatedField(read_only=True)
    sample_record_insect = serializers.CharField(source='sample_record_insect.insect_name')

    class Meta:
        model = SampleRecordInsectDetail
        fields = ('sample_record_data', 'sample_record_insect', 'insect_number')

class ReportProblemRecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReportProblemRecord
        fields = ('report_id','report_image_path','report_problem','report_problem_description')