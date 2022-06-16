from django.http import HttpResponse, Http404
from django.shortcuts import render
from django.conf import settings
import os


def home(request):
    packages = [
        {'name': 'django-allauth', 'url': 'https://pypi.org/project/django-allauth/0.38.0/'},
        {'name': 'django-bootstrap4', 'url': 'https://pypi.org/project/django-bootstrap4/0.0.7/'},
        {'name': 'djangorestframework', 'url': 'https://pypi.org/project/djangorestframework/3.9.0/'},
    ]
    context = {
        'packages': packages
    }
    return render(request, 'home/index.html', context)


def manifest_json_view(request):
    # from django.contrib.staticfiles.storage import staticfiles_storage
    # # url = staticfiles_storage('web_front_build/manifest.json')
    # file = staticfiles_storage('web_front_build/manifest.json')
    # file.
    # print(url)
    file_path = 'web_front_build/manifest.json'

    try:
        file_find = os.path.join(settings.BASE_DIR, file_path)
        with open(file_find) as file:
            content = file.read()
            return HttpResponse(content)
    except IOError:
        raise Http404
