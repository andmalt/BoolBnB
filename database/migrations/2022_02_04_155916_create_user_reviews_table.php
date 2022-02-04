<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->float('vote', 2, 1);
            $table->string('name', 40);
            $table->string('review');
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
        Schema::table('user_reviews',function(Blueprint $table){
            $table->dropForeign('user_reviews_user_id_foreign');
        });
        Schema::dropIfExists('user_reviews');
    }
}
