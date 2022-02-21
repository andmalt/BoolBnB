@extends('admin.dashboard')

@section('content')
    <h1>Sono Admin Show</h1>

    <div class="py-5">
        <h2>{{$apartment->title}}</h2>
        <p>{{$apartment->description}}</p>
        @foreach ($apartment->photos as $photo)
            <div class="w-1/4 h-48 flex flex-row flex-wrap mb-4">
                    <img class="object-cover object-center flex-auto" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="{{$photo->id}} image apartment">         
            </div>
        @endforeach
        <a class="rounded-lg bg-gray-600 hover:bg-gray-800 text-white py-2 px-5" href="{{route('admin.images.index',$apartment->id)}}">vai nelle foto della casa</a>
    </div>
@endsection