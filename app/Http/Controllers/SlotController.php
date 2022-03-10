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
            'content' => 'required',
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        // Warning: Data isn't being fully sanitized yet.
        try {
            $slot = Slot::create([
                'user_id' => $user->id,
                'content' => request('content'),
                'title' => request('title'),
                'image_url' => request('image_url'),
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

        $slot = Slot::where('_id', $id)->firstOrFail();
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
        // Get user from $request token.
        if (! $user = auth()->setRequest($request)->user()) {
            return $this->responseUnauthorized();
        }

        // Validates data.
        $validator = Validator::make($request->all(), [
            'content' => 'string',
            'title' => 'string',
            'image_url' => 'string',
        ]);

        if ($validator->fails()) {
            return $this->responseUnprocessable($validator->errors());
        }

        try {
            $slot = Slot::where('_id', $id)->firstOrFail();
            if ($slot['user_id'] === $user->id) {
                if (request('title')) {
                    $slot->title = request('title');
                }
                if (request('content')) {
                    $slot->content = request('content');
                }
                if (request('slug')) {
                    $slot->slug = request('slug');
                }
                if (request('cat_id')) {
                    $slot->cat_id = request('cat_id');
                }
                if (request('image_url')) {
                    $slot->image_url = request('image_url');
                }
                if (request('status')) {
                    $slot->status = request('status');
                }
                $slot->save();
                return $this->responseResourceUpdated();
            } else {
                return $this->responseUnauthorized();
            }
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