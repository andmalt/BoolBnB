<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function getImagePrefix()
    {
        if (str_starts_with($this->image_url, "http")) {
            return '';
        } else {
            return asset('/storage/apartments/images') . '/';
        }
    }
}
