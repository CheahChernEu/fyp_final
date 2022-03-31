<?php

namespace App\Http\Resources;

class SlotResource extends ApiResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'created_at' => (string)$this->created_at->toDateTimeString(),
            'updated_at' => (string)$this->updated_at->toDateTimeString(),
            'id' => $this->id,
            'user_id' => $this->user_id,
            'slotID' => $this->slotID,
            'address' => $this->address,
            'slotImage' => $this->slotImage,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'price' => $this->price,
            'review' => $this->review,
            'rating' => $this->rating,
            'slotStatus' => $this->slotStatus,
            
        ];
    }
}