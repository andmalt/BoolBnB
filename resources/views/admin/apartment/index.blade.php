@extends('admin.dashboard')

@section('content')
    <h1 class="mb-5 text-3xl">Le mie Case</h1>
    @forelse ($apartments as $apartment)
        <div class="sm:grid sm:grid-cols-1 md:flex my-6 p-4 justify-between items-center shadow-lg">
            <div class="flex flex-col flex-wrap">
                <h4 class="my-2 uppercase font-bold">{{$apartment->title}}</h4>
                <p class="my-1">{{$apartment->description}}</p>
                <p class="my-1">{{$apartment->price}}&euro; per notte</p>
            </div>
            <div class=" flex my-1 p-2 ">
                <a class=" bg-blue-500 hover:bg-blue-600 py-3 px-5 rounded-l-md" href="{{route('admin.apartment.show', $apartment->id)}}">visualizza</a>
                <form class="delete-house" action="{{route('admin.apartment.destroy', $apartment->id )}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button class=" bg-red-600 hover:bg-red-700 py-3 px-5 rounded-r-md" type="submit">cancella</button>
                </form>
            </div>
            
        </div>
    @empty
        <h2 class="my-3">Non ci sono case inserite</h2>
    @endforelse
    {{ $apartments->links() }}
@endsection

@section('script')
<script type="text/javascript">
    
    const deleteHouse = document.querySelectorAll(".delete-house");

    deleteHouse.forEach(form => {
        form.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare la casa?');

            if(confirm) this.submit();
        })
    });

</script>
@endsection