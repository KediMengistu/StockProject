#!/bin/bash

# Wait until MySQL is ready
echo "Waiting for MariaDB at $DB_HOST:$DB_PORT..."

while ! mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" --silent; do
  sleep 1
done

echo "MariaDB is up - making migrations if needed..."
python manage.py makemigrations

echo "Applying migrations..."
python manage.py migrate

echo "Checking if Django superuser exists..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='${DJANGO_SUPERUSER_USERNAME}').exists():
    print("Creating superuser...")
    User.objects.create_superuser(
        '${DJANGO_SUPERUSER_USERNAME}',
        '${DJANGO_SUPERUSER_EMAIL}',
        '${DJANGO_SUPERUSER_PASSWORD}'
    )
else:
    print("Superuser already exists. Skipping creation.")
EOF

echo "Starting Django server..."
exec "$@"
