@extends('layouts.app')
@section("content")

    PRODUCT PAGE

    @foreach($productList as $product)
        <div class="align-middle"><a href="/dashboard/products/{{$product->id}}">{{ $product->name }}</a></div>
    @endforeach

@endsection
