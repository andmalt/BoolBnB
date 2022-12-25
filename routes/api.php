<?php

use App\Http\Controllers\Api\Admin\ApartmentController;
use App\Http\Controllers\Api\Admin\PhotoController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Guest\ApartmentController as GuestApartmentController;
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
    Route::get('house/{id}',[GuestApartmentController::class, 'show']);
});

/**
 * Authentication Routes
 */
Route::middleware('guest')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/logout', [AuthController::class, 'logout']);
});

/**
 * Admin
 */
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('my/apartments', [ApartmentController::class, 'index']);
    Route::get('my/apartment/{id}', [ApartmentController::class, 'show']);
    Route::post('my/apartment/create', [ApartmentController::class, 'store']);
    Route::post('my/apartment/{id}/update', [ApartmentController::class, 'update']);
    Route::delete('my/apartment/{id}/delete', [ApartmentController::class, 'destroy']);
    Route::post('my/apartment/{id}/img/upload', [PhotoController::class, 'uploadImage']);
});
