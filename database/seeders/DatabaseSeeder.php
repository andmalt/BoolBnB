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
        $this->call([
            UserTableSeeder::class,
            RegionTableSeeder::class,
        ]);
        // examples
        // 
        \App\Models\User::factory(10)->create();
        \App\Models\Apartment::factory(300)->create();
        \App\Models\Photo::factory(1500)->create();
        \App\Models\Message::factory(180)->create();
        \App\Models\Stat::factory(750)->create();

        $this->call([
            SponsorshipTableSeeder::class,
            ApartmentSponsorshipTableSeeder::class,
            FacilityTableSeeder::class,
            ApartmentFacilityTableSeeder::class,
        ]);
    }
}