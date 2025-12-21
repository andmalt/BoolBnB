<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['apartment_id', 'image_url'];

    // Then when you do $photo->toArray() or JSON, you will also find "url"
    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        if (!$this->image_url) {
            return null;
        }

        try {
            return Storage::disk('s3')->url($this->image_url);
        } catch (\Throwable $e) {
            // fallback: return null if any error occurs
            return null;
        }
    }

    public function apartment()
    {
        return $this->belongsTo(Apartment::class, 'apartment_id');
    }
}
