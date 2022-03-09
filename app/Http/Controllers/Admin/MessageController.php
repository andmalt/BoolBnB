<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function getMessages(Apartment $apartment)
    {
        return view('admin.messages.index',compact('apartment'));
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
