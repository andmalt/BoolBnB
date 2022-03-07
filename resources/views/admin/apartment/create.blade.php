@extends('admin.dashboard')

@section('content')
    <h1 class="mb-10 font-bold">INSERISCI LA TUA CASA</h1>
        {{-- @if ($errors->any())
            <div class="text-red-700 py-2 my-4">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif --}}
    <form action="{{ route('admin.apartment.store')}}" method="post" enctype="multipart/form-data" >
        @csrf
       <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Titolo
            </span>
            <input type="text" name="title"  class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"  placeholder="titolo che descrive brevemente la casa" />
            @error('title')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Camere
            </span>
            <input type="text" name="rooms" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di camere" />
            @error('rooms')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Posti letto
            </span>
            <input type="text" name="beds" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero massimo di posti letto" />
            @error('beds')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Bagni
            </span>
            <input type="text" name="bathrooms" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di bagni" />
            @error('bathrooms')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Metri quadri
            </span>
            <input type="text" name="square" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="numero di metri quadri" />
            @error('square')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>

         <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Immagini
            </span>
            <input type="file" name="images[]" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-1/4 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="inserire le immagini della casa" multiple/>
            @error('images')
                <small class="text-red-500">{{$message}}</small>
            @enderror
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
                        <input type="checkbox" name="facilities[]" id="facility-{{$facility->id}}" value="{{ $facility->id }}" class="mt-1 px-2 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"/>
                        @error('facilities')
                            <small class="text-red-500">{{$message}}</small>
                        @enderror
                    </div>
                @endforeach
            </div>
        </div>

        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Regione
            </span>
            <select name="region" id="region" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1">
                @foreach ($regions as $region)
                    <option value="{{$region}}">{{$region}}</option>
                @endforeach
            </select>
            @error('region')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Città
            </span>
            <input type="text" name="city" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="in quale città si trova" />
            @error('city')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Indirizzo
            </span>
            <input type="text" name="address" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="indirizzo della casa" />
            @error('address')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Descrivi la casa
            </span>
            <textarea cols="30" rows="5"  name="description" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="una breve descrizione dell'abitazione"></textarea>
            @error('description')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>
        <label class="block mt-4">
            <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Prezzo
            </span>
            <input type="text" name="price" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="prezzo in euro per notte" />
            @error('price')
                <small class="text-red-500">{{$message}}</small>
            @enderror
        </label>

        <button class="bg-green-700 hover:bg-green-800 text-white rounded-xl py-2 px-6 m-5" type="submit">Crea</button>
    </form>
@endsection