from rest_framework import viewsets, permissions
from .models import Meeting, TimeSlot, UserTimeSlot
from .serializers import (
    MeetingSerializer,
    TimeSlotSerializer,
    UserTimeSlotSerializer,
    CreateTimeSlotsSerializer,
    AccessCodeSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta


class MeetingViewSet(viewsets.ModelViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"])
    def create_timeslots(self, request, pk=None):
        meeting = self.get_object()

        # Проверяем, что текущий пользователь является создателем встречи
        if meeting.created_by != request.user:
            return Response(
                {"error": "You are not the creator of this meeting."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = CreateTimeSlotsSerializer(data=request.data)
        if serializer.is_valid():
            start_date = serializer.validated_data["start_date"]
            end_date = serializer.validated_data["end_date"]

            # Проверяем, что начальная дата меньше или равна конечной дате
            if start_date > end_date:
                return Response(
                    {"error": "Start date must be before or equal to end date."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            timeslots = []
            current_date = start_date

            while current_date <= end_date:
                for hour in range(9, 20):
                    start_time = datetime.combine(
                        current_date, datetime.min.time()
                    ).replace(hour=hour)
                    end_time = start_time + timedelta(hours=1)
                    timeslots.append(
                        TimeSlot(
                            meeting=meeting, start_time=start_time, end_time=end_time
                        )
                    )

                current_date += timedelta(days=1)

            TimeSlot.objects.bulk_create(timeslots)

            return Response(
                {"message": "Time slots created successfully."},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], url_path="join-timeslot")
    def join_timeslot(self, request, pk=None):
        meeting = self.get_object()
        serializer = AccessCodeSerializer(data=request.data)

        if serializer.is_valid():
            access_code = serializer.validated_data["access_code"]
            timeslot_id = serializer.validated_data["timeslot_id"]

            if access_code != meeting.access_code:
                return Response(
                    {"error": "Invalid access code."}, status=status.HTTP_403_FORBIDDEN
                )

            try:
                timeslot = TimeSlot.objects.get(pk=timeslot_id, meeting=meeting)
            except TimeSlot.DoesNotExist:
                return Response(
                    {"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND
                )

            UserTimeSlot.objects.create(user=request.user, timeslot=timeslot)
            return Response(
                {"message": "Successfully joined the time slot."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], url_path="list-timeslot-users")
    def list_timeslot_users(self, request, pk=None):
        meeting = self.get_object()
        serializer = AccessCodeSerializer(data=request.data)

        if serializer.is_valid():
            access_code = serializer.validated_data["access_code"]
            timeslot_id = serializer.validated_data["timeslot_id"]

            if access_code != meeting.access_code:
                return Response(
                    {"error": "Invalid access code."}, status=status.HTTP_403_FORBIDDEN
                )

            try:
                timeslot = TimeSlot.objects.get(pk=timeslot_id, meeting=meeting)
            except TimeSlot.DoesNotExist:
                return Response(
                    {"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND
                )

            user_timeslots = UserTimeSlot.objects.filter(timeslot=timeslot)
            data = UserTimeSlotSerializer(user_timeslots, many=True).data

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimeSlotViewSet(viewsets.ModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        meeting = Meeting.objects.get(pk=self.request.data["meeting"])
        serializer.save(meeting=meeting)


class UserTimeSlotViewSet(viewsets.ModelViewSet):
    queryset = UserTimeSlot.objects.all()
    serializer_class = UserTimeSlotSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        timeslot = TimeSlot.objects.get(pk=self.request.data["timeslot"])
        serializer.save(user=user, timeslot=timeslot)
