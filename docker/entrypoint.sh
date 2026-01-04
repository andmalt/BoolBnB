#!/bin/sh
set -e

# Persist APP_KEY on a volume so it survives restarts
KEY_FILE="/var/www/html/storage/app/.app_key"
SEEDED_FLAG="/var/www/html/storage/app/.seeded"

# Ensure Laravel writable dirs exist (volumes are empty on first run)
mkdir -p /var/www/html/storage/app
mkdir -p /var/www/html/storage/framework/cache
mkdir -p /var/www/html/storage/framework/sessions
mkdir -p /var/www/html/storage/framework/views
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache

# Permissions
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R ug+rwX /var/www/html/storage /var/www/html/bootstrap/cache


if [ -z "$APP_KEY" ]; then
  if [ -f "$KEY_FILE" ]; then
    export APP_KEY="$(cat "$KEY_FILE")"
  else
    export APP_KEY="base64:$(php -r 'echo base64_encode(random_bytes(32));')"
    echo "$APP_KEY" > "$KEY_FILE"
  fi
fi

if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  echo "Waiting for DB..."
  php -r '
    $host=getenv("DB_HOST") ?: "db";
    $port=getenv("DB_PORT") ?: "3306";
    $db=getenv("DB_DATABASE") ?: "boolbnb";
    $user=getenv("DB_USERNAME") ?: "boolbnb";
    $pass=getenv("DB_PASSWORD") ?: "boolbnb";
    $dsn="mysql:host=$host;port=$port;dbname=$db";
    for ($i=0; $i<60; $i++) {
      try { new PDO($dsn,$user,$pass); exit(0); }
      catch (Exception $e) { sleep(2); }
    }
    fwrite(STDERR,"DB not ready\n"); exit(1);
  '

  echo "Running migrations..."
  php artisan migrate --force

  if [ "${SEED_ON_START:-true}" = "true" ] && [ ! -f "$SEEDED_FLAG" ]; then
    echo "Seeding database (first run only)..."
    php artisan db:seed --force
    touch "$SEEDED_FLAG"
  fi
fi

exec "$@"
