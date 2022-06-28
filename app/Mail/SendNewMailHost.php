<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendNewMailHost extends Mailable
{
    use Queueable, SerializesModels;
    
    /**
     * the message
     *
     * @var mixed
     */
    public $message;

    /**
     * Create a new message instance.
     *
     * @param  \App\Models\Message $message
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $messageHost = $this->message;

        return $this->view('guest.mail.contact', compact('messageHost'))->with(['home'=> $messageHost->apartment->title]);
    }
}
