<?php

namespace Tests\Feature;

use Database\Seeders\FilmSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FilmApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_films_in_premiere_order(): void
    {
        $this->seed(FilmSeeder::class);

        $response = $this->getJson('/api/films');

        $response
            ->assertOk()
            ->assertJsonCount(6)
            ->assertJsonPath('0.slug', 'night-nurse')
            ->assertJsonPath('1.slug', 'moana')
            ->assertJsonPath('5.slug', 'the-odyssey');

        $response->assertJsonStructure([
            '*' => [
                'id',
                'title',
                'slug',
                'logline',
                'synopsis',
                'poster_image',
                'trailer_url',
                'premiere_date',
                'release_date',
                'runtime_minutes',
                'categories',
                'cast',
                'director',
                'world_premiere',
                'release_venue',
                'featured',
                'created_at',
                'updated_at',
                'phase',
                'premiereDate',
                'releaseDate',
                'city',
                'venue',
                'genres',
                'launchFocus',
                'teaserStatus',
                'poster',
                'posterUrl',
            ],
        ]);
    }

    public function test_it_returns_a_single_film_by_slug(): void
    {
        $this->seed(FilmSeeder::class);

        $this->getJson('/api/films/moana')
            ->assertOk()
            ->assertJsonPath('slug', 'moana')
            ->assertJsonPath('featured', true)
            ->assertJsonPath('venue', 'El Capitan Theatre')
            ->assertJsonPath('city', 'Hollywood');
    }

    public function test_it_returns_a_json_404_for_unknown_slugs(): void
    {
        $this->seed(FilmSeeder::class);

        $this->getJson('/api/films/unknown-launch')
            ->assertNotFound()
            ->assertExactJson([
                'message' => 'That launch could not be found.',
            ]);
    }
}
