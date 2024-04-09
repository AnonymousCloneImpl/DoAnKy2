@extends('layouts.app')
@section('title', 'Manage Orders')
@section("content")

<!-- Content Header (Page header) -->
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Order</title>
</head>
<section class="content-header">
    <div class="container-fluid">

    </div><!-- /.container-fluid -->
</section>

<div id="alert-toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
    <div class="toast-header">
        <strong class="mr-auto">Thông báo</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="toast-body"></div>
</div>

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Orders Table</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="ProductTable" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="col-1">Order Code</th>
                                <th class="col-1">Customer Name</th>
                                <th class="col-1">Customer Contact</th>
                                <th class="col-2">Shipping Address</th>
                                <th class="col-1">Order Status</th>
                                <th class="col-2">Order Items</th>
                                <th class="col-1">Total Price</th>
                                <th class="col-1">Created At</th>
                                <th class="col-1">Updated At</th>
                                <th class="col-1">Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($orderList as $order)
                                <tr class="order-row" data-order-code="{{$order->order_code}}">
                                    <td data-field="order_code">
                                        {{$order->order_code}}
                                    </td>
                                    <td data-field="customer_name">
                                        {{$order->customer_name}}
                                    </td>
                                    <td>
                                        <p  class="editable" data-field="customer_phone">
                                            {{$order->customer_phone}}
                                        </p>
                                        <p  class="editable" data-field="customer_email">
                                            {{$order->customer_email}}
                                        </p>
                                    </td>
                                    <td class="editable" data-field="shipping_address">
                                        {{$order->shipping_address}}
                                    </td>
                                    <td class="option" data-field="status">
                                        {{$order->status}}
                                    </td>
                                    <td>
                                        <ol>
                                            @foreach($order->orderItems as $item)
                                                <li>
                                                    <ul>
                                                        <li>
                                                            <a href="">
                                                                {{$item->product->name}}
                                                            </a>
                                                        </li>
                                                        <li>
                                                            Quantity: {{$item->quantity}}
                                                        </li>
                                                        <li class="text-red">
                                                            Price: ${{$item->product->price}}
                                                        </li>
                                                    </ul>
                                                </li>
                                            @endforeach
                                        </ol>
                                    </td>
                                    <td class="text-red font-weight-bold">
                                        ${{$order->total_price}}
                                    </td>
                                    <td>
                                        {{$order->created_at}}
                                    </td>
                                    <td>
                                        {{$order->updated_at}}
                                    </td>
                                    <td>
                                        <button class="btn btn-primary rounded-lg submit-btn" data-order="{{$order->order_code}}">Submit</button>
                                    </td>
                                </tr>

                            @endforeach
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

@endsection

@section('scripts')
    <script>
        jQuery(function($) {
            $('.submit-btn').click(function() {
                let orderRow = $(this).closest('.order-row');
                    let orderData = {
                        order_code: orderRow.find('[data-field="order_code"]').text().trim(),
                        customer_name: orderRow.find('[data-field="customer_name"]').text().trim(),
                        customer_phone: orderRow.find('[data-field="customer_phone"]').text().trim(),
                        customer_email: orderRow.find('[data-field="customer_email"]').text().trim(),
                        shipping_address: orderRow.find('[data-field="shipping_address"]').text().trim(),
                        status: orderRow.find('[data-field="status"]').text().trim(),
                        _token: '{{ csrf_token() }}'
                    };
                console.log(orderData)
                $.ajax({
                    url: '/dashboard/orders/update',
                    method: 'POST',
                    data: orderData,
                    success: function(response) {
                        console.log(response)
                        if (response > 0) {
                            toastr.success(`Order ${orderData.order_code} updated successfully`, 'Success');
                        } else {
                            toastr.error('Order information is not change!', 'Warning');
                        }
                    },
                    error: function(xhr, status, error) {
                        toastr.error('Error occurred while updating order', 'Oops! Something went wrong!');
                    }
                });
            });

            toastr.options = {
                "positionClass": "toast-top-right",
                "preventDuplicates": true,
                "timeOut": "3000"
            };
        });

        // EDIT INPUT
        document.addEventListener("DOMContentLoaded", function() {
            const cells = document.querySelectorAll('.editable');
            let isInputExist = false;
            cells.forEach(cell => {
                cell.addEventListener('click', function() {
                    if (isInputExist) {
                        const text = this.querySelector('input').value;
                        const p = document.createElement('p');
                        p.value = text;
                        this.appendChild(p);
                        isInputExist = false;
                    } else {
                        const text = this.textContent.trim();
                        this.innerHTML = '';
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.value = text;
                        input.style.width = '100%';
                        this.appendChild(input);
                        isInputExist = true;
                        input.focus();

                        input.addEventListener('blur', function() {
                            const newText = this.value;
                            const parentCell = this.parentElement;
                            parentCell.removeChild(this);
                            const p = document.createElement('p');
                            p.innerHTML = newText;
                            parentCell.append(p);
                            isInputExist = false;
                        });
                    }
                });
            });

            // EDIT OPTION
            const cell = document.querySelectorAll('.option');

            cell.forEach(c => {
                const options = ['WAITING', 'DELIVERY', 'SUCCESS', 'FAILED'];
                const selectElement = document.createElement('select');

                options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    selectElement.appendChild(optionElement);
                });

                c.addEventListener('click', function() {
                    if (c.querySelector('select')) {
                        return;
                    }

                    selectElement.value = this.innerHTML.trim();
                    this.innerHTML = '';
                    this.appendChild(selectElement);
                });

                selectElement.addEventListener('change', function() {
                    const selectedOption = this.value;
                    const parentCell = this.parentElement;
                    parentCell.innerHTML = selectedOption;
                    parentCell.addEventListener('click', function() {
                        if (parentCell.querySelector('select')) {
                            return;
                        }

                        selectElement.value = parentCell.innerHTML.trim();
                        parentCell.innerHTML = '';
                        parentCell.appendChild(selectElement);
                    });
                });
            });
        });
    </script>
@endsection
