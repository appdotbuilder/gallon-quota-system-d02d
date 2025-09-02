<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Request;
use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();

        foreach ($employees as $employee) {
            // Create 3-5 requests per employee
            $requestCount = random_int(3, 5);
            
            for ($i = 0; $i < $requestCount; $i++) {
                Request::factory()->create([
                    'employee_id' => $employee->id,
                ]);
            }
        }
    }
}