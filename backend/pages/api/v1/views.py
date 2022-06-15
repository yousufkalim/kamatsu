from rest_framework.generics import *

from .serializers import *


class AboutPageDetailAPIView(RetrieveAPIView):
    serializer_class = AboutPageSerializer
    queryset = AboutPage.objects.all()

    def get_object(self):
        try:
            return AboutPage.objects.first()
        except AboutPage.DoesNotExist:
            raise Http404
