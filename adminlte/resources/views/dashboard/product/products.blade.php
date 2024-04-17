@extends('layouts.app')
@section('title', 'Manage Products')
@section('styles')
    <style>
        .custom-icon {
            color: deepskyblue; /* Change this to your desired color */
        }

        .trash-icon{
            border: none;
            background-color: transparent;
            color: red;
        }
    </style>

@endsection
@section("content")

    <!-- Content Header (Page header) -->
    <section class="content-header">
        <div class="container-fluid">

        </div>
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
                            <div class="card-body">
                                <table id="ProductTable" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Model</th>
                                        <th>Discount</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Stock</th>
                                        <th>Sold</th>
                                        <th>Received</th>
                                        <th>Updated</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @forelse($productList as $p)
                                        <tr id=`p{{$p -> id}}`>
                                            <td>{{$p->id}}</td>
                                            <td class="editable" data-id="{{$p->id}}">
                                                {{$p->product_name}}
                                            </td>
                                            <td>{{$p->model}}</td>
                                            <td><strong>{{$p->discount}} %</strong></td>
                                            <td>{{$p->price}}</td>
                                            <td>{{$p->producer}}</td>
                                            <td>{{$p->product_type}}</td>
                                            <td>{{$p->stock}}</td>
                                            <td>{{$p->sold}}</td>
                                            <td>{{ \Carbon\Carbon::parse($p->inserted_time)->format('Y-m-d H:i:s') }}</td>
                                            <td>{{ \Carbon\Carbon::parse($p->updated_time)->format('Y-m-d H:i:s') }}</td>
                                            <td>
                                            <a href="/dashboard/products/edit/{{$p->id}}" class="tm-product-edit-link">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                            </td>
                                            <td>
                                                <form id="deleteForm{{$p->id}}" action="{{ route('products.destroy', ['id' => $p->id]) }}" method="POST">
                                                    @csrf
                                                    @method('DELETE')
                                                    <button class="trash-icon" type="button" onclick="confirmDelete({{$p->id}})">
                                                        <i class="fas fa-trash-alt"></i>
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
                                    <tfoot>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Model</th>
                                        <th>Discount</th>
                                        <th>Price</th>
                                        <th>Producer</th>
                                        <th>Type</th>
                                        <th>Stock</th>
                                        <th>Sold</th>
                                        <th>Received</th>
                                        <th>Updated</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </section>

    <!-- JavaScript function to confirm product deletion -->
    <script>
        function confirmDelete(id) {
            if (confirm('Are you sure you want to delete this product?')) {
                document.getElementById('deleteForm'+id).submit();
            }
        }

        const cells = document.querySelectorAll('.editable');
        console.log(cells)
        let isInputExist = false;
        let currentProductId = null;
        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                console.log("check")
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
                        p.setAttribute('data-field', 'customer_phone');
                        p.innerHTML = newText;
                        parentCell.append(p);
                        isInputExist = false;
                    });

                    currentProductId = this.dataset.id;

                    this.addEventListener("keydown", function(event) {
                        if (event.keyCode === 13 || event.key === "Enter") {
                            event.preventDefault();
                            update(currentProductId);
                        }
                    });
                }
            });
        });

        function update(id) {
            let orderRow = document.getElementById(`p${id}`);
            console.log(orderRow)
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
        }
    </script>
@endsection
