<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    public function register(Request $request)
    {

        $validated = $request->validate(
            [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]
        );
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        return response()->json([
            'message' => 'Usuário criado com sucesso!',
            'redirect' => "/"
        ]);
    }
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Verificando se o usuário existe no banco de dados
        $user = User::where('email', $request->email)->first();

        // Se o usuário não existir ou a senha estiver errada
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Credenciais inválidas!',
                'redirect' => "/"
            ]);
        }
        session_start();
        $_SESSION["user_id"]= $user->id;
        // Retornar uma resposta indicando sucesso no login
        return response()->json([
            'message' => 'Login efetuado com sucesso!',
            'user_id' => $user->id,
            'redirect' => '/dashboard/' . $user->id, // Redireciona para o dashboard do usuário
        ]);
  
    }
    public function logout(){
        session_start();
        session_destroy();

        return redirect("/");
    }
}
