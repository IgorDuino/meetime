from django.contrib import admin
from .models import Meeting, TimeSlot, UserTimeSlot


@admin.register(Meeting)
class MeetingAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "created_at")
    search_fields = ("title", "description")
    list_filter = ("created_at", "created_by")


@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ("meeting", "start_time", "end_time")
    search_fields = ("meeting__title",)
    list_filter = ("meeting", "start_time", "end_time")


@admin.register(UserTimeSlot)
class UserTimeSlotAdmin(admin.ModelAdmin):
    list_display = ("user", "timeslot")
    search_fields = ("user__username", "timeslot__meeting__title")
    list_filter = ("user", "timeslot__meeting")
