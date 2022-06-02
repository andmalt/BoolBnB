<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'BoolBnB') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
    </head>
    <body class="antialiased">
        <div class="bg-gray-300 dark:bg-gray-900 sm:pt-0 mb-9">
            
            @if (Route::has('login'))
                <div class="flex justify-between items-center h-16 bg-gray-300 w-full px-4 flex-wrap">

                    <div class="logo w-72">
                        <a href="{{url('/')}}"><img class="w-full" src="{{asset('images/logo/logo.png')}}" alt="logo"></a>
                    </div>
                    
                    @auth
                    <div class="text-right">
                        <a href="{{ url('/dashboard') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">{{ Auth::user()->name }} Dashboard</a>
                    </div>  
                        
                    @else
                    <div class="text-right">
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                        @endif
                    </div>      
                    @endauth
                </div>
            @endif

            
        </div>
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8 mt-20">
            <a class="bg-green-600 hover:bg-green-700 active:bg-green-800 py-3 px-6 rounded-lg" href="{{route('guest.apartment.index')}}">visualizza case</a>
        </div>
    </body>
</html>