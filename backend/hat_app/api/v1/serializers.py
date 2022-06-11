from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from hat_app.models import *


class LoadingToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadingTool
        fields = '__all__'


class HaulingToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = HaulingTool
        fields = '__all__'


class HaulingToolSerializerInLoadingList(serializers.ModelSerializer):
    class Meta:
        model = HaulingTool
        fields = ['id', 'name']


class LoadingToolListSerializer(serializers.ModelSerializer):
    compatible_trucks = HaulingToolSerializerInLoadingList(read_only=True, many=True)

    class Meta:
        model = LoadingTool
        fields = ['id', 'name', 'cycle_time_second', 'bucket_fill', 'bucket_size_yd3', 'cost_per_hour',
                  'compatible_trucks', 'created', 'updated']
