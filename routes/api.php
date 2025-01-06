<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('v1/register', [UserController::class, "register"]);
Route::post('v1/login', [UserController::class, "login"]);

Route::post('v1/products', [ProductController::class, 'store']);

Route::get('v1/products/{id}/edit', [ProductController::class, 'edit']);

Route::put('v1/products/{id}', [ProductController::class, 'update']);

Route::delete('v1/products/{id}', [ProductController::class, 'destroy']);
