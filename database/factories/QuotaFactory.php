<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Quota>
 */
class QuotaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $monthlyQuota = fake()->numberBetween(7, 24);
        $remainingQuota = fake()->numberBetween(0, $monthlyQuota);

        return [
            'employee_id' => Employee::factory(),
            'monthly_quota' => $monthlyQuota,
            'remaining_quota' => $remainingQuota,
            'month' => now()->format('Y-m'),
        ];
    }
}