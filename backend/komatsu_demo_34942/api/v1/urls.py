from django.urls import path, include
from allauth.account.views import confirm_email

app_name = 'api_v1'

urlpatterns = [
    path('', include('home.api.v1.urls', namespace='home')),
    path('accounts/', include('users.api.v1.account_urls', namespace='accounts')),
    path('modules/', include('modules.api.v1.urls', namespace='modules')),

    path('rest-auth/', include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path('rest-auth/registration/account-confirm-email/<str:key>/', confirm_email),
    path('rest-auth/registration/', include("rest_auth.registration.urls")),
]
