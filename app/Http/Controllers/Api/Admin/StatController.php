<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Apartment;
use App\Models\Stat;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatController extends Controller
{
    public function index_total(Request $request, int $id)
    {
        $response = [];
        $apartment = Apartment::find($id);
        if (!$apartment) {
            $response['success'] = false;
            $response['message'] = 'There isn\'t the house!';
            return response()->json($response, 404);
        } elseif ($request->user()->id != $apartment->user_id) {
            $response['success'] = false;
            $response['message'] = 'You are not authenticated!';
            return response()->json($response, 401);
        }

        $stat = Stat::where('apartment_id', '=', $apartment->id)->count();

        $response['success'] = true;
        $response['statistic'] = $stat;

        return response()->json($response);
    }

    public function index_year(Request $request, int $id)
    {
        $response = [];
        $apartment = Apartment::find($id);
        if (!$apartment) {
            $response['success'] = false;
            $response['message'] = 'There isn\'t the house!';
            return response()->json($response, 404);
        } elseif ($request->user()->id != $apartment->user_id) {
            $response['success'] = false;
            $response['message'] = 'You are not authenticated!';
            return response()->json($response, 401);
        }

        // get visits count in the month based on year.
        // 
        //  but if in the month there isn't visits don't creates the month
        $stats = DB::table('stats')
            ->where('apartment_id', '=', $apartment->id)
            ->whereYear('date', '=', Carbon::now()->year)
            ->select(DB::raw("month(date) as month"), DB::raw("count('month') as total"))
            ->groupBy('month')
            ->get();

        // so i create all year and add the visit that exist in the new array
        $newStat = [];
        for ($i = 1; $i <= 12; $i++) {
            $stat = [
                'month' => $i,
                'total' => 0,
            ];
            array_push($newStat, $stat);
        }

        foreach ($stats as $stat) {
            if ($stat->month == $newStat[$stat->month - 1]['month']) {
                $newStat[$stat->month - 1]['total'] = $stat->total;
            };
        }


        $response['success'] = true;
        $response['statistic'] = $newStat;

        return response()->json($response);
    }

    public function index_month(Request $request, int $id)
    {
        $response = [];
        $apartment = Apartment::find($id);
        if (!$apartment) {
            $response['success'] = false;
            $response['message'] = 'There isn\'t the house!';
            return response()->json($response, 404);
        } elseif ($request->user()->id != $apartment->user_id) {
            $response['success'] = false;
            $response['message'] = 'You are not authenticated!';
            return response()->json($response, 401);
        }

        $stats = DB::table('stats')
            ->where('apartment_id', '=', $apartment->id)
            ->whereMonth('date', Carbon::now()->month)
            ->select(DB::raw("day(date) as day"), DB::raw("count('day') as total"))
            ->groupBy('day')
            ->get();
        // $statist = DB::table('stats')
        //     ->whereMonth('date', Carbon::now()->month)
        //     ->where('apartment_id', '=', $apartment->id)
        //     ->orderBy('date')
        //     ->get();

        $days = Carbon::now()->daysInMonth;
        $newStat = [];
        for ($i = 1; $i <= $days; $i++) {
            $stat = [
                'day' => $i,
                'total' => 0,
            ];
            array_push($newStat, $stat);
        }

        foreach ($stats as $stat) {
            if ($stat->day == $newStat[$stat->day - 1]['day']) {
                $newStat[$stat->day - 1]['total'] = $stat->total;
            };
        }

        $response['success'] = true;
        $response['statistics'] = $newStat;
        // $response['arr'] = $statist;
        return response()->json($response);
    }
}
