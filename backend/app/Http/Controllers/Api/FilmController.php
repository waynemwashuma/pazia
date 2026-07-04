<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FilmResource;
use App\Models\Film;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class FilmController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $films = Film::query()
            ->orderBy('premiere_date')
            ->orderBy('id')
            ->get();

        return FilmResource::collection($films);
    }

    public function show(string $slug): FilmResource|JsonResponse
    {
        $film = Film::query()
            ->where('slug', $slug)
            ->first();

        if (! $film) {
            return response()->json([
                'message' => 'That launch could not be found.',
            ], 404);
        }

        return new FilmResource($film);
    }
}
