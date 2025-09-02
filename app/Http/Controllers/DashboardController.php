<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Quota;
use App\Models\Request;
use App\Models\Stock;
use Illuminate\Http\Request as HttpRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(HttpRequest $request)
    {
        $user = $request->user();
        
        switch ($user->role) {
            case 'user':
                return $this->userDashboard($user);
            case 'hr':
                return $this->hrDashboard();
            case 'gudang':
                return $this->gudangDashboard();
            case 'admin':
                return $this->adminDashboard();
            default:
                return $this->userDashboard($user);
        }
    }

    /**
     * Display user/employee dashboard.
     */
    protected function userDashboard($user)
    {
        $employee = $user->employee;
        
        if (!$employee) {
            return Inertia::render('dashboard', [
                'error' => 'Employee profile not found. Please contact HR.',
            ]);
        }

        $currentMonth = now()->format('Y-m');
        $quota = Quota::where('employee_id', $employee->id)
            ->where('month', $currentMonth)
            ->first();

        if (!$quota) {
            // Create quota for current month
            $quota = Quota::create([
                'employee_id' => $employee->id,
                'monthly_quota' => $employee->monthlyQuota,
                'remaining_quota' => $employee->monthlyQuota,
                'month' => $currentMonth,
            ]);
        }

        $recentRequests = Request::where('employee_id', $employee->id)
            ->latest('requested_at')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'employee' => $employee,
            'quota' => $quota,
            'recentRequests' => $recentRequests,
            'stats' => [
                'totalRequests' => Request::where('employee_id', $employee->id)->count(),
                'approvedRequests' => Request::where('employee_id', $employee->id)
                    ->where('status', 'approved')->count(),
                'takenGallons' => Request::where('employee_id', $employee->id)
                    ->where('status', 'taken')->sum('quantity'),
            ],
        ]);
    }

    /**
     * Display HR dashboard.
     */
    protected function hrDashboard()
    {
        $totalEmployees = Employee::count();
        $totalQuotas = Quota::where('month', now()->format('Y-m'))->sum('monthly_quota');
        $remainingQuotas = Quota::where('month', now()->format('Y-m'))->sum('remaining_quota');

        return Inertia::render('dashboard', [
            'role' => 'hr',
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'totalQuotas' => $totalQuotas,
                'remainingQuotas' => $remainingQuotas,
                'usedQuotas' => $totalQuotas - $remainingQuotas,
            ],
        ]);
    }

    /**
     * Display gudang dashboard.
     */
    protected function gudangDashboard()
    {
        $today = now()->format('Y-m-d');
        $todayStock = Stock::where('date', $today)->first();
        
        $pendingRequests = Request::where('status', 'pending')->count();
        $approvedRequests = Request::where('status', 'approved')->count();
        $todayTaken = Request::whereDate('taken_at', $today)->sum('quantity');

        return Inertia::render('dashboard', [
            'role' => 'gudang',
            'stats' => [
                'currentStock' => $todayStock->remaining_stock ?? 0,
                'pendingRequests' => $pendingRequests,
                'approvedRequests' => $approvedRequests,
                'todayTaken' => $todayTaken,
            ],
        ]);
    }

    /**
     * Display admin dashboard.
     */
    protected function adminDashboard()
    {
        $today = now()->format('Y-m-d');
        
        $todayRequests = Request::whereDate('requested_at', $today)->count();
        $todayApproved = Request::whereDate('approved_at', $today)->count();
        $todayTaken = Request::whereDate('taken_at', $today)->count();
        $totalEmployees = Employee::count();

        return Inertia::render('dashboard', [
            'role' => 'admin',
            'stats' => [
                'todayRequests' => $todayRequests,
                'todayApproved' => $todayApproved,
                'todayTaken' => $todayTaken,
                'totalEmployees' => $totalEmployees,
            ],
        ]);
    }
}