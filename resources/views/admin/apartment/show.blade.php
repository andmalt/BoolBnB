@extends('admin.dashboard')

@section('content')
    <h1>Sono Admin Show</h1>

    <div class="py-5">
        <h2>{{$apartment->title}}</h2>
        <p>{{$apartment->description}}</p>
        @foreach ($apartment->photos as $photo)
            <div class="w-1/4 h-48 justify-center flex">
                <img class="object-cover object-center flex-auto" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="{{$photo->id}} image apartment">
            </div>
        @endforeach
    </div>
@endsection