@extends('layouts.guestPages')

@section('content')
    <div class="mt-10">
         <div class="py-5 mb-4">
            <h1 class="uppercase text-2xl text-lime-900 mb-8">{{$apartment->title}}</h1>

            <div class="columns-3xs mb-5">
                @forelse ($apartment->photos as $photo)
                    <img class="w-full aspect-video mb-3 shadow-xl rounded-md" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="{{$photo->id}} image apartment">
                @empty
                    <h1>La casa non ha foto</h1>
                @endforelse
            </div>
        </div>

        <div class="py-4 mb-8">
            <h2 class="mb-3"><strong> Descrizione:</strong></h2>
            <p class="mb-6">{{$apartment->description}}</p>
            <h2 class="mb-3"><strong>Prezzo:</strong></h2>
            <p class="mb-5">{{$apartment->price}}&euro; per notte</p>
            <h2 class="mb-3"><strong>Indirizzo:</strong></h2>
            <p>{{$apartment->city}}</p>
            <p>{{$apartment->address}}</p>
        </div> 

        <div class="flex flex-wrap items-center mb-8">
            <p>
            @foreach ($apartment->facilities as $facility)
                {{$facility->name}},
            @endforeach
            </p>
        </div>

        <div class="mb-14">
            @if (Session::has('send-mail'))
                <p class="text-green-700 py-2 my-4">{{Session::get('send-mail')}}</p>
            @endif


            {{-- Form Message --}}
            <h2 class="mb-4 uppercase">Se desideri ulteriori informazioni per questa casa manda un messaggio al propretario</h2>
            <form action="{{route('guest.message.send',['apartment_id' => $apartment->id])}}" method="post">
            @csrf
                <label class="block mb-4">
                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Nome
                    </span>
                    <input type="text" name="name" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Il tuo nome" value="{{old('name')}}"/>
                    @error('name')
                        <small class="text-red-500">{{$message}}</small>
                    @enderror
                </label>
                <label class="block mb-4">
                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Cognome
                    </span>
                    <input type="text" name="surname" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="Il tuo Cognome" value="{{old('surname')}}"/>
                    @error('surname')
                        <small class="text-red-500">{{$message}}</small>
                    @enderror
                </label>
                <label class="block mb-4">
                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Email
                    </span>
                    <input type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="La tua email" value="{{old('email')}}"/>
                    @error('email')
                        <small class="text-red-500">{{$message}}</small>
                    @enderror
                </label>
                <label class="block mb-4">
                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Messaggio
                    </span>
                    <textarea name="message_content" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-2/3 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" rows="4" placeholder="Inserisci il tuo messaggio" value="{{old('message_content')}}"></textarea>
                    @error('message_content')
                        <small class="text-red-500">{{$message}}</small>
                    @enderror
                </label>
                <button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 py-2 px-6 rounded-md" type="submit">Invia messaggio</button>
            </form>
        </div>
        <div class="flex justify-end mb-8">
            <a class="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md py-3 px-8" href="{{route('guest.apartment.index')}}">torna indietro</a>
        </div>

    </div>
@endsection