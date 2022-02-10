<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $apartments = DB::table('apartments')->where('user_id','=', Auth::user()->id);

        return view('admin.apartment.index',\compact('apartments'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $regions = [
            'Abruzzo',
            'Basilicata',
            'Calabria',
            'Campania',
            'Emilia-Romagna',
            'Friuli Venezia Giulia',
            'Lazio',
            'Liguria',
            'Lombardia',
            'Marche',
            'Molise',
            'Piemonte',
            'Puglia',
            'Sardegna',
            'Sicilia',
            'Toscana',
            'Trentino-Alto Adige',
            'Umbria',
            'Valle d\'Aosta',
            'Veneto',
        ];

        $facilities = Facility::all();

        return view('admin.apartment.create',compact('regions','facilities'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $address = str_replace(' ', '-', $data['address']);
        $call = file_get_contents('https://api.tomtom.com/search/2/geocode/' . $data['region'] . '-' . $data['city'] . '-' . $address . '.JSON?key=CskONgb89uswo1PwlNDOtG4txMKrp1yQ');

        $response = json_decode($call);

        $data['lat'] = $response->results[0]->position->lat;
        $data['lon'] = $response->results[0]->position->lon;

        $apartment = new Apartment();
        $apartment->fill($data);
        $apartment->save();

        if(array_key_exists('facilities', $data)){
            $apartment->facilities()->sync($data['facilities']);
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
        return \view('admin.apartment.show');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return \view('admin.apartment.edit');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
