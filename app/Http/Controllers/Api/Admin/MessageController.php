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
            ->whereNull('messages.deleted_at')
            ->select('messages.*')
            ->orderByDesc('created_at')
            ->paginate(10);

        $messagesNotReadLength = DB::table('messages')
            ->join('apartments', 'messages.apartment_id', '=', 'apartments.id')
            ->join('users', 'apartments.user_id', '=', 'users.id')
            ->where('users.id', '=', $request->user()->id)
            ->where('messages.is_read', '=', false)
            ->select('messages.*')
            ->orderByDesc('created_at')
            ->count();

        if ($messages) {
            $response = [
                'success' => true,
                'messages' => $messages,
                'messagesNotRead' => $messagesNotReadLength,
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
     * Display all my trashed messages 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function trash_index(Request $request)
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
            ->where('messages.deleted_at', '<>', 'null')
            ->select('messages.*')
            ->orderByDesc('created_at')
            ->paginate(10);

        if ($messages) {
            $response = [
                'success' => true,
                'messages' => $messages,
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "There aren't any messages",
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
            $message['is_read'] = true;
            $message->update();
            $response = [
                'success' => true,
                'message' => $message,
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

    /**
     * restore a my trashed message
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(Request $request, int $id)
    {
        if (!$request->user()) {
            $response = [
                'success' => false,
                'message' => "You are not authenticated",
            ];
            return response()->json($response, 401);
        }

        $message = Message::where('id', '=', $id)
            ->onlyTrashed()
            ->first();

        if ($message && $message->apartment->user->id == $request->user()->id) {
            $message->restore();

            $response = [
                'success' => true,
                'message' => 'The message has been restored',
            ];
            return response()->json($response);
        } else {
            $response = [
                'success' => false,
                'message' => "The message has not been restored",
            ];
            return response()->json($response, 404);
        }
    }

    /**
     * Delete my message with 'soft deleting'
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, int $id)
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

    /**
     * Forever delete my message
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

        $message = Message::where('id', '=', $id)
            ->onlyTrashed()
            ->first();


        if ($message && $message->apartment->user->id == $request->user()->id) {
            $message->forceDelete();

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
