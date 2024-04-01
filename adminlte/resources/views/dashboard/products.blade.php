@extends('layouts.app')



@section("content")

    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">

        </div><!-- /.container-fluid -->
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
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="ProductTable" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Name</th>
                                        <th>Discount %</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                        <th>Received Date</th>
                                        <th>Updated Date</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                        <td>Internet
                                            Explorer 4.0
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Model</th>
                                        <th>Name</th>
                                        <th>Discount %</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                        <th>Received Date</th>
                                        <th>Updated Date</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
        </div>
        <!-- /.container-fluid -->
    </section>
    <!-- /.content -->

    {{--    @foreach($productList as $product)--}}
    {{--        <div class="align-middle"><a href="/dashboard/products/{{$product->id}}">{{ $product->name }}</a></div>--}}
    {{--    @endforeach--}}

@endsection
