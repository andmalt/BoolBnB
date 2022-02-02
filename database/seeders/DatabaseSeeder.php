<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // examples
        // 
        \App\Models\User::factory(10)->create();
        \App\Models\Apartment::factory(30)->create();
        \App\Models\Photo::factory(100)->create();
        \App\Models\Message::factory(80)->create();
        \App\Models\Stat::factory(650)->create();
        
                
        $this->call([
            SponsorshipTableSeeder::class,
            ApartmentSponsorshipTableSeeder::class,
            FacilityTableSeeder::class,
            ApartmentFacilityTableSeeder::class,
        ]);
    }
}
