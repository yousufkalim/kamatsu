from django.contrib.admin import TabularInline

from .models import (CustomerFeedbackReply)


class CustomerFeedbackReplyAdminInline(TabularInline):
    model = CustomerFeedbackReply
    extra = 1
    readonly_fields = ['send_user']
    max_num = 1