from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views, viewsets

router = DefaultRouter()
router.register('loading-tools', viewsets.LoadingToolViewSet)
router.register('hauling-tools', viewsets.HaulingToolViewSet)

app_name = 'hat'

urlpatterns = [
    path('', include(router.urls))
]
