@extends('layouts.app')
@section("title", "Admin Dashboard")
@section("content")
    <div class="text-center">
        <h1 class="font-weight-bold text-uppercase">
            Admin Dashboard
        </h1>
    </div>

    <div class="col-12">
        <a href="{{ route('productList') }}" class="btn btn-primary btn-lg btn-block text-uppercase">
            Products
        </a>

        <a href="{{ route('orderList') }}" class="btn btn-primary btn-lg btn-block text-uppercase">
            Orders
        </a>
    </div>



@endsection
