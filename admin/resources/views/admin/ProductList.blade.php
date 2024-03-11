@extends('admin.adminPageLayout')
@section('title', 'Product List')
@section('content')

            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 tm-block-col">
                    <div class="tm-product-table-container">
                        <table  id="sticky-header-table" class="table table-hover tm-table-small tm-product-table">
                            <!-- Table header -->
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">MODEL</th>
                                <th scope="col">NAME</th>
                                <th scope="col" style="text-align: center">DISCOUNT&nbsp;%</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PRODUCER</th>
                                <th scope="col">TYPE</th>
                                <th scope="col">QUANTITY</th>
                                <th scope="col">SOLD</th>
                                <th scope="col">IMPORTED DATE</th>
                                <th scope="col">UPDATED DATE</th>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>
                            <!-- Display product data -->
                            @forelse($data as $d)
                                <tr>
                                    <td>{{$d->id}}</td>
                                    <td>{{$d->model}}</td>
                                    <td class="tm-product-name">{{$d->name}}</td>
                                    <td  style="text-align: center">{{$d->discount_percentage}}</td>
                                    <td>{{$d->price}}</td>
                                    <td>{{$d->producer}}</td>
                                    <td>{{$d->type}}</td>
                                    <td style="text-align: center">{{$d->quantity}}</td>
                                    <td style="text-align: center">{{$d->sold}}</td>
                                    <td>{{$d->inserted_time}}</td>
                                    <td>{{$d->updated_time}}</td>
                                    <td>
                                        <a href="/admin/product/edit/{{$d->id}}" class="tm-product-edit-link">
                                            <i class="fas fa-pencil-alt tm-product-edit-icon fa-inverse"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <form id="deleteForm{{$d->id}}" action="{{ route('admin.product.destroy', ['id' => $d->id]) }}" method="POST" class="tm-delete-product-form">
                                            @csrf
                                            @method('DELETE')
                                            <button type="button" class="tm-product-delete-link" onclick="confirmDelete({{$d->id}})">
                                                <i class="far fa-trash-alt tm-product-delete-icon"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="10" class="text-center" style="font-size: 15px; font-weight: bold">
                                        No product found
                                    </td>
                                </tr>
                            @endforelse
                            </tbody>
                        </table>
                    </div>
                    <!-- Display pagination links -->
                    <div class="d-flex justify-content-center mt-3">
                        {{ $data->onEachSide(1)->links() }}
                    </div>

                    <!-- Action buttons -->
                    <div>
                        <a href="/admin/product/create" class="btn btn-primary btn-block text-uppercase mb-3">Add new product</a>
                        <a href="/admin/product/removedList" class="btn btn-primary btn-block text-uppercase mb-3">Recover product</a>
                    </div>
            </div>

            <!-- JavaScript function to confirm product deletion -->
            <script>
                function confirmDelete(id) {
                    if (confirm('Are you sure you want to delete this product?')) {
                        document.getElementById('deleteForm'+id).submit();
                    }
                }
            </script>
@endsection
