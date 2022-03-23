<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function getMessages(Apartment $apartment)
    {
        $messages = DB::table('messages')
        ->where('apartment_id','=',$apartment->id)
        ->orderBy('created_at','desc')->get();


        if($apartment->user_id == Auth::user()->id){
            return view('admin.messages.index', compact('messages','apartment'));
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

        return redirect()->route('admin.messages.index', $message->apartment->id)
        ->with('delete-message',"Il messaggio di $message->name $message->surname è stato cancellato con successo");
    }
}
