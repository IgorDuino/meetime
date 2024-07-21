from datetime import datetime, timedelta
from rest_framework import serializers
from .models import Meeting, TimeSlot, UserTimeSlot


class JoinMeetingSerializer(serializers.Serializer):
    timeslot_id = serializers.IntegerField()


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = "__all__"


class UserTimeSlotSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = UserTimeSlot
        fields = "__all__"


class CreateTimeSlotsSerializer(serializers.Serializer):
    start_date = serializers.DateField()
    end_date = serializers.DateField()


class MeetingSerializer(serializers.ModelSerializer):
    created_by = serializers.ReadOnlyField(source="created_by.username")
    access_code = serializers.ReadOnlyField()
    timeslots = TimeSlotSerializer(many=True, read_only=True)
    users_time_slots = serializers.SerializerMethodField()
    start_date = serializers.DateField(write_only=True)
    end_date = serializers.DateField(write_only=True)

    def create(self, validated_data):
        start_date = validated_data.pop("start_date", None)
        end_date = validated_data.pop("end_date", None)
        meeting = Meeting.objects.create(**validated_data)

        timeslots = []
        current_date = start_date

        while current_date <= end_date:
            for hour in range(9, 20):
                start_time = datetime.combine(
                    current_date, datetime.min.time()
                ).replace(hour=hour)
                end_time = start_time + timedelta(hours=1)
                timeslots.append(
                    TimeSlot(meeting=meeting, start_time=start_time, end_time=end_time)
                )

            current_date += timedelta(days=1)

        TimeSlot.objects.bulk_create(timeslots)

        return meeting

    def get_users_time_slots(self, obj):
        return UserTimeSlotSerializer(
            UserTimeSlot.objects.filter(timeslot__meeting=obj)
            .select_related("user", "timeslot")
            .prefetch_related("timeslot__meeting")
            .all(),
            many=True,
        ).data

    class Meta:
        model = Meeting
        fields = "__all__"
