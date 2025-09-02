<?php

namespace Database\Seeders;

use App\Models\Stock;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create stock records for the last 30 days
        for ($i = 30; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            
            Stock::create([
                'date' => $date,
                'stock_in' => random_int(10, 50),
                'stock_out' => random_int(5, 30),
                'remaining_stock' => random_int(50, 200),
            ]);
        }
    }
}