<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display all my messages
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if (!$request->user()) {
            $response = [
                'success' => false,
                'message' => "You are not authenticated",
            ];
            return response()->json($response, 401);
        }

        $messages = Message::paginate(6);

        if ($messages) {
            $response = [
                'success' => true,
                'messages' => $messages,
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "There aren't any apartments",
            ];
            return response()->json($response, 404);
        }
    }
}
