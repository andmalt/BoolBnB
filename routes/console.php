<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Models\Apartment;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::call(function () {
    $timeNow = Carbon::now();

    $apartments = Apartment::with('sponsorships')->get();

    foreach ($apartments as $apartment) {
        $sponsorshipD = $apartment->sponsorships->pluck('pivot.end_date')->max();

        if ($sponsorshipD !== null && $timeNow->gt($sponsorshipD)) {
            $apartment->sponsorships()->detach();
            $apartment->visible = false;
            $apartment->save();
        } elseif ($sponsorshipD === null) {
            $apartment->visible = false;
            $apartment->save();
        }
    }
})
->everyMinute();

// To run the scheduled tasks, use the command: php artisan schedule:work 