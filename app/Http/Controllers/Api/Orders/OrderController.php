<?php

namespace App\Http\Controllers\Api\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Orders\OrderRequest;
use Illuminate\Http\Request;
use App\Models\Sponsorship;
use Braintree\Gateway;

class OrderController extends Controller
{
    /**
     * generate the token for make a payment
     */
    public function generate(Request $request)
    {
        if ($request->user()) {
            $gateway = new Gateway([
                'environment' => env('BRAINTREE_ENVIRONMENT'),
                'merchantId' => env("BRAINTREE_MERCHANT_ID"),
                'publicKey' => env("BRAINTREE_PUBLIC_KEY"),
                'privateKey' => env("BRAINTREE_PRIVATE_KEY")
            ]);

            $clientToken = $gateway->clientToken()->generate();
            $response = [
                'success' => true,
                'token' => $clientToken,
            ];
            return response()->json($response, 200);
        }
        $response = [
            'success' => false,
            'message' => 'You are not authenticated'
        ];
        return response()->json($response, 200);
    }

    /**
     * make a payment and check if it is successful
     */
    public function makePayment(OrderRequest $request, Gateway $gateway)
    {

        $sponsorship = Sponsorship::find($request->sponsorship);

        $result = $gateway->transaction()->sale([
            'amount' => $sponsorship->price,
            'paymentMethodNonce' => $request->token,
            'options' => [
                'submitForSettlement' => True
            ]
        ]);
        if ($result->success) {
            $response = [
                'success' => true,
                'messagge' => 'Transaction completed successfully'
            ];
            return response()->json($response, 200);
        } else {
            $response = [
                'success' => false,
                'messagge' => 'Transaction failed'
            ];

            return response()->json($response, 401);
        }
    }
}
