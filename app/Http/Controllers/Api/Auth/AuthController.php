<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Summary of register
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        $fields = $request->validate([
            'name' => 'required|string|max:255|min:2',
            'surname' => 'required|string|max:255|min:2',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|confirmed|max:30'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'surname' => $fields['surname'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        $token = $user->createToken('BoolBnB')->plainTextToken;

        $response = [
            'success' => true,
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($response, 201);
    }

    /**
     * Summary of login
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        // If validation is good check the email and password exist
        if (!$user || !Hash::check($fields['password'], $user->password)) {

            // if not exist
            $response = [
                'success' => false,
                'message' => 'the credentials are not good',
            ];

            return response()->json($response, 401);
        }

        // if exist create token
        $token = $user->createToken('BoolBnB')->plainTextToken;

        $response = [
            'success' => true,
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($response, 201);
    }

    /**
     * Summary of logout
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // all user tokens will be deleted
        $request->user()->tokens()->delete();

        $response = [
            'success' => true,
            'message' => 'logged out'
        ];

        return response()->json($response, 200);
    }
}