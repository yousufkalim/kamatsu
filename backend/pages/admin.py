from django.contrib import admin

from .models import *


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    # list_display =
    def has_add_permission(self, request):
        return not AboutPage.objects.exists()
