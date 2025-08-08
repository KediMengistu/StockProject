import os
from rest_framework.permissions import BasePermission

class IsInternalRequest(BasePermission):
    def has_permission(self, request, view):
        internal_key = os.environ.get("INTERNAL_API_KEY")
        provided_key = request.headers.get("X-INTERNAL-KEY")
        return internal_key and provided_key == internal_key
