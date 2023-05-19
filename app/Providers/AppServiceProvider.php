<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->app->singleton(Gateway::class, function ($app) {
        //     return new Gateway([
        //         'environment' => 'sandbox',
        //         'merchantId' => '',
        //         'publicKey' => '',
        //         'privateKey' => ''
        //     ]);
        // });
    }
}
