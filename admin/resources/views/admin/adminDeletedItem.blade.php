{{-- @extends here means productList >> AdminLayout --}}
@extends('admin.adminPageLayout')
@section('title', 'Removed Product List')
@section('content')

    <div class="container mt-5">
        <div class="row tm-content-row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 tm-block-col">
                <div class="tm-bg-primary-dark tm-block tm-block-products">
                    <div class="tm-product-table-container">
                        <table class="table table-hover tm-table-small tm-product-table">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">SIZE</th>
                                <th scope="col">MANUFACTURER</th>
                                <th scope="col">STOCK</th>
                                <th scope="col">CREATED DATE</th>
                                <th scope="col">UPDATED DATE</th>
                                <th scope="col">&nbsp;</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                            </thead>
                            <tbody>

                            @if($data->isEmpty())
                                <tr>
                                    <td colspan="10" class="text-center" style="font-size: 15px; font-weight: bold">
                                        No product found
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <a
                            href="/admin/product"
                            class="btn btn-primary btn-block text-uppercase mb-3">Back</a>
                    </div>
                    @else
                        @foreach($data as $d)
                            <tr>
                                <td>{{$d->id}}</td>
                                <td class="tm-product-name">{{$d->name}}</td>
                                <td>{{$d->price}}</td>
                                <td>{{$d->size}}</td>
                                <td>{{$d->manufacturer}}</td>
                                <td>{{$d->stock}}</td>
                                <td>{{$d->created_date}}</td>
                                <td>{{$d->updated_date}}</td>
                                <td>
                                    <form action="{{ route('admin.product.recover', ['id' => $d->id]) }}"
                                          method="POST" class="tm-recover-product-form">
                                        @csrf
                                        @method('PUT')
                                        <button type="submit"
                                                class="btn btn-primary btn-block text-uppercase mb-3">Recover
                                            product
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach

                            </tbody>
                            </table>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    {{ $data->onEachSide(1)->links() }}
                </div>
                <div>
                    <form id="recoverAllForm" action="{{ route('admin.product.recoverAll')}}" method="POST"
                          class="tm-recover-product-form">
                        @csrf
                        @method('PUT')
                        <button type="button" onclick="confirmRecoverAll()"
                                class="btn btn-primary btn-block text-uppercase mb-3">Recover All
                        </button>
                    </form>
                </div>
                <div>
                    <a
                        href="/admin/product"
                        class="btn btn-primary btn-block text-uppercase mb-3">Back</a>
                </div>
                @endif
            </div>
        </div>

        <script>
            function confirmRecoverAll() {
                if (confirm('Are you sure you want to recover all products?')) {
                    document.getElementById('recoverAllForm').submit();
                }
            }
        </script>
@endsection
