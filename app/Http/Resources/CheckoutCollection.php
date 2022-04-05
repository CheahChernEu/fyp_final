<?php

namespace App\Http\Resources;

use App\Models\Checkout;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\CheckoutResource;

class CheckoutCollection extends ApiResourceCollection
{
    public $checkout = Checkout::class;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {


        $this->collection->transform(function ($checkout) {
            return (new CheckoutResource($checkout));
        });

        return parent::toArray($request);
    }
}
