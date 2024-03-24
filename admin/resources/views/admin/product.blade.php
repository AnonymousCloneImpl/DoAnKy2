@extends("admin.adminLayout")
@section("title", "Chỉnh sửa sản phẩm")
@section("content")

    <style>
        .btn-outline-danger:hover {
            background-color: #ffffff;
            color: #333333;
        }
    </style>

    <table class="table col-12 custom-table">
        <thead class="thead-dark">
            <tr class="text-center">
                <th scope="col" class="align-middle col-1">Id</th>
                <th scope="col" class="align-middle col-2">Name</th>
                <th scope="col" class="align-middle col-1">Price</th>
                <th scope="col" class="align-middle col-1">Height</th>
                <th scope="col" class="align-middle col-1">Length</th>
                <th scope="col" class="align-middle col-1">Width</th>
                <th scope="col" class="align-middle col-1">Base Unit</th>
                <th scope="col" class="align-middle col-2">Producer</th>
                <th scope="col" class="align-middle col-1">Quantity</th>
                <th scope="col" class="align-middle col-1">Option</th>
            </tr>
        </thead>
        <tbody>

            <tr class="text-center">
                <td class="align-middle">{{ $product->id }}</td>
                <td class="align-middle">{{ $product->name }}</td>
                <td class="align-middle">{{ $product->price }}</td>
                <td class="align-middle">{{ $product->height }}</td>
                <td class="align-middle">{{ $product->length_col }}</td>
                <td class="align-middle">{{ $product->width }}</td>
                <td class="align-middle">{{ $product->base_unit }}</td>
                <td class="align-middle">{{ $product->producer }}</td>
                <td class="align-middle">{{ $product->quantity }}</td>
                <td class="align-middle"><input class="bg-dark text-white form-control" id="edit_btn" type="submit" value="Edit" /></td>
            </tr>

            <tr class="edit_form text-center">
                <td colspan="10" class="align-middle"><b>Enter Product Change Information Below</b></td>
            </tr>

            <tr class="edit_form text-center">
                <td class="align-middle col-1">
                    <form
                        id="form"
                        action="{{ route('dashboard.update', ['id' => $product->id]) }}"
                        method="POST">
                        @csrf
                        @method('PUT')
                        {{ $product->id }}
                    </form>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="nameInput" type="text" class="form-control" oninput="nameValid()" name="name"  placeholder="Name..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="priceInput" class="form-control" name="price" oninput="priceValid()" placeholder="Price..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="heightInput" oninput="heightValid()" class="form-control" name="height" placeholder="Height..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="lengthInput" oninput="lengthValid()"  class="form-control" name="length_col" placeholder="Length..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="widthInput" oninput="widthValid()" class="form-control" name="width" placeholder="Width..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="baseUnitInput" oninput="baseUnitValid()" class="form-control" name="base_unit" placeholder="Unit..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="producerInput" oninput="producerValid()" class="form-control" name="producer" placeholder="Producer..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="quantityInput" oninput="quantityValid()" class="form-control" name="quantity" placeholder="Quantity..." />
                    <div class="error-message"></div>
                </td>
                <td class="align-middle col-1">
                    <input form="form" id="btn-update" class="form-control bg-dark text-white" type="submit" value="Update"/>
                </td>
            </tr>

            @if(session('success'))
            <tr class="text-center" id="successMessageRow">
                <td colspan="10" class="align-middle">
                    <div class="alert alert-success">
                        {{ session('success') }}
                    </div>
                </td>
            </tr>
            @endif

        </tbody>
    </table>

    <script>

        const buttonUpdate = document.getElementById("btn-update");

        const errorMessage = (message, inputElement) => {
            inputElement.classList.add('btn-outline-danger');

            const errorElement = inputElement.nextElementSibling;
            errorElement.classList.add('text-danger');
            errorElement.textContent = message;

            buttonUpdate.disabled = true;
        }

        const successMessage = (inputElement) => {
            inputElement.classList.remove('btn-outline-danger');
            inputElement.classList.add('btn-outline-success');

            const errorElement = inputElement.nextElementSibling;
            errorElement.textContent = '';

            buttonUpdate.disabled = false;
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
        window.addEventListener('load', function() {
            const editBtn = document.getElementById('edit_btn');
            editBtn.addEventListener('click', function() {
                document.querySelectorAll('.edit_form').forEach((element) => {
                    element.classList.toggle('hidden');
                    element.classList.toggle('show');
                });
                editBtn.value = (editBtn.value === 'Edit') ? 'Cancel' : 'Edit';
            });
        });
    </script>
@endsection
