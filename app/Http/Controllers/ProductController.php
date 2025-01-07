<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function show($id){
        session_start();


        $product = Product::where('id', '=', $id)->first();
        if($product->userId != $_SESSION["user_id"]){
            return Inertia::location("/dashboard/" . $_SESSION["user_id"]);
        }

        return Inertia::render("ProductDetails",["product"=>$product,"user_id"=>$_SESSION["user_id"]]);

    }
    public function list()
    {
        session_start();
        $products = Product::where('userId', '=', $_SESSION['user_id'])->get();

        return response()->json([
            'products' => $products,
        ], 200);
    }
    // Função para armazenar um novo produto

    public function store(Request $request)
    {
        session_start();

        // Validação dos dados recebidos
        $validated = $request->validate([
            "name" => ["required"],
            "price" => ["required", "numeric"],
            "quantity" => ["required", "numeric", "min:1"], // Validação para quantidade
            "description" => ["required", "string"], // Validação para descrição
            "isActive" => ["required", "boolean"],
        ]);


        // Criando o novo produto no banco de dados
        try {
            $product = Product::create([
                "name" => $validated["name"],
                "userId" => $_SESSION["user_id"],
                "price" => $validated["price"],
                "quantity" => $validated["quantity"], // Salvando quantidade
                "description" => $validated["description"], // Salvando descrição
                "active" => $validated["isActive"],


            ]);
            // Retornando o produto criado com status 201 (Criado)
            return response()->json([
                'product' => $product,
            ], 201);
        } catch (\Exception $e) {
            // Retornando erro com mensagem caso haja falha
            return response()->json([
                'error' => 'Falha ao criar produto: ' . $e->getMessage(),
            ], 500);
        }
    }



    public function update(Request $request, $id)
    {
        session_start();
        // Procurando o produto pelo ID e verificando se pertence ao usuário
        $product = Product::where('id', $id)
            ->where('userId', $_SESSION['user_id'])  // Verificando se o produto pertence ao usuário
            ->first();


        // Verificando se o produto foi encontrado
        if (!$product) {
            return response()->json(['message' => 'Produto não encontrado ou você não tem permissão para editar este produto'], 404);
        }

        $product->name = $request->input('name', $product->name);
        $product->description = $request->input('description', $product->description);
        $product->price = $request->input('price', $product->price);
        $product->quantity = $request->input('quantity', $product->quantity);
        $product->active = $request->has('isActive') ? false : true;

        $product->save();

        // Retornando o produto atualizado
        return response()->json($product, 200);
    }


    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Produto excluído com sucesso'], 200);
    }
}
