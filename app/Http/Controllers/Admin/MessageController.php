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
        //
    }

    public function deleteMessage(Message $message)
    {
        $message->delete();
    }
}
