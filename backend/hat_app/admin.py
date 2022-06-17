from django.contrib import admin
from import_export.admin import ImportExportMixin
from .models import *


@admin.register(LoadingTool)
class LoadingToolAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['name', 'cycle_time_second', 'get_bucket_fill', 'get_bucket_size_yd3',
                    'get_bucket_size_m3', 'get_cost_per_hour',
                    'created', 'updated']
    search_fields = ['name']
    autocomplete_fields = ['compatible_trucks']

    def get_cycle_time_second(self, instance):
        html_text = f'{instance.cycle_time_second}/s'
        return mark_safe(html_text)

    get_cycle_time_second.short_description = 'Cycle Time Second'
    get_cycle_time_second.admin_order_field = 'cycle_time_second'

    def get_bucket_fill(self, instance):
        html_text = f'{instance.bucket_fill} %'
        return mark_safe(html_text)

    get_bucket_fill.short_description = 'Bucket Fill'
    get_bucket_fill.admin_order_field = 'bucket_fill'

    def get_bucket_size_yd3(self, instance):
        html_text = f'{instance.bucket_size_yd3} yd<sup>3</sup>'
        return mark_safe(html_text)

    get_bucket_size_yd3.short_description = 'Bucket Size(yd*3)'
    get_bucket_size_yd3.admin_order_field = 'bucket_size_yd3'

    def get_bucket_size_m3(self, instance):
        bucket_size_m3 = instance.get_metric_standard.get('bucket_size_m3', None)
        if bucket_size_m3:
            html_text = f'{bucket_size_m3} m<sup>3</sup>'
            return mark_safe(html_text)
        return None

    get_bucket_size_m3.short_description = 'Bucket Size(m*3)'
    get_bucket_size_m3.admin_order_field = 'bucket_size_yd3'

    def get_cost_per_hour(self, instance):
        html_text = f'{instance.cost_per_hour}/hr'
        return mark_safe(html_text)

    get_cost_per_hour.short_description = 'Cost Per Hour'
    get_cost_per_hour.admin_order_field = 'cost_per_hour'


@admin.register(HaulingTool)
class HaulingToolAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['name', 'capacity_ton', 'get_capacity_tonne', 'get_cost_per_hour', 'created', 'updated']
    search_fields = ['name']

    def get_cost_per_hour(self, instance):
        html_text = f'{instance.cost_per_hour}/hr'
        return mark_safe(html_text)

    get_cost_per_hour.short_description = 'Cost Per Hour'
    get_cost_per_hour.admin_order_field = 'cost_per_hour'

    def get_capacity_tonne(self, instance):
        capacity_tonne = instance.get_metric_standard.get('capacity_tonne', None)
        if capacity_tonne:
            html_text = f'{capacity_tonne:.2f} tonne'
            return mark_safe(html_text)
        return None

    get_capacity_tonne.short_description = 'Capacity Tonne(Short Ton - Metric)'
    get_capacity_tonne.admin_order_field = 'capacity_ton'


@admin.register(MaterialDensity)
class MaterialDensityAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['title', 'position', 'get_density', 'get_density_metric', 'created', 'updated']

    readonly_fields = ['get_density_metric']
    list_editable = ['position']
    search_fields = ['title', 'density']

    def get_density_metric(self, instance):
        density = instance.get_metric_standard.get('density', None)
        if density:
            html_text = f'{density:.2f} kg/m<sup>3</sup>'
            return mark_safe(html_text)
        return None

    def get_density(self, instance):
        # density = instance.get_metric_standard.get('density', None)
        # if density:
        #     html_text = f'{density:.2f} kg/m<sup>3</sup>'
        #     return mark_safe(html_text)
        return instance.get_density_with_unit_html

    get_density.short_description = 'Density (US)'
    get_density.admin_order_field = 'density'

    get_density_metric.short_description = 'Density (Metric)'
    get_density_metric.admin_order_field = 'density'


@admin.register(SiteDefaultParameter)
class SiteDefaultParameterAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'truck_sport_time_sec', 'operator_efficiency', 'est_round_trip_travel_time',
                    'material_swell',
                    'created', 'updated']

    # list_editable = ['truck_sport_time_sec', 'operator_efficiency', 'est_round_trip_travel_time', 'material_swell']

    def has_add_permission(self, request):
        return not SiteDefaultParameter.objects.exists()
