@extends('admin.dashboard')

@section('content')
    <div class="mb-8 p-2">
        <h2 class="mb-3"> <strong>Ecco tutti i messaggi della casa:</strong> </h2>
        <h1 class="uppercase font-semibold">{{$apartment->title}}</h1>
    </div>

    {{-- session --}}
    {{-- @if (Session::has('delete-image'))
        <p class="text-red-700 py-2 my-4">{{Session::get('delete-image')}}</p>
    @endif --}}
    
    @php
        $i=1;
    @endphp
    <div class="flex flex-row flex-wrap">
        @forelse ($apartment->messages as $message)
            <div class="mb-8">
                <h5><span class="uppercase">Messaggio numero:</span> <span class="font-bold">{{$i++}}</span></h5>
            </div>
            <div class="shadow-xl mb-6 rounded-md p-5">  
                <div class="">
                    <h3> <span class="font-semibold"> Scritto da: </span> <span class="underline">{{$message->name}} {{$message->surname}}</span> </h3>
                    <h4 class="mb-4"> <span class="font-semibold">Email: </span> <span class="underline">{{$message->email}}</span> </h4>
                    <p>{{$message->message_content}}</p>
                </div>             
                <div class="text-center my-5">
                    <form class="delete_image" action="{{route('admin.message.destroy', $message->id )}}" method="post">
                        @csrf
                        @method('DELETE')
                        <button class="bg-red-700 hover:bg-red-800 rounded-md py-2 px-4 hover:text-white " type="submit">cancella messaggio</button>
                    </form> 
                </div>   
            </div>
        @empty
            <h3>Questa casa non ha messaggi</h3>
        @endforelse
    </div>
    <div class="mt-6 p-2">
        <a class="bg-yellow-500 hover:bg-yellow-700 hover:text-white rounded-lg py-2 px-4" href="{{route('admin.apartment.show',$apartment->id)}}">torna nella pagina della casa</a>
    </div>
@endsection

@section('script')
<script type="text/javascript">

    
    let deleteMessages = document.querySelectorAll(".delete_image");
    // console.log(deleteImage);

    deleteMessages.forEach(message => {
        message.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare il messaggio?');

            if(confirm) this.submit();
        })
    });


</script>
@endsection