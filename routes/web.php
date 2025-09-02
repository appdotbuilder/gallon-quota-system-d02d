<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\RequestStatusController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Employee management (HR only)
    Route::resource('employees', EmployeeController::class);
    
    // Request management
    Route::resource('requests', RequestController::class)->except(['edit', 'update', 'destroy']);
    Route::patch('requests/{request}/status', [RequestStatusController::class, 'update'])->name('requests.status.update');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
