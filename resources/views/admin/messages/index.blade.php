@extends('admin.dashboard')

@section('content')
    <div class="mb-8 p-2">
        <h2 class="mb-3"> <strong>Ecco tutti i messaggi della casa:</strong> </h2>
        <h1 class="uppercase font-semibold">{{$apartment->title}}</h1>
    </div>

    {{-- session --}}
    @if (Session::has('delete-message'))
        <p class="text-red-700 py-2 my-4">{{Session::get('delete-message')}}</p>
    @endif

    @php
        $i=1;
    @endphp
    <table class="shadow-2xl border border-slate-300 w-full table-auto">
        <thead class="mb-4">
            <tr class="border-slate-300 border bg-slate-200">
                <th class="p-4">#</th>
                <th class="p-4">Nome e Cognome</th>
                <th class="p-4">Email</th>
                <th class="p-4">Creato in data</th>
                <th class="px-12"></th>
            </tr>
        </thead>
        <tbody class="">
            @forelse ($apartment->messages as $message)
            <tr class="border-slate-300 border">
                <td class="font-bold p-4">{{$i++}}</td>
                <td class="p-4">{{$message->name}} {{$message->surname}}</td>
                <td class="p-4">{{$message->email}}</td>
                <td class="p-4">{{$message->created_at}}</td>
                <td class="flex justify-center items-center flex-wrap p-4">
                    <a class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 py-2 px-4 rounded-md mr-3 my-3" href="{{route('admin.message.show',$message->id)}}">visualizza</a>
                    <form class="delete_messages" action="{{route('admin.message.destroy', $message->id )}}" method="post">
                        @csrf
                        @method('DELETE')
                        <button class="bg-red-700 hover:bg-red-800 active:bg-red-900 active:text-black rounded-md py-2 px-4 hover:text-white" type="submit">cancella messaggio</button>
                    </form> 
                </td>
            </tr>
            @empty
            <tr>
                <td class="p-4 font-bold">Non ci sono Messaggi per questa casa</td>
            </tr>    
            @endforelse          
        </tbody>
    </table>


    <div class="mt-6 p-2">
        <a class="bg-yellow-500 hover:bg-yellow-700 active:bg-yellow-900 hover:text-white rounded-lg py-2 px-4" href="{{route('admin.apartment.show',$apartment->id)}}">torna nella pagina della casa</a>
    </div>
@endsection

@section('script')
<script type="text/javascript">

    
    let deleteMessages = document.querySelectorAll(".delete_messages");

    deleteMessages.forEach(message => {
        message.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare il messaggio?');

            if(confirm) this.submit();
        })
    });


</script>
@endsection