<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartmentreview extends Model
{
    use HasFactory;

    protected $fillable = ['vote', 'name', 'review'];

    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }
}
