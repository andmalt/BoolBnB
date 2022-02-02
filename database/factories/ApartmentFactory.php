<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class ApartmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users_id = User::pluck('id')->toArray();
        $regions = [
            'Abruzzo',
            'Basilicata',
            'Calabria',
            'Campania',
            'Emilia-Romagna',
            'Friuli Venezia Giulia',
            'Lazio',
            'Liguria',
            'Lombardia',
            'Marche',
            'Molise',
            'Piemonte',
            'Puglia',
            'Sardegna',
            'Sicilia',
            'Toscana',
            'Trentino-Alto Adige',
            'Umbria',
            'Valle d\'Aosta',
            'Veneto',
        ];

        return [
            'user_id' => Arr::random($users_id),
            'title' => $this->faker->sentence(5),
            'description' => $this->faker->paragraph(4),
            'rooms' => $this->faker->numberBetween(1,15),
            'beds' =>  $this->faker->numberBetween(1,25),
            'bathrooms' => $this->faker->numberBetween(1,10),
            'square' => $this->faker->numberBetween(50,900),
            'visible' => $this->faker->boolean(),
            'country' => 'Italia',
            'region' => Arr::random($regions),
            'city' => $this->faker->city(),
            'address' => $this->faker->address(),
            'lat' => $this->faker->latitude(),
            'lon' => $this->faker->longitude(),
        ];
    }
}
