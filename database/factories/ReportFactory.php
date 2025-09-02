<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalRequests = fake()->numberBetween(10, 100);
        $totalApproved = fake()->numberBetween(5, $totalRequests);
        $totalTaken = fake()->numberBetween(0, $totalApproved);

        return [
            'report_date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'total_requests' => $totalRequests,
            'total_approved' => $totalApproved,
            'total_taken' => $totalTaken,
            'generated_by' => User::factory(),
        ];
    }
}