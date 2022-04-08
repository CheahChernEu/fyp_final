<?php

namespace App\Http\Controllers;

use App\Models\Slot;
use Illuminate\Http\Request;
use App\Http\Controllers\APIController;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SlotCollection;
use App\Http\Resources\SlotResource;

class SlotController extends ApiController
{

   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Get user from $request token.
        if (!$user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }
        //$collection = Slot::where('user_id', $user->id);
        $collection = Slot::get();
        // Check query string filters.
        if ($status = $request->query('status')) {
            if ('open' === $status || 'closed' === $status) {
                $collection = $collection->where('status', $status);
            }
        }

        //$collection = $collection->latest()->paginate();

        // Appends "status" to pagination links if present in the query.
        if ($status) {
            $collection = $collection->appends('status', $status);
        }

        return new SlotCollection($collection);
    }

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
            'address' => 'required',
            'slotID' => 'required',
            'lat' => 'required',
            'lng' => 'required',
            'price' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        // Warning: Data isn't being fully sanitized yet.
        try {
            $slot = Slot::create([
                'user_id' => $user->id,
                'address' => request('address'),
                'slotID' => request('slotID'),
                'slotImage' => request('slotImage'),
                'lat' => request('lat'),
                'lng' => request('lng'),
                'price' => request('price'),
                'rating' => request('rating'),
                'review' => request('review'),
                'slotStatus' => request('slotStatus'),

            ]);
            return response()->json([
                'status' => 201,
                'message' => 'Resource created.',
                'id' => $slot->id
            ], 201);
        } catch (Exception $e) {
            return $this->responseServerError('Error creating resource.');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        $slot = Slot::where('user_id', $id)->firstOrFail();
        // User can only acccess their own data.
        if ($slot['user_id'] === $user->id) {
            return $this->responseUnauthorized();
        }
        return new SlotResource($slot);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {


        try {
            $slot = Slot::where('slotID', $id)->firstOrFail();
            \Log::debug($slot);
            // if ($slot['user_id'] === $user->id) {
                if (request('slotID')) {
                    $slot->slotID = request('slotID');
                }
                if (request('address')) {
                    $slot->address = request('address');
                }
                if (request('slotImage')) {
                    $slot->slotImage = request('slotImage');
                }
                if (request('lat')) {
                    $slot->lat = request('lat');
                }
                if (request('lng')) {
                    $slot->lng = request('lng');
                }
                if (request('price')) {
                    $slot->price = request('price');
                }
                if (request('rating')) {
                    $slot->rating = request('rating');
                }
                if (request('review')) {
                    $slot->review = request('review');
                }
                if (request('slotStatus')) {
                    $slot->slotStatus = request('slotStatus');
                }
                $slot->save();
                return $this->responseResourceUpdated();
            // } else {
            //     return $this->responseUnauthorized();
            // }
        } catch (Exception $e) {
            return $this->responseServerError('Error updating resource.');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }
        $slot = Slot::where('_id', $id)->firstOrFail();
        // User can only delete their own data.
        if ($slot['user_id'] !== $user->id) {
            return $this->responseUnauthorized();
        }

        try {
            $slot->delete();
            return $this->responseResourceDeleted();
        } catch (Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }
}
