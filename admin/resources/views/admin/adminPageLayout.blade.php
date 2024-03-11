<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link href='https://fonts.googleapis.com/css?family=JetBrains Mono' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="/css/fontawesome.min.css">
    <link rel="stylesheet" href="{{ asset('css/templatemo-style.css') }}">
    <script src="{{asset('js/jquery-3.3.1.min.js')}}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    @vite('resources/js/app.js')
</head>

<style>
    .input-group {
        display: flex;
        align-items: center; /* Align items vertically in the center */
    }

    .input-group .form-control {
        width: auto; /* Let the input grow to fit its content */
    }

    .input-group .btn {
        margin-left: 10px; /* Adjust margin between input and button */
    }

    /* Media query for larger screens */
    @media (min-width: 768px) {
        .input-group .form-control {
            width: 200px; /* Set a fixed width for the search input on larger screens */
        }
    }
</style>

<body>
<nav class="navbar navbar-expand-xl">
    <div class="container h-100">
        <a class="navbar-brand" href="/admin/product">
            <h1 class="tm-site-title mb-0">Admin Dashboard</h1>
        </a>
        <button
            class="navbar-toggler ml-auto mr-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="fas fa-bars tm-nav-icon"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto h-100">
                <li class="nav-item">
                    <a class="nav-link active" href="/admin/product">
                        <i class="fas fa-shopping-cart"></i> Products
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/admin/product">
                        <i class="far fa-user"></i> Accounts
                    </a>
                </li>
            </ul>
            <ul class="navbar-nav mx-auto h-100">
                <form action="{{ route('admin.search') }}" method="GET" class="form-inline my-2 my-lg-0">
                    <div class="input-group">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                               name="query">
                        <button class="btn btn-outline-light my-2 my-sm-0" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>

            </ul>
            <ul class="navbar-nav mx-auto h-100">
                @guest
                    @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                    @endif

                    @if (Route::has('register'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                        </li>
                    @endif
                @else
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            Welcome, {{ Auth::user()->name }}
                        </a>

                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </div>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>

<div class="custom-container">
    @section('content')
    @show
</div>

</body>
</html>
