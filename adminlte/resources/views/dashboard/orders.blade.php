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
                        <h3 class="card-title">Orders Table</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="ProductTable" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th class="text-center col-1">Order Code</th>
                                <th>Customer Name</th>
                                <th rowspan="2">Customer Contact</th>
                                <th>Shipping Address</th>
                                <th>Order Status</th>
                                <th class="col-2">Order Items</th>
                                <th style="width: 2%">Total Price</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Option</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($orderList as $order)<tr>
                                <td class="editable">
                                    {{$order->order_code}}
                                </td>
                                <td class="editable">
                                    {{$order->customer_name}}
                                </td>
                                <td style="height: 100px; width: auto">
                                    <div style="height: 50%; display: flex; align-items: center" class="editable">
                                        {{$order->customer_phone}}
                                    </div>
                                    <div class="editable" style="border-top: 1px solid; height: 50%; display: flex; align-items: center">
                                        {{$order->customer_email}}
                                    </div>
                                </td>
                                <td class="editable">
                                    {{$order->shipping_address}}
                                </td>
                                <td class="option">
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
                                    <button class="btn btn-primary rounded-lg">
                                        Submit
                                    </button>
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
    <script>
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
                        return; // Do nothing if select already exists
                    }

                    selectElement.value = this.innerHTML.trim();
                    this.innerHTML = '';
                    this.appendChild(selectElement);
                });

                selectElement.addEventListener('change', function() {
                    const selectedOption = this.value;
                    const parentCell = this.parentElement;
                    parentCell.innerHTML = selectedOption;

                    // Perform necessary steps to update server-side data here

                    // Re-attach click event after updating the content
                    parentCell.addEventListener('click', function() {
                        if (parentCell.querySelector('select')) {
                            return; // Do nothing if select already exists
                        }

                        selectElement.value = parentCell.innerHTML.trim();
                        parentCell.innerHTML = '';
                        parentCell.appendChild(selectElement);
                    });
                });
            });

            // AJAX
            const submitButtons = document.querySelectorAll('button');

            submitButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const row = button.closest('tr');
                    const cells = row.querySelectorAll('.editable');

                    const data = {};
                    cells.forEach(cell => {
                        const columnName = cell.getAttribute('data-column');
                        data[columnName] = cell.innerHTML.trim();
                    });

                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', '/update-data');
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.onload = function() {
                        if (xhr.status === 200) {
                            console.log('Data updated successfully');
                        } else {
                            console.error('Failed to update data');
                        }
                    };
                    xhr.send(JSON.stringify(data));
                });
            });
        });
    </script>
</section>
<!-- /.content -->

{{--    @foreach($productList as $product)--}}
{{--        <div class="align-middle"><a href="/dashboard/products/{{$product->id}}">{{ $product->name }}</a></div>--}}
{{--    @endforeach--}}

@endsection
