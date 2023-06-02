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
    public function get_total(Request $request, int $id)
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

    public function get_year(Request $request, int $id)
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
            ->whereYear('date', '=', Carbon::now())
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
        $response['statistics'] = $newStat;

        return response()->json($response);
    }

    public function get_month(Request $request, int $id)
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
            ->whereYear('date', '=', Carbon::now())
            ->whereMonth('date', '=', Carbon::now())
            ->select(DB::raw("dayofmonth(date) as day"), DB::raw("count('day') as total"))
            ->groupBy('day')
            ->get();

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
        $response['month'] = Carbon::now()->month;

        return response()->json($response);
    }

    public function get_week(Request $request, int $id)
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
            ->where('apartment_id', $apartment->id)
            ->whereYear('date', '=', Carbon::now())
            ->whereMonth('date', '=', Carbon::now())
            ->whereBetween('date', [Carbon::now()->subDays(6), Carbon::now()])
            ->select(DB::raw("dayofweek(date) as day"), DB::raw("count('day') as total"))
            ->groupBy('day')
            ->get();

        // day 1=sunday, 2=monday, 3=tuesday, 4=wednesday, 5=thursday, 6=friday, 7=saturday

        $newStat = [];
        for ($i = 1; $i <= 7; $i++) {
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

        return response()->json($response);
    }

    public function get_today(Request $request, int $id)
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
            ->whereDate('date', '=', Carbon::now())
            ->count();

        $response['success'] = true;
        $response['statistics'] = $stats;

        return response()->json($response);
    }
}
