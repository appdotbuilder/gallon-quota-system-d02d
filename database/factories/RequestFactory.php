<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Request>
 */
class RequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requestedAt = fake()->dateTimeBetween('-30 days', 'now');
        $status = fake()->randomElement(['pending', 'approved', 'rejected', 'taken']);

        return [
            'employee_id' => Employee::factory(),
            'quantity' => fake()->numberBetween(1, 5),
            'status' => $status,
            'requested_at' => $requestedAt,
            'approved_at' => in_array($status, ['approved', 'taken']) 
                ? fake()->dateTimeBetween($requestedAt, 'now') 
                : null,
            'taken_at' => $status === 'taken' 
                ? fake()->dateTimeBetween($requestedAt, 'now') 
                : null,
        ];
    }

    /**
     * Indicate that the request is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'approved_at' => null,
            'taken_at' => null,
        ]);
    }

    /**
     * Indicate that the request is approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'approved_at' => fake()->dateTimeBetween($attributes['requested_at'], 'now'),
            'taken_at' => null,
        ]);
    }

    /**
     * Indicate that the request is taken.
     */
    public function taken(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'taken',
            'approved_at' => fake()->dateTimeBetween($attributes['requested_at'], 'now'),
            'taken_at' => fake()->dateTimeBetween($attributes['requested_at'], 'now'),
        ]);
    }
}