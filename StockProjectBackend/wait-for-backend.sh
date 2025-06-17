#!/bin/bash

set -e

echo "⏳ Waiting for backend to be available at $BACKEND_HOST:$BACKEND_PORT..."

# Wait for Django backend to be healthy
until curl -s "http://$BACKEND_HOST:$BACKEND_PORT/api/health/" > /dev/null; do
  >&2 echo "🔁 Backend is unavailable — sleeping..."
  sleep 2
done

echo "✅ Backend is up — preparing cron log..."
touch /var/log/cron.log
chmod 666 /var/log/cron.log

echo "✅ Starting cron in foreground..."
cron -f
