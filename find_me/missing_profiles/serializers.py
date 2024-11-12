# profiles/serializers.py
from rest_framework import serializers
from .models import PersonProfile, AnimalProfile
from django.contrib.auth.models import User


class PersonProfileSerializer(serializers.ModelSerializer):
    shareable_links = serializers.SerializerMethodField()

    class Meta:
        model = PersonProfile
        fields = [
            'id', 'applicant_name', 'relation_degree', 'applicant_contact', 'missing_person_name',
            'photo', 'gender', 'birth_date', 'missing_region', 'additional_regions',
            'missing_person_contact', 'missing_area', 'missing_date', 'missing_time',
            'police_report', 'search_area_type', 'disappearance_circumstances', 'health_condition',
            'clothing_description', 'distinctive_features', 'belongings', 'additional_info',
            'shareable_links'  # Убедитесь, что только существующие поля включены
        ]

    def get_shareable_links(self, obj):
        return obj.get_shareable_links()


class AnimalProfileSerializer(serializers.ModelSerializer):
    shareable_links = serializers.SerializerMethodField()

    class Meta:
        model = AnimalProfile
        fields = [
            'id', 'applicant_name', 'relation_degree', 'applicant_contact', 'pet_type', 'pet_gender',
            'photo', 'missing_region', 'additional_regions', 'missing_area', 'missing_date',
            'missing_time', 'search_area_type', 'disappearance_circumstances', 'distinctive_features',
            'belongings', 'additional_info', 'shareable_links'  # Убедитесь, что только существующие поля включены
        ]

    def get_shareable_links(self, obj):
        return obj.get_shareable_links()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
