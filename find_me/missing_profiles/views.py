# profiles/views.py
from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import MissingProfile
from .serializers import MissingProfileSerializer

class MissingProfileViewSet(viewsets.ModelViewSet):
    queryset = MissingProfile.objects.all()
    serializer_class = MissingProfileSerializer
    permission_classes = (permissions.AllowAny,)

    # Подключаем фильтрацию и поиск
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['profile_type', 'status']
    search_fields = ['name', 'description', 'last_seen_location']
    ordering_fields = ['created_at', 'updated_at']


# profiles/views.py
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserView(generics.RetrieveAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Токены можно получать и обновлять с помощью DRF SimpleJWT, так что дополнительные функции логина не нужны.
