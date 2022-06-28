@extends('layouts.guestPages')

@section('content')
    <div class=" h-full">
        @forelse ($apartments as $apartment)
            <div class="sm:grid sm:grid-cols-1 md:flex my-6 p-8 justify-between items-center shadow-lg border border-slate-200">
                <div class="flex flex-col flex-wrap">
                    <a class=" text-blue-500 hover:text-blue-600 active:text-blue-800 py-3 px-5 rounded-md font-bold text-2xl" href="{{route('guest.apartment.show', $apartment->id)}}">{{$apartment->title}}</a>
                    <p class="my-1">{{$apartment->description}}</p>
                    <p class="my-1"><strong>{{$apartment->price}}&euro;</strong> per notte</p>
                </div>

            </div>
        @empty
            <h2 class="my-3">Non ci sono case inserite</h2>
        @endforelse

    {{ $apartments->links() }}

    </div>
@endsection