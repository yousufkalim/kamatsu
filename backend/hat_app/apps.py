from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class HatAppConfig(AppConfig):
    name = 'hat_app'
    verbose_name = _('Haulage Analysis')

    def ready(self):
        try:
            import hat_app.signals
        except ImportError:
            pass
