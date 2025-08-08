import os
import firebase_admin
from firebase_admin import credentials

def initialize_firebase():
    cred = os.environ.get('FIREBASE_CREDENTIALS')

    if not cred:
        raise ValueError("FIREBASE_CREDENTIALS environment variable not set.")

    if not firebase_admin._apps:
        cred = credentials.Certificate(cred)
        firebase_admin.initialize_app(cred)