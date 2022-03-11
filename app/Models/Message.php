<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['email','message_content','name','surname','created_at','updated_at'];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class,'apartment_id');
    }
}
