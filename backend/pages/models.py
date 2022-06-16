from django.db import models
from django.utils.translation import ugettext_lazy as _


class AboutPage(models.Model):
    title = models.CharField(_('Title'), max_length=160, null=True, blank=True)
    contact_email = models.EmailField(_('Contact Email'), null=True, blank=True)
    contact_phone = models.CharField(_('Contact Phone'), max_length=20, null=True, blank=True)
    description = models.TextField(_('Description'))

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.title:
            return '%s' % self.title
        return 'Page: %s' % self.pk

    class Meta:
        verbose_name = _('About Us Page')
        verbose_name_plural = _('About Us Pages')
