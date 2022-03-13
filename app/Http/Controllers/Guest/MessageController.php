<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Mail\SendNewMailHost;
use App\Models\Message;
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
        $request->validate(
            [
                'name' => 'required|string',
                'surname' => 'required|string',
                'email' => 'required|email',
                'message_content' => 'required|string|min:15|max:1800'
            ],
            [
                'name.required' => 'Devi inserire il tuo nome',
                'name.string' => 'il nome deve essere una stringa',
                'surname.required' => 'Devi inserire il tuo cognome',
                'surname.string' => 'il cognome deve essere una stringa',
                'email.required' => 'Devi inserire la tua email',
                'email.email' => 'l\'email non è corretta',
                'message_content.required' => 'Devi inserire un messaggio',
                'message_content.string' => 'Il messaggio deve essere una stringa',
                'message_content.min' => 'il messaggio deve essere lungo almeno quindici caratteri',
                'message_content.max' => 'il messaggio deve essere lungo massimo 1800 caratteri',
            ]
        );


        $data = $request->all();
        $newMessage = new Message();
        $newMessage->apartment_id = $data['apartment_id'];
        $newMessage->fill($data);
        $newMessage->save();

        Mail::to($newMessage->apartment->user->email)->send(new SendNewMailHost($newMessage));


        return redirect()->route('guest.apartment.show',$newMessage->apartment->id)->with('send-mail','La mail è stata inviata con successo');
    }
    
}
