<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Stat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    public function index()
    {
        $apartments = DB::table('apartments')
            ->orderByDesc('visible')->get();
        $photos = DB::table('photos')->get();

        $response = [
            "apartments" => $apartments,
            "photos" => $photos,
            "success" => true
        ];

        return response()->json($response);
    }

    public function indexMobile()
    {
        $apartments = Apartment::with('photos')
            ->orderByDesc('visible')
            ->paginate(50);


        $response = [
            "apartments" => $apartments,
            "success" => true
        ];

        return response()->json($response);
    }

    public function show($id, Request $request)
    {
        if (!is_numeric($id)) {
            $response = [
                "message" => "This is not a number or there is nothing",
                "success" => false
            ];

            return response()->json($response);
        }

        $apartment = Apartment::where('id', '=', $id)
            ->with('photos')->first();

        if (!$apartment) {

            $response = [
                "message" => "There isn't an apartment",
                "success" => false
            ];

            return response()->json($response);
        }

        $stat = new Stat();
        $stat->apartment_id = $apartment->id;
        $stat->ip = $request->ip();
        $stat->date = date("Y-m-d h:i:s");
        $stat->save();


        $response = [
            "apartment" => $apartment,
            "success" => true
        ];

        return response()->json($response);
    }
}
