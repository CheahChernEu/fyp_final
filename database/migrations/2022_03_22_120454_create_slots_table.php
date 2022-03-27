<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slots', function (Blueprint $table) {
            $table->timestamps('created_at');
            $table->timestamps('updated_at');
            $table->increments('id');
            $table->integer('user_id');
            $table->string('address');
            $table->string('slotImage');
            $table->string('slotID');
            $table->float('lat');
            $table->float('lng');
            $table->float('price');
            $table->string('review');
            $table->integer('rating');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('slots');
    }
}
