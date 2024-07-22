from rest_framework import viewsets
from .permissions import IsOwnerOrStaff


class MyViewSet(viewsets.GenericViewSet):
    permission_classes_by_action = {
        "default": [IsOwnerOrStaff],
    }

    def get_permissions(self):
        try:
            return [
                permission()
                for permission in self.permission_classes_by_action[self.action]
            ]
        except KeyError:
            return [
                permission()
                for permission in self.permission_classes_by_action["default"]
            ]
