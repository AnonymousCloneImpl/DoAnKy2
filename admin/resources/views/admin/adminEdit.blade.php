@extends('admin.adminPageLayout')
@section('title', 'Edit')
@section('content')
    <div class="container tm-mt-big tm-mb-big">
        <div class="row">
            <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="tm-block-title d-inline-block">Edit Product</h2>
                        </div>
                    </div>
                    <div class="row tm-edit-product-row">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <form id="edit-product-form"
                                  action="{{ route('admin.product.update', ['id' => $editItem->id]) }}" method="POST"
                                  class="tm-edit-product-form">
                                @csrf
                                @method('PUT')
                                <div class="form-group mb-3">
                                    <label for="name">Product Name</label>
                                    <input id="name" name="name" type="text" value="{{$editItem->name}}"
                                           class="form-control validate" required oninput="validateInput('name')"/>
                                    <div id="name-error" class="text-danger"></div>
                                    @error('name')
                                    <div class="text-danger">{{ $message }}</div>
                                    @enderror
                                </div>
                                <div class="row">
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="price">Price</label>
                                        <input id="price" name="price" type="number" value="{{$editItem->price}}"
                                               class="form-control validate" required oninput="validateInput('price')"/>
                                        <div id="price-error" class="text-danger"></div>
                                    </div>
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="size">Size</label>
                                        <input id="size" name="size" type="number" value="{{$editItem->size}}"
                                               class="form-control validate" required oninput="validateInput('size')"/>
                                        <div id="size-error" class="text-danger"></div>
                                    </div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="manufacturer">Manufacturer</label>
                                    <input id="manufacturer" name="manufacturer" type="text"
                                           value="{{$editItem->manufacturer}}" class="form-control validate" required
                                           oninput="validateInput('manufacturer')"/>
                                    <div id="manufacturer-error" class="text-danger"></div>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="stock">Stock</label>
                                    <input id="stock" name="stock" type="number" value="{{$editItem->stock}}"
                                           class="form-control validate" required oninput="validateInput('stock')"/>
                                    <div id="stock-error" class="text-danger"></div>
                                </div>
                                <div class="row">
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="created_date">Created Date</label>
                                        <input id="created_date" name="created_date" type="text"
                                               value="{{$editItem->created_date}}" class="form-control validate"
                                               data-large-mode="true" disabled="disabled"/>
                                    </div>
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                        <label for="updated_date">Update Date</label>
                                        <input id="updated_date" name="updated_date" type="text"
                                               value="{{$editItem->updated_date}}" class="form-control validate"
                                               data-large-mode="true" disabled="disabled"/>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn btn-primary btn-block text-uppercase">Update Now
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function validateInput(fieldName) {
            const fieldValue = document.getElementById(fieldName).value.trim();
            const errorElement = document.getElementById(fieldName + '-error');

            errorElement.textContent = '';

            switch (fieldName) {
                case 'name':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Product name is required';
                    } else if (fieldValue.length > 255) {
                        errorElement.textContent = 'Product name must be at most 255 characters';
                    }
                    break;
                case 'price':
                    if (fieldValue !== '' && (isNaN(fieldValue) || fieldValue <= 0 || fieldValue > 1000000000000)) {
                        errorElement.textContent = 'Price must be a positive number not exceeding 1 trillion';
                    }
                    break;
                case 'size':
                    if (fieldValue !== '' && (isNaN(fieldValue) || fieldValue < 0 || fieldValue > 60)) {
                        errorElement.textContent = 'Size must be a positive integer between 0 and 60';
                    }
                    break;
                case 'manufacturer':
                    if (fieldValue !== '' && fieldValue.length > 255) {
                        errorElement.textContent = 'Manufacturer must be at most 255 characters';
                    }
                    break;
                case 'stock':
                    if (fieldValue !== '' && (isNaN(fieldValue) || fieldValue < 0 || fieldValue > 1000000000)) {
                        errorElement.textContent = 'Stock must be a positive integer not exceeding 1 billion';
                    }
                    break;
                default:
                    break;
            }
        }

        document.getElementById('edit-product-form').addEventListener('submit', function (event) {

            validateInput('name');
            validateInput('price');
            validateInput('size');
            validateInput('manufacturer');
            validateInput('stock');

            const errorElements = document.querySelectorAll('.text-danger');
            let isError = false;
            errorElements.forEach(function (errorElement) {
                if (errorElement.textContent !== '') {
                    isError = true;
                }
            });

            if (isError) {
                event.preventDefault();
            }
        });
    </script>

@endsection
