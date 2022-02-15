@extends('admin.dashboard')

@section('content')
    <h1>Sono Admin Index</h1>
    @forelse ($apartments as $apartment)
        <div class="my-5">
            <h5>{{$apartment->title}}</h5>
            <p>{{$apartment->description}}</p>
            <div class="flex">
                <a class=" bg-blue-500 py-3 px-5" href="{{route('admin.apartment.show', $apartment->id)}}">visualizza</a>
                <form action="{{route('admin.apartment.destroy', $apartment->id )}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button class=" bg-red-600 py-3 px-5" type="submit">cancella</button>
                </form>
            </div>
            
        </div>
    @empty
        <h2>Non ci sono case inserite</h2>
    @endforelse
@endsection