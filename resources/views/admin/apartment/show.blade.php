@extends('admin.dashboard')

@section('content')

    <div class="py-5 mb-4">
        <h2><strong>La casa:</strong></h2>
        <h1 class=" text-2xl text-lime-900 mb-3">{{$apartment->title}}</h1>

        <div class="columns-3xs mb-5 relative">
            @foreach ($apartment->photos as $photo)
                <img class=" w-full aspect-video mb-3 shadow-xl rounded-md" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="{{$photo->id}} image apartment">         
            @endforeach
        </div>

        <a class="rounded-lg bg-gray-600 hover:bg-gray-800 text-white py-2 px-5" href="{{route('admin.images.index',$apartment->id)}}">inserisci e cancella foto</a>
    </div>

    <div class="py-4">
        <h2 class="mb-3"><strong> Descrizione:</strong></h2>
        <p class="mb-6">{{$apartment->description}}</p>
        <h2 class="mb-3"><strong>Prezzo:</strong></h2>
        <p class="">{{$apartment->price}}&euro; per notte</p>
    </div>
@endsection