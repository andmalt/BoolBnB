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
        Schema::create('apartment_facility', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id');
            $table->foreignId('facility_id');
            $table->timestamps();

            $table->foreign('apartment_id')
                ->references('id')
                ->on('apartments')
                ->onDelete('cascade');

            $table->foreign('facility_id')
                ->references('id')
                ->on('facilities')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apartment_facility', function (Blueprint $table) {
            $table->dropForeign('apartment_facility_apartment_id_foreign');
            $table->dropForeign('apartment_facility_facility_id_foreign');
        });
        Schema::dropIfExists('apartment_facility');
    }
};
