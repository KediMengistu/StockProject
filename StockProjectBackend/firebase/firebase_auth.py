from rest_framework import authentication, exceptions
from firebase_admin import auth as firebase_auth
import firebase_admin

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None  # No auth header = move on to other auth methods (or return 403 later)

        # Check format: must be "Bearer <token>"
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Invalid Authorization header format.')

        id_token = parts[1]

        try:
            # Decode and verify token using Firebase Admin SDK
            decoded_token = firebase_auth.verify_id_token(id_token)

            # You can extract Firebase UID or email like this:
            firebase_uid = decoded_token.get('uid')
            email = decoded_token.get('email')

            # You can either return an AnonymousUser or a custom User object
            # Here we just return a dummy user object (or None)
            user = type('FirebaseUser', (), {'uid': firebase_uid, 'email': email})()

            return (user, None)

        except firebase_auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed('Invalid Firebase ID token.')

        except firebase_auth.ExpiredIdTokenError:
            raise exceptions.AuthenticationFailed('Expired Firebase ID token.')

        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication error: {str(e)}')
