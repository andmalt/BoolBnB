<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Facility;
use App\Models\Stat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $apartments = DB::table('apartments')
            ->orderByDesc('visible')->paginate(16);

        $facilities = Facility::all();

        $city = $request->query('city');
        $address = $request->query('address');
        $facilityIds = $request->query('facilities');


        if ($city != null || $address != null || $facilityIds != null) {
            $apartments = DB::table('apartments')
                ->where('city', 'LIKE', "%$city%")
                ->where('address', 'LIKE', "%$address%")
                // ->where('facility_id', 'LIKE', $facilityIds)
                ->orderByDesc('visible')->paginate(16);
        }

        return view('guest.apartment.index', compact('apartments', 'facilities'));
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Apartment $apartment, Request $request)
    {
        $stat = new Stat();
        $stat->apartment_id = $apartment->id;
        $stat->ip = $request->ip();
        $stat->date = date("Y-m-d h:i:s");
        $stat->save();

        $facilities = Facility::all();

        return view('guest.apartment.show', compact('apartment', 'facilities'));
    }
}
