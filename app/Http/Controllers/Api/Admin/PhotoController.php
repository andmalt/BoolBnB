<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PhotoController extends Controller
{
    /**
     * upload user image
     * 
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     * 
     */
    public function uploadMyImage(Request $request)
    {
        $user = $request->user();
        $response = [];

        if (!$user) {
            $response['success'] = false;
            $response['message'] = "You are not authenticated";

            return response()->json($response, 401);
        }

        $validator = Validator::make($request->all(), [
            'image' => "required|mimes:jpg,png,jpeg,gif,svg|max:2240",
        ]);

        if ($validator->fails()) {

            $response = [
                'success' => false,
                'message' => $validator->errors(),
            ];

            return response()->json($response, 400);
        }
        $file = $request->file('image');

        // Remove old image from MinIO
        if ($user->image) {
            Storage::disk('s3')->delete($user->image);
        }
        // Create unique path for the new image
        $path = 'users/' . $user->id . '/avatar_' . time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();

        // Upload to MinIO
        Storage::disk('s3')->put($path, file_get_contents($file));

        $user->image = $path;
        $user->save();


        $response['success'] = true;
        $response['message'] = "You have uploaded the photo!";

        return response()->json($response);
    }

    /**
     * delete user image
     * 
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     * 
     */
    public function destroyMyImage(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "You are not authenticated",
            ], 401);
        }

        if ($user->image) {
            Storage::disk('s3')->delete($user->image);
            $user->image = null;
            $user->save();
        }

        return response()->json([
            'success' => true,
            'message' => "You destroyed the photo!",
        ]);
    }


    /**
     * upload images
     *
     * @param  int $id
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadImage(Request $request, int $id)
    {
        $apartment = Apartment::find($id);

        if (!$apartment || $apartment->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => "there isn't any apartment or you aren't the user",
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'image-1' => "required",
            '*' => 'mimes:jpg,png,jpeg,gif,svg|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        // I get all images in the request (image-1, image-2, ecc)
        $files = $request->allFiles();
        // $files = $request->file();

        foreach ($files as $file) {
            if (!$file) {
                continue;
            }

            $filename = time() . Str::random(20) . '.' . $file->getClientOriginalExtension();

            // Logic path to bucket MinIO
            $path = 'apartments/' . $apartment->id . '/' . $filename;

            // Upload to MinIO
            Storage::disk('s3')->put($path, file_get_contents($file));

            // Save in DB
            $photo = new Photo();
            $photo->apartment_id = $apartment->id;
            $photo->image_url = $path;
            $photo->save();
        }

        return response()->json([
            'success' => true,
            'message' => 'image or images uploaded',
        ], 201);
    }

    /**
     * delete a model photo
     *
     * @param  int $id
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteImage(int $id, Request $request)
    {
        $photo = Photo::find($id);

        if (!$photo) {
            return response()->json([
                'success' => false,
                'message' => 'image not found',
            ], 404);
        }

        if ($photo->apartment->user->id != $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'image is not deleted',
            ], 401);
        }

        // Delete from MinIO
        Storage::disk('s3')->delete($photo->image_url);

        // Delete from DB
        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'image is deleted',
        ]);
    }
}
