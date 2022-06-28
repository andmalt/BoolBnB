<?php

use App\Http\Controllers\Admin\ApartmentController as AdminApartmentController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\PhotoController;
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
    // Route::get('/message', [GuestMessageController::class, 'contact'])->name('message.contact');
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
    Route::get('apartment/{apartment}/images',[PhotoController::class,'getImages'])->name('images.index');
    Route::post('apartment/{apartment}/images',[PhotoController::class, 'uploadImage'])->name('image.store');
    Route::delete('apartment/images/{photo}',[PhotoController::class, 'deleteImage'])->name('image.destroy');
    Route::get('apartment/{apartment}/messages', [MessageController::class, 'getMessages'])->name('messages.index');
    Route::get('apartment/messages/{message}', [MessageController::class, 'viewMessage'])->name('message.show');
    Route::delete('apartment/message/{message}', [MessageController::class, 'deleteMessage'])->name('message.destroy');
});

// Route::get("{any?}", function () {
//     return view('guest.welcome');
// })->where("any", ".*");

require __DIR__.'/auth.php';
