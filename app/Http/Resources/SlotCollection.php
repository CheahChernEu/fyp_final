<?php

namespace App\Http\Resources;

use App\Models\Slot;
use App\Http\Resources\ApiResourceCollection;
use App\Http\Resources\SlotResource;

class SlotCollection extends ApiResourceCollection
{
    public $slot = Slot::class;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        
        // Transforms the collection to match format in SlotResource.
        //$this->collection->transform(function (Slot $slot) {
        $this->collection->transform(function ($slot) {
            return (new SlotResource($slot));
        });

        return parent::toArray($request);
    }
}