from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views, viewsets

router = DefaultRouter()

app_name = 'pages'
urlpatterns = [
    # path("", include(router.urls)),
    path('about-us/', views.AboutPageDetailAPIView.as_view(), name='about_us')
]
