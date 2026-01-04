# ---------- PHP base ----------
FROM php:8.4-fpm AS php_base
WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git unzip zip curl \
    libzip-dev libpng-dev libjpeg-dev libfreetype6-dev \
    libicu-dev libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    pdo_mysql mbstring zip exif pcntl bcmath gd intl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---------- Composer deps ----------
FROM php_base AS vendor
COPY composer.json composer.lock ./
RUN composer install \
    --prefer-dist \
    --no-interaction \
    --no-progress \
    --optimize-autoloader \
    --no-scripts

# ---------- Node build (Vite) ----------
FROM node:22-alpine AS node_build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Nginx web ----------
FROM nginx:alpine AS web
COPY docker/nginx/app.conf /etc/nginx/conf.d/default.conf
# Public folder (index.php, images, etc.)
COPY public /var/www/html/public

# ---------- Runtime (php-fpm only) ----------
FROM php_base AS runtime
COPY . .
COPY --from=vendor /var/www/html/vendor /var/www/html/vendor
# Vite build output generated in node_build stage
COPY --from=node_build /app/public/build /var/www/html/public/build

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm", "-F"]
