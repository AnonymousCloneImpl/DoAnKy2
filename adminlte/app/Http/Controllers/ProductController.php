<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $productList = DB::table('product AS p')
            ->select(
                'p.id AS id',
                'p.model AS model',
                'p.name AS product_name',
                'p.discount_percentage AS discount',
                'p.price AS price',
                'pr.name AS producer',
                'p.type AS product_type',
                's.quantity AS stock',
                's.sold AS sold',
                's.inserted_time AS inserted_time',
                's.updated_time AS updated_time',
            )
            ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
            ->join('stock AS s', 's.product_id', '=', 'p.id')
            ->join('blog AS b', 'b.product_id', '=', 'p.id')
            ->where('p.status', 1)
            ->get();

        return view("dashboard.product.products", compact("productList"));
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
        $producerList = DB::table('producer AS pr')
            ->select('pr.id AS producer_id', 'pr.name AS producer_name')
            ->get();

        $editItem = DB::table('product AS p')
            ->select(
                'p.id AS id',
                'p.image AS product_image',
                'p.model AS model',
                'p.name AS product_name',
                'p.discount_percentage AS discount',
                'p.price AS price',
                'p.producer_id AS producer',
                'p.type AS type',
                'p.detail AS product_detail',
                's.quantity AS stock',
                's.sold AS sold',
                's.inserted_time AS inserted_time',
                's.updated_time AS updated_time',
                'b.image AS blog_image',
                'b.content AS blog_content',
                'b.header AS blog_header'
            )
            ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
            ->join('stock AS s', 's.product_id', '=', 'p.id')
            ->join('blog AS b', 'b.product_id', '=', 'p.id')
            ->where('p.id', $id)
            ->first();
        if (!$editItem) {
            toastr()->error('Product does not exist in the database', 'Oops! Something went wrong!');
            return redirect()->back();
        }
        return view('dashboard.product.edit', compact('editItem', 'producerList'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'model' => 'sometimes|required|string|max:255',
            'name' => 'required|string|max:255|unique:product,name,' . $id . ',id',
            'discount_percentage' => 'sometimes|required|numeric|min:0|max:100',
            'price' => 'sometimes|required|numeric|min:0|max:1000000000000',
            'type' => 'sometimes|required|string|max:255',
            'quantity' => 'sometimes|required|integer|min:0|max:1000000000000',
            'sold' => 'sometimes|required|integer|min:0|max:1000000000000',
            'inserted_time' => 'sometimes|required|date',
            'updated_time' => 'sometimes|required|date',
            'status' => 'sometimes|required|integer|in:0,1',
            'image' => 'sometimes|string',
            'content' => 'sometimes|string|max:10000',
            'header' => 'sometimes|string',
        ]);

        try {
            DB::beginTransaction();
            $fieldsToUpdate = $request->only([
                'p.model', 'p.name', 'p.discount_percentage', 'p.price', 'p.producer_id', 'p.type',
                's.quantity', 's.sold', 's.inserted_time', 's.updated_time', 'p.status', 'b.image',
                'b.content', 'b.header', 'p.image'
            ]);

            $fieldsToUpdate['s.updated_date'] = now();

            DB::table('product AS p')
                ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
                ->join('stock AS s', 's.product_id', '=', 'p.id')
                ->join('blog AS b', 'b.product_id', '=', 'p.id')
                ->where('p.id', $id)
                ->update($fieldsToUpdate);

            DB::commit();
            toastr()->success('Product updated successfully', 'Success');
            return redirect()->route('productList');
        } catch (\Exception $e){
            // Something went wrong, rollback the transaction
            DB::rollBack();
            toastr()->error('Product is not updated', 'Oops! Something went wrong!');
            return redirect()->back();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::table('product')->where('id', $id)->update(['status' => 0]);

            DB::commit();
            toastr()->success('Product removed successfully', 'Success');
            return redirect()->back();
        } catch (\Exception $e){
            // Something went wrong, rollback the transaction
            DB::rollBack();
            toastr()->error('Product is not removed', 'Oops! Something went wrong!');
            return redirect()->back();
        }
    }
}
