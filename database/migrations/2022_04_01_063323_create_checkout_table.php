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
            $table->string('slotID');
            $table->string('address');
            $table->float('price');
            $table->string('reservationStatus');
            $table->string('paymentMethod');
            $table->string('paymentStatus');
            $table->string('paymentMethod');
            $table->string('paymentStatus');
            $table->date('startDate');
            $table->date('endDate');

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
