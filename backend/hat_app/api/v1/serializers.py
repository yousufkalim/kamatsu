from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from hat_app.models import *


class LoadingToolSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadingTool
        fields = '__all__'


class HaulingToolSerializer(serializers.ModelSerializer):
    metric_standard = serializers.JSONField(source='get_metric_standard', read_only=True, default=dict)

    class Meta:
        model = HaulingTool
        fields = ['id', 'name', 'capacity_ton', 'cost_per_hour', 'metric_standard', 'created', 'updated']


class HaulingToolSerializerInLoadingList(serializers.ModelSerializer):
    metric_standard = serializers.JSONField(source='get_metric_standard', read_only=True, default=dict)

    class Meta:
        model = HaulingTool
        fields = ['id', 'name', 'capacity_ton', 'cost_per_hour', 'metric_standard']


class LoadingToolListSerializer(serializers.ModelSerializer):
    metric_standard = serializers.JSONField(source='get_metric_standard', read_only=True, default=dict)
    compatible_trucks = HaulingToolSerializerInLoadingList(read_only=True, many=True)

    class Meta:
        model = LoadingTool
        fields = ['id', 'name', 'cycle_time_second', 'bucket_fill', 'bucket_size_yd3', 'cost_per_hour',
                  'metric_standard', 'compatible_trucks', 'created', 'updated']


class MaterialDensitySerializer(serializers.ModelSerializer):
    metric_standard = serializers.JSONField(source='get_metric_standard', read_only=True, default=dict)

    class Meta:
        model = MaterialDensity
        fields = ['id', 'title', 'density', 'position', 'metric_standard', 'created', 'updated']


class SiteDefaultParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteDefaultParameter
        fields = '__all__'


class FleetDefinitionLoadingToolSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32)
    cycle_time_second = serializers.DecimalField(max_digits=10, decimal_places=1)
    bucket_fill = serializers.DecimalField(max_digits=10, decimal_places=1)
    bucket_size = serializers.DecimalField(max_digits=10, decimal_places=1)
    cost_per_hour = serializers.DecimalField(max_digits=10, decimal_places=1)


class FleetDefinitionHaulingToolSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32)
    capacity_ton = serializers.DecimalField(max_digits=10, decimal_places=1)
    cost_per_hour = serializers.DecimalField(max_digits=10, decimal_places=1)


class FleetDefinitionSerializerPreview(serializers.Serializer):
    loading_tool = FleetDefinitionLoadingToolSerializer(required=True, many=False)
    hauling_tool = FleetDefinitionHaulingToolSerializer(required=True, many=False)
