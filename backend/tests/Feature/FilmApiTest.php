<?php

namespace Tests\Feature;

use App\Support\FrontendSeedData;
use Database\Seeders\FilmSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class FilmApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_films_in_premiere_order(): void
    {
        $this->seed(FilmSeeder::class);
        $seedFilms = FrontendSeedData::films();
        $expectedFilms = array_map(
            fn (array $film, int $index): array => [
                'index' => $index,
                'premiere_date' => Str::before($film['worldPremiere'], ' — '),
                'slug' => Str::slug($film['title']),
            ],
            $seedFilms,
            array_keys($seedFilms),
        );

        usort($expectedFilms, fn (array $left, array $right): int => [$left['premiere_date'], $left['index']] <=> [$right['premiere_date'], $right['index']]);

        $response = $this->getJson('/api/films');

        $response
            ->assertOk()
            ->assertJsonCount(count($expectedFilms))
            ->assertJsonPath('0.slug', $expectedFilms[0]['slug'])
            ->assertJsonPath((count($expectedFilms) - 1).'.slug', $expectedFilms[count($expectedFilms) - 1]['slug']);

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
