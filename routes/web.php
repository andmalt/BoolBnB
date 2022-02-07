<?php

use App\Http\Controllers\Admin\ApartmentController as AdminApartmentController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Guest\ApartmentController;
use App\Http\Controllers\Guest\MessageController as GuestMessageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// guest
Route::get('/', function () {
    return view('guest.welcome');
});

Route::resource('/guest/apartment', ApartmentController::class)->names('guest.apartment')->only(['index', 'show']);
Route::namespace('Guest')
->name('guest.')
->prefix('guest')
->group(function () {
    Route::get('/message', [GuestMessageController::class, 'contact'])->name('message');
    Route::post('/message/send', [GuestMessageController::class, 'sendEmail'])->name('message.send');
});

// admin
Route::get('/dashboard', function () {
    return view('admin.dashboard');
})->middleware(['auth'])->name('dashboard');

Route::resource('/admin/apartment', AdminApartmentController::class)->names('admin.apartment')->middleware(['auth']);
Route::middleware(['auth'])
->namespace('Admin')
->name('admin.')
->prefix('admin')
->group(function(){
   Route::get('/contact', [MessageController::class, 'show'])->name('show.contact');
   Route::delete('/contact/{contact}', [MessageController::class, 'delete'])->name('delete.contact');
});

require __DIR__.'/auth.php';
