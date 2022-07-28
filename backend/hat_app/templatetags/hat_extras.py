from django import template

register = template.Library()


@register.filter()
def remove_underscores(value):
    value = value.replace('_', ' ')
    return value.title()
