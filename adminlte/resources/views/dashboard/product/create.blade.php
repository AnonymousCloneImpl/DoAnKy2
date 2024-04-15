@extends('layouts.app')
@section('title', 'Add')
@section('content')
    <div class="container tm-mt-big tm-mb-big">
        <div class="row pt-3">
            <div class="col-12">
                <h2 class="tm-block-title d-inline-block">Add Product</h2>
            </div>
        </div>

        <div class="row pb-2">
            <div class="col-xl-12 col-lg-12 col-md-12">
                <form id="create-product-form" action="{{route('products.store')}}" method="POST"
                      class="tm-create-product-form">
                    @csrf
                    <div class="form-row">
                        <div class="col-4 form-group mb-3">
                            <label for="model">Model</label>
                            <input id="model"
                                   name="model"
                                   type="text"
                                   placeholder="Insert Product Model here"
                                   value=""
                                   class="form-control validate"
                                   required
                                   oninput="validateInput('model')"/>
                            <div id="model-error" class="text-danger"></div>
                            <div id="model-server-error" class="text-danger-server">
                                @error('model')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>

                        <div class="col form-group mb-3">
                            <label
                                for="name"
                            >Product Name
                            </label>
                            <input id="name"
                                   name="name"
                                   type="text"
                                   placeholder="Insert Product Name here"
                                   value=""
                                   class="form-control validate"
                                   required
                                   oninput="validateInput('name')"/>
                            <div id="name-error" class="text-danger"></div>
                            <div id="name-server-error" class="text-danger-server">
                                @error('name')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                        <div class="col-1 form-group mb-3">
                            <label
                                for="discount_percentage"
                            >Discount %
                            </label>
                            <input id="discount_percentage"
                                   name="discount_percentage"
                                   type="number"
                                   placeholder="Insert Discount % here for the product"
                                   value="0"
                                   class="form-control validate"
                                   required
                                   oninput="validateInput('discount_percentage')"/>
                            <div id="discount_percentage-error" class="text-danger"></div>
                            <div id="discount_percentage-server-error" class="text-danger-server">
                                @error('discount_percentage')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="image">Product Image</label>
                        <input id="image"
                               name="image"
                               type="text"
                               placeholder="Insert image url(s) here for product"
                               value=""
                               required
                               class="form-control validate"
                               oninput="validateInput('image')"/>
                        <div id="image-error" class="text-danger"></div>
                        <div id="image-server-error" class="text-danger-server">
                            @error('image')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col form-group mb-3">
                            <label for="price">Price in $</label>
                            <input id="price"
                                   name="price"
                                   type="number"
                                   placeholder="Insert price here for the product"
                                   value=""
                                   class="form-control validate"
                                   required
                                   oninput="validateInput('price')"/>
                            <div id="price-error" class="text-danger"></div>
                            <div id="price-server-error" class="text-danger-server">
                                @error('price')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>

                        <div class="col form-group mb-3">
                            <label for="producer_id">Select Producer</label>
                            <select class="form-control" id="producer_id" name="producer_id"
                                    oninput="validateInput('producer_id')">
                                @forelse($producerList as $pl)
                                    <option
                                        value="{{$pl->producer_id}}">
                                        {{$pl->producer_name}}
                                    </option>
                                @empty
                                    <option value="">No Producer Found in the Database</option>
                                @endforelse
                            </select>
                            <div id="producer_id-error" class="text-danger"></div>
                            <div id="producer_id-server-error" class="text-danger-server">
                                @error('producer_id')
                                {{ $message }}
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="type">Select Type</label>
                        <select name="type" class="form-control" id="type" oninput="validateInput('type')">
                            <option value="Laptop">Laptop</option>
                            <option value="CPU">CPU</option>
                            <option value="CpuCooler">CPU Cooler</option>
                            <option value="Motherboard">Motherboard</option>
                            <option value="Memory">Memory</option>
                            <option value="Storage">Storage</option>
                            <option value="GPU">Graphical Processor Unit</option>
                            <option value="PcCase">PC Case</option>
                            <option value="CaseFan">PC Case Fan</option>
                            <option value="PSU">Power Supply Unit</option>
                            <option value="Monitor">Monitor</option>
                            <option value="Keyboard">Keyboard</option>
                            <option value="Mouse">Mouse</option>
                        </select>
                        <div id="type-error" class="text-danger"></div>
                        <div id="type-server-error" class="text-danger-server">
                            @error('type')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div id="ProductDetails" class="form-group mb-3">
                        <div id="dynamic-fields"></div>

                        <input type="text" id="product_detail" name="product_detail"
                               placeholder="productDetailJson" value="">
                    </div>

                    <div class="form-group mb-3">
                        <label
                            for="quantity"
                        >Stock
                        </label>
                        <input id="quantity"
                               name="quantity"
                               type="number"
                               placeholder="Insert number of stock here"
                               value="0"
                               class="form-control validate"
                               required
                               oninput="validateInput('quantity')"/>
                        <div id="quantity-error" class="text-danger"></div>
                        <div id="quantity-server-error" class="text-danger-server">
                            @error('quantity')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="blog_header">Blog Header</label>
                        <input id="blog_header"
                               name="blog_header"
                               type="text"
                               placeholder="Insert the blog post's header here"
                               value=""
                               required
                               class="form-control validate"
                               oninput="validateInput('blog_header')"/>
                        <div id="blog_header-error" class="text-danger"></div>
                        <div id="blog_header-server-error" class="text-danger-server">
                            @error('blog_header')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="blog_content">Blog Content</label>
                        <textarea id="blog_content"
                                  name="blog_content"
                                  placeholder="Insert the content here for blog posts"
                                  class="form-control validate"
                                  rows="5"
                                  required
                                  oninput="validateInput('blog_content')"></textarea>
                        <div id="blog_content-error" class="text-danger"></div>
                        <div id="blog_content-server-error" class="text-danger-server">
                            @error('blog_content')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label for="blog_image">Blog Image</label>
                        <input id="blog_image"
                               name="blog_image"
                               type="text"
                               placeholder="Insert image url(s) here for blog posts"
                               value=""
                               required
                               class="form-control validate"
                               oninput="validateInput('blog_image')"/>
                        <div id="blog_image-error" class="text-danger"></div>
                        <div id="blog_image-server-error" class="text-danger-server">
                            @error('blog_image')
                            {{ $message }}
                            @enderror
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <button type="submit" class="btn btn-primary btn-block text-uppercase">Add Product</button>
                    </div>
                    <div class="form-group mb-3">
                        <a href="{{ url()->previous() }}" class="btn btn-secondary btn-block text-uppercase">Back</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

