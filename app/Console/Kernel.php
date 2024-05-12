<?php

namespace App\Console;

use App\Models\Apartment;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Do this activity every hour
        // $schedule->command('inspire')->hourly();
        $schedule->call(function () {
            $timeNow = Carbon::now();

            $apartments = Apartment::with('sponsorships')->get();

            foreach ($apartments as $apartment) {
                $sponsorshipD = $apartment->sponsorships->pluck('pivot.end_date')->max();

                if ($sponsorshipD !== null && $timeNow->gt($sponsorshipD)) {
                    $apartment->sponsorships()->detach();
                    $apartment['visible'] = false;
                    $apartment->save();
                } elseif ($sponsorshipD === null) {
                    $apartment['visible'] = false;
                    $apartment->save();
                }
            }
        })->everyMinute()->runInBackground();; // Do this activity every minute
        // The command in the terminal is "php artisan schedule:work" for local execution
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
