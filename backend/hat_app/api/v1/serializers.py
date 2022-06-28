from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from hat_app.models import *
from hat_app.utils import *


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

    cost_per_hour = serializers.DecimalField(max_digits=10, decimal_places=1, read_only=True)

    def validate(self, attrs):
        name = attrs.get('name')
        cost_per_hour = LoadingTool.objects.get(name=name).cost_per_hour
        attrs['cost_per_hour'] = cost_per_hour
        return attrs


class FleetDefinitionHaulingToolSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=32)
    capacity_ton = serializers.DecimalField(max_digits=10, decimal_places=1)
    cost_per_hour = serializers.DecimalField(max_digits=10, decimal_places=1, read_only=True)

    def validate(self, attrs):
        name = attrs.get('name')
        cost_per_hour = HaulingTool.objects.get(name=name).cost_per_hour
        attrs['cost_per_hour'] = cost_per_hour
        return attrs


class VerifyFleetDefinitionSerializer(serializers.Serializer):
    unit_selection = serializers.ChoiceField(choices=(
        ('us', _('US Customary')),
        ('metric', _('Metric')),
    ), default='us')
    loading_tool = FleetDefinitionLoadingToolSerializer(required=True, many=False)
    hauling_tool = FleetDefinitionHaulingToolSerializer(required=True, many=False)

    def validate_loading_tool(self, loading_tool):
        unit_selection = self.initial_data.get('unit_selection')
        if unit_selection == 'us':
            bucket_size_metric = yd3_to_m3(loading_tool.get('bucket_size'))
            loading_tool['bucket_size_metric'] = bucket_size_metric
        elif unit_selection == 'metric':
            bucket_size_us = m3_to_yd3(loading_tool.get('bucket_size'))
            loading_tool['bucket_size_us'] = bucket_size_us
        return loading_tool

    def validate_hauling_tool(self, hauling_tool):
        unit_selection = self.initial_data.get('unit_selection')
        if unit_selection == 'us':
            capacity_ton_metric = short_ton_to_tonne(hauling_tool.get('capacity_ton'))
            hauling_tool['capacity_ton_metric'] = capacity_ton_metric
        elif unit_selection == 'metric':
            capacity_ton_us = tonne_to_short_ton(hauling_tool.get('capacity_ton'))
            hauling_tool['capacity_ton_us'] = capacity_ton_us
        return hauling_tool


class VerifySiteParameterSerializer(serializers.Serializer):
    unit_selection = serializers.ChoiceField(choices=(
        ('us', _('US Customary')),
        ('metric', _('Metric')),
    ), default='us')
    material_density = serializers.DecimalField(decimal_places=2, max_digits=20)
    truck_sport_time_sec = serializers.DecimalField(decimal_places=1, max_digits=20)
    operator_efficiency = serializers.DecimalField(decimal_places=1, max_digits=20)
    est_round_trip_travel_time = serializers.DecimalField(decimal_places=1, max_digits=20)
    material_swell = serializers.DecimalField(decimal_places=1, max_digits=20)

    def validate(self, attrs):
        unit_selection = attrs.get('unit_selection')
        material_density = attrs.get('material_density')
        if unit_selection == 'us':
            material_density_metric = lbyd3_to_kgm3(material_density)
            attrs['material_density_metric'] = material_density_metric
        elif unit_selection == 'metric':
            material_density_us = kgm3_to_lbyd3(material_density)
            attrs['material_density_us'] = material_density_us
        return attrs


class ResultPreviewSerialzer(serializers.Serializer):
    unit_selection = serializers.ChoiceField(choices=(
        ('us', _('US Customary')),
        ('metric', _('Metric')),
    ), default='us')
    is_volume = serializers.BooleanField(default=False)
    loading_tool = FleetDefinitionLoadingToolSerializer(required=True, many=False)
    hauling_tool = FleetDefinitionHaulingToolSerializer(required=True, many=False)
    material_denstiy = serializers.DecimalField(decimal_places=2, max_digits=20, required=True)
    truck_sport_time_sec = serializers.DecimalField(decimal_places=1, max_digits=20, required=True)
