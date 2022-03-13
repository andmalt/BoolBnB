<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- Styles --}}
    <link href="https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css" rel="stylesheet">


    <title>MailToHost</title>
</head>
<body>
    <div class="flex justify-center items-center shadow-md rounded-sm p-6 m-8 border border-gray-300">
        <h1 class="mb-5 text-red-500 font-bold">Ti è stata spedita questa mail</h1>

        <h2 class="uppercase mb-2">Casa:</h2>
        <h3 class="uppercase mb-4">{{$home}}</h3>

        <h4 class="mb-3"><strong class="uppercase">scritta da: </strong> {{$messageHost->name}} {{$messageHost->surname}}</h5>
        <h4 class="mb-3"><strong class="uppercase">email: </strong> {{$messageHost->email}}</h4>

        <h5 class="uppercase">contenuto email: </h5>
        <p>{{$messageHost->message_content}}</p>
    </div>  
</body>
</html>



