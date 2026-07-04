<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FilmResource extends JsonResource
{
    private const POSTER_THEMES = [
        [
            'base' => '#1a3140',
            'accent' => '#2d6173',
            'highlight' => '#d9ad72',
            'shadow' => '#081117',
            'motif' => 'Submerged horizon',
            'treatment' => 'Cut-glass lines, midnight tides, and a warm brass seam.',
        ],
        [
            'base' => '#173228',
            'accent' => '#406e5c',
            'highlight' => '#b98d53',
            'shadow' => '#09130f',
            'motif' => 'Midnight conservatory',
            'treatment' => 'Emerald glass, brass stems, and a veil of shadowed petals.',
        ],
        [
            'base' => '#42181a',
            'accent' => '#8a2e31',
            'highlight' => '#d4a063',
            'shadow' => '#140709',
            'motif' => 'Signal flare',
            'treatment' => 'Scarlet transmission bands, lacquer black, and warm radio heat.',
        ],
        [
            'base' => '#292229',
            'accent' => '#61505e',
            'highlight' => '#bd975d',
            'shadow' => '#110d11',
            'motif' => 'Cathedral ash',
            'treatment' => 'Stone plumage, cinder grey, and a restrained gold ember.',
        ],
        [
            'base' => '#202e3a',
            'accent' => '#3d5564',
            'highlight' => '#d3a96f',
            'shadow' => '#0b1218',
            'motif' => 'Silent horizon',
            'treatment' => 'Orbital blue, soft metal, and a narrow seam of launch light.',
        ],
        [
            'base' => '#3b1f1d',
            'accent' => '#6d3c35',
            'highlight' => '#d7ae6c',
            'shadow' => '#120b0a',
            'motif' => 'Velvet corridor',
            'treatment' => 'Dusky burgundy, polished bronze, and a stage-lit edge.',
        ],
        [
            'base' => '#1e2b26',
            'accent' => '#466157',
            'highlight' => '#d0a15b',
            'shadow' => '#09110e',
            'motif' => 'Paper moon',
            'treatment' => 'Forest ink, warm parchment, and a thin crescent of light.',
        ],
        [
            'base' => '#33242f',
            'accent' => '#6a4c63',
            'highlight' => '#d8b16a',
            'shadow' => '#120d11',
            'motif' => 'Nocturne gate',
            'treatment' => 'Plum lacquer, smoked gold, and a corridor of deep shadow.',
        ],
        [
            'base' => '#25343c',
            'accent' => '#4a6572',
            'highlight' => '#cda869',
            'shadow' => '#0d1418',
            'motif' => 'Arterial city',
            'treatment' => 'Steel blue, ember gold, and a pulse of urban light.',
        ],
        [
            'base' => '#342a1f',
            'accent' => '#6a5840',
            'highlight' => '#d6ab69',
            'shadow' => '#120e0a',
            'motif' => 'Golden static',
            'treatment' => 'Warm grain, amber light, and a slightly distressed edge.',
        ],
    ];

    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        ['city' => $city, 'venue' => $venue] = $this->parseWorldPremiere();
        $premiereDate = $this->resource->premiere_date?->toDateString();
        $releaseDate = $this->resource->release_date?->toDateString();

        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'slug' => $this->resource->slug,
            'logline' => $this->resource->logline,
            'synopsis' => $this->resource->synopsis,
            'poster_image' => $this->resource->poster_image,
            'trailer_url' => $this->resource->trailer_url,
            'premiere_date' => $premiereDate,
            'release_date' => $releaseDate,
            'runtime_minutes' => $this->resource->runtime_minutes,
            'categories' => $this->resource->categories ?? [],
            'cast' => $this->resource->getAttribute('cast') ?? [],
            'director' => $this->resource->director,
            'world_premiere' => $this->resource->world_premiere,
            'release_venue' => $this->resource->release_venue,
            'featured' => $this->resource->featured,
            'created_at' => $this->resource->created_at?->toJSON(),
            'updated_at' => $this->resource->updated_at?->toJSON(),
            'phase' => $this->phaseLabel(),
            'premiereDate' => $premiereDate ? "{$premiereDate}T19:30:00" : null,
            'releaseDate' => $releaseDate ? "{$releaseDate}T00:00:00" : null,
            'city' => $city,
            'venue' => $venue,
            'genres' => $this->resource->categories ?? [],
            'launchFocus' => $this->launchFocus(),
            'teaserStatus' => $this->teaserStatus(),
            'poster' => $this->posterTheme(),
            'posterUrl' => $this->resource->poster_image,
        ];
    }

    /**
     * @return array{city: string, venue: string}
     */
    private function parseWorldPremiere(): array
    {
        $worldPremiere = (string) $this->resource->world_premiere;
        $parts = explode(' — ', $worldPremiere, 2);
        $location = trim($parts[1] ?? $parts[0] ?? '');

        if ($location === '') {
            return [
                'city' => '',
                'venue' => '',
            ];
        }

        if (str_contains($location, ',')) {
            $segments = array_map('trim', explode(',', $location));
            $city = array_pop($segments) ?: $location;
            $venue = implode(', ', array_filter($segments));

            return [
                'city' => $city,
                'venue' => $venue !== '' ? $venue : $location,
            ];
        }

        $segments = preg_split('/\s+/', $location) ?: [];

        if (count($segments) > 1) {
            return [
                'city' => $segments[0],
                'venue' => implode(' ', array_slice($segments, 1)),
            ];
        }

        return [
            'city' => $location,
            'venue' => $location,
        ];
    }

    private function phaseLabel(): string
    {
        if ($this->resource->featured) {
            return 'Featured launch';
        }

        $releaseDate = $this->resource->release_date;

        if (! $releaseDate) {
            return 'Upcoming release';
        }

        if ((int) $releaseDate->format('m') === 7) {
            $day = (int) $releaseDate->format('d');

            if ($day <= 10) {
                return 'Opening week';
            }

            if ($day <= 17) {
                return 'Mid-July';
            }

            if ($day <= 24) {
                return 'Late July';
            }

            return 'July release';
        }

        if ((int) $releaseDate->format('m') === 8) {
            $day = (int) $releaseDate->format('d');

            if ($day <= 7) {
                return 'Early August';
            }

            if ($day <= 14) {
                return 'Mid-August';
            }

            return 'August release';
        }

        return 'Upcoming release';
    }

    private function launchFocus(): string
    {
        $categories = $this->resource->categories ?? [];
        $primaryCategory = $categories[0] ?? 'Launch';

        return "{$primaryCategory} positioning built around {$this->resource->world_premiere} and {$this->resource->release_venue}.";
    }

    private function teaserStatus(): string
    {
        $releaseDate = $this->resource->release_date?->toDateString();

        return "World premiere: {$this->resource->world_premiere}. Public release: {$releaseDate}.";
    }

    /**
     * @return array<string, string>
     */
    private function posterTheme(): array
    {
        $index = max(((int) $this->resource->id) - 1, 0) % count(self::POSTER_THEMES);

        return self::POSTER_THEMES[$index];
    }
}
