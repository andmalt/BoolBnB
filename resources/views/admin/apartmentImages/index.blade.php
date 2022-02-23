@extends('admin.dashboard')

@section('content')
    <div class="mb-5 p-2">
        <h1>Ecco tutte le foto della casa {{$apartment->title}}</h1>
    </div>
    @if ($errors->any())
        <div class="text-red-700 py-2 my-4">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="my-5 p-2 flex flex-row flex-wrap">
        <div class="w-full">
            <form action="{{route('admin.image.store',$apartment->id)}}" method="post" enctype="multipart/form-data">
                @csrf
                <label class="block mt-3">
                    <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Immagini
                    </span>
                    <input type="file" name="images[]" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-3/4 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1" placeholder="inserire le immagini della casa" multiple/>
                </label>
                 <div class="my-3">
                    <button class="bg-green-700 hover:bg-green-800 rounded-lg py-2 px-4" type="submit">
                        inserisci foto
                    </button>
                </div>
            </form>
        </div>
    </div>
    <div class="flex flex-row flex-wrap">
        @forelse ($apartment->photos as $photo)
            <div class="shadow-xl m-2 rounded-md
            ">  
                <div class="">
                    <img class="h-36" src="{{$photo->getImagePrefix().$photo->image_url}}" alt="foto casa numero {{$photo->id}}">
                </div>             
                <div class="text-center my-3">
                    <form class="delete_image" action="{{route('admin.image.destroy', $photo->id )}}" method="post">
                        @csrf
                        @method('DELETE')
                        <button class="bg-red-700 hover:bg-red-800 rounded-md py-2 px-4 hover:text-white " type="submit">cancella foto</button>
                    </form> 
                </div>   
            </div>
        @empty
            <h3>Questa casa non ha foto</h3>
        @endforelse
    </div>
    <div class="text-center mt-6 p-2">
        <a class="bg-yellow-500 hover:bg-yellow-700 hover:text-white rounded-lg py-2 px-4" href="{{route('admin.apartment.show',$apartment->id)}}">torna nella pagina della casa</a>
    </div>
@endsection
@section('script')
<script type="text/javascript">

    
    let deleteImage = document.querySelectorAll(".delete_image");
    // console.log(deleteImage);

    deleteImage.forEach(form => {
        form.addEventListener('submit',function(event){

            event.preventDefault();

            const confirm = window.confirm('Sei sicuro di voler cancellare la foto?');

            if(confirm) this.submit();
        })
    });


</script>
@endsection