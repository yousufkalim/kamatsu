from rest_framework.decorators import action
from rest_framework.generics import *
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import *


class LoadingToolViewSet(viewsets.ModelViewSet):
    serializer_class = LoadingToolListSerializer
    queryset = LoadingTool.objects.all()
    http_method_names = ['get']

    def get_queryset(self):
        queryset = LoadingTool.objects.prefetch_related('compatible_trucks').all().order_by('name')
        return queryset

    @action(detail=True, methods=['GET'], serializer_class=HaulingToolSerializer, url_path='hauling-tools')
    def get_hauling_tools(self, request, *args, **kwargs):
        loading_tool = self.get_object()
        # print(loading_tool)
        # print(loading_tool.compatible_trucks.all())
        hauling_tools = loading_tool.compatible_trucks.all()
        serializer = HaulingToolSerializer(hauling_tools, many=True)
        if hauling_tools:
            return Response(serializer.data)
        return Response([])


class HaulingToolViewSet(viewsets.ModelViewSet):
    serializer_class = HaulingToolSerializer
    queryset = HaulingTool.objects.all()

    http_method_names = ['get']


class MaterialDensityViewSet(viewsets.ModelViewSet):
    serializer_class = MaterialDensitySerializer
    queryset = MaterialDensity.objects.all().order_by('title')

    http_method_names = ['get']
