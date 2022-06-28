<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|min:2|max:50',
            'surname' => 'required|string|min:2|max:50',
            'email' => 'email|required|string|max:60|unique:users,email',
            'password' => 'required|confirmed|string|min:6|max:12',
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

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email|string|max:60',
            'password' => 'required|string|min:6|max:12',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {

            $response = [
                'success' => false,
                'message' => 'the credentials are not good',
            ];

            return response()->json($response, 401);
        }

        $token = $user->createToken('BoolBnB')->plainTextToken;

        $response = [
            'success' => true,
            'user' => $user,
            'token' => $token,
        ];

        return response()->json($response, 201);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        $response = [
            'success' => true,
            'message' => 'logged out'
        ];

        return response()->json($response, 202);
    }
}
