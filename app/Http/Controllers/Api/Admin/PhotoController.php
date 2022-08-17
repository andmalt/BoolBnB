<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PhotoController extends Controller
{
    /**
     * upload images
     *
     * @param  mixed $request
     * @param  mixed $apartment
     * @return void
     */
    public function uploadImage(Request $request, $id)
    {
        $apartment = Apartment::find($id);

        if (!$apartment || $apartment->user_id !== $request->user()->id) {
            $response = [
                'success' => false,
                'message' => "there isn't any apartment or you aren't the user"
            ];

            return response()->json($response, 404);
        }


        $validator = Validator::make($request->file('images'), [
            'images' => "required",
            'images.*' => 'mimes:jpg,png,jpeg,gif,svg',
        ]);

        if ($validator->fails()) {

            $response = [
                'success' => false,
                'message' => $validator->errors(),
            ];

            return response()->json($response, 400);
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $photo = new Photo();
                $url = time() . Str::random(20) . '.' . $image->extension();
                $image->move(storage_path('app/public/apartments/images/'), $url);
                $photo->apartment_id = $apartment->id;
                $photo->image_url = $url;
                $photo->save();
            }
        }

        $response = [
            'success' => true,
            'message' => 'image or images uploaded',
            'photos' => $photo,
        ];
        return response()->json($response, 201);
    }

    /**
     * delete a model photo
     *
     * @param  mixed $photo
     * @return void
     */
    public function deleteImage(Photo $photo)
    {
        // \dd($photo->apartment->id);

        Storage::disk('public')->delete('apartments/images/' . $photo->image_url);
        $photo->delete();

        return response()->json();
    }
}
