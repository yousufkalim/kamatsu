from django.contrib.admin import TabularInline

from .models import (CustomerFeedbackReply)


class CustomerFeedbackReplyAdminInline(TabularInline):
    model = CustomerFeedbackReply
