<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {

        $apartments = Apartment::where('user_id', '=', $request->user()->id)
            ->with('facilities')
            ->with('sponsorships')
            ->with('stats')
            ->with('messages')
            // ->with('apartmentreviews')
            ->with('photos')
            ->paginate(5);

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validations
        require __DIR__ . '../../../../Validations/createApartment.php';


        $data = $request->all();
        $data['user_id'] = $request->user()->id;

        // call api to TomTom and response decoding
        $address = str_replace(' ', '-', $data['address']);
        $call = file_get_contents('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');
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
                $name = time() . Str::random(20) . '.' . $image->getClientOriginalExtension();
                $image->move(storage_path('app/public/apartments/images/'), $name);
                $photo->image_url = $name;
                $photo->apartment_id = $apartment->id;
                $photo->save();
            }
        }

        return redirect()->route('admin.apartment.show', $apartment->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        $apartment = Apartment::find($id);
        $messages = $apartment->messages()->get();

        if ($request->user()->id == $apartment->user_id) {
            $response = [
                'success' => true,
                [
                    'apartment' => $apartment,
                    'messages' => $messages,
                ],
            ];

            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "there isn't any apartment or maybe you aren't the user",
            ];

            return response()->json($response, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        // validations
        require __DIR__ . '../../../../Validations/updateApartment.php';

        $data = $request->all();

        // call api to TomTom and response decoding
        $address = str_replace(' ', '-', $data['address']);
        $call = file_get_contents('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');
        $response = json_decode($call);
        // inserted in data the results lat,lon in the response 
        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        $apartment = Apartment::find($id);

        $apartment->update($data);

        return redirect()->route('admin.apartment.show', $apartment->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        $apartment = Apartment::find($id);

        if ($request->user()->id == $apartment->user_id) {
            if ($apartment->facilities) $apartment->facilities()->detach();

            foreach ($apartment->photos as $photo) {
                $path = $photo->image_url;
                Storage::disk('public')->delete('apartments/images/' . $path);
            }

            $apartment->delete();

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

            return response()->json($response, 404);
        }
    }
}
