<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    @yield('content')
                    @if (request()->routeIs('dashboard'))
                        <h1 class="mb-4">Benvenuto/a nella tua Dashboard</h1>
                        <a class="bg-green-600 hover:bg-green-700 py-1 px-4 rounded-lg text-white" href="{{route('admin.apartment.create')}}">Inserisci una casa</a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>