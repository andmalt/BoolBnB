<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentreviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartmentreviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('apartment_id');
            $table->float('vote', 2, 1);
            $table->string('name', 40);
            $table->string('review');
            $table->timestamps();

            $table->foreign('apartment_id')
                ->references('id')
                ->on('apartments')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('apartmentreviews', function (Blueprint $table) {
            $table->dropForeign('apartmentreviews_apartment_id_foreign');
        });

        Schema::dropIfExists('apartmentreviews');
    }
}
