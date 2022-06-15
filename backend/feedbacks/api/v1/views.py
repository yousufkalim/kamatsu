from rest_framework.generics import *
from .serializers import *
from users.models import User


class CustomerFeedbackCreateAPIView(CreateAPIView):
    serializer_class = CustomerFeedbackSerializer
    queryset = CustomerFeedback.objects.none()

    def perform_create(self, serializer):
        try:
            user = User.objects.get(email=self.request.data.get('email'))
        except User.DoesNotExist:
            return None

        if user:
            serializer.save(user=user)
        else:
            serializer.save()
