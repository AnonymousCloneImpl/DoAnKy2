@extends('layouts.app')
@section("title", "Admin Dashboard")
@section("content")
    <div class="text-center">
        <h1>
            DASHBOARD
        </h1>
    </div>

    <div class="d-flex row-cols-3">
        <a href="/dashboard/products" class="text-center">
            Products
        </a>
        <a href="/dashboard/orders" class="text-center">
            Orders
        </a>
    </div>
@endsection
