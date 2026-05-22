<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Order;
use App\Http\Resources\OrderResource;

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

        return OrderResource::collection(
            $query->paginate(10)
        );
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function metrics()
    {
        return response()->json([
            'total_orders' => Order::count(),

            'total_revenue' => Order::sum('amount'),

            'failed_payments' => Order::where(
                'status',
                'failed'
            )->count(),

            'pending_payments' => Order::where(
                'status',
                'pending'
            )->count(),
        ]);
    }
}
