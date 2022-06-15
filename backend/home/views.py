from django.http import HttpResponse
from django.shortcuts import render


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
    # url = staticfiles_storage.url('web_front_build/manifest.json')
    # print(url)
    return HttpResponse('ok')
