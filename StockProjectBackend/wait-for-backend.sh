#!/bin/sh

# 👇 This is the fix: prepend `export` to each env var so cron can use them
printenv | grep -E 'EXTERNAL_API_KEY|INTERNAL_API_KEY|BACKEND_HOST|BACKEND_PORT' \
  | sed 's/^/export /' > /env.sh

chmod 600 /env.sh
echo "🔐 Environment prepared for cron execution."

# Wait for backend to be available before starting cron
until curl -s http://$BACKEND_HOST:$BACKEND_PORT/healthz > /dev/null; do
  echo "⏳ Waiting for backend to be available at $BACKEND_HOST:$BACKEND_PORT..."
  sleep 5
done

echo "✅ Backend is up. Starting cron."
cron -f
