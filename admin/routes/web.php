<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

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
//
//Route::get('/', function () {
//    return view('welcome');
//}); //routing url with view : / <==> welcome.blade.php
//
////function (event, function_callback)
////route ::get:http method get
//Route::get("/greeting2", function () {
//    return view('greeting');
//});
//
//Route::get("/greeting/{username}", function ($username) {
//    return view('greeting', ['username' => $username]);
//});
//
//Route::get("/greeting", function () {
//    return "Hello World";
//});
//
////Route::get("/admin/login/{username}", function ($username){
////    return view('admin.Login', ['username' => $username]);
////});
//
////route ::post:http method post
//Route::post("/greeting", function () {
//    return "Hello World";
//});
//
//// can be called by both get and post
////Route::match(['GET','POST'],"/admin/login/{username}", function ($username){
////    return view('admin.Login', ['username' => $username]);
////});
//
//Route::any("/admin/login/{username}", function ($username) {
//    return view('admin.Login', ['username' => $username]);
//});


//Route::get("admin/product/edit", \App\Http\Controllers\ProductController::class);
//Route::resource("product", \App\Http\Controllers\ProductController::class, ['except' => ['index']]);

////admin
//Route::group(['middleware' => "auth", "prefix" => "admin"], function () {
//    Route::any("/admin/login", function () {
//        return view('admin.Login');
//    });
//});
//
//Route::middleware(['auth'])->group(function () {
//    Route::any("/admin/product/{id}", function ($id) {
//        return view('admin.Login', ["id"=> $id]);
//    });
//});
//
//Route::get('/{username}/{address}', [\App\Http\Controllers\HomeController::class, "callFunction"]);
//
//Route::get('/homies', [\App\Http\Controllers\HomeController::class, "theHomies"]) -> where(['username' => '[a-z]+']);
//
//Route::get('/home/{username}/{id}', 'HomeController@home') -> where(['username' => '[a-z]+']);
//
//Route::get("/homie", function () {
//    return view('Homie');
//});
//
//Route::get('/index', function() {
//    return view('index');
//});
//
//Route::resource('student',\App\Http\Controllers\StudentController::class);
//Route::resource('/', ProductController::class);

Auth::routes();
Route::get('/', [ProductController::class, 'index']);
Route::get('admin/product', [ProductController::class, 'index'])->name('admin.product.index');
Route::get('admin/login',function (){
    return view('auth.login');
})->name('admin.login');
Route::get('admin/register',function (){
    return view('auth.register');
})->name('admin.register');
Route::get('admin/product/create',[ProductController::class, 'create'])->name('admin.product.create');
Route::post('admin/product/store',[ProductController::class, 'store'])->name('admin.product.store');
Route::get('admin/product/edit/{id}', [ProductController::class, 'edit'])->name('admin.product.edit');
Route::put('admin/product/update/{id}', [ProductController::class, 'update'])->name('admin.product.update');
Route::get('/search', [ProductController::class, 'search'])->name('admin.search');
Route::delete('admin/product/delete/{id}', [ProductController::class, 'destroy'])->name('admin.product.destroy');
Route::put('admin/product/recover/{id}', [ProductController::class, 'recover'])->name('admin.product.recover');
Route::put('admin/product/recoverAll', [ProductController::class, 'recoverAll'])->name('admin.product.recoverAll');
Route::get('admin/product/removedList', [ProductController::class, 'showHiddenItem'])->name('admin.product.removedList');
Route::get('logout/redirect', [LoginController::class, 'logoutAndRedirect'])->name('logout.redirect');

