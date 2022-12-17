<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {
        // $apartments = DB::table('apartments')
        //     ->join('photos', 'apartments.id', '=', 'photos.apartment_id')
        //     ->select('apartments.*', 'photos.*')
        //     ->orderByDesc('visible')->paginate(10);

        $apartments = DB::table('apartments')
            ->orderByDesc('visible')->paginate(10);
        $photos = DB::table('photos')->get();

        $response = [
            "apartments" => $apartments,
            "photos" => $photos,
            "success" => true
        ];

        return response()->json($response);
    }
}
