<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PhotoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $apartment_ids = Apartment::pluck('id')->toArray();
        $apartment_id = Arr::random($apartment_ids);

        $w = 640;
        $h = 480;
        $rawText = $this->faker->words(2, true);
        $text = htmlspecialchars($rawText, ENT_QUOTES | ENT_XML1, 'UTF-8');

        $filename = (string) Str::uuid() . '.svg';
        $path = "apartments/{$apartment_id}/{$filename}";

        $svg = <<<SVG
<svg xmlns="http://www.w3.org/2000/svg" width="{$w}" height="{$h}" viewBox="0 0 {$w} {$h}">
  <rect width="100%" height="100%" fill="#00ee99"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="32" fill="#ffffff">{$text}</text>
</svg>
SVG;

        Storage::disk('s3')->put($path, $svg);

        return [
            'apartment_id' => $apartment_id,
            'image_url' => $path, // "/apartments/1/....svg"
        ];
    }
}
