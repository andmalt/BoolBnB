<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class ApartmentreviewFactory extends Factory
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
            'vote' => $this->faker->randomFloat(1, 0, 5),
            'name' => $this->faker->name(),
            'review' => $this->faker->paragraph(2),
        ];
    }
}
