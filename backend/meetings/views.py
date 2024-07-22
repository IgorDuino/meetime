from .viewsets import MyViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .permissions import IsOwnerOrStaff, WithAccessCode, any_of, all_of

from .models import Meeting, TimeSlot, UserTimeSlot
from .serializers import (
    MeetingSerializer,
    JoinLeftMeetingSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class MeetingViewSet(MyViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

    permission_classes_by_action = {
        "default": [IsOwnerOrStaff],
        "list": [IsAuthenticated],
        "create": [AllowAny],
        "retrieve": [any_of(IsOwnerOrStaff, WithAccessCode)],
        "join": [any_of(IsOwnerOrStaff, all_of(IsAuthenticated, WithAccessCode))],
        "update": [IsOwnerOrStaff],
        "partial_update": [IsOwnerOrStaff],
        "destroy": [IsOwnerOrStaff],
    }

    def list(self, request):
        if "participant" in request.query_params.keys():
            usertimeslots = request.user.usertimeslots.all()
            queryset = Meeting.objects.filter(
                timeslots__usertimeslots__in=usertimeslots
            )
        else:
            queryset = (
                self.get_queryset()
                if request.user.is_staff
                else request.user.meetings.all()
            )
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        meeting = self.get_object()
        serializer = self.get_serializer(meeting)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], url_path="join")
    def join(self, request, pk=None):
        meeting = self.get_object()
        serializer = JoinLeftMeetingSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        timeslot_id = serializer.validated_data["timeslot_id"]

        try:
            timeslot = TimeSlot.objects.get(pk=timeslot_id, meeting=meeting)
        except TimeSlot.DoesNotExist:
            return Response(
                {"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND
            )

        if UserTimeSlot.objects.filter(user=request.user, timeslot=timeslot).exists():
            return Response(
                {"error": "You have already joined this time slot."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        UserTimeSlot.objects.create(user=request.user, timeslot=timeslot)
        return Response(
            {"message": "Successfully joined the time slot."},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["post"], url_path="left")
    def left(self, request, pk=None):
        meeting = self.get_object()
        serializer = JoinLeftMeetingSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        timeslot_id = serializer.validated_data["timeslot_id"]

        try:
            timeslot = TimeSlot.objects.get(pk=timeslot_id, meeting=meeting)
        except TimeSlot.DoesNotExist:
            return Response(
                {"error": "Time slot not found."}, status=status.HTTP_404_NOT_FOUND
            )

        if not UserTimeSlot.objects.filter(
            user=request.user, timeslot=timeslot
        ).exists():
            return Response(
                {"error": "You haven't joined this time slot."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        UserTimeSlot.objects.filter(user=request.user, timeslot=timeslot).delete()
        return Response(
            {"message": "Successfully removed the time slot."},
            status=status.HTTP_200_OK,
        )
