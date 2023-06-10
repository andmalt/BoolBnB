<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     *
     * @param   \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\RedirectResponse
     */
    public function verifyEmail(Request $request, $id, $hash)
    {
        $user = User::find($id);
        // $request->route();

        if (!hash_equals(
            (string) $user->getKey(),
            (string) $id
        )) {
            return redirect()->to('/');
        }

        if (!hash_equals(
            sha1($user->getEmailForVerification()),
            (string) $hash
        )) {
            return redirect()->to('/');
        }

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            event(new Verified($user));
        }

        return redirect()->to('/login');
    }

    /**
     * check if the user has verified the email
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request)
    {
        $response = [];

        if ($request->user()->hasVerifiedEmail()) {

            $response["success"] = true;
            $response["message"] = "is verified";

            return response()->json($response);
        }

        $response["success"] = false;
        $response["message"] = "is not verified";

        return response()->json($response);
    }
}
