<?php

use App\Http\Controllers\PagesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PagesController::class,"show"])->name("login");
Route::get('/register', [PagesController::class,"register"])->name("register");
Route::get('/dashboard/{id}', [PagesController::class,"dashboard"])->name("dashboard");
Route::get('/logout', [UserController::class,"logout"])->name("logout");
