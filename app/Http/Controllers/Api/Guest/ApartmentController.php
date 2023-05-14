<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Stat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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

        $sponsorshipD = '0000-00-00';

        foreach ($apartment->sponsorships as $sponsorship) {
            $sponsorshipD = $sponsorship->pivot->end_date;
        }

        /* example time "2022-01-08" */
        $timeNow = Carbon::now();

        if ($sponsorshipD !== '0000-00-00') {
            $tn = str_replace('-', '', $timeNow);
            $sn = str_replace('-', '', $sponsorshipD);

            if ($tn > $sn) {
                $apartment->sponsorships()->detach();
                $apartment->visible = false;
                $apartment->save();
            }
        } else {
            $apartment->visible = false;
            $apartment->save();
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