@endsection

@section('scripts')
    <script>
        function validateInput(fieldName) {
            const fieldValue = document.getElementById(fieldName).value;
            const errorElement = document.getElementById(fieldName + '-error');
            const serverErrorElement = document.getElementById(fieldName + '-server-error');

            errorElement.textContent = '';
            serverErrorElement.textContent = '';

            switch (fieldName) {
                case 'model':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Model is required';
                    } else if (fieldValue.length > 255) {
                        errorElement.textContent = 'Model must be at most 255 characters';
                    }
                    break;
                case 'name':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Product name is required';
                    } else if (fieldValue.length > 255) {
                        errorElement.textContent = 'Product name must be at most 255 characters';
                    }
                    break;
                case 'discount_percentage':
                    if (fieldValue !== '' && (isNaN(fieldValue) || fieldValue < 0 || fieldValue > 100)) {
                        errorElement.textContent = '0 - 100%';
                    }
                    break;
                case 'price':
                    if (fieldValue === '' || isNaN(fieldValue) || fieldValue < 0 || fieldValue > 1000000000000) {
                        errorElement.textContent = 'Price must be a positive number or less than 1 trillion';
                    }
                    break;
                case 'type':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Type is required';
                    } else if (fieldValue.length > 255 || fieldValue.length < 0) {
                        errorElement.textContent = 'Invalid Product Type';
                    }
                    break;
                case 'quantity':
                    if (fieldValue !== '' && (isNaN(fieldValue) || fieldValue < 0 || fieldValue > 1000000000000)) {
                        errorElement.textContent = 'Stock number must not be in the negative or exceed 1 trillion';
                    }
                    break;
                case 'image':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Product image is required';
                    }
                    break;
                case 'blog_header':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Blog header is required';
                    }
                    break;
                case 'blog_content':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Blog content is required';
                    }
                    break;
                case 'blog_image':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Blog image is required';
                    }
                    break;
                case 'producer':
                    if (fieldValue === '') {
                        errorElement.textContent = 'Please select a producer';
                    } else if (fieldValue < 0) {
                        errorElement.textContent = 'Invalid Producer';
                    }
                    break;
                default:
                    break;
            }
        }

        document.getElementById('create-product-form').addEventListener('submit', function (event) {

            validateInput('model');
            validateInput('name');
            validateInput('discount_percentage');
            validateInput('price');
            validateInput('type');
            validateInput('quantity');
            validateInput('image');
            validateInput('blog_image');
            validateInput('blog_content');
            validateInput('blog_header');
            validateInput('producer_id');

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

        document.addEventListener('DOMContentLoaded', function () {
            validateInput('model');
            validateInput('name');
            validateInput('discount_percentage');
            validateInput('price');
            validateInput('type');
            validateInput('quantity');
            validateInput('image');
            validateInput('blog_image');
            validateInput('blog_content');
            validateInput('blog_header');
            validateInput('producer_id');
        });



        // Function to restrict discount input to numbers from 0 to 100
        document.getElementById('discount_percentage').addEventListener('input', function (event) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                event.target.value = 0;
            } else {
                if (value < 0) {
                    event.target.value = 0;
                } else if (value > 100) {
                    event.target.value = 100;
                }
            }
        });

        // Function to restrict price input to numbers from 0 to 1 tril
        document.getElementById('price').addEventListener('input', function (event) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                event.target.value = 0;
            } else {
                if (value < 0) {
                    event.target.value = 0;
                } else if (value > 1000000000000) {
                    event.target.value = 1000000000000;
                }
            }
        });

        // Function to restrict stock input to numbers from 0 to 1 tril
        document.getElementById('quantity').addEventListener('input', function (event) {
            let value = parseInt(event.target.value);
            if (isNaN(value)) {
                event.target.value = 0;
            } else {
                if (value < 0) {
                    event.target.value = 0;
                } else if (value > 1000000000000) {
                    event.target.value = 1000000000000;
                }
            }
        });
    </script>
    {{--    Product Detail Scripts--}}
    <script>

        document.addEventListener('DOMContentLoaded', function () {
            // Call generateFields initially to populate fields based on the initial value of the type select element
            generateFields();

            // Add event listener to the change event of the type select element
            document.getElementById('type').addEventListener('change', generateFields);
        });

        function generateFields() {
            var type = document.getElementById('type').value;
            var dynamicFields = document.getElementById('dynamic-fields');
            dynamicFields.innerHTML = ''; // Clear previous fields

            switch (type) {
                case 'Laptop':
                    generateLaptopFields(dynamicFields);
                    break;
                case 'CPU':
                    generateCPUFields(dynamicFields);
                    break;
                case 'CpuCooler':
                    generateCPUCoolerFields(dynamicFields);
                    break;
                case 'Motherboard':
                    generateMotherboardFields(dynamicFields);
                    break;
                case 'Memory':
                    generateMemoryFields(dynamicFields);
                    break;
                case 'Storage':
                    generateStorageFields(dynamicFields);
                    break;
                case 'GPU':
                    generateGPUFields(dynamicFields);
                    break;
                case 'PcCase':
                    generatePCCaseFields(dynamicFields);
                    break;
                case 'CaseFan':
                    generateCaseFanFields(dynamicFields);
                    break;
                case 'PSU':
                    generatePSUFields(dynamicFields);
                    break;
                case 'Monitor':
                    generateMonitorFields(dynamicFields);
                    break;
                case 'Keyboard':
                    generateKeyboardFields(dynamicFields);
                    break;
                case 'Mouse':
                    generateMouseFields(dynamicFields);
                    break;
                // Add cases for other product types
                default:
                    break;
            }
        }

        function generateLaptopFields(container) {
            var fields = ['Cpu Type', 'Cpu', 'Gpu', 'Integrated Graphics', 'Ram', 'Ram Type', 'Ram Slots', 'Storage', 'Screen Size', 'Battery', 'Operating System', 'Screen resolution', 'Ports'];
            generateFieldsHelper(container, fields);
        }

        function generateCPUFields(container) {
            var fields = ['Socket Type', 'Core Count', 'Thread Count', 'Clock Speed', 'Integrated Graphics'];
            generateFieldsHelper(container, fields);
        }

        function generateCPUCoolerFields(container) {
            var fields = ['Socket Compatibility', 'Fan Size', 'Heat Pipes', 'TDP Rating', 'RGB Support'];
            generateFieldsHelper(container, fields);
        }

        function generateMotherboardFields(container) {
            var fields = ['Socket Type', 'Chipset', 'Form Factor', 'RAM Slots', 'Expansion Slots', 'Storage', 'Networking', 'Audio', 'USB Ports', 'BIOS Type'];
            generateFieldsHelper(container, fields);
        }

        function generateMemoryFields(container) {
            var fields = ['Capacity', 'Type', 'Speed', 'CAS Latency', 'Voltage', 'Form Factor', 'ECC Support', 'RGB Support'];
            generateFieldsHelper(container, fields);
        }

        function generateStorageFields(container) {
            var fields = ['Type', 'Capacity', 'Interface', 'Form Factor', 'Read Speed', 'Write Speed', 'Encryption', 'Endurance', 'NAND Type'];
            generateFieldsHelper(container, fields);
        }

        function generateGPUFields(container) {
            var fields = ['GPU Model', 'Memory Size', 'Memory Type', 'Memory Interface', 'Boost Clock', 'Power Connectors', 'Dimensions', 'Cooling', 'Output Ports'];
            generateFieldsHelper(container, fields);
        }

        function generatePCCaseFields(container) {
            var fields = ['Form Factor', 'Supported Motherboard Sizes', 'Expansion Slots', 'Drive Bays', 'Front Panel Ports', 'Fan Support', 'Dimensions', 'Material'];
            generateFieldsHelper(container, fields);
        }

        function generateCaseFanFields(container) {
            var fields = ['Fan Size', 'Bearing Type', 'Max RPM', 'Airflow', 'Noise Level', 'Connector Type', 'Dimensions'];
            generateFieldsHelper(container, fields);
        }

        function generatePSUFields(container) {
            var fields = ['Wattage', 'Efficiency Certification', 'Modularity', 'Form Factor', 'Fan Size', 'Connectors', 'Dimensions'];
            generateFieldsHelper(container, fields);
        }

        function generateMonitorFields(container) {
            var fields = ['Panel Type', 'Resolution', 'Refresh Rate', 'Response Time', 'Aspect Ratio', 'Brightness', 'Contrast Ratio', 'Viewing Angle', 'Connectors', 'Features'];
            generateFieldsHelper(container, fields);
        }

        function generateKeyboardFields(container) {
            var fields = ['Type', 'Switch Type', 'Backlight', 'Connectivity', 'Layout', 'Key Rollover', 'Media Controls', 'Dimensions'];
            generateFieldsHelper(container, fields);
        }

        function generateMouseFields(container) {
            var fields = ['Type', 'Sensor Type', 'DPI', 'Polling Rate', 'Number of Buttons', 'Connectivity', 'RGB Lighting', 'Dimensions'];
            generateFieldsHelper(container, fields);
        }


        // Add other generate functions for different product types

        function generateFieldsHelper(container, fields) {
            fields.forEach(function (label) {
                var labelElement = document.createElement('label');
                labelElement.textContent = label;

                var inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.className = 'form-control validate mb-3';
                inputField.dataset.label = label; // Convert label to camel case
                inputField.addEventListener('input', updateProductDetail);

                container.appendChild(labelElement);
                container.appendChild(inputField);
            });
        }

        function updateProductDetail() {
            var inputs = document.querySelectorAll('#dynamic-fields input');
            var productDetail = {};

            inputs.forEach(function (input) {
                productDetail[input.dataset.label] = input.value;
            });

            document.getElementById('product_detail').value = JSON.stringify(productDetail);
        }

        document.getElementById("quantity").addEventListener("click", function() {
            this.select();
        });

        document.getElementById("quantity").addEventListener("change", function() {
            let value = this.value;
            if (value.startsWith('0')) {
                value = value.replace(/^0+/, '');
                this.value = value;
            }
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
