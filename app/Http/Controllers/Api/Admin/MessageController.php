<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $messages = DB::table('messages')
            ->join('apartments', 'messages.apartment_id', '=', 'apartments.id')
            ->join('users', 'apartments.user_id', '=', 'users.id')
            ->where('users.id', '=', $request->user()->id)
            ->select('messages.*')
            ->orderByDesc('created_at')
            ->paginate(6);

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

    /**
     * Display my message
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, int $id)
    {
        if (!$request->user()) {
            $response = [
                'success' => false,
                'message' => "You are not authenticated",
            ];
            return response()->json($response, 401);
        }

        $message = Message::where('id', '=', $id)
            ->first();

        if ($message && $message->apartment->user->id == $request->user()->id) {
            $response = [
                'success' => true,
                'message' => $message,
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

    /**
     * Deleted my message
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, int $id)
    {
        if (!$request->user()) {
            $response = [
                'success' => false,
                'message' => "You are not authenticated",
            ];
            return response()->json($response, 401);
        }

        $message = Message::find($id);


        if ($message && $message->apartment->user->id == $request->user()->id) {
            $message->delete();

            $response = [
                'success' => true,
                'messages' => "The message is deleted",
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "There aren't any message",
            ];
            return response()->json($response, 404);
        }
    }
}
