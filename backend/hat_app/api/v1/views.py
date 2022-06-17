from rest_framework.generics import *

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
