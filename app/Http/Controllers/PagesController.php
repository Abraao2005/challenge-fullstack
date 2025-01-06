<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PagesController extends Controller
{
    // Sessão existe
    public function show()
    {
        return Inertia::render('Login', []);
    }
    public function register()
    {
        return Inertia::render('Register', []);
    }



    public function dashboard(int $id)
    {
        // Inicia a sessão manualmente
        session_start();

        // Pega o ID do usuário da sessão
        $user_id = isset($_SESSION["user_id"]) ? $_SESSION["user_id"] : null;

        if ($user_id === null || $id !== (int)$user_id) {
            return Inertia::location("/");
        }

        $user = User::find($id);

        if (!$user) {
            return Inertia::location("/");
        }
        $product = Product::select("*")->get();
        // Passa os dados do usuário para o componente Vue/React
        return Inertia::render("Dashboard", [
            'user' => $user,
            'product'=>$product
        ]);
    }
}
