@extends('layouts.app')
@section('title', 'Manage Products')
@section("content")

    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">

        </div>
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Product Table</h3>
                            </div>
                            <div class="card-body">
                                <table id="ProductTable" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Model</th>
                                        <th>Name</th>
                                        <th>Discount</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Stock</th>
                                        <th>Sold</th>
                                        <th>Received</th>
                                        <th>Updated</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @forelse($productList as $p)
                                        <tr>
                                            <td>{{$p->id}}</td>
                                            <td>{{$p->model}}</td>
                                            <td>{{$p->name}}</td>
                                            <td>{{$p->discount_percentage}}</td>
                                            <td>{{$p->price}}</td>
                                            <td>{{$p->producer}}</td>
                                            <td>{{$p->type}}</td>
                                            <td>{{$p->quantity}}</td>
                                            <td>{{$p->sold}}</td>
                                            <td>{{ \Carbon\Carbon::parse($p->inserted_time)->format('Y-m-d H:i:s') }}</td>
                                            <td>{{ \Carbon\Carbon::parse($p->updated_time)->format('Y-m-d H:i:s') }}</td>
                                            <td><a href="#">Edit</a></td>
                                            <td><a href="#">Delete</a></td>
                                        </tr>
                                        @empty
                                            <tr>
                                                <td colspan="10" class="text-center" style="font-size: 15px; font-weight: bold">
                                                    No product found
                                                </td>
                                            </tr>
                                    @endforelse
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Model</th>
                                        <th>Name</th>
                                        <th>Discount</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Stock</th>
                                        <th>Sold</th>
                                        <th>Received</th>
                                        <th>Updated</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </section>
@endsection
