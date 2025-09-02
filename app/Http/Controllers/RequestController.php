<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRequestRequest;
use App\Models\Employee;
use App\Models\Quota;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of requests.
     */
    public function index(HttpRequest $httpRequest)
    {
        $user = $httpRequest->user();
        $query = Request::with(['employee.user']);

        // Filter based on user role
        if ($user->role === 'user' && $user->employee) {
            $query->where('employee_id', $user->employee->id);
        }

        $requests = $query->latest('requested_at')->paginate(10);

        return Inertia::render('requests/index', [
            'requests' => $requests,
        ]);
    }

    /**
     * Show the form for creating a new request.
     */
    public function create(HttpRequest $httpRequest)
    {
        $user = $httpRequest->user();
        
        if ($user->role !== 'user' || !$user->employee) {
            return redirect()->route('dashboard')
                ->with('error', 'Only employees can create requests.');
        }

        $employee = $user->employee;
        $currentMonth = now()->format('Y-m');
        
        $quota = Quota::where('employee_id', $employee->id)
            ->where('month', $currentMonth)
            ->first();

        if (!$quota) {
            $quota = Quota::create([
                'employee_id' => $employee->id,
                'monthly_quota' => $employee->monthlyQuota,
                'remaining_quota' => $employee->monthlyQuota,
                'month' => $currentMonth,
            ]);
        }

        return Inertia::render('requests/create', [
            'employee' => $employee,
            'quota' => $quota,
        ]);
    }

    /**
     * Store a newly created request in storage.
     */
    public function store(StoreRequestRequest $request)
    {
        $user = $request->user();
        
        if ($user->role !== 'user' || !$user->employee) {
            return redirect()->route('dashboard')
                ->with('error', 'Only employees can create requests.');
        }

        $employee = $user->employee;
        $currentMonth = now()->format('Y-m');
        
        $quota = Quota::where('employee_id', $employee->id)
            ->where('month', $currentMonth)
            ->first();

        if (!$quota || $quota->remaining_quota < $request->quantity) {
            return redirect()->back()
                ->with('error', 'Insufficient quota remaining.');
        }

        $gallonRequest = Request::create([
            'employee_id' => $employee->id,
            'quantity' => $request->quantity,
            'status' => 'pending',
            'requested_at' => now(),
        ]);

        return redirect()->route('requests.show', $gallonRequest)
            ->with('success', 'Request submitted successfully.');
    }

    /**
     * Display the specified request.
     */
    public function show(Request $request)
    {
        $request->load(['employee.user']);

        return Inertia::render('requests/show', [
            'request' => $request,
        ]);
    }
}