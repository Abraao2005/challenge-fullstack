<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    // Teste para criar um produto
    public function test_list_product()
    {
        $user = User::create([
            'name' => "abraao",
            'email' => "email@email.com",
            'password' => Hash::make("123"),
        ]);
        Product::create([
            "name" => "Playstation 5",
            "userId" => 1,
            "description" => 'Reproduza jogos do PS5 e do PS4 em Blu-ray Disc. Você também pode baixar jogos do PS5 e do PS4 digitais a partir da PlayStation Store.',
            "price" => "3550",
            "quantity" => 100,
            "active" => true

        ]);

        $response = $this->getJson('/api/v1/products');

        if ($response->status() !== 201) {
            dd($response->getContent());
        }

        $response->assertStatus(200);

        dd($response);
    }
}
