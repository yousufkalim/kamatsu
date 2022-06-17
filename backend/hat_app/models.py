from django.db import models
from django.utils.safestring import mark_safe
from django.utils.translation import ugettext_lazy as _
from django.core import validators
from modules.model_mixins import BaseTimeStampModel
import quantities as pq


class LoadingTool(BaseTimeStampModel):
    name = models.CharField(_('Name'), max_length=120, unique=True)
    cycle_time_second = models.DecimalField(_('Cycle Time Second'), decimal_places=1, max_digits=20)
    bucket_fill = models.DecimalField(_('Bucket Fill'), decimal_places=1, max_length=12, max_digits=10)
    bucket_size_yd3 = models.DecimalField(_('Bucket Size Yd3'), decimal_places=2, max_length=12, max_digits=10)
    cost_per_hour = models.DecimalField(_('Cost Per Hour'), decimal_places=2, max_length=12, max_digits=10)
    compatible_trucks = models.ManyToManyField('hat_app.HaulingTool', help_text=_('Compatible Hauling Tools'))

    # @property
    # def get_bucket_size_yd3_text(self):
    #     html_text = f'{self.bucket_size_yd3} yd<sup>3</sup>'
    #
    #     return mark_safe(html_text)

    # @property
    # def get_cost_per_hour_text(self):
    #     html_text = f'{self.cost_per_hour}/hr'
    #
    #     return mark_safe(html_text)

    @property
    def get_metric_standard(self):
        bucket_size = None
        if self.bucket_size_yd3:
            bucket_size_yard = float(self.bucket_size_yd3) * pq.yd ** 3
            # print(bucket_size_yard)
            bucket_size_yard.units = pq.m ** 3
            bucket_size = bucket_size_yard.item()
        return {
            'bucket_size_m3': float(f'{bucket_size:.6f}'),
            'bucket_size_m3_text': f'{bucket_size:.6f} m3'
        }

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('name',)
        verbose_name = _('Loading Tool')
        verbose_name_plural = _('Loading Tools')


class HaulingTool(BaseTimeStampModel):
    name = models.CharField(_('Name'), max_length=120, unique=True)
    capacity_ton = models.DecimalField(_('Capacity Tons (US)'), decimal_places=2, max_length=12, max_digits=10)
    cost_per_hour = models.DecimalField(_('Cost Per Hour'), decimal_places=2, max_length=12, max_digits=10)

    def __str__(self):
        return '%s' % self.name

    class Meta:
        ordering = ('name',)
        verbose_name = _('Hauling Tool')
        verbose_name_plural = _('Hauling Tools')

    @property
    def get_metric_standard(self):
        capacity_tonne = None
        if self.capacity_ton:
            capacity_short_ton = float(self.capacity_ton) * pq.short_ton
            # print(bucket_size_yard)
            capacity_short_ton.units = pq.tonne
            capacity_tonne = capacity_short_ton.item()
        return {
            'capacity_tonne': float(f'{capacity_tonne:.6f}'),
            'capacity_tonne_text': f'{capacity_tonne:.6f} tonne'
        }


class MaterialDensity(BaseTimeStampModel):
    title = models.CharField(_('Title'), max_length=120, )
    density = models.DecimalField(_('Density (US or Imperial)'), decimal_places=2, max_digits=20,
                                  help_text=_('Unit: lb/yd**3'))
    position = models.PositiveIntegerField(_('Ordering Position'), default=0)

    def __str__(self):
        return '%s' % self.title

    @property
    def get_density_with_unit_html(self):
        return mark_safe('%s lb/yd<sup>3</sup>' % self.density)

    @property
    def get_metric_standard(self):
        density = float(self.density) * (pq.lb / pq.yd ** 3)
        density.units = pq.kg / pq.m ** 3
        density_metric = density.item()
        return {
            'unit_text': 'kg/m3',
            'density': float(f'{density_metric:.2f}')
        }

    class Meta:
        ordering = ('position',)
        verbose_name = _('Material Density')
        verbose_name_plural = _('Material Densities')


class SiteDefaultParameter(BaseTimeStampModel):
    truck_sport_time_sec = models.DecimalField(_('Truck Spot Time (sec)'), decimal_places=1, max_digits=20, default=0,
                                               validators=[validators.MinValueValidator(0)])
    operator_efficiency = models.DecimalField(_('Operator Efficiency (min/hr)'), decimal_places=1, max_digits=20,
                                              default=0, validators=[validators.MinValueValidator(0)])
    est_round_trip_travel_time = models.DecimalField(_('Est. Round Trip Travel Time (min)'), decimal_places=1,
                                                     max_digits=20, default=0,
                                                     validators=[validators.MinValueValidator(0)])
    material_swell = models.DecimalField(_('Material Swell (%)'), decimal_places=1, max_digits=20, default=0,
                                         validators=[validators.MinValueValidator(0)])

    def __str__(self):
        return 'Site Params Default: %s' % self.pk

    def __unicode__(self):
        return '%s' % self.pk

    class Meta:
        ordering = ('-created',)
        verbose_name = _('Site Default Parameter')
        verbose_name_plural = _('Site Default Parameter')
