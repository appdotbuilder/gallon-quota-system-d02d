<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quotas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->integer('monthly_quota')->comment('Monthly gallon quota based on grade');
            $table->integer('remaining_quota')->comment('Remaining gallon quota for the month');
            $table->string('month')->comment('Month in YYYY-MM format');
            $table->timestamps();
            
            $table->index(['employee_id', 'month']);
            $table->unique(['employee_id', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotas');
    }
};