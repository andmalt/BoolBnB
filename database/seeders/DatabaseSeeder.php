<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // examples
        // User::factory(10)->create();
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UserTableSeeder::class,
            RegionTableSeeder::class,
        ]);
        
        \App\Models\User::factory(10)->create();
        \App\Models\Apartment::factory(300)->create();
        \App\Models\Photo::factory(1500)->create();
        \App\Models\Message::factory(180)->create();
        \App\Models\Stat::factory(3850)->create();

        $this->call([
            SponsorshipTableSeeder::class,
            ApartmentSponsorshipTableSeeder::class,
            FacilityTableSeeder::class,
            ApartmentFacilityTableSeeder::class,
        ]);
    }
}
