<!-- Sidebar -->
<div class="sidebar">
    <!-- Sidebar user panel (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
            <img src="{{asset('images/Ferry.png')}}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
            <a href="{{ route('profile.show') }}" class="d-block">Welcome back, {{ Auth::user()->name }}</a>
        </div>
    </div>

    <!-- Sidebar Menu -->
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
            data-accordion="false">
            <li class="nav-item">
                <a href="{{ route('dashboard') }}" class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                    <i class="nav-icon fas fa-th"></i>
                    <p>
                        {{ __('Dashboard') }}
                    </p>
                </a>
            </li>

            <li class="nav-item">
                <a href="#" class="nav-link {{ request()->routeIs('manage.*') ? 'active' : '' }}">
                    <i class="fas fa-tasks nav-icon"></i>
                    <p>
                        Admin
                        <i class="fas fa-angle-left right"></i>
                    </p>
                </a>
                <ul class="nav nav-treeview" style="{{ request()->routeIs('manage.*') ? 'display: block;' : '' }}">
                    <li class="nav-item">
                        <a href="{{route('productList')}}" class="nav-link {{ request()->routeIs('manage.products') ? 'active' : '' }}">
                            <i class="fa fa-boxes nav-icon"></i>
                            <p>Manage Products</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('orderList')}}" class="nav-link {{ request()->routeIs('manage.orders') ? 'active' : '' }}">
                            <i class="far fa-sticky-note nav-icon"></i>
                            <p>Manage Orders</p>
                        </a>
                    </li>
                </ul>
            </li>

            <li class="nav-item">
                <a href="{{ route('users.index') }}" class="nav-link {{ request()->routeIs('users.index') ? 'active' : '' }}">
                    <i class="nav-icon fas fa-users"></i>
                    <p>
                        {{ __('Users') }}
                    </p>
                </a>
            </li>

            <li class="nav-item">
                <a href="{{ route('about') }}" class="nav-link {{ request()->routeIs('about') ? 'active' : '' }}">
                    <i class="nav-icon far fa-address-card"></i>
                    <p>
                        {{ __('About us') }}
                    </p>
                </a>
            </li>
        </ul>
    </nav>
    <!-- /.sidebar-menu -->
</div>
<!-- /.sidebar -->
