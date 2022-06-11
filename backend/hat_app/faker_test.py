from django.conf import settings
import os, json
from hat_app.models import LoadingTool, HaulingTool


def load_default_loader():
    loader_file_path = os.path.join(settings.BASE_DIR, 'static/files/defaults', 'LoaderDefaults.json')

    print('ok')
    file = open(loader_file_path)
    data = json.load(file)

    for i in data:
        # print(i['CompatibleTrucks'])
        trucks = [x.upper() for x in i['CompatibleTrucks']]
        hauling_tools = HaulingTool.objects.filter(name__in=trucks).all()
        print(hauling_tools)
        loading_tool, created = LoadingTool.objects.get_or_create(
            name=i['Name'], cycle_time_second=i['CycleTimeSec'],
            bucket_fill=i['BucketFill'], bucket_size_yd3=i['BucketSizeYd3'],
            cost_per_hour=i['CostPerHr']
        )
        loading_tool.compatible_trucks.set(hauling_tools)

        # loading_tool.compatible_trucks.set(hauling_tools)
    file.close()


def hauling_default_loader():
    hauling_file_path = os.path.join(settings.BASE_DIR, 'static/files/defaults', 'TruckDefaults.json')

    print('ok')
    file = open(hauling_file_path)
    data = json.load(file)
    for i in data:
        HaulingTool.objects.get_or_create(
            name=i['Name'], capacity_ton=i['CapacityTons'],
            cost_per_hour=i['CostPerHr'],
        )
    file.close()
