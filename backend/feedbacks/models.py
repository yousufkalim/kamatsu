from django.db import models
from django.utils.translation import ugettext_lazy as _
from modules.model_mixins import BaseTimeStampModel


class CustomerFeedback(BaseTimeStampModel):
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True,
                             related_name='customer_feedbacks')

    email = models.EmailField(_('Email'), )

    body = models.TextField(_('Customer Feedback'))

    class Meta:
        ordering = ('-created',)
        verbose_name = _('Customer Feedback')
        verbose_name_plural = _('Customer Feedbacks')


class CustomerFeedbackReply(BaseTimeStampModel):
    feedback = models.ForeignKey('feedbacks.CustomerFeedback', on_delete=models.CASCADE,
                                 related_name='customer_feedback_replies')
    send_user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True,
                                  related_name='customer_feedback_replies')
    body = models.TextField(_('Customer Feedback'))

    class Meta:
        ordering = ('-created',)
        verbose_name = _('Customer Feedback Reply')
        verbose_name_plural = _('Customer Feedback Replies')
