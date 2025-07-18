import sys
from django.apps import AppConfig


class StockapicrudConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'StockAPICRUD'

    def ready(self):
        from firebase.firebase_auth_init import initialize_firebase
        if "makemigrations" in sys.argv or "migrate" in sys.argv:
            return
        initialize_firebase()
