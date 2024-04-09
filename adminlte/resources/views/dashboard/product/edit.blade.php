@extends('layouts.app')
@section('title', 'Edit')
@section('content')
    <div class="container tm-mt-big tm-mb-big">
        <div class="row pt-3">
            <div class="col-12">
                <h2 class="tm-block-title d-inline-block">Edit Product</h2>
            </div>
        </div>
        <div class="row pb-2">
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
                                   class="form-control validate">
                        </div>
                        <div class="col form-group mb-3">
                            <label for="product_name">Product Name</label>
                            <input id="product_name" name="name" type="text" value="{{$editItem->product_name}}"
                                   class="form-control validate" required maxlength="255"/>
                        </div>
                        <div class="col-1 form-group mb-3">
                            <label for="discount">Discount %</label>
                            <input id="discount" name="discount_percentage" type="number"
                                   value="{{$editItem->discount}}"
                                   class="form-control validate" min="0" max="100"/>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="product_image">Product Image</label>
                        <input id="product_image" name="product_image" type="text" value="{{$editItem->product_image}}"
                               class="form-control validate" readonly maxlength="255"/>
                        <div class="text-danger">
                            @error('product_image')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col form-group mb-3">
                            <label for="price">Price</label>
                            <input id="price" name="price" type="number" value="{{$editItem->price}}"
                                   class="form-control validate" required min="0" max="1000000000000"/>
                        </div>

                        <div class="col form-group mb-3">
                            <label for="producer_id">Select Producer</label>
                            <select class="form-control" id="producer_id" name="producer">
                                @forelse($producerList as $pl)
                                    <option
                                        value="{{$pl->producer_id}}" {{$editItem->producer == $pl->producer_id ? 'selected' : ''}}>
                                        {{$pl->producer_name}}
                                    </option>
                                @empty
                                    <option value="">No Producer Found in the Database</option>
                                @endforelse
                            </select>
                        </div>

                    </div>

                    <div class="form-group mb-3">
                        <label for="productType">Product Type</label>
                        <input id="productType" name="type" type="text" value="{{$editItem->type}}"
                               class="form-control validate" readonly maxlength="255"/>
                        <div class="text-danger">
                            @error('productType')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div id="ProductDetails" class="form-group mb-3">
                        @php
                            $productDetails = json_decode($editItem->product_detail, true);
                        @endphp
                        @if($productDetails)
                            @foreach($productDetails as $key => $value)
                                <div class="form-group">
                                    <label for="{{ $key }}">{{ ucfirst(preg_replace('/(?<!^)[A-Z]/', ' $0', $key)) }}</label>
                                    <input id="{{ $key }}" name="{{ $key }}" type="text" value="{{ $value }}"
                                           class="form-control validate" readonly>
                                </div>
                            @endforeach
                        @else
                            <p class="col-12">No product details found.</p>
                        @endif

                        <input type="hidden" id="product_detail" name="product_detail"
                               placeholder="productDetailJson" value="{{ $editItem->product_detail }}" >
                    </div>

                    {{--                    <div class="form-group mb-3">--}}
                    {{--                        <label for="productType">Select Type</label>--}}
                    {{--                        <select class="form-control" id="productType">--}}
                    {{--                            <option value="CPU">CPU</option>--}}
                    {{--                            <option value="cpuCooler">CPU Cooler</option>--}}
                    {{--                            <option value="motherboard">Motherboard</option>--}}
                    {{--                            <option value="memory">Memory</option>--}}
                    {{--                            <option value="storage">Storage</option>--}}
                    {{--                            <option value="GPU">Graphical Processor Unit</option>--}}
                    {{--                            <option value="pcCase">PC Case</option>--}}
                    {{--                            <option value="caseFan">PC Case Fan</option>--}}
                    {{--                            <option value="psu">Power Supply Unit</option>--}}
                    {{--                            <option value="monitor">Monitor</option>--}}
                    {{--                            <option value="keyboard">Keyboard</option>--}}
                    {{--                            <option value="mouse">Mouse</option>--}}
                    {{--                        </select>--}}
                    {{--                        <div class="text-danger">--}}
                    {{--                            @error('productType')--}}
                    {{--                            {{ $message }}--}}
                    {{--                            @enderror--}}
                    {{--                        </div>--}}
                    {{--                    </div>--}}

                    <div class="form-row">
                        <div class="col form-group mb-3">
                            <label for="quantity">Stock</label>
                            <input id="quantity" name="quantity" type="number" value="{{$editItem->stock}}"
                                   class="form-control validate" min="0" max="1000000000000"/>
                        </div>
                        <div class="col form-group mb-3">
                            <label for="sold">Sold</label>
                            <input readonly id="sold" name="sold" type="number" value="{{$editItem->sold}}"
                                   class="form-control validate" min="0" max="1000000000000"/>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="blog_header">Blog Header</label>
                        <input id="blog_header" name="blog_header" type="text" value="{{$editItem->blog_header}}"
                               class="form-control validate" maxlength="255"/>
                        <div class="text-danger">
                            @error('blog_header')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="blog_content">Blog Content</label>
                        <textarea id="blog_content" name="blog_content" class="form-control validate" maxlength="10000"
                                  rows="5">{{$editItem->blog_content}}</textarea>
                        <div class="text-danger">
                            @error('blog_content')
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

                    <!-- Hidden input -->
                    <div class="form-group mb-3">
                        <input hidden id="status" name="status" type="number" value="{{$editItem->status}}"
                               class="form-control validate" required min="0" max="1"/>
                        <input hidden id="blog_image" name="blog_image" type="text" value="{{$editItem->blog_image}}"
                               class="form-control validate" maxlength="255"/>
                    </div>
                    <div class="form-group mb-3">
                        <button type="submit" class="btn btn-primary btn-block text-uppercase" onclick="return confirm('Are you sure you want to edit this product?')">Update Now</button>

                        </button>
                    </div>
                    <div class="form-group mb-3">
                        <a href="{{route('productList')}}" class="btn btn-secondary btn-block text-uppercase">Back</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function () {
            $('#ProductDetails input').prop('readonly', false);


            $('#ProductDetails input').on('change', function () {
                var details = {};
                $('#ProductDetails input').each(function () {
                    var name = $(this).attr('name');
                    if (name !== 'product_detail') {
                        details[name] = $(this).val();
                    }
                });
                var jsonDetails = JSON.stringify(details);
                $('#product_detail').val(jsonDetails);
            });
        });
    </script>
    <script>
        @if ($errors->any())
        @foreach ($errors->all() as $error)
        toastr.error('{{ $error }}', 'Error');
        @endforeach
        @endif
    </script>
@endsection
