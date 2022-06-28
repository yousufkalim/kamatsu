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
            data = serializer.validated_data
            unit_selection = data.get('unit_selection')
            loading_tool = data.get('loading_tool')
            hauling_tool = data.get('hauling_tool')
            material_denstiy = data.get('material_denstiy')
            truck_sport_time_sec = data.get('truck_sport_time_sec')
            tons_per_scoop = get_tons_per_scoop(loading_tool, material_denstiy, unit=unit_selection)
            scoops_per_load = get_scoops_per_load(hauling_tool.get('capacity_ton'), tons_per_scoop, unit=unit_selection)
            minutes_per_load = get_minutes_per_load(scoops_per_load, truck_sport_time_sec,
                                                    loading_tool.get('cycle_time_second'), unit=unit_selection)
            result = {
                'tons_per_scoop': tons_per_scoop,
                'scoops_per_load': scoops_per_load,
                'minutes_per_load': minutes_per_load,
                'ld_number_of_trucks': {},
                'minus_one_truck_haulage': {},
                'minus_two_truck_haulage': {},
                'minus_three_truck_haulage': {},
                'd_unit_const_per_hour': {},
                'units_per_hour': {},
            }
            data['result'] = result

            return Response(data)
        return Response(serializer.errors)
