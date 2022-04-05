<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Validator;


class CheckoutController extends ApiController
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }
        \Log::debug('Tanininini', $request->all());

        // Validate all the required parameters have been sent.
        $validator = Validator::make($request->all(), [

            'slotID' => 'required',
            'price' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        // Warning: Data isn't being fully sanitized yet.
        try {
            $checkout = Checkout::create([
                'user_id' => request('user_id'),
                'slotID' => request('slotID'),
                'address' => request('address'),
                'price' => request('price'),
                'reservationStatus' => request('reservationStatus'),
                'paymentMethod' => request('paymentMethod'),
                'paymentStatus'  => request('paymentStatus'),
            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'checkoutObj' => $checkout
            ], 201);
        } catch (Exception $e) {
            return $this->responseServerError('Error creating resource.');
        }
    }
}
