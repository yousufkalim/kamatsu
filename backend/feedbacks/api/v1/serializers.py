from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _

from feedbacks.models import *


class CustomerFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFeedback
        fields = '__all__'


class CustomerFeedbackReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerFeedbackReply
        fields = '__all__'

        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }
