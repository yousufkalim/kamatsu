from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views, viewsets

router = DefaultRouter()
router.register('loading-tools', viewsets.LoadingToolViewSet)
router.register('hauling-tools', viewsets.HaulingToolViewSet)
router.register('material-densities', viewsets.MaterialDensityViewSet)

app_name = 'hat'

urlpatterns = [
    path('', include(router.urls)),
    path('defaults/screens/site-parameters/', views.SiteParametersScreenDefaultValuesAPIView.as_view()),
    path('result-preview/', views.PreviewResultAPIView.as_view()),
    path('verify/fleet-definition/', views.VerifyFleetDefinitionAPIView.as_view()),
    path('verify/site-parameters/', views.VerifySiteParametersAPIView.as_view()),
    path('result-preview/', views.PreviewResultAPIView.as_view()),
    path('result-preview/', views.PreviewResultAPIView.as_view()),
]
