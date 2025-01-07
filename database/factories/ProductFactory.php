<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "name" => $this->faker->word(),
            "userId" => 1,
            "description" => $this->faker->text(100),
            "price" => $this->faker->randomNumber(),
            "quantity" => $this->faker->randomNumber(5, 250),
            "active" => $this->faker->boolean(),
        ];
    }
}
