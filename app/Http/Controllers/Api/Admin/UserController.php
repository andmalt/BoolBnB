<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * get user detail
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get_user_detail(Request $request)
    {
        $user = $request->user();
        $response = [];

        if (!$user) {
            $response['success'] = false;
            $response['message'] = "You are not authenticated";
            return response()->json($response);
        }

        $response['success'] = true;
        $response['user'] = $user;

        return response()->json($response);
    }

    /**
     * set user name, surname and email
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function set_user_detail(Request $request)
    {
        $user = $request->user();
        $response = [];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|min:2',
            'surname' => 'required|string|max:255|min:2',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {

            $response = [
                'success' => false,
                'message' => "Validation failed",
                'errors' => $validator->errors()
            ];

            return response()->json($response, 400);
        }

        if (!$user) {
            $response['success'] = false;
            $response['message'] = "You are not authenticated";
            return response()->json($response);
        }

        // Retrieve the validated input
        $fields = $validator->validate();

        // If you change the email, laravel resends the email verification notification
        if ($user->email != $fields['email']) {
            $user->email = $fields['email'];
            $user->email_verified_at = null;
            $user->sendEmailVerificationNotification();
        }

        $user->name = $fields['name'];
        $user->surname = $fields['surname'];
        $user->save();

        $response['success'] = true;
        $response['user'] = $user;

        return response()->json($response);
    }

    /**
     * Change the user's password
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function change_user_password(Request $request)
    {
        $user = $request->user();
        $response = [];

        // "oldpassword":"******",
        // "password": "******",
        // "password_confirmation" : "*******"
        $fields = $request->validate([
            'oldpassword' => 'required|string|max:30',
            'password' => 'required|string|confirmed|max:30'
        ]);

        if (!$user || !Hash::check($fields['oldpassword'], $user->password)) {

            // if the user doesn't exist or the password doesn't match
            $response = [
                'success' => false,
                'message' => 'the credentials are not good',
            ];

            return response()->json($response, 401);
        }

        $user->password = bcrypt($fields['password']);
        $user->save();

        $response['success'] = true;
        $response['message'] = 'You have changed the password correctly!';

        return response()->json($response);
    }

    /**
     * Delete the user account
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete_account(Request $request)
    {
        $user = $request->user();
        $response = [];

        if (!$user) {
            $response['success'] = false;
            $response['message'] = "You are not authenticated";

            return response()->json($response);
        }

        $user->delete();

        $response['success'] = true;
        $response['message'] = "You have deleted the account";

        return response()->json($response);
    }
}
