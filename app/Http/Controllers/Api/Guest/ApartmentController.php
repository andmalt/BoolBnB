<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use Faker\Core\Number;
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

    public function show($id)
    {
        if(!is_numeric($id)){
            $response = [
                "message" => "This is not a number or there is nothing",
                "success" => false
            ];
    
            return response()->json($response);
        }

        $apartment = Apartment::where('id', '=', $id)
        ->with('photos')->get();

        if(!$apartment){

            $response = [
                "message" => "There isn't an apartment",
                "success" => false
            ];
    
            return response()->json($response);
        }

        $response = [
            "apartment" => $apartment,
            "success" => true
        ];

        return response()->json($response);
    }
}
