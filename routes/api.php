<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AuthController;

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
// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['cors'])->group(function () {
    Route::get('/task', [TaskController::class, 'get']);
    Route::post('/task', [TaskController::class, 'post']);
    Route::get('/task/{id}', [TaskController::class, 'getById']);
    Route::delete('/task/{id}', [TaskController::class, 'delete']);
    Route::put('/task/{id}', [TaskController::class, 'edit']);
    
    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
