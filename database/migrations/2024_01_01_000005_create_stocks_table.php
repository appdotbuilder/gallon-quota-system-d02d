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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->integer('stock_in')->default(0)->comment('Gallon stock coming in');
            $table->integer('stock_out')->default(0)->comment('Gallon stock going out');
            $table->integer('remaining_stock')->default(0)->comment('Remaining gallon stock');
            $table->timestamps();
            
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};