<?php

namespace Database\Factories;

use App\Models\Apartment;
use Carbon\Carbon;
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
        $date = [
            Carbon::now(),
            Carbon::now()->subDay(),
            Carbon::now()->subDays(2),
            Carbon::now()->subDays(3),
            Carbon::now()->subDays(4),
            Carbon::now()->subDays(5),
            Carbon::now()->subWeek(),
            Carbon::now()->subWeeks(2),
            Carbon::now()->subWeeks(3),
            Carbon::now()->subWeeks(4),
            Carbon::now()->subMonth(),
            Carbon::now()->subMonths(2),
            Carbon::now()->subMonths(3),
            Carbon::now()->subMonths(4),
            Carbon::now()->subMonths(5),
            Carbon::now()->subMonths(6),
        ];

        return [
            // 'apartment_id' => Arr::random($apartment_ids),
            'apartment_id' => 32,
            'ip' => $this->faker->ipv4(),
            // 'date' => $this->faker->date(),
            'date' => Arr::random($date),
        ];
    }
}
