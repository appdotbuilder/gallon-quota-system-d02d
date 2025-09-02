<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stock>
 */
class StockFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stockIn = fake()->numberBetween(10, 100);
        $stockOut = fake()->numberBetween(5, 50);
        $remainingStock = fake()->numberBetween(20, 200);

        return [
            'date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'stock_in' => $stockIn,
            'stock_out' => $stockOut,
            'remaining_stock' => $remainingStock,
        ];
    }
}