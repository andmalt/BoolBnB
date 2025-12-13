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
        // 1. If it's an external URL
        if (str_starts_with($this->image_url, 'http')) {
            return $this->image_url;
        }

        // 2. If it still exists as an old image on local disk
        if (Storage::disk('public')->exists('apartments/images/' . $this->image_url)) {
            return asset('storage/apartments/images/' . $this->image_url);
        }

        // 3. New case: key on MinIO (s3)
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
