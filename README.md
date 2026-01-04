<p align="center">
    <h1 align="center">
        Boolbnb
    </h1>
</p>

Boolbnb is my modification in the final project of the [boolean.careers](https://boolean.careers/) course, using a frontend exclusively with TypeScript [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/) and a backend with [Laravel](https://laravel.com/) 12.



## Quickly Start

To start the project, follow these steps:
1. Clone the repository:

```bash
   git clone https://github.com/andmalt/BoolBnB
   cd BoolBnB
``` 

2. Install backend dependencies using Composer:

```bash
   composer install
```

3. Install frontend dependencies using npm:
```bash
   npm install
```

4. Run the development server:
```bash
   npm run dev
```

5. Set up your `.env` file for database configuration and other environment variables. You can copy the example file:

```bash
   cp .env.example .env
```

6. Generate an application key:
```bash
   php artisan key:generate
```

7. Run database migrations and seeders(fake data if needed):
```bash
   php artisan migrate

   php artisan db:seed
```

8. Start the Laravel development server:
```bash
   php artisan serve
```

9. Start the Scheduler (to run scheduled tasks):
```bash
   php artisan schedule:work
```

Now you can access the application at `http://127.0.0.1:8000`.

### Requirements
- PHP >= 8.4
- Composer
- Node.js >= 22.x
- MySQL or any other database supported by Laravel
- Minio (for local S3-compatible storage)

- MINIO CLI (for managing S3 buckets) important to set the bucket and **`policies`**
  
## MinIO (S3-compatible storage) + Public GET for photos

This project uses MinIO locally as an S3-compatible storage.
Sets it to **public download** (anonymous GET), so images can be displayed in the browser without any authorization.

The initialization is done via MinIO Client (mc) using:

```bash
mc anonymous set download local/boolbnb
```

This enables unauthenticated read access (public GET) for listing in the bucket.
For more information about MinIO policies, see the [official documentation](https://docs.min.io/enterprise/aistor-object-store/administration/iam/access/).

### Laravel S3/MinIO env example

Make sure your `.env` contains something like:

```env
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=boolbnb
AWS_ENDPOINT=http://minio:9000
AWS_USE_PATH_STYLE_ENDPOINT=true
AWS_URL=http://localhost:9000/boolbnb
```

Laravel uses the S3 driver (Flysystem) for MinIO as well. [Laravel](https://laravel.com/docs/12.x/filesystem#s3-driver-configuration).

---

### Note
Make sure to configure your database and other environment variables, principally AWS credentials, in the `.env` file before running migrations and seeders.

## Docker (Recommended)

This project can be started entirely with Docker (Laravel + MySQL + MinIO + Scheduler).

### Requirements
Docker >= 29.x

### Start
```bash
docker compose up -d --build
```

Now open:

* App: [http://localhost:8080](http://localhost:8080)
* MinIO Console: [http://localhost:9001](http://localhost:9001) (user/pass: minioadmin / minioadmin)
* MinIO S3 endpoint: [http://localhost:9000](http://localhost:9000)

---


