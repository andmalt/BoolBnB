<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmailVerificationController extends Controller
{
    /**
     * Send a new email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $response = [];

        if ($request->user()->hasVerifiedEmail()) {

            $response["success"] = true;
            $response["message"] = "";

            return response()->json($response);
        }

        $request->user()->sendEmailVerificationNotification();

        // return back()->with('status', 'verification-link-sent');
        $response["success"] = true;
        $response["message"] = "";

        return response()->json($response);
    }
}
