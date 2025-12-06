<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use \Illuminate\Console\Scheduling\Schedule;
use App\Models\Apartment;
use Carbon\Carbon;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withSchedule(function (Schedule $schedule) {
        // $schedule->call(function () {
        //     $timeNow = Carbon::now();

        //     $apartments = Apartment::with('sponsorships')->get();

        //     foreach ($apartments as $apartment) {
        //         $sponsorshipD = $apartment
        //             ->sponsorships
        //             ->pluck('pivot.end_date')
        //             ->max();

        //         if ($sponsorshipD !== null && $timeNow->gt($sponsorshipD)) {
        //             $apartment->sponsorships()->detach();
        //             $apartment->visible = false;
        //             $apartment->save();
        //         } elseif ($sponsorshipD === null) {
        //             $apartment->visible = false;
        //             $apartment->save();
        //         }
        //     }
        // })->everyMinute()->runInBackground();        
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
