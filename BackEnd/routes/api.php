<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PetController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "v0.1"], function(){
    Route::group(["prefix" => "user"], function(){
        Route::post("signup", [UserController::class, "register"]);
        Route::post("login", [UserController::class, "login"]);
        Route::get("get_saved/{user_id}", [UserController::class, "get_saved"]);
        Route::get("get_user_info/{id}", [UserController::class, "get_user_info"]);
        Route::post("update/{id}", [UserController::class, "edit_profile"]);
        Route::get("get_adopted/{user_id}", [UserController::class, "get_adopted"]);
    });

    Route::group(["prefix" => "pets"], function(){
        Route::get("get_dog/{dog_id?}", [PetController::class, "get_dog"]);
        Route::get("get_dog_applicant/{dog_id}/{user_id}", [PetController::class, "get_applicants"]);
    });

    Route::group(["prefix" => "admin"], function(){
        Route::post("add_dog/{company_id}", [PetController::class, "add_dog"]);
        Route::get("get_admin_dogs/{company_id}", [PetController::class, "get_admin_dogs"]);
        Route::post("remove_dog/{dog_id}", [PetController::class, "remove_dog"]);

    });
});
