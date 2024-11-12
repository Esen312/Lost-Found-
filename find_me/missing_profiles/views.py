# profiles/views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import PersonProfileSerializer, AnimalProfileSerializer
from rest_framework.permissions import AllowAny
from .models import PersonProfile, AnimalProfile
from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer

class PersonProfileViewSet(viewsets.ModelViewSet):
    queryset = PersonProfile.objects.all()
    serializer_class = PersonProfileSerializer
    permission_classes = [AllowAny]

    # Подключаем фильтрацию и поиск, используя только существующие поля
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['gender', 'missing_region', 'search_area_type']  # Замените на реальные поля модели
    search_fields = ['missing_person_name', 'distinctive_features', 'disappearance_circumstances']
    ordering_fields = ['missing_date', 'birth_date']


class AnimalProfileViewSet(viewsets.ModelViewSet):
    queryset = AnimalProfile.objects.all()
    serializer_class = AnimalProfileSerializer
    permission_classes = [AllowAny]

    # Подключаем фильтрацию и поиск, используя только существующие поля
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['pet_type', 'pet_gender', 'missing_region', 'search_area_type']  # Замените на реальные поля модели
    search_fields = ['distinctive_features', 'disappearance_circumstances', 'missing_area']
    ordering_fields = ['missing_date']


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


from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import PersonProfile, AnimalProfile
from .serializers import PersonProfileSerializer, AnimalProfileSerializer

class PersonProfileViewSet(viewsets.ModelViewSet):
    queryset = PersonProfile.objects.all()
    serializer_class = PersonProfileSerializer
    permission_classes = [AllowAny]

class AnimalProfileViewSet(viewsets.ModelViewSet):
    queryset = AnimalProfile.objects.all()
    serializer_class = AnimalProfileSerializer
    permission_classes = [AllowAny]