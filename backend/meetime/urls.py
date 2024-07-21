from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from meetings.views import MeetingViewSet, TimeSlotViewSet, UserTimeSlotViewSet

router = DefaultRouter()
router.register(r"meetings", MeetingViewSet)
router.register(r"timeslots", TimeSlotViewSet)
router.register(r"usertimeslots", UserTimeSlotViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="MeeTime API",
        default_version="v0.1",
        description="A simple and quick way to gather the opinions of all team members to find the best time for a team meeting",
        contact=openapi.Contact(email="i.kuzmenkov@innopolis.university"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/auth/", include("dj_rest_auth.urls")),
    path("api/auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
]
