from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.views import APIView
from hat_app.utils import *
from .serializers import *


class LoadingToolListAPIView(ListAPIView):
    serializer_class = LoadingToolListSerializer
    queryset = LoadingTool.objects.all().order_by('name')


class SiteParametersScreenDefaultValuesAPIView(RetrieveAPIView):
    serializer_class = SiteDefaultParameterSerializer
    queryset = SiteDefaultParameter.objects.none()

    def get_object(self):
        tools = LoadingTool.objects.first()
        print(tools)
        try:
            instance = SiteDefaultParameter.objects.first()
            print('found')
            print(instance)
        except SiteDefaultParameter.DoesNotExist:
            print('not found')
            # raise Http404
            instance = SiteDefaultParameter.objects.create()
        except Exception as err:
            print(err)
            raise Http404
        if instance is None:
            instance = SiteDefaultParameter.objects.create()
        return instance


class VerifyFleetDefinitionAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        serializer = VerifyFleetDefinitionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            return Response(data)
        return Response(serializer.errors)


class VerifySiteParametersAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        serializer = VerifySiteParameterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            return Response(data)
        return Response(serializer.errors)


class PreviewResultAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        serializer = ResultPreviewSerialzer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # unit_selection = data.get('unit_selection')
            # loading_tool = data.get('loading_tool')
            # hauling_tool = data.get('hauling_tool')
            # site_parameters = data.get('site_parameters')
            # material_denstiy = site_parameters.get('material_density')
            # material_swell = site_parameters.get('material_swell')
            # truck_sport_time_sec = site_parameters.get('truck_sport_time_sec')
            # est_round_trip_travel_time = site_parameters.get('est_round_trip_travel_time')
            # operator_efficiency = site_parameters.get('operator_efficiency')
            #
            # tons_per_scoop = get_tons_per_scoop(loading_tool, material_denstiy, unit=unit_selection)
            # scoops_per_load = get_scoops_per_load(hauling_tool.get('capacity_ton'), tons_per_scoop, unit=unit_selection)
            # minutes_per_load = get_minutes_per_load(scoops_per_load, truck_sport_time_sec,
            #                                         loading_tool.get('cycle_time_second'), unit=unit_selection)
            # ld_number_of_trucks = get_ld_number_of_trucks(
            #     cycle_time_sec=loading_tool.get('cycle_time_second'),
            #     scoops_per_load=scoops_per_load,
            #     est_round_trip_travel_time=est_round_trip_travel_time,
            #     minutes_per_load=minutes_per_load
            # )
            # load_size = get_load_size(scoops_per_load, tons_per_scoop)
            # haulage_per_hour_weight = get_haulage_per_hour_weight(operator_efficiency, minutes_per_load, load_size)
            # haulage_per_hour = get_haulage_per_hour(material_denstiy, material_swell, haulage_per_hour_weight,
            #                                         unit=unit_selection)
            # minus_truck_list = get_minus_truck_list(
            #     loading_tool=loading_tool,
            #     site_parameters=site_parameters,
            #     scoops_per_load=scoops_per_load,
            #     load_size=load_size,
            #     haulage_per_hour_weight=haulage_per_hour_weight,
            #     ld_number_of_trucks=ld_number_of_trucks
            # )
            # ld_unit_cost_per_hour = get_ld_unit_cost_per_hour(loading_tool, hauling_tool, ld_number_of_trucks,
            #                                                   haulage_per_hour)
            # result = {
            #     'tons_per_scoop': tons_per_scoop,
            #     'scoops_per_load': scoops_per_load,
            #     'minutes_per_load': minutes_per_load,
            #     'ld_number_of_trucks': ld_number_of_trucks,
            #     'haulage_per_hour_weight': haulage_per_hour_weight,
            #     'haulage_per_hour': haulage_per_hour,
            #     'trucks': minus_truck_list,
            #     'ld_unit_cost_per_hour': ld_unit_cost_per_hour,
            #     'units_per_hour': {},
            # }
            # data['result'] = result

            return Response(serializer.data)
        return Response(serializer.errors)
