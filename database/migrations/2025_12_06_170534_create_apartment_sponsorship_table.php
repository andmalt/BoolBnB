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
        Schema::create('apartment_sponsorship', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id');
            $table->foreignId('sponsorship_id');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();

            $table->foreign('apartment_id')
                ->references('id')
                ->on('apartments')
                ->onDelete('cascade');
            $table->foreign('sponsorship_id')
                ->references('id')
                ->on('sponsorships')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('apartment_sponsorship', function (Blueprint $table) {
            $table->dropForeign('apartment_sponsorship_apartment_id_foreign');
            $table->dropForeign('apartment_sponsorship_sponsorship_id_foreign');
        });
        Schema::dropIfExists('apartment_sponsorship');
    }
};
