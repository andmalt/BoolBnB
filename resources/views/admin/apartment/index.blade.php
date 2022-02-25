@extends('admin.dashboard')

@section('content')
    <h1 class="mb-5 text-3xl">Le mie Case</h1>
    @forelse ($apartments as $apartment)
        <div class="my-5 p-2">
            <h5 class="my-2">{{$apartment->title}}</h5>
            <p class="my-1">{{$apartment->description}}</p>
            <div class="flex my-1 p-2">
                <a class=" bg-blue-500 py-3 px-5" href="{{route('admin.apartment.show', $apartment->id)}}">visualizza</a>
                <form class="delete-house" action="{{route('admin.apartment.destroy', $apartment->id )}}" method="post">
                    @csrf
                    @method('DELETE')
                    <button class=" bg-red-600 py-3 px-5" type="submit">cancella</button>
                </form>
            </div>
            
        </div>
    @empty
        <h2 class="my-3">Non ci sono case inserite</h2>
    @endforelse
@endsection

@section('script')
<script type="text/javascript">
    
    const deleteHouse = document.querySelectorAll(".delete-house");

    deleteHouse.forEach(house => {
        house.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare la casa?');

            if(confirm) this.submit();
        })
    });

</script>
@endsection