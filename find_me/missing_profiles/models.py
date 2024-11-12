# profiles/models.py
from django.db import models
from django.urls import reverse
from django.conf import settings

class PersonProfile(models.Model):
    applicant_name = models.CharField(max_length=255)
    relation_degree = models.CharField(max_length=255)
    applicant_contact = models.CharField(max_length=20)
    missing_person_name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    gender = models.CharField(max_length=20, choices=[('male', 'Мужской'), ('female', 'Женский'), ('other', 'Другое')])
    birth_date = models.DateField(blank=True, null=True)
    missing_region = models.CharField(max_length=255)
    additional_regions = models.CharField(max_length=255, blank=True)
    missing_person_contact = models.CharField(max_length=20, blank=True)
    missing_area = models.CharField(max_length=255)
    missing_date = models.DateField()
    missing_time = models.TimeField()
    police_report = models.BooleanField(default=False)
    search_area_type = models.CharField(max_length=50, choices=[('city', 'Город'), ('forest', 'Лес')])
    disappearance_circumstances = models.TextField(blank=True)
    health_condition = models.TextField(blank=True)
    clothing_description = models.TextField(blank=True)
    distinctive_features = models.TextField(blank=True)
    belongings = models.TextField(blank=True)
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return self.missing_person_name

    def get_shareable_links(self):
        profile_url = f"{settings.SITE_URL}{reverse('personprofile-detail', args=[str(self.id)])}"
        return {
            'facebook': f"https://www.facebook.com/sharer/sharer.php?u={profile_url}",
            'twitter': f"https://twitter.com/intent/tweet?url={profile_url}&text=Help find {self.missing_person_name}!",
            'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={profile_url}",
        }

class AnimalProfile(models.Model):
    applicant_name = models.CharField(max_length=255)
    relation_degree = models.CharField(max_length=255)
    applicant_contact = models.CharField(max_length=20)
    pet_type = models.CharField(max_length=20, choices=[('dog', 'Собака'), ('cat', 'Кот'), ('other', 'Другое')])
    pet_gender = models.CharField(max_length=20, choices=[('male', 'Мужской'), ('female', 'Женский')])
    photo = models.ImageField(upload_to='photos/', blank=True, null=True)
    missing_region = models.CharField(max_length=255)
    additional_regions = models.CharField(max_length=255, blank=True)
    missing_area = models.CharField(max_length=255)
    missing_date = models.DateField()
    missing_time = models.TimeField()
    search_area_type = models.CharField(max_length=50, choices=[('city', 'Город'), ('forest', 'Лес')])
    disappearance_circumstances = models.TextField(blank=True)
    distinctive_features = models.TextField(blank=True)
    belongings = models.TextField(blank=True)
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return f'{self.pet_type} - {self.applicant_name}'

    def get_shareable_links(self):
        profile_url = f"{settings.SITE_URL}{reverse('animalprofile-detail', args=[str(self.id)])}"
        return {
            'facebook': f"https://www.facebook.com/sharer/sharer.php?u={profile_url}",
            'twitter': f"https://twitter.com/intent/tweet?url={profile_url}&text=Help find {self.applicant_name}'s {self.pet_type}!",
            'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={profile_url}",
        }