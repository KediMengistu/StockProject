#!/bin/bash

# Wait until MySQL is ready
echo "Waiting for MariaDB at $DB_HOST:$DB_PORT..."

while ! mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" --silent; do
  sleep 1
done

echo "MariaDB is up - starting Django..."
exec "$@"
