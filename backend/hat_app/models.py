from django.db import models
from django.utils.translation import ugettext_lazy as _

from modules.model_mixins import BaseTimeStampModel


class LoadingTool(BaseTimeStampModel):
    name = models.CharField(_('Name'), max_length=120, unique=True)
    cycle_time_second = models.PositiveIntegerField(_('Cycle Time Second'), default=0)
    bucket_fill = models.DecimalField(_('Bucket Fill'), decimal_places=2, max_length=12, max_digits=10)
    bucket_size_yd3 = models.DecimalField(_('Bucket Size Yd3'), decimal_places=2, max_length=12, max_digits=10)
    cost_per_hour = models.DecimalField(_('Cost Per Hour'), decimal_places=2, max_length=12, max_digits=10)
    compatible_trucks = models.ManyToManyField('hat_app.HaulingTool', help_text=_('Compatible Hauling Tools'))

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('name',)
        verbose_name = _('Loading Tool')
        verbose_name_plural = _('Loading Tools')


class HaulingTool(BaseTimeStampModel):
    name = models.CharField(_('Name'), max_length=120, unique=True)
    capacity_ton = models.DecimalField(_('Capacity Tons'), decimal_places=2, max_length=12, max_digits=10)
    cost_per_hour = models.DecimalField(_('Cost Per Hour'), decimal_places=2, max_length=12, max_digits=10)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('name',)
        verbose_name = _('Hauling Tool')
        verbose_name_plural = _('Hauling Tools')
