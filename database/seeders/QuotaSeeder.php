<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Quota;
use Illuminate\Database\Seeder;

class QuotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all();
        $currentMonth = now()->format('Y-m');

        foreach ($employees as $employee) {
            $monthlyQuota = $employee->monthlyQuota;
            
            Quota::create([
                'employee_id' => $employee->id,
                'monthly_quota' => $monthlyQuota,
                'remaining_quota' => random_int(0, $monthlyQuota),
                'month' => $currentMonth,
            ]);
        }
    }
}