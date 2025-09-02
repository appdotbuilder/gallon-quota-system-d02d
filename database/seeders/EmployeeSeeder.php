<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get users with role 'user'
        $users = User::where('role', 'user')->get();

        foreach ($users as $user) {
            Employee::factory()->create([
                'user_id' => $user->id,
            ]);
        }

        // Create additional employees for other users if needed
        $remainingUsers = User::whereNotIn('id', Employee::pluck('user_id'))->get();
        
        foreach ($remainingUsers as $user) {
            Employee::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}