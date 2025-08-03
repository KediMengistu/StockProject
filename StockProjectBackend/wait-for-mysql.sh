# #!/bin/bash

# # Wait until MySQL is ready
# echo "Waiting for MariaDB at $DB_HOST:$DB_PORT..."

# while ! mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" --silent; do
#   sleep 1
# done

# echo "MariaDB is up - making migrations if needed..."
# python manage.py makemigrations

# echo "Applying migrations..."
# python manage.py migrate

# echo "Checking if Django superuser exists..."
# python manage.py shell << EOF
# from django.contrib.auth import get_user_model
# User = get_user_model()
# if not User.objects.filter(username='${DJANGO_SUPERUSER_USERNAME}').exists():
#     print("Creating superuser...")
#     User.objects.create_superuser(
#         '${DJANGO_SUPERUSER_USERNAME}',
#         '${DJANGO_SUPERUSER_EMAIL}',
#         '${DJANGO_SUPERUSER_PASSWORD}'
#     )
# else:
#     print("Superuser already exists. Skipping creation.")
# EOF

# echo "Starting Django server..."
# exec "$@"

#!/bin/bash

#!/bin/bash
set -e

echo "🔍 Debug Info: Connecting to AWS RDS"
echo "DB Host: $DB_HOST"
echo "DB Port: $DB_PORT"
echo "DB Name: $MARIADB_DATABASE"
echo "DB User: $MARIADB_USER"

echo "⏳ Waiting for AWS RDS MariaDB at $DB_HOST:$DB_PORT..."
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" --silent; do
  >&2 echo "🔁 Still waiting for RDS..."
  sleep 2
done

echo "✅ MariaDB is up — checking migrations..."
python manage.py showmigrations --plan

echo "⚙️ Applying unapplied migrations..."
python manage.py migrate --noinput

echo "🚀 Starting Django..."
exec "$@"
