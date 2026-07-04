<?php

use App\Http\Controllers\Api\FilmController;
use App\Http\Controllers\Api\NewsletterSubmissionController;
use Illuminate\Support\Facades\Route;

Route::get('/films', [FilmController::class, 'index']);
Route::get('/films/{slug}', [FilmController::class, 'show']);

Route::post('/newsletter', [NewsletterSubmissionController::class, 'store']);
Route::post('/contact', [NewsletterSubmissionController::class, 'store']);
