from django.conf import settings
from django.core.mail import send_mail


def send_feedback_reply_email(reply):
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = reply.email
    subject = 'Feedback Reply'
    try:
        send_mail(
            subject=subject,
            message=reply.body,
            recipient_list=[to_email],
            from_email=f'Reply <{from_email}>'
        )
        return True
    except Exception as err:
        return False
