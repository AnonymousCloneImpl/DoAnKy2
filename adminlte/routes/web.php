<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');

Route::get('/error', [HomeController::class, 'error'])->name('error');

Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('/', function () {
        return view('dashboard');
    });

    Route::view('about', 'about')->name('about');

    Route::get('users', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');

    Route::get('profile', [\App\Http\Controllers\ProfileController::class, 'show'])->name('profile.show');
    Route::put('profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');

    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('productList');

    Route::get('/dashboard/products/edit/{id}', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/dashboard/products/update/{id}', [ProductController::class, 'update'])->name('products.update');

    Route::delete('/dashboard/products/delete/{id}', [ProductController::class, 'destroy'])->name('products.destroy');

    Route::get('/dashboard/products/create',[ProductController::class, 'create'])->name('products.create');
    Route::post('/dashboard/products/store',[ProductController::class, 'store'])->name('products.store');

    Route::get('/dashboard/orders', [OrderController::class, 'index'])->name('orderList');

    Route::post('/dashboard/orders/update', [OrderController::class, 'update'])->name('updateOrder');
});

