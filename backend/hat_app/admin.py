from django.contrib import admin
from import_export.admin import ImportExportMixin
from .models import *


@admin.register(LoadingTool)
class LoadingToolAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['name', 'cycle_time_second', 'bucket_fill', 'bucket_size_yd3', 'cost_per_hour',
                    'created', 'updated']
    search_fields = ['name']
    autocomplete_fields = ['compatible_trucks']


@admin.register(HaulingTool)
class HaulingToolAdmin(ImportExportMixin, admin.ModelAdmin):
    list_display = ['name', 'created', 'updated']
    search_fields = ['name']
