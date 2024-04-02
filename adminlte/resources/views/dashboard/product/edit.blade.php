@extends('layouts.app')
@section('title', 'Edit')
@section('content')
    <div class="container tm-mt-big tm-mb-big">
        <div class="row">
            <div class="col-12">
                <h2 class="tm-block-title d-inline-block">Edit Product</h2>
            </div>
        </div>
        <div class="row tm-edit-product-row">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <form id="edit-product-form"
                      action="{{ route('products.update', ['id' => $editItem->id]) }}" method="POST"
                      class="tm-edit-product-form">
                    @csrf
                    @method('PUT')
                    <div class="form-row">
                        <div class="col-4 form-group mb-3">
                            <label for="model">Model</label>
                            <input id="model" name="model" type="text" value="{{$editItem->model}}"
                                   class="form-control validate" maxlength="255"/>
                            <div class="text-danger">
                                @error('model')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                        <div class="col form-group mb-3">
                            <label for="product_name">Product Name</label>
                            <input id="product_name" name="name" type="text" value="{{$editItem->product_name}}"
                                   class="form-control validate" required maxlength="255"/>
                            <div class="text-danger">
                                @error('product_name')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                        <div class="col-1 form-group mb-3">
                            <label for="discount">Discount %</label>
                            <input id="discount" name="discount_percentage" type="number"
                                   value="{{$editItem->discount}}"
                                   class="form-control validate" min="0" max="100"/>
                            <div class="text-danger">
                                @error('discount')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                    </div>

                    {{--                                <div class="form-group mb-3">--}}
                    {{--                                    <label for="product_image">Product Image</label>--}}
                    {{--                                    <input id="product_image" name="model" type="text" value="{{$editItem->product_image}}"--}}
                    {{--                                           class="form-control validate" maxlength="255"/>--}}
                    {{--                                    <div class="text-danger">--}}
                    {{--                                        @error('product_image')--}}
                    {{--                                        {{ $message }}--}}
                    {{--                                        @enderror--}}
                    {{--                                    </div>--}}
                    {{--                                </div>--}}
                    <div class="form-row">
                        <div class="col form-group mb-3">
                            <label for="price">Price</label>
                            <input id="price" name="price" type="number" value="{{$editItem->price}}"
                                   class="form-control validate" required min="0" max="1000000000000"/>
                            <div class="text-danger">
                                @error('price')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>

                        <div class="col form-group mb-3">
                            <label for="producer_id">Select Producer</label>
                            <select class="form-control" id="producer_id">
                                @forelse($producerList as $pl)
                                    <option value="{{$pl->producer_id}}">{{$pl->producer_name}}</option>
                                @empty
                                    <option value="">No Producer Found in the Database</option>
                                @endforelse
                            </select>
                            <div class="text-danger">
                                @error('producer_id')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="productType">Select Type</label>
                        <select class="form-control" id="productType">
                            <option value="CPU">CPU</option>
                            <option value="cpuCooler">CPU Cooler</option>
                            <option value="motherboard">Motherboard</option>
                            <option value="memory">Memory</option>
                            <option value="storage">Storage</option>
                            <option value="GPU">Graphical Processor Unit</option>
                            <option value="pcCase">PC Case</option>
                            <option value="caseFan">PC Case Fan</option>
                            <option value="psu">Power Supply Unit</option>
                            <option value="monitor">Monitor</option>
                            <option value="keyboard">Keyboard</option>
                            <option value="mouse">Mouse</option>
                        </select>
                        <div class="text-danger">
                            @error('productType')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="quantity">Stock</label>
                        <input id="quantity" name="quantity" type="number" value="{{$editItem->quantity}}"
                               class="form-control validate" min="0" max="1000000000000"/>
                        <div class="text-danger">
                            @error('quantity')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="sold">Sold</label>
                        <input disabled id="sold" name="sold" type="number" value="{{$editItem->sold}}"
                               class="form-control validate" min="0" max="1000000000000"/>
                        <div class="text-danger">
                            @error('sold')
                            {{ $message }}
                            @enderror
                        </div>


                    </div>
                    <div class="form-group mb-3">
                        <label for="inserted_time">Inserted Time</label>
                        <input id="inserted_time" name="inserted_time" type="text"
                               value="{{ \Carbon\Carbon::parse($editItem->inserted_time)->format('Y-m-d H:i:s') }}"
                               class="form-control validate" readonly/>
                        <div class="text-danger">
                            @error('inserted_time')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>
                    <div class="form-group mb-3">
                        <label for="updated_time">Updated Time</label>
                        <input id="updated_time" name="updated_time" type="text"
                               value="{{ \Carbon\Carbon::parse($editItem->updated_time)->format('Y-m-d H:i:s') }}"
                               class="form-control validate" readonly/>
                        <div class="text-danger">
                            @error('updated_time')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>
                    <!-- Add other form fields here according to the database schema -->
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block text-uppercase">Update Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
