<?php

namespace Database\Seeders;

use App\Models\Sponsorship;
use Illuminate\Database\Seeder;

class SponsorshipTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $prices = [ 2.99, 5.99 , 9.99 ];
        $durations = [24, 72, 144 ];
        $names = ['silver','gold','platinum'];

        for($i = 0; $i < count($durations); $i++){
            $sponsorship = new Sponsorship();
            $sponsorship->name = $names[$i];
            $sponsorship->price = $prices[$i];
            $sponsorship->duration = $durations[$i];
            $sponsorship->save();
        }

    }
}
