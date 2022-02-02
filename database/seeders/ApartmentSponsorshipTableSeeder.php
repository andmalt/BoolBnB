<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Sponsorship;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ApartmentSponsorshipTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $apartments = Apartment::all();
        $sponsorship_ids = Sponsorship::pluck('id')->toArray();


        foreach($apartments as $apartment){

            $sponsorship = Arr::random($sponsorship_ids);

            if($sponsorship == 1){
                $apartment->sponsorships()->attach($apartment,[
                    'sponsorship_id' => 1,
                    'start_date' => Carbon::now(),
                    'end_date' => Carbon::now()->addHours(24),
                ]);
            }elseif($sponsorship == 2){
                $apartment->sponsorships()->attach($apartment, [
                    'sponsorship_id' => 2,
                    'start_date' => Carbon::now(),
                    'end_date' => Carbon::now()->addHours(72),
                ]);
            }elseif($sponsorship == 3){
                $apartment->sponsorships()->attach($apartment, [
                    'sponsorship_id' => 3,
                    'start_date' => Carbon::now(),
                    'end_date' => Carbon::now()->addHours(144),
                ]);
            }
        }
    }
}
