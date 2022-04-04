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


        // Validate all the required parameters have been sent.
        $validator = Validator::make($request->all(), [
            'paymentID' => 'required',
            'cardNum' => 'required',
            'cardCVC' => 'required',
            'cardName' => 'required',
            'country' => 'required',
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
                'user_id' => $user->id,
                'cardNum' => request('cardNum'),
                'cardCVC' => request('cardCVC'),
                'cardName' => request('cardName'),
                'country' => request('country'),
                'slotID' => request('slotID'),
                'address' => request('address'),
                'price' => request('review'),
                'slotStatus' => request('slotStatus'),
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
