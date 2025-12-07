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

7. Run database migrations:
```bash
   php artisan migrate
```

8. Start the Laravel development server:
```bash
   php artisan serve
```

Now you can access the application at `http://127.0.0.1:8000`.