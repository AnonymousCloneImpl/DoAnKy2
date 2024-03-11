<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // product
    public function index()
    {
        $successMessage = session('success');
        $successRecoverMsg = session('successRecovery');
        $successRecoverAllMsg = session('successRecoveryAll');
        $successUpdatedMsg = session('successUpdated');
        $successCreateMsg = session('successCreate');
        $data = DB::table('product as p')
            ->select('p.id as id','p.model as model', 'p.name as name', 'p.discount_percentage', 'p.price', 'pr.name as producer', 'p.type', 's.quantity as quantity', 's.sold as sold', 's.inserted_time', 's.updated_time')
            ->join('product_detail as pd', 'p.id', '=', 'pd.product_id')
            ->join('stock as s', 'pd.id', '=', 's.product_detail_id')
            ->join('blog as b', 'p.blog_id', '=', 'b.id')
            ->join('producer as pr','p.producer_id','=','pr.id')
            ->paginate(10);

        return view('admin.ProductList', compact('data', 'successMessage', 'successRecoverMsg', 'successUpdatedMsg', 'successRecoverAllMsg', 'successCreateMsg'));
    }


    public function search(Request $request)
    {
        $query = $request->input('query');
        $data = DB::table('product as p')
            ->select('p.id', 'p.model', 'p.name', 'p.discount_percentage', 'p.price', 'p.producer', 'p.type', 's.quantity', 's.sold','s.inserted_time','s.updated_time')
            ->join('stock as s', 'p.id', '=', 's.product_id')->where(
            function ($queryBuilder) use ($query) {
                $queryBuilder->where('p.id', $query)
                    ->orWhere('p.name', 'like', '%' . $query . '%')
                    ->orWhere('p.producer', 'like', '%' . $query . '%')
                    ->orWhere('p.model', 'like', '%' . $query . '%')
                    ->orWhere('p.type', 'like', '%' . $query . '%');
            })->paginate(10);
        return view('admin.ProductList', ["data" => $data]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.adminCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // api url : /product (method : post)
        $request->validate([
            'model' => 'required|string|max:255',
            'name' => 'required|string|max:255|unique:product,name',
            'discount_percentage' => 'sometimes|integer|min:0|max:100',
            'price' => 'required|numeric|min:0',
            'producer' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'sold' => 'sometimes|integer|min:0',
            'inserted_time' => 'sometimes|required|date',
            'updated_time' => 'sometimes|required|date',
//            'status' => 'sometimes|required|integer|in:0,1'
        ]);
        // Begin transaction
        DB::beginTransaction();

        try {
            // Insert product data
            $productId = DB::table('product')->insertGetId([
                'model' => $request->input('model'),
                'name' => $request->input('name'),
                'discount_percentage' => $request->input('discount_percentage'),
                'price' => $request->input('price'),
                'producer' => $request->input('producer'),
            ]);

            // Insert stock data
            DB::table('stock')->insert([
                'product_id' => $productId,
                'quantity' => $request->input('quantity'),
                'sold' => $request->input('sold', 0), // Default to 0 if not provided
                'inserted_time' => Carbon::now(),
                'updated_time' => Carbon::now(),
            ]);

            // Commit the transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback the transaction if any exception occurs
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Failed to create the product']);
        }

        return redirect()->route('admin.product.index')->with('successCreate', 'Product created successfully');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // api url : product/{id} (http method get)
        $editItem = DB::table('product_tbl')->where('id', $id)->where('status', 1)->first();
        if (!$editItem) {
            return redirect()->back()->with('error', 'Product not found');
        }
        return view('admin.adminEdit', ['editItem' => $editItem]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $editItem = DB::table('product_tbl')->where('id', $id)->first();
        if (!$editItem) {
            return redirect()->back()->with('error', 'Product not found');
        }
        return view('admin.adminEdit', ['editItem' => $editItem]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:product_tbl,name,' . $id . ',id',
            'price' => 'sometimes|required|numeric|min:0|max:1000000000000',
            'size' => 'sometimes|required|integer|min:0|max:60',
            'manufacturer' => 'sometimes|required|string|max:255',
            'stock' => 'sometimes|required|integer|min:0|max:1000000000000',
            'created_date' => 'sometimes|required|date',
            'updated_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|integer|in:0,1'
        ]);
        $fieldsToUpdate = $request->only([
            'name', 'price', 'size', 'manufacturer', 'stock', 'created_date', 'status'
        ]);
        $fieldsToUpdate['updated_date'] = now();
        DB::table('product_tbl')->where('id', $id)->update($fieldsToUpdate);
        return redirect()->route('admin.product.index')->with('successUpdated', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $itemHidden = DB::table('product_tbl')->where('id', $id)->update(['status' => 0]);
        return redirect()->route('admin.product.index')->with('success', 'Product deleted successfully');
    }

    public function showHiddenItem()
    {
        $data = DB::table('product_tbl')->where('status', 0)->paginate(10);
        return view('admin.adminDeletedItem', ["data" => $data]);
    }

    public function recover(string $id)
    {
        $itemRecover = DB::table('product_tbl')->where('id', $id)->where('status', '0')->update(['status' => 1]);
        return redirect()->route('admin.product.index')->with('successRecovery', 'Product recovered successfully');
    }

    public function recoverAll()
    {
        $recover = DB::table('product_tbl')->where('status', '0')->update(['status' => 1]);
        return redirect()->route('admin.product.index')->with('successRecoveryAll', 'All Product recovered successfully');
    }
}
