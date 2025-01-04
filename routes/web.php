<?php

use App\Http\Controllers\PagesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PagesController::class,"show"]);
