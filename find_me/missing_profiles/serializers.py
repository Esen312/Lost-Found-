# profiles/serializers.py
from rest_framework import serializers
from .models import MissingProfile

class MissingProfileSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False)
    shareable_links = serializers.SerializerMethodField()

    class Meta:
        model = MissingProfile
        fields = '__all__'

    def get_shareable_links(self, obj):
        return obj.get_shareable_link()


# profiles/serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers

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
