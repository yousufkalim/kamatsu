from django.db import models
from django.utils.translation import ugettext_lazy as _


class AboutPage(models.Model):
    title = models.CharField(_('Title'), max_length=160, null=True, blank=True)
    description = models.TextField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('About Us Page')
        verbose_name_plural = _('About Us Pages')
