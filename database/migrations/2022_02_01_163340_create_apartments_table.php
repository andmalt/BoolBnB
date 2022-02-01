<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateApartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('title')->unique();
            $table->tinyInteger('rooms');
            $table->tinyInteger('beds');
            $table->tinyInteger('bathrooms');
            $table->smallInteger('square');
            $table->boolean('visible')->default(false);
            $table->string('country',100);
            $table->string('region',100);
            $table->string('city',100);
            $table->string('address');
            $table->decimal('lat',8,6)->nullable();
            $table->decimal('lon',9,6)->nullable();
            $table->timestamps();

            $table->foreign('user_id')
            ->references('id')
            ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('apartments',function(Blueprint $table){
            $table->dropForeign('apartments_user_id_foreign');
        });

        Schema::dropIfExists('apartments');
    }
}
