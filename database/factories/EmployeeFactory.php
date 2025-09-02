<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'employee_code' => 'EMP' . fake()->unique()->numberBetween(1000, 9999),
            'grade' => fake()->randomElement(['G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13']),
            'department' => fake()->randomElement(['IT', 'HR', 'Finance', 'Operations', 'Marketing']),
        ];
    }
}