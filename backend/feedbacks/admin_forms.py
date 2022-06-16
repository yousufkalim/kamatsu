from django import forms

from .models import CustomerFeedback, CustomerFeedbackReply


class CustomerFeedbackAdminForm(forms.ModelForm):
    class Meta:
        model = CustomerFeedback
        fields = '__all__'


class CustomerFeedbackReplyAdminForm(forms.ModelForm):
    class Meta:
        model = CustomerFeedbackReply
        fields = '__all__'
