<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

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

        return [
            'apartment_id' => Arr::random($apartment_ids),
            'image_url' => $this->faker->imageUrl(),
        ];
    }
}
