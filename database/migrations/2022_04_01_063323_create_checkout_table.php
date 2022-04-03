<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCheckoutTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('checkout', function (Blueprint $table) {
            $table->timestamps('created_at');
            $table->timestamps('updated_at');
            $table->increments('id');
            $table->increments('paymentID');
            $table->integer('user_id');
            $table->integer('cardNum');
            $table->string('cardName');
            $table->integer('cardCVC');
            $table->string('country');
            $table->string('slotID');
            $table->string('address');
            $table->float('price');
            $table->string('slotStatus');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('checkout');
    }
}
