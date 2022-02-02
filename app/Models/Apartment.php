<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function stats(){
        return $this->hasMany(Stat::class);
    }

    public function photos(){
        return $this->hasMany(Photo::class);
    }

    public function facilities(){
        return $this->belongsToMany(Facility::class);
    }

    public function sponsorships(){
        return $this->belongsToMany(Sponsorship::class)->withPivot('start_date','end_date');
    }
}
