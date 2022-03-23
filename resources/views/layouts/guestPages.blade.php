
<x-guest-layout class="antialiased">
    <div class=" bg-gray-300 dark:bg-gray-900 sm:pt-0 mb-9">
        
        @if (Route::has('login'))
            <div class="flex justify-between items-center h-16 bg-gray-300 w-full px-4 flex-wrap shadow-md">

                <div class="logo w-72">
                    <a href="{{url('/')}}"><img class="w-full" src="{{asset('images/logo/logo.png')}}" alt="logo"></a>
                </div>

                <div class=" w-auto">
                    
                    <form class="flex justify-center items-center" action="{{route('guest.apartment.index')}}" method="get">

                        <x-dropdown2 align="top" width="48">
                            <x-slot name="trigger">
                                <button @Click.prevent="" id="btn-dropdown" class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
                                    <div>
                                        Seleziona i servizi
                                    </div>
                                    <div class="ml-1">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                </button>
                            </x-slot>
                            <x-slot name="content">
                    
                                <label for="facilities" class="flex w-full">
                                    <select name="facilities" id="facilities" class="w-full bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" multiple size="12">
                                        @foreach ($facilities as $facility)
                                        <option value="{{$facility->id}}">{{ $facility->name }}</option>
                                        @endforeach
                                    </select>
                                </label>
                            </x-slot>
                        </x-dropdown2>
                        
                        
                        <label class="search w-1/5">
                            <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-l-md py-2 pl-2 pr-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="città" type="text" name="city"/>
                        </label>
                        <label class="search">
                            <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-5 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="indirizzo" type="text" name="address"/>
                        </label>
                        <button class="bg-green-500 hover:bg-green-600 active:bg-green-700 py-2 px-4 rounded-r-md" type="submit">
                            <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </button>
                    </form>
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
    <div class=" h-full mx-auto sm:px-4 md:px-8 lg:px-12">           
        @yield('content')
    </div>

</x-guest-layout>
