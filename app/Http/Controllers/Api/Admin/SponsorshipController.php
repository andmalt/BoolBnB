<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SponsorshipController extends Controller
{
    /**
     * check if the house has a sponsorship
     */
    public function index(Request $request, int $id)
    {
        $apartment = Apartment::find($id);
        $response = [];

        if (!$apartment) {
            $response['success'] = false;
            $response['message'] = 'The apartment does not exist';
            return response()->json($response, 200);
        }


        if ($apartment->user->id == $request->user()->id) {
            // insert here the code if the Apartment have the sponsorship

            $response['success'] = true;
            $response['sponsorship'] = $apartment->sponsorships;
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

        if (array_key_exists('sponsorship', $data)) {
            /* $apartment->sponsorships()->sync($data['sponsorship']); */

            $apartment = Apartment::find($id);

            $response = [];

            if ($apartment->user->id == $request->user()->id) {
                $apartment->sponsorships()->detach();

                if ($data['sponsorship'] == 1) {
                    $apartment->sponsorships()->attach($apartment, [
                        'sponsorship_id' => $data['sponsorship'],
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(24),
                    ]);
                } elseif ($data['sponsorship'] == 2) {
                    $apartment->sponsorships()->attach($apartment, [
                        'sponsorship_id' => $data['sponsorship'],
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(72),
                    ]);
                } elseif ($data['sponsorship'] == 3) {
                    $apartment->sponsorships()->attach($apartment, [
                        'sponsorship_id' => $data['sponsorship'],
                        'start_date' => Carbon::now(),
                        'end_date' => Carbon::now()->addHours(144),
                    ]);
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
    }
}
