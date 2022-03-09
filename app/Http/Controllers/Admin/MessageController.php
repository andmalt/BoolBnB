<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function getMessages(Apartment $apartment)
    {
        
        if($apartment->user_id == Auth::user()->id){
            return view('admin.messages.index', compact('apartment'));
        }else{
            return view('guest.welcome');
        }       
    }

    public function viewMessage(Message $message)
    {

        if ($message->apartment->user_id == Auth::user()->id) {
            return view('admin.messages.show', compact('message'));
        } else {
            return view('guest.welcome');
        }  
    }

    public function deleteMessage(Message $message)
    {
        $message->delete();

        return redirect()->route('admin.messages.index', $message->apartment->id)->with('delete-message',"Il messaggio di $message->name $message->surname è stato cancellato con successo");
    }
}
