from django.urls import path, include
from . import views, viewsets

app_name = 'feedbacks'

urlpatterns = [
    path('customer-feedbacks/', views.CustomerFeedbackCreateAPIView.as_view(), name='send_feedback'),
]
