<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    // Sessão existe
    public function show()
    {
        echo "teste";
        // return Inertia::render('Aplication', []);
    }
}
