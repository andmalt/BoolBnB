<?php

namespace Database\Factories;

use App\Models\Apartment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class MessageFactory extends Factory
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
            'email' => $this->faker->email(),
            'message_content' => $this->faker->paragraph(5),
            'name' => $this->faker->firstName(),
            'surname' => $this->faker->lastName(),
        ];
    }
}
