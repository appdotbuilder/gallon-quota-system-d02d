<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create default admin users for each role
        $users = [
            [
                'name' => 'Admin HR',
                'email' => 'hr@galon.test',
                'password' => Hash::make('password'),
                'role' => 'hr',
            ],
            [
                'name' => 'Admin Gudang',
                'email' => 'gudang@galon.test',
                'password' => Hash::make('password'),
                'role' => 'gudang',
            ],
            [
                'name' => 'Admin Administrasi',
                'email' => 'admin@galon.test',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ],
            [
                'name' => 'John Employee',
                'email' => 'employee@galon.test',
                'password' => Hash::make('password'),
                'role' => 'user',
            ],
        ];

        foreach ($users as $userData) {
            User::create($userData);
        }

        // Create additional random users
        User::factory(10)->create();
    }
}