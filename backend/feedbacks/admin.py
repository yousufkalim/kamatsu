from django.contrib import admin

from .admin_forms import CustomerFeedbackAdminForm
from .admin_inlines import CustomerFeedbackReplyAdminInline
from .models import *


@admin.register(CustomerFeedback)
class CustomerFeedbackAdmin(admin.ModelAdmin):
    list_display = ['email', 'user', 'created', 'updated']
    readonly_fields = ['user']
    inlines = [CustomerFeedbackReplyAdminInline]

    # form = CustomerFeedbackAdminForm

    def save_formset(self, request, form, formset, change):
        if formset.model != CustomerFeedbackReply:
            return super(self.__class__, self).save_formset(request, form, formset, change)
        instances = formset.save(commit=False)
        # print(instances)
        if len(instances) > 0:
            for instance in instances:
                # print(request.user)
                # print(instance)
                if not instance.send_user or not instance.pk:
                    instance.send_user = request.user
                # instance.send_user = request.user
                instance.save()
            formset.save_m2m()
        else:
            return super(self.__class__, self).save_formset(request, form, formset, change)
        # for form in formset.forms:
        #     form.instance.send_user = request.user
        # formset.save()
        # if len(email_send_instance) > 0:
        #     for email_instance in email_send_instance:
        #         from .utils import send_feedback_reply_email
        #         send_feedback_reply_email(email_instance)


@admin.register(CustomerFeedbackReply)
class CustomerFeedbackReplyAdmin(admin.ModelAdmin):
    list_display = ['feedback_id', 'send_user', 'created', 'updated']
