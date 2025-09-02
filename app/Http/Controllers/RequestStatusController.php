<?php

namespace App\Http\Controllers;

use App\Models\Quota;
use App\Models\Request;
use Illuminate\Http\Request as HttpRequest;

class RequestStatusController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(HttpRequest $httpRequest, Request $request)
    {
        $action = $httpRequest->input('action');
        
        switch ($action) {
            case 'approve':
                return $this->handleApprove($request);
            case 'reject':
                return $this->handleReject($request);
            case 'take':
                return $this->handleTake($request);
            default:
                return redirect()->back()
                    ->with('error', 'Invalid action.');
        }
    }

    /**
     * Handle approve action.
     */
    protected function handleApprove(Request $request)
    {
        $request->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Request approved successfully.');
    }

    /**
     * Handle take action.
     */
    protected function handleTake(Request $request)
    {
        if ($request->status !== 'approved') {
            return redirect()->back()
                ->with('error', 'Only approved requests can be marked as taken.');
        }

        $employee = $request->employee;
        $currentMonth = now()->format('Y-m');
        
        $quota = Quota::where('employee_id', $employee->id)
            ->where('month', $currentMonth)
            ->first();

        if ($quota) {
            $quota->decrement('remaining_quota', $request->quantity);
        }

        $request->update([
            'status' => 'taken',
            'taken_at' => now(),
        ]);

        return redirect()->back()
            ->with('success', 'Request marked as taken successfully.');
    }

    /**
     * Handle reject action.
     */
    protected function handleReject(Request $request)
    {
        $request->update([
            'status' => 'rejected',
        ]);

        return redirect()->back()
            ->with('success', 'Request rejected successfully.');
    }
}