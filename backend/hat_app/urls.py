from django.urls import path
from .views import *

app_name = 'hat_app'

urlpatterns = [
    path('test-result-graph/', test_result_graph)
]
