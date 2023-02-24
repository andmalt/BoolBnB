@extends('admin.dashboard')

@section('content')

    <h1 class="mb-4 font-bold">MODIFICA LA TUA CASA</h1>
    <h2 class="mb-10 uppercase">{{ $apartment->title }}</h2>

    @if ($errors->any())
        <div class="text-red-700 py-2 my-4">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form id="update-apartment" action="{{ route('admin.apartment.update', $apartment->id) }}" method="post"
        enctype="multipart/form-data">
        @csrf
        @method('PATCH')

        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Camere
            </span>
            <input type="text" name="rooms"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="numero di camere" value="{{ old('rooms', $apartment->rooms) }}" />
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Posti letto
            </span>
            <input type="text" name="beds"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="numero massimo di posti letto" value="{{ old('beds', $apartment->beds) }}" />
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Bagni
            </span>
            <input type="text" name="bathrooms"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="numero di bagni" value="{{ old('bathrooms', $apartment->bathrooms) }}" />
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Metri quadri
            </span>
            <input type="text" name="square"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="numero di metri quadri" value="{{ old('square', $apartment->square) }}" />
        </label>

        <div class="block mt-5">
            <span class=" block text-sm font-bold text-slate-700">
                Servizi
            </span>
            <div class="flex flex-row flex-auto flex-wrap">
                @foreach ($facilities as $facility)
                    <div class="mt-1 px-3 py-2">
                        <label for="facility-{{ $facility->id }}" class=" block text-sm font-medium text-slate-700">
                            {{ $facility->name }}
                        </label>
                        <input type="checkbox" name="facilities[]" id="facility-{{ $facility->id }}"
                            value="{{ $facility->id }}"
                            class="mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                            @if (in_array($facility->id, $facilityIds)) checked @endif />
                    </div>
                @endforeach
            </div>
        </div>

        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Regione
            </span>
            <select name="region" id="region"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1">
                @foreach ($regions as $region)
                    <option value="{{ $region }}" @if ($region == $apartment->region) selected @endif>

                        {{ $region }}
                    </option>
                @endforeach
            </select>
        </label>

        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Città
            </span>
            <input type="text" name="city"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="in quale città si trova" value="{{ old('city', $apartment->city) }}" />
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Indirizzo
            </span>
            <input type="text" name="address"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="indirizzo della casa" value="{{ old('address', $apartment->address) }}" />
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Descrivi la casa
            </span>
            <textarea cols="30" rows="5" name="description"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="una breve descrizione dell'abitazione">{{ $apartment->description }}</textarea>
        </label>
        <label class="block mt-3">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Prezzo
            </span>
            <input type="text" name="price"
                class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
                placeholder="prezzo in euro per notte" value="{{ old('price', $apartment->price) }}" />
        </label>

        <button class="bg-green-700 hover:bg-green-800 text-white rounded-xl py-2 px-6 m-5" type="submit">Modifica</button>
        <a class="bg-blue-500 hover:bg-blue-600 rounded-xl py-2 px-4 m-5"
            href="{{ route('admin.apartment.show', $apartment->id) }}">Torna indietro</a>
    </form>
@endsection

@section('script')
    <script type="text/javascript">
        const updateApartment = document.getElementById("update-apartment");

        updateApartment.addEventListener('submit', function(event) {
            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler modificare la casa?');

            if (confirm) this.submit();
        })
    </script>
@endsection
