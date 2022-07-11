<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class UserreviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user_ids = User::pluck('id')->toArray();

        return [
            'user_id' => Arr::random($user_ids),
            'vote' => $this->faker->randomFloat(1, 0, 5),
            'name' => $this->faker->name(),
            'review' => $this->faker->paragraph(2),
        ];
    }
}
