# nonfirebase/internal_auth.py

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
import os

class InternalAPIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        internal_key = request.headers.get("X-INTERNAL-KEY")
        expected_key = os.environ.get("INTERNAL_API_KEY")
        if internal_key is None:
            return None  # Allow other authenticators to try

        if internal_key != expected_key:
            raise AuthenticationFailed("Invalid internal API key")

        return (None, None)
