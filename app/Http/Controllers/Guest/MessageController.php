<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Mail\SendNewMailHost;
use App\Models\Apartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MessageController extends Controller
{
    /**
     * 
     */
    public function contact()
    {
        //
    }

        
    /**
     * send a email
     *
     * @param  mixed $request
     * @return void
     */
    public function sendEmail(Request $request)
    {
        $data = $request->all();


        Mail::to()->send(new SendNewMailHost());
    }
    
}
