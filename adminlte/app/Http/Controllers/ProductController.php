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
                'p.name AS name',
                'p.discount_percentage',
                'p.price',
                'pr.name AS producer',
                'p.type',
                's.quantity AS quantity',
                's.sold AS sold',
                's.inserted_time',
                's.updated_time'
            )
            ->join('product_detail AS pd', 'p.id', '=', 'pd.product_id')
            ->join('stock AS s', 'pd.id', '=', 's.product_detail_id')
            ->join('blog AS b', 'p.blog_id', '=', 'b.id')
            ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
            ->where('p.status', 1)
            ->get(); // Retrieve all records without pagination
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
                's.quantity AS quantity',
                's.sold AS sold',
                's.inserted_time AS inserted_time',
                's.updated_time AS updated_time',
                'b.image AS blog_image',
                'b.content AS blog_content',
                'b.header AS blog_header',
                'pd.dimensions AS dimensions',
                'pd.material AS material',
                'pd.release_date AS release_date',
            )
            ->join('product_detail AS pd', 'p.id', '=', 'pd.product_id')
            ->join('stock AS s', 'pd.id', '=', 's.product_detail_id')
            ->join('blog AS b', 'p.blog_id', '=', 'b.id')
            ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
            ->where('p.id', $id)
            ->first();
        if (!$editItem) {
            return redirect()->back()->with('error', 'Product not found');
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
            'dimensions' => 'sometimes|string',
            'material' => 'sometimes|string',
            'release_date' => 'sometimes|string',
            'content' => 'sometimes|string|max:10000',
            'header' => 'sometimes|string',
        ]);

        try {
            DB::beginTransaction();
            $fieldsToUpdate = $request->only([
                'p.model', 'p.name', 'p.discount_percentage', 'p.price', 'p.producer_id', 'p.type',
                's.quantity', 's.sold', 's.inserted_time', 's.updated_time', 'p.status', 'b.image',
                'b.content', 'b.header', 'pd.dimensions', 'pd.material', 'pd.release_date', 'p.image'
            ]);

            $fieldsToUpdate['s.updated_date'] = now();

            DB::table('product AS p')
                ->join('product_detail AS pd', 'p.id', '=', 'pd.product_id')
                ->join('stock AS s', 'pd.id', '=', 's.product_detail_id')
                ->join('blog AS b', 'p.blog_id', '=', 'b.id')
                ->join('producer AS pr', 'p.producer_id', '=', 'pr.id')
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
        //
    }
}
