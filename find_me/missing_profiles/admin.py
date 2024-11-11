# profiles/admin.py
from django.contrib import admin
from .models import MissingProfile

@admin.register(MissingProfile)
class MissingProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'profile_type', 'status', 'last_seen_location', 'created_at', 'updated_at')
    search_fields = ('name', 'description', 'last_seen_location')
    list_filter = ('profile_type', 'status')
