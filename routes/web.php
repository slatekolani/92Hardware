<?php

use App\Http\Controllers\HardwareController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('HardwareHomepage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('HomePage',[HardwareController::class, 'HomePage'])->name('HomePage');
Route::get('About',[HardwareController::class, 'About'])->name('About');
Route::get('Products',[HardwareController::class, 'Products'])->name('Products');
Route::get('ContactUs',[HardwareController::class, 'ContactUs'])->name('ContactUs');
Route::get('BuildingBlocks',[HardwareController::class, 'BuildingBlocks'])->name('BuildingBlocks');
Route::get('HardwareDealership',[HardwareController::class, 'HardwareDealership'])->name('HardwareDealership');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
