<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'user_id', 'description', 'rooms', 'beds', 'bathrooms', 'square', 'region', 'city', 'address', 'lat', 'lon', 'price'];

    public function checkDateSponsorship()
    {
        // if ($this->sponsorships->pivot->end_date < Carbon::now()) {
        //     $this->sponsorships()->detach();
        //     $this->visible = false;
        // };
        // foreach ($this->sponsorships as $sponsorship) {
        //     if ($sponsorship->pivot->end_date < Carbon::now()) {
        //         $this->sponsorships()->detach();
        //         $this->visible = false;
        //     };
        // }
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function stats()
    {
        return $this->hasMany(Stat::class);
    }

    public function photos()
    {
        return $this->hasMany(Photo::class);
    }

    public function facilities()
    {
        return $this->belongsToMany(Facility::class);
    }

    public function sponsorships()
    {
        return $this->belongsToMany(Sponsorship::class)->withPivot('start_date', 'end_date');
    }
}
