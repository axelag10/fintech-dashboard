<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query();
        // Search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('customer_name', 'ILIKE', "%{$request->search}%")
                ->orWhere('customer_email', 'ILIKE', "%{$request->search}%");
            });
        }
        // Filter
        if ($request->status) {
            $query->where('status', $request->status);
        }
        // Sorting
        $sort = $request->get('sort', 'created_at');
        $direction = $request->get('direction', 'desc');

        $query->orderBy($sort, $direction);

        return response()->json(
            $query->paginate(10)
        );
    }

    public function show(Order $order)
    {
        return response()->json($order);
    }
}
