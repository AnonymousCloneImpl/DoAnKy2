<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Contracts\View\View|\Illuminate\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\Foundation\Application
    {
        // Lấy danh sách tất cả các đơn hàng (orderList)
        $orderList = Order::all();

        // Duyệt qua từng đơn hàng để lấy thông tin chi tiết
        foreach ($orderList as $order) {
            // Lấy danh sách các mục đơn hàng (orderItems) tương ứng với mỗi đơn hàng
            $orderItems = $order->orderItems;

            // Khởi tạo mảng để chứa thông tin mục đơn hàng (orderItemList) của mỗi đơn hàng
            $orderItemList = [];

            // Duyệt qua từng mục đơn hàng để lấy thông tin sản phẩm (product)
            foreach ($orderItems as $orderItem) {
                // Lấy thông tin sản phẩm (product) từ mối quan hệ với orderItem
                $product = $orderItem->product;

                // Thêm thông tin sản phẩm vào danh sách mục đơn hàng (orderItemList)
                $orderItemList[] = [
                    'product_name' => $product->name,
                    'quantity' => $orderItem->quantity,
                    // Các thông tin khác của mục đơn hàng nếu cần
                ];
            }
            // Gán danh sách mục đơn hàng (orderItemList) vào đơn hàng tương ứng
            $order->orderItemList = $orderItemList;
        }
        // Trả về view "dashboard.orders" với danh sách đơn hàng đã được cập nhật thông tin chi tiết
        return view("dashboard.orders", compact("orderList"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
