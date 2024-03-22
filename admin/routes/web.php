<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;
use \App\Http\Controllers\ErrorController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('home');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::middleware(['AdminPermissionValidate'])->group(function () {

    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/products', [ProductController::class, 'index'])->name('dashboard.product.index');

    Route::get('/dashboard/products/{id}', [ProductController::class, 'show'])->name('dashboard.product');

    Route::put('/dashboard/products/{id}/update', [ProductController::class, 'update'])->name('dashboard.update');

    Route::post('/dashboard/products/{id}/activate', [ProductController::class, 'activate'])->name('products.activate');

    Route::post('/dashboard/products/store', [ProductController::class, 'store'])->name('dashboard.store');

    Route::delete('/dashboard/products/{id}', [ProductController::class, 'disable'])->name('dashboard.destroy');

    Route::delete('/dashboard/products/delete/{id}', [ProductController::class, 'delete'])->name('dashboard.delete');

});

Route::get('/error', function () {
    return view('error');
})->name('error.permission');
