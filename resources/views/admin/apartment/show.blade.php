@extends('admin.dashboard')

@section('content')
@if ($apartment->user_id == Auth::user()->id)
    <div class="py-5 mb-4">
        <h2><strong>La casa:</strong></h2>
        <h1 class="uppercase text-2xl text-lime-900 mb-8">{{$apartment->title}}</h1>

        <div class="columns-3xs mb-5">
            @forelse ($apartment->photos as $photo)
                <img class="w-full aspect-video mb-3 shadow-xl rounded-md" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="{{$photo->id}} image apartment">
            @empty
                <h1>La casa non ha foto</h1>
            @endforelse
        </div>

        <a class="rounded-lg bg-gray-600 hover:bg-gray-800 text-white py-2 px-5" href="{{route('admin.images.index',$apartment->id)}}">inserisci e cancella foto</a>
    </div>

    <div class="py-4">
        <h2 class="mb-3"><strong> Descrizione:</strong></h2>
        <p class="mb-6">{{$apartment->description}}</p>
        <h2 class="mb-3"><strong>Prezzo:</strong></h2>
        <p class="mb-5">{{$apartment->price}}&euro; per notte</p>
        <a class="rounded-lg bg-blue-500 hover:bg-blue-600 hover:text-white py-2 px-4" href="{{route('admin.apartment.edit',$apartment->id)}}">Modifica casa</a>
    </div>
@else
    <h1 class=" uppercase underline text-4xl text-red-600">Non sei autorizzato/a ad entrare in questa pagina</h1>
@endif
@endsection