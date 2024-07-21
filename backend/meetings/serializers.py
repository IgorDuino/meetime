from rest_framework import serializers
from .models import Meeting, TimeSlot, UserTimeSlot


class MeetingSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")
    access_code = serializers.ReadOnlyField()

    class Meta:
        model = Meeting
        fields = "__all__"

class AccessCodeSerializer(serializers.Serializer):
    access_code = serializers.CharField(max_length=32)
    timeslot_id = serializers.IntegerField()

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = "__all__"


class UserTimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTimeSlot
        fields = "__all__"


class CreateTimeSlotsSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()


