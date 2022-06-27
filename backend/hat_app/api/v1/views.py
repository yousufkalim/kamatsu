from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.views import APIView

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


class PreviewResultAPIView(APIView):
    @staticmethod
    def post(request, *args, **kwargs):
        from hat_app.utils import tons_per_scoop
        serializer = FleetDefinitionSerializerPreview(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            unit_selection = data.get('unit_selection')
            loading_tool = data.get('loading_tool')
            hauling_tool = data.get('hauling_tool')
            material_denstiy = data.get('material_denstiy')
            result = {
                'tons_per_scoop': tons_per_scoop(loading_tool, material_denstiy, unit=unit_selection)
            }
            data['result'] = result

            return Response(data)
        return Response(serializer.errors)
