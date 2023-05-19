<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Sponsorship;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SponsorshipController extends Controller
{
    /**
     * get sponsorships
     */
    public function index(Request $request)
    {
        $sponsorships = Sponsorship::all();
        $response = [];

        if ($request->user()) {
            // insert here the code if the Apartment have the sponsorship

            $response['success'] = true;
            $response['sponsorships'] = $sponsorships;
            return response()->json($response, 200);
        } else {
            $response['success'] = false;
            $response['message'] = 'You are not authenticated';
            return response()->json($response, 401);
        }
    }

    /**
     * add sponsorship to the house
     */
    public function update(Request $request, int $id)
    {
        $data = $request->all();

        $response = [];
        if (array_key_exists('sponsorship', $data)) {
            /* $apartment->sponsorships()->sync($data['sponsorship']); */

            $apartment = Apartment::find($id);

            $sponsorship = end($data['sponsorship']);

            if ($apartment->user->id == $request->user()->id) {
                $apartment->sponsorships()->detach();

                if ($sponsorship == 1) {
                    $apartment->sponsorships()->attach([$sponsorship => [
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(24),
                    ]]);
                } elseif ($sponsorship == 2) {
                    $apartment->sponsorships()->attach([$sponsorship => [
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(72),
                    ]]);
                } elseif ($sponsorship == 3) {
                    $apartment->sponsorships()->attach([$sponsorship => [
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(144),
                    ]]);
                }
                $apartment->visible = true;
                $apartment->save();

                $response['success'] = true;
                $response['message'] = 'The apartment is successfuly sponsored';
                return response()->json($response, 200);
            } else {
                $response['success'] = false;
                $response['message'] = 'You are not authenticated';
                return response()->json($response, 401);
            }
        }
        $response['success'] = false;
        $response['message'] = 'error value';
        return response()->json($response, 404);
    }
}
