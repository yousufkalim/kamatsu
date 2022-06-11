from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .account_viewsets import (
    SignupViewSet,
    LoginViewSet,
)

router = DefaultRouter()
router.register("signup", SignupViewSet, basename="signup")
router.register("login", LoginViewSet, basename="login")

app_name = 'accounts'

urlpatterns = [
    path("", include(router.urls)),
]
