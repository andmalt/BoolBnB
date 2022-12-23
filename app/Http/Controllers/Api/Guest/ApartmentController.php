<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApartmentController extends Controller
{
    public function index(Request $request)
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
}
