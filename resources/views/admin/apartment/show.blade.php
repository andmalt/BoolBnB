@extends('admin.dashboard')

@section('content')
    <h1>Sono Admin Show</h1>

    <div class="py-5">
        <h2>{{$apartment->title}}</h2>
        <p>{{$apartment->description}}</p>
        @foreach ($apartment->photos as $key => $photo)
            <div class="img-thumbnail">
             
            </div>
        @endforeach
    </div>
@endsection