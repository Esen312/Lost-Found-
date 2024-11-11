# profiles/models.py
from django.db import models
from django.urls import reverse
from django.conf import settings

class MissingProfile(models.Model):
    PERSON = 'person'
    ANIMAL = 'animal'

    PROFILE_TYPES = [
        (PERSON, 'Person'),
        (ANIMAL, 'Animal'),
    ]

    name = models.CharField(max_length=100)
    age = models.IntegerField(null=True, blank=True)
    description = models.TextField()
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    last_seen_location = models.CharField(max_length=255, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    status = models.CharField(max_length=50, default='missing')
    profile_type = models.CharField(max_length=10, choices=PROFILE_TYPES, default=PERSON)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_profile_type_display()})"

    def get_shareable_link(self):
        # Получаем полный URL для профиля
        profile_url = f"{settings.SITE_URL}{reverse('missingprofile-detail', args=[str(self.id)])}"

        # Формируем ссылки для социальных сетей
        social_links = {
            'facebook': f"https://www.facebook.com/sharer/sharer.php?u={profile_url}",
            'twitter': f"https://twitter.com/intent/tweet?url={profile_url}&text=Help find {self.name}!",
            'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={profile_url}",
        }