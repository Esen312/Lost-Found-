# missing_profiles/urls.py
from rest_framework.routers import DefaultRouter
from .views import PersonProfileViewSet, AnimalProfileViewSet
from django.urls import path, include
from .views import RegisterView, UserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'profiles/person', PersonProfileViewSet, basename='personprofile')
router.register(r'profiles/animal', AnimalProfileViewSet, basename='animalprofile')

urlpatterns = [
    path('', include(router.urls)),  # Включение маршрутов роутера
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserView.as_view(), name='profile'),
]
