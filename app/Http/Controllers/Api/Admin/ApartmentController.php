<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use App\Models\Photo;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ApartmentController extends Controller
{
    /**
     * Display all my apartments
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {

        $apartments = Apartment::where('user_id', '=', $request->user()->id)
            ->with('photos')
            ->paginate(3);

        if ($apartments) {
            $response = [
                'success' => true,
                'apartments' => $apartments,
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "There aren't any apartments",
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Store a newly created apartment in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // validations
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:apartments|min:5|max:255',
            'city' => 'required|string|min:2|max:100',
            'region' => 'required|string|min:5|max:100',
            'address' => 'required|string|min:5|max:150',
            'rooms' => "required|integer|between:1,20",
            'bathrooms' => "required|integer|between:1,20",
            'beds' => "required|integer|between:1,40",
            'square' => "required|integer|between:15,500",
            'facilities' => 'nullable|exists:facilities,id',
            'description' => 'required|string|min:10|max:1500',
            'price' => 'required|numeric|min:1.00|max:9999.00',
        ]);

        if ($validator->fails()) {

            $response = [
                'success' => false,
                'error' => $validator->errors(),
            ];

            return response()->json($response, 400);
        }

        $validated = $validator->validated();

        $data = $validated;
        $data['user_id'] = $request->user()->id;

        // call api to TomTom and response decoding
        $address = str_replace(' ', '-', $data['address']);

        $call = Http::get('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');

        $response = json_decode($call);

        // inserted in data the results lat,lon in the response 
        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        $apartment = new Apartment();
        $apartment->fill($data);
        $apartment->save();

        if (array_key_exists('facilities', $data)) {
            $apartment->facilities()->sync($data['facilities']);
        }

        if ($request->hasfile('images')) {

            foreach ($request->file('images') as $image) {
                $photo = new Photo();
                $url = time() . Str::random(20) . '.' . $image->extension();
                $image->move(storage_path('app/public/apartments/images/'), $url);
                $photo->image_url = $url;
                $photo->apartment_id = $apartment->id;
                $photo->save();
            }
        }

        $apart = Apartment::where('id', $apartment->id)
            ->with('facilities', 'photos')
            ->first();

        $response = [
            'success' => true,
            'message' => "the apartment has been created",
            'apartment' => $apart
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified apartment.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id, Request $request)
    {
        $apartment = Apartment::where('id', $id)
            ->with('photos', 'messages', 'facilities', 'sponsorships')
            ->first();

        $facilities = Facility::all();
        $regions = Region::all();

        if (!$apartment) {
            $response = [
                'success' => false,
                'message' => "there isn't any apartment",
            ];
            return response()->json($response, 404);
        }

        if ($request->user()->id !== $apartment->user_id) {
            $response = [
                'success' => false,
                'message' => "you are not the user",
            ];
            return response()->json($response, 401);
        } else {
            $response = [
                'success' => true,
                'apartment' => $apartment,
                'facilities' => $facilities,
                'regions' => $regions,
            ];
            return response()->json($response);
        }
    }

    /**
     * Update the apartments in the storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $apartment = Apartment::find($id);
        if ($request->user()->id !== $apartment->user_id) {
            $response = [
                'success' => false,
                'message' => "you are not the user",
            ];
            return response()->json($response, 401);
        }
        // validations
        $data = $request->validate([
            'city' => 'required|string|min:2|max:100',
            'region' => 'required|string|min:5|max:100',
            'address' => 'required|string|min:5|max:150',
            'rooms' => "required|integer|between:1,20",
            'bathrooms' => "required|integer|between:1,20",
            'beds' => "required|integer|between:1,40",
            'square' => "required|integer|between:15,500",
            'facilities' => 'nullable|exists:facilities,id',
            'description' => 'required|string|min:10|max:1500',
            'price' => 'required|numeric|min:1.00|max:9999.00',
        ]);

        // call api to TomTom and response decoding
        $address = str_replace(' ', '-', $data['address']);
        $call = Http::get('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');

        $response = json_decode($call);
        // write condition here... if there isn't apartment


        // inserted in data the results lat,lon in the response 
        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        if ($apartment) {
            $apartment->update($data);
            if (array_key_exists('facilities', $data)) {
                $apartment->facilities()->sync($data['facilities']);
            }

            $response = [
                'success' => true,
                'message' => "the apartment " . $apartment->title . " is updated",
            ];

            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "there isn't any apartment",
            ];

            return response()->json($response, 404);
        }
    }

    /**
     * Remove the apartments from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id, Request $request)
    {
        $apartment = Apartment::find($id);

        if ($request->user()->id === $apartment->user_id) {

            $apartment->delete();

            if ($apartment->facilities)
                $apartment->facilities()->detach();

            foreach ($apartment->photos as $photo) {
                $path = $photo->image_url;
                Storage::disk('public')->delete('apartments/images/' . $path);
            }

            $response = [
                'success' => true,
                'message' => "deleted apartment"
            ];

            return response()->json($response);
        } else {

            $response = [
                'success' => false,
                'message' => "you aren't the user",
            ];

            return response()->json($response, 401);
        }
    }
}