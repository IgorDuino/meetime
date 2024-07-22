import random
import string
from django.db import models
from django.contrib.auth.models import User


def generate_access_code():
    return "".join(random.choices(string.ascii_letters + string.digits, k=32))


class Meeting(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    call_link = models.URLField(blank=True, null=True)
    access_code = models.CharField(
        max_length=32, default=generate_access_code, unique=True
    )
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="meetings"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class TimeSlot(models.Model):
    meeting = models.ForeignKey(
        Meeting, on_delete=models.CASCADE, related_name="timeslots"
    )
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return f"{self.meeting.title} ({self.start_time} - {self.end_time})"


class UserTimeSlot(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="usertimeslots"
    )
    timeslot = models.ForeignKey(
        TimeSlot, on_delete=models.CASCADE, related_name="usertimeslots"
    )

    def __str__(self):
        return f"{self.user.username} - {self.timeslot}"
