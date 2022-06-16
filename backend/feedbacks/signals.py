from django.db.models.signals import *
from django.dispatch import receiver

from .models import *


@receiver(post_save, sender=CustomerFeedbackReply)
def customer_feedback_reply_post_save(sender, created, instance, **kwargs):
    if created:
        from .utils import send_feedback_reply_email
        send_feedback_reply_email(instance)
