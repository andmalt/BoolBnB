<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class StatFactory extends Factory
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
            'ip' => $this->faker->ipv4(),
            'date' => $this->faker->dateTime(),
        ];
    }
}
