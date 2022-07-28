from django.http import HttpResponse
from django.shortcuts import render

from hat_app.api.v1.serializers import ResultPreviewSerialzer


def test_result_graph(request):
    request_data = {
        "fleet_definition": {
            "unit_selection": "metric",
            "loading_tool": {
                "name": "PC2000",
                "cycle_time_second": 35,
                "bucket_fill": 95,
                "bucket_size": 12
            },
            "hauling_tool": {
                "name": "830E",
                "capacity_ton": 221
            }
        },
        "site_parameters": {
            "unit_selection": "metric",
            "material_density": 1780,
            "truck_sport_time_sec": 15,
            "est_round_trip_travel_time": 10,
            "operator_efficiency": 50,
            "material_swell": 20
        }
    }

    serializer = ResultPreviewSerialzer(data=request_data)
    if serializer.is_valid():
        serializer.save()

        return render(request, 'hat_app/result_graph.html', serializer.data)

    return HttpResponse(status=400)
