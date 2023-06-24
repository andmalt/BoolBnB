<?php

use App\Http\Controllers\Api\Admin\ApartmentController;
use App\Http\Controllers\Api\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Api\Admin\PhotoController;
use App\Http\Controllers\Api\Admin\SponsorshipController;
use App\Http\Controllers\Api\Admin\StatController;
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Guest\ApartmentController as GuestApartmentController;
use App\Http\Controllers\Api\Guest\MessageController;
use App\Http\Controllers\Api\Orders\OrderController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Guest
 */
Route::middleware('guest')->group(function () {
    Route::get('homes', [GuestApartmentController::class, 'index']);
    Route::post('house/{id}', [GuestApartmentController::class, 'show']);
    Route::post('message/send', [MessageController::class, 'sendEmail']);
});

/**
 * email verification
 */
Route::get('/verify-email/{id}/{hash}', [VerifyEmailController::class, 'verifyEmail'])
    ->middleware('signed')
    ->name('verification.verify');

// Resend link to verify email
Route::post('/email/verify/resend', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(["success" => true, "message" => "email resent"]);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');

Route::post('email/verification', [VerifyEmailController::class, 'check'])->middleware('auth:sanctum');

/**
 * Authentication Routes
 */
Route::middleware('guest')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('register', [AuthController::class, 'register']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('logout', [AuthController::class, 'logout']);
});

// 
Route::post('my/messages/count', [AdminMessageController::class, 'index_count'])->middleware('auth:sanctum');

/**
 * Admin
 */
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::post('my/apartments/recfac', [ApartmentController::class, 'myFacReg']);
    Route::post('my/apartments', [ApartmentController::class, 'index']);
    Route::post('my/apartment/{id}', [ApartmentController::class, 'show']);
    Route::post('my/apartment/create', [ApartmentController::class, 'store']);
    Route::patch('my/apartment/{id}/update', [ApartmentController::class, 'update']);
    Route::delete('my/apartment/{id}/delete', [ApartmentController::class, 'destroy']);
    Route::post('user/image/upload', [PhotoController::class, 'uploadMyImage']);
    Route::delete('user/image/destroy', [PhotoController::class, 'destroyMyImage']);
    Route::post('my/apartment/{id}/img/upload', [PhotoController::class, 'uploadImage']);
    Route::delete('my/apartment/img/{id}/delete', [PhotoController::class, 'deleteImage']);
    Route::post('my/messages', [AdminMessageController::class, 'index']);
    Route::post('my/message/{id}', [AdminMessageController::class, 'show']);
    Route::post('my/messages/trashed', [AdminMessageController::class, 'trash_index']);
    Route::patch('my/message/{id}/restore', [AdminMessageController::class, 'restore']);
    Route::delete('my/message/{id}/delete', [AdminMessageController::class, 'delete']);
    Route::delete('my/message/{id}/destroy', [AdminMessageController::class, 'destroy']);
    Route::post('my/sponsorships', [SponsorshipController::class, 'index']);
    Route::post('my/apartment/{id}/sponsorship/update', [SponsorshipController::class, 'update']);
    Route::post('generate/token', [OrderController::class, 'generate']);
    Route::post('make/payment', [OrderController::class, 'makePayment']);
    Route::post('my/apartment/{id}/stat/total', [StatController::class, 'get_total']);
    Route::post('my/apartment/{id}/stat/year', [StatController::class, 'get_year']);
    Route::post('my/apartment/{id}/stat/month', [StatController::class, 'get_month']);
    Route::post('my/apartment/{id}/stat/week', [StatController::class, 'get_week']);
    Route::post('my/apartment/{id}/stat/day', [StatController::class, 'get_today']);
    Route::post('user/info', [UserController::class, 'get_user_detail']);
    Route::put('user/info/set', [UserController::class, 'set_user_detail']);
    Route::put('change/password', [UserController::class, 'change_user_password']);
    Route::delete('user/delete', [UserController::class, 'delete_account']);
});
