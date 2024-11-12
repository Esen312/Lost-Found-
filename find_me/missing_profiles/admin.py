from django.contrib import admin
from .models import PersonProfile, AnimalProfile

class PersonProfileAdmin(admin.ModelAdmin):
    list_display = ('missing_person_name', 'applicant_name', 'missing_date', 'missing_region', 'gender')
    search_fields = ('missing_person_name', 'applicant_name', 'missing_region')
    list_filter = ('gender', 'search_area_type', 'missing_date')
    ordering = ('-missing_date',)

class AnimalProfileAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'pet_type', 'missing_date', 'missing_region', 'pet_gender')
    search_fields = ('applicant_name', 'pet_type', 'missing_region')
    list_filter = ('pet_type', 'search_area_type', 'missing_date')
    ordering = ('-missing_date',)

admin.site.register(PersonProfile, PersonProfileAdmin)
admin.site.register(AnimalProfile, AnimalProfileAdmin)
