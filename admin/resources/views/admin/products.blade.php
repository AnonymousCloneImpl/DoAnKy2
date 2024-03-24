@extends("admin.adminLayout")
@section("title", "Danh sách sản phẩm")
@section("content")

    <style>
        .create-form-container {
            display: none; /* Hide the container by default */
            justify-content: center;
            align-items: center;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        #createProductForm {
            /* Add styles for your form if needed */
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            margin-top: 15%;
        }

        .table tr td {
            border-bottom: 1px solid #ddd;
        }

        .pagination {
            width: 100%;
            display: flex;
        }
    </style>


    <div>
        <div class="d-flex justify-content-around">
            <div>
                <button id="showCreateForm" class="btn btn-primary">Create new product</button>
            </div>
            <div>
                <a href="/dashboard/products">
                    <button id="showCreateForm" class="btn btn-primary btn-success">Product active</button>
                </a>
            </div>
            <div>
                <a href="/dashboard/products?status=0">
                    <button class="btn btn-primary btn-warning">Product disable</button>
                </a>
            </div>
            <div>
                <input type="text" class="form-control" id="searchInput" placeholder="Search by name or id..."
                />
            </div>
        </div>

        <div id="createFormContainer" class="create-form-container">
            <form id="createProductForm" style="display: none;"
                  action="{{ route('dashboard.store') }}"
                  method="POST"
            >
                @csrf
                <table class="table">
                    <tr>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="nameInput" type="text" class="form-control" oninput="nameValid()" name="name"  placeholder="Name..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="priceInput" class="form-control" name="price" oninput="priceValid()" placeholder="Price..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="heightInput" oninput="heightValid()" class="form-control" name="height" placeholder="Height..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="lengthInput" oninput="lengthValid()"  class="form-control" name="length_col" placeholder="Length..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="widthInput" oninput="widthValid()" class="form-control" name="width" placeholder="Width..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="baseUnitInput" oninput="baseUnitValid()" class="form-control" name="base_unit" placeholder="Unit..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="producerInput" oninput="producerValid()" class="form-control" name="producer" placeholder="Producer..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="quantityInput" oninput="quantityValid()" class="form-control" name="quantity" placeholder="Quantity..." />
                            <div class="error-message"></div>
                        </td>
                        <td class="align-middle col-1">
                            <input form="createProductForm" id="btn-create" class="form-control" type="submit" value="Create" disabled/>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        <table class="table mt-4">
            <thead class="thead-dark">
            <tr class="text-center">
                <th scope="col" class="align-middle">Id</th>
                <th scope="col" class="align-middle col-3">Name</th>
                <th scope="col" class="align-middle">Price</th>
                <th scope="col" class="align-middle">Height</th>
                <th scope="col" class="align-middle">Length</th>
                <th scope="col" class="align-middle">Width</th>
                <th scope="col" class="align-middle">Base Unit</th>
                <th scope="col" class="align-middle">Producer</th>
                <th scope="col" class="align-middle">Quantity</th>
                <th scope="col" colspan="2" class="align-middle">Option</th>
            </tr>
            </thead>
            <tbody>
                @foreach ($products as $product)
                    @if($product->price != -1)
                        <tr class="text-center">
                            <td class="align-middle">{{ $product->id }}</td>
                            <td class="align-middle"><a href="/dashboard/products/{{$product->id}}">{{ $product->name }}</a></td>
                            <td class="align-middle">{{ $product->price }}</td>
                            <td class="align-middle">{{ $product->height }}</td>
                            <td class="align-middle">{{ $product->length_col }}</td>
                            <td class="align-middle">{{ $product->width }}</td>
                            <td class="align-middle">{{ $product->base_unit }}</td>
                            <td class="align-middle">{{ $product->producer }}</td>
                            <td class="align-middle">{{ $product->quantity }}</td>
                            @if(request('status') != null)
                                <td class="align-middle">
                                    <form action="{{ route('products.activate', ['id' => $product->id]) }}" method="post">
                                        @csrf
                                        <button type="submit" class="btn btn-primary btn-success" onclick="return confirm('Are you sure you want to active this product?')">Active</button>
                                    </form>
                                </td>
                                <td class="align-middle">
                                    <form action="{{ route('dashboard.delete', ['id' => $product->id]) }}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-primary  btn-danger" onclick="return confirm('Are you sure you want to delete this product?')">Delete</button>
                                    </form>
                                </td>
                            @else
                                <td class="align-middle"><a href="/dashboard/products/{{$product->id}}"><button class="btn btn-primary">View</button></a></td>
                                <td class="align-middle">
                                    <form action="{{ route('dashboard.destroy', ['id' => $product->id]) }}" method="post">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-primary btn-warning" onclick="return confirm('Are you sure you want to delete this product, \n THIS ACTION CAN\'T BE UNDO?')">Disable</button>
                                    </form>
                                </td>
                            @endif
                        </tr>
                    @endif
                @endforeach
            </tbody>
        </table>

        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="successModalLabel">Success</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{ session('message') }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pagination d-flex justify-content-center">
        {{ $products->onEachSide(2)->links() }}
    </div>

    <script>

        let valueValid = 0;

        const errorMessage = (message, inputElement) => {
            inputElement.classList.add('btn-outline-danger');

            const errorElement = inputElement.nextElementSibling;
            errorElement.classList.add('text-danger');
            errorElement.textContent = message;
        }

        const successMessage = (inputElement) => {
            valueValid++;
            inputElement.classList.remove('btn-outline-danger');
            inputElement.classList.add('btn-outline-success');

            const errorElement = inputElement.nextElementSibling;
            errorElement.textContent = '';

            if (valueValid === 8) {
                const btnCreate = document.getElementById('btn-create');
                btnCreate.disabled = false;
                btnCreate.style.backgroundColor = '#218838';
                btnCreate.style.color = '#ffffff';
            }
        }

        const numberValid = (name, inputElement) => {

            if (inputElement.value.trim() === '') {
                errorMessage(name + ' can\'t be empty!', inputElement);
            }
            else if (isNaN(parseFloat(inputElement.value))) {
                errorMessage(name + ' can\'t be string!', inputElement);
            }
            else if (inputElement.value < 1) {
                errorMessage(name + ' can\'t < 1!', inputElement);
            } else {
                successMessage(inputElement);
            }
        }

        const stringValid = (name, inputElement) => {

            if (!isNaN(parseFloat(inputElement.value))) {
                errorMessage(name + ' can\'t be number!', inputElement);
            } else if (inputElement.value.trim() === '') {
                errorMessage(name + ' can\'t be empty!', inputElement);
            } else {
                successMessage(inputElement);
            }
        }

        const nameValid = () => {
            const name = 'Name';
            const inputElement = document.getElementById("nameInput");
            stringValid(name, inputElement);
        }

        const producerValid = () => {
            const name = 'Producer';
            const inputElement = document.getElementById("producerInput");
            stringValid(name, inputElement);
        }

        const priceValid = () => {
            const name = 'Price';
            const inputElement = document.getElementById("priceInput");
            numberValid(name, inputElement);
        }

        const heightValid = () => {
            const name = 'Height';
            const inputElement = document.getElementById("heightInput");
            numberValid(name, inputElement);
        }

        const lengthValid = () => {
            const name = 'Length';
            const inputElement = document.getElementById("lengthInput");
            numberValid(name, inputElement);
        }

        const widthValid = () => {
            const name = 'Width';
            const inputElement = document.getElementById("widthInput");
            numberValid(name, inputElement);
        }

        const quantityValid = () => {
            const name = 'Quantity';
            const inputElement = document.getElementById("quantityInput");
            numberValid(name, inputElement);
        }

        const baseUnitValid = () => {
            const inputElement = document.getElementById("baseUnitInput");

            if (!isNaN(parseFloat(inputElement.value))) {
                errorMessage('Base unit can\'t be number!', inputElement);
            } else if (inputElement.value.trim() === '') {
                errorMessage('Base unit can\'t be empty!', inputElement);
            } else if (inputElement.value.length > 3) {
                errorMessage('Base unit length can\'t be greater than 3!', inputElement);
            }else {
                successMessage(inputElement);
            }
        }
    </script>

    <script>
        $(document).ready(function () {
            @if(session('status') && session('message'))

            const status = "{{ session('status') }}";
            const message = "{{ session('message') }}";

            // Show the modal based on the message status
            if (status === 'success') {
                alert(message)
            }
            @endif

            $("#showCreateForm").click(function () {
                $("#createProductForm").toggle();
                $(".create-form-container").toggle(); // Toggle the visibility of the container
            });

            $(".create-form-container").click(function (event) {
                if (event.target === this) {
                    $("#createProductForm").hide();
                    $(this).hide();
                }
            });
        });
    </script>
@endsection
