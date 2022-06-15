from django.contrib import admin

from .admin_inlines import CustomerFeedbackReplyAdminInline
from .models import *


@admin.register(CustomerFeedback)
class CustomerFeedbackAdmin(admin.ModelAdmin):
    list_display = ['email', 'user', 'created', 'updated']
    inlines = [CustomerFeedbackReplyAdminInline]


@admin.register(CustomerFeedbackReply)
class CustomerFeedbackReplyAdmin(admin.ModelAdmin):
    list_display = ['feedback_id', 'send_user', 'created', 'updated']
