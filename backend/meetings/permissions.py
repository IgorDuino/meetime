from rest_framework import permissions
from functools import reduce


def any_of(*perm_classes):
    """Returns permission class that allows access for
    one of permission classes provided in perm_classes"""

    class Or(permissions.BasePermission):
        def has_permission(*args):
            allowed = [p.has_permission(*args) for p in perm_classes]
            return reduce(lambda x, y: x or y, allowed)

        def has_object_permission(*args):
            allowed = [p.has_object_permission(*args) for p in perm_classes]
            return reduce(lambda x, y: x or y, allowed)

    return Or


def all_of(*perm_classes):
    """Returns permission class that allows access for
    all of permission classes provided in perm_classes"""

    class And(permissions.BasePermission):
        def has_permission(*args):
            allowed = [p.has_permission(*args) for p in perm_classes]
            return reduce(lambda x, y: x and y, allowed)

        def has_object_permission(*args):
            allowed = [p.has_object_permission(*args) for p in perm_classes]
            return reduce(lambda x, y: x and y, allowed)

    return And


class IsOwnerOrStaff(permissions.BasePermission):
    message = "You must be the owner of this object."

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.created_by == request.user or request.user.is_staff


class WithAccessCode(permissions.BasePermission):
    message = "You must have access to this meeting."

    def has_object_permission(self, request, view, obj):
        return obj.access_code == request.query_params.get("access_code")
