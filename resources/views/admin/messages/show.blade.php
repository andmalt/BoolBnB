@extends('admin.dashboard')

@section('content')
    <div class="mb-8 shadow-lg p-8 border border-slate-200">
        <h3> 
            <span class="font-semibold"> Scritto da: </span> <span class="underline">{{$message->name}} {{$message->surname}}</span> 
        </h3>
        <h4 class="mb-3"> <span class="font-semibold">Email: </span> <span class="underline">{{$message->email}}</span> </h4>
        <p class=" text-slate-500 mb-6">{{$message->created_at}}</p>
        <p>{{$message->message_content}}</p>
    </div>

    <div class="mt-6 p-2 flex flex-wrap justify-between items-center">
        <a class="bg-yellow-500 hover:bg-yellow-700 hover:text-white rounded-lg py-2 px-4" href="{{route('admin.messages.index',$message->apartment_id)}}">torna indietro</a>
        <form id="delete_message" action="{{route('admin.message.destroy', $message->id )}}" method="post">
            @csrf
            @method('DELETE')
            <button class="bg-red-700 hover:bg-red-800 rounded-md py-2 px-4 hover:text-white" type="submit">cancella messaggio</button>
        </form> 
    </div>
@endsection

@section('script')
<script type="text/javascript">

    
    let deleteMessages = document.getElementById("delete_message");

    deleteMessages.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare il messaggio?');

            if(confirm) this.submit();
    })

</script>
@endsection