from django.apps import AppConfig


class StockapicrudConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'StockAPICRUD'

    def ready(self):
        from firebase.firebase_auth_init import initialize_firebase
        initialize_firebase()
