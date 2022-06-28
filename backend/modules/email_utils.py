from django.core.mail import send_mail
from django.conf import settings


def send_test_email():
    try:
        send_mail(
            subject='Test',
            message='test message',
            from_email=f'Komatsu <{settings.DEFAULT_FROM_EMAIL}>',
            recipient_list=['borhan@crowdbotics.com']
        )
    except Exception as err:
        print(err)

    return 'process done'
