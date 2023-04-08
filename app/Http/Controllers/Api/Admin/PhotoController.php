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
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request, int $id)
    {
        $apartment = Apartment::find($id);

        if (!$apartment || $apartment->user_id !== $request->user()->id) {
            $response = [
                'success' => false,
                'message' => "there isn't any apartment or you aren't the user"
            ];

            return response()->json($response, 404);
        }

        $validator = Validator::make($request->all(), [
            'image-1' => "required",
            '*' => 'mimes:jpg,png,jpeg,gif,svg',
        ]);

        if ($validator->fails()) {

            $response = [
                'success' => false,
                'message' => $validator->errors(),
            ];

            return response()->json($response, 400);
        }

        if ($request->hasFile('image-1')) {
            foreach ($request->all() as $image) {
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
        ];
        return response()->json($response, 201);
    }

    /**
     * delete a model photo
     *
     * @param  mixed $photo
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteImage(int $id, Request $request)
    {
        $photo = Photo::find($id);
        if ($photo->apartment->user->id == $request->user()->id) {
            Storage::disk('public')->delete('apartments/images/' . $photo->image_url);
            $photo->delete();

            $response = [
                'success' => true,
                'message' => 'image is deleted',
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => 'image is not deleted',
            ];
            return response()->json($response, 401);
        }
    }
}
