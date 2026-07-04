<?php

namespace Database\Seeders;

use App\Models\Film;
use App\Support\FrontendSeedData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FilmSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        foreach (FrontendSeedData::films() as $index => $film) {
            $slug = Str::slug((string) $film['title']);

            Film::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $film['title'],
                    'slug' => $slug,
                    'logline' => $film['description'],
                    'synopsis' => $this->buildSynopsis($film),
                    'poster_image' => $film['posterUrl'],
                    'trailer_url' => "https://trailers.pazia.example/{$slug}",
                    'premiere_date' => $this->premiereDate($film),
                    'release_date' => $film['publicReleaseDate'],
                    'runtime_minutes' => $this->runtimeMinutes($film),
                    'categories' => $film['categories'],
                    'cast' => $film['mainCast'],
                    'director' => $film['director'],
                    'world_premiere' => $film['worldPremiere'],
                    'release_venue' => $film['releaseVenue'],
                    'featured' => $index === 0,
                ],
            );
        }
    }

    /**
     * @param  array<string, mixed>  $film
     */
    private function buildSynopsis(array $film): string
    {
        return $film['description'].' The release campaign moves from '.$film['worldPremiere'].' into the public opening at '.$film['releaseVenue'].'.';
    }

    /**
     * @param  array<string, mixed>  $film
     */
    private function premiereDate(array $film): string
    {
        return Str::before((string) $film['worldPremiere'], ' — ');
    }

    /**
     * @param  array<string, mixed>  $film
     */
    private function runtimeMinutes(array $film): int
    {
        preg_match('/\d+/', (string) $film['runtime'], $matches);

        return (int) ($matches[0] ?? 0);
    }
}
