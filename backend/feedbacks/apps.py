from django.apps import AppConfig


class FeedbacksConfig(AppConfig):
    name = 'feedbacks'

    def ready(self):
        try:
            import feedbacks.signals
        except ImportError:
            pass
