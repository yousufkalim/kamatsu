from import_export import fields, resources
from import_export.widgets import ManyToManyWidget
from .models import HaulingTool, LoadingTool


class ImportExportLoadingToolResource(resources.ModelResource):
    compatible_trucks = fields.Field(widget=ManyToManyWidget(HaulingTool), attribute='name')

    class Meta:
        model = LoadingTool
        import_id_fields = ('name',)
        fields = ['name', 'cycle_time_second', 'bucket_fill', 'bucket_size_yd3', 'cost_per_hour',
                  'compatible_trucks', ]
