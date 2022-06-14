from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model
from django.db import models
from users.forms import UserChangeForm, UserCreationForm

User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    list_display = ["username", "email", "name", "first_name", "last_name", "date_joined", "is_superuser", "is_active"]

    form = UserChangeForm
    add_form = UserCreationForm
    fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets

    search_fields = ["name", "first_name", "last_name", "email"]


# class CustomAdmin(admin.ModelAdmin):
#     def changelist_view(self, request, extra_context=None):
#         return super(CustomAdmin, self).changelist_view()
#
#
# class ProxyModel(models.Model):
#     class Meta:
#         verbose_name = 'Report'
#         verbose_name_plural = 'Report'
#         proxy = True
#
#
# admin.site.register(ProxyModel, CustomAdmin)
