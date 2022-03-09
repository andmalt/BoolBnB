<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $apartments = DB::table('apartments')->where('user_id', '=', Auth::user()->id)->paginate(2);

        return view('admin.apartment.index', compact('apartments'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        require __DIR__ . '../../../../Variables/apartmentVariables.php';

        $facilities = Facility::all();

        return view('admin.apartment.create', compact('regions', 'facilities'));
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
        $data['user_id'] = Auth::user()->id;

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
    public function show(Apartment $apartment)
    {
        $facilities = Facility::all();

        if(Auth::user()->id == $apartment->user_id){
            return view('admin.apartment.show', compact('apartment'));
        }else{
            return view('guest.welcome');
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Apartment $apartment)
    {
        require __DIR__ . '../../../../Variables/apartmentVariables.php';

        $facilities = Facility::all();

        
        
        $facilityIds = $apartment->facilities->pluck('id')->toArray();

        if (Auth::user()->id == $apartment->user_id) {
            return view('admin.apartment.edit', compact('regions', 'apartment', 'facilities', 'facilityIds'));
        } else {
            return view('guest.welcome');
        }    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Apartment $apartment)
    {
        // validations
        require __DIR__ . '../../../../Validations/updateApartment.php';

        $data = $request->all();

        $address = str_replace(' ', '-', $data['address']);
        $call = file_get_contents('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');
        $response = json_decode($call);
        // inserted in data the results lat,lon in the response 
        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        $apartment->update($data);

        return redirect()->route('admin.apartment.show',$apartment->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Apartment $apartment)
    {

        if ($apartment->facilities) $apartment->facilities()->detach();

        foreach ($apartment->photos as $photo) {
            $path = $photo->image_url;
            Storage::disk('public')->delete('apartments/images/' . $path);
        }

        $apartment->delete();

        return redirect()->route('admin.apartment.index')->with('delete-message', "$apartment->title è stato eliminato con successo");
    }
}
