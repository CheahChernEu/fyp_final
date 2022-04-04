<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Checkout extends Eloquent
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'checkout';

    protected $fillable = [
        'paymentID',
        'cardNum',
        'cardCVC',
        'cardName',
        'country',
        'user_id',
        'slotID',
        'address',
        'created_at',
        'updated_at',
        'price',
        'slotStatus',
    ];

}
