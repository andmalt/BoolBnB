@extends('admin.dashboard')

@section('content')
    <h1>Sono Admin Index</h1>
    @forelse ($apartments as $apartment)
        <div class="my-5">
            <h5>{{$apartment->title}}</h5>
            <p>{{$apartment->description}}</p>
            <a class=" bg-red-500 " href="{{route('admin.apartment.show', $apartment->id)}}">visualizza</a>
        </div>
    @empty
        <h2>Non ci sono case inserite</h2>
    @endforelse
@endsection