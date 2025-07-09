from rest_framework import authentication, exceptions
from firebase_admin import auth as firebase_auth


# Define a proper user class compatible with Django's expectations
class FirebaseUser:
    def __init__(self, uid: str, email: str):
        self.uid = uid
        self.email = email

    @property
    def is_authenticated(self) -> bool:
        return True

    @property
    def is_anonymous(self) -> bool:
        return False

    def get_username(self) -> str:
        return self.email

    def __str__(self):
        return f"FirebaseUser<{self.email}>"


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Get the token from the Authorization header
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None  # No auth header = allow unauthenticated access or continue to next method

        # Check format: must be "Bearer <token>"
        parts = auth_header.split()
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Invalid Authorization header format.')

        id_token = parts[1]

        try:
            # Decode and verify token using Firebase Admin SDK
            decoded_token = firebase_auth.verify_id_token(id_token)

            # Extract Firebase UID or email
            firebase_uid = decoded_token.get('uid')
            email = decoded_token.get('email')

            # Create a valid user object
            user = FirebaseUser(uid=firebase_uid, email=email)

            return (user, None)

        except firebase_auth.InvalidIdTokenError:
            raise exceptions.AuthenticationFailed('Invalid Firebase ID token.')

        except firebase_auth.ExpiredIdTokenError:
            raise exceptions.AuthenticationFailed('Expired Firebase ID token.')

        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Authentication error: {str(e)}')
