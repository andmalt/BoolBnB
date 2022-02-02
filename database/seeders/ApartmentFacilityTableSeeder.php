<?php

namespace Database\Seeders;

use App\Models\Apartment;
use App\Models\Facility;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class ApartmentFacilityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $apartments = Apartment::all();
        $facility_ids = Facility::pluck('id')->toArray();

        foreach($apartments as $apartment){
            $apartment->facilities()->sync([
                Arr::random($facility_ids),
                Arr::random($facility_ids),
                Arr::random($facility_ids),
                Arr::random($facility_ids),
                Arr::random($facility_ids),
                Arr::random($facility_ids),
            ]);
        }
    }
}
