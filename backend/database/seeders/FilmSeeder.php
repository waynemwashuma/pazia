<?php

namespace Database\Seeders;

use App\Models\Film;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FilmSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $films = [
            [
                'title' => 'Moana',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=Moana',
                'trailer_url' => 'https://trailers.pazia.example/moana',
                'premiere_date' => '2026-07-06',
                'release_date' => '2026-07-10',
                'logline' => 'A live-action reimagining of Disney’s ocean adventure, following Moana and Maui on a mythic voyage across the Pacific.',
                'director' => 'Thomas Kail',
                'world_premiere' => '2026-07-06 — El Capitan Theatre, Hollywood',
                'categories' => ['Adventure', 'Family', 'Fantasy', 'Musical'],
                'cast' => ['Catherine Laga\'aia', 'Dwayne Johnson', 'Rena Owen', 'John Tui'],
                'runtime_minutes' => 115,
                'release_venue' => 'Century Cinemax Sarit, Nairobi',
                'featured' => true,
            ],
            [
                'title' => 'Evil Dead Burn',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=Evil+Dead+Burn',
                'trailer_url' => 'https://trailers.pazia.example/evil-dead-burn',
                'premiere_date' => '2026-07-08',
                'release_date' => '2026-07-10',
                'logline' => 'A standalone Evil Dead entry introducing a new group of characters facing a supernatural nightmare.',
                'director' => 'Sébastien Vaniček',
                'world_premiere' => '2026-07-08 — Fantastic Fest Midnight Showcase, Austin',
                'categories' => ['Horror', 'Mystery', 'Fantasy'],
                'cast' => ['Hunter Doohan', 'Luciane Buchanan', 'Souheila Yacoub', 'Erroll Shand'],
                'runtime_minutes' => 110,
                'release_venue' => 'Anga Diamond Plaza, Nairobi',
                'featured' => false,
            ],
            [
                'title' => 'The Invite',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=The+Invite',
                'trailer_url' => 'https://trailers.pazia.example/the-invite',
                'premiere_date' => '2026-07-07',
                'release_date' => '2026-07-10',
                'logline' => 'A sharp relationship comedy-drama built around a high-pressure social event where hidden motives surface.',
                'director' => 'Nicholas Stoller',
                'world_premiere' => '2026-07-07 — Tribeca Special Preview, New York',
                'categories' => ['Comedy', 'Drama', 'Romance'],
                'cast' => ['Seth Rogen', 'Olivia Wilde', 'Penélope Cruz', 'Edward Norton'],
                'runtime_minutes' => 107,
                'release_venue' => 'Century Cinemax Two Rivers, Nairobi',
                'featured' => false,
            ],
            [
                'title' => 'Night Nurse',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=Night+Nurse',
                'trailer_url' => 'https://trailers.pazia.example/night-nurse',
                'premiere_date' => '2026-07-04',
                'release_date' => '2026-07-10',
                'logline' => 'A tense psychological thriller set during a night shift where a caretaker begins doubting what is real.',
                'director' => 'Georgia Bernstein',
                'world_premiere' => '2026-07-04 — Fantasia Industry Screening, Montreal',
                'categories' => ['Thriller', 'Horror'],
                'cast' => ['Mimi Rogers', 'Bruce McKenzie', 'Eleonore Hendricks', 'Cemre Paksoy'],
                'runtime_minutes' => 96,
                'release_venue' => 'Anga CBD, Nairobi',
                'featured' => false,
            ],
            [
                'title' => 'The Odyssey',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=The+Odyssey',
                'trailer_url' => 'https://trailers.pazia.example/the-odyssey',
                'premiere_date' => '2026-07-13',
                'release_date' => '2026-07-17',
                'logline' => 'Christopher Nolan adapts Homer’s epic, following Odysseus after the Trojan War as he struggles to return home.',
                'director' => 'Christopher Nolan',
                'world_premiere' => '2026-07-13 — Odeon Luxe Leicester Square, London',
                'categories' => ['Adventure', 'Drama', 'Fantasy'],
                'cast' => ['Matt Damon', 'Tom Holland', 'Anne Hathaway', 'Zendaya'],
                'runtime_minutes' => 172,
                'release_venue' => 'IMAX Garden City, Nairobi',
                'featured' => false,
            ],
            [
                'title' => 'The Kidnapping of Arabella',
                'poster_image' => 'https://placehold.co/600x900/111827/f8fafc.png?text=The+Kidnapping+of+Arabella',
                'trailer_url' => 'https://trailers.pazia.example/the-kidnapping-of-arabella',
                'premiere_date' => '2026-07-09',
                'release_date' => '2026-07-17',
                'logline' => 'A crime drama about a staged abduction that spins into a darker, stranger situation than anyone planned.',
                'director' => 'Carolina Cavalli',
                'world_premiere' => '2026-07-09 — Rome Cinema Showcase',
                'categories' => ['Comedy', 'Crime', 'Drama', 'Thriller'],
                'cast' => ['Benedetta Porcaroli', 'Lucrezia Guglielmino', 'Chris Pine', 'Marco Bonadei'],
                'runtime_minutes' => 107,
                'release_venue' => 'Anga Diamond Plaza, Nairobi',
                'featured' => false,
            ],
        ];

        foreach ($films as $film) {
            Film::query()->updateOrCreate(
                ['slug' => Str::slug($film['title'])],
                [
                    'title' => $film['title'],
                    'slug' => Str::slug($film['title']),
                    'logline' => $film['logline'],
                    'synopsis' => $film['logline'].' The release campaign moves from '.$film['world_premiere'].' into the public opening at '.$film['release_venue'].'.',
                    'poster_image' => $film['poster_image'],
                    'trailer_url' => $film['trailer_url'],
                    'premiere_date' => $film['premiere_date'],
                    'release_date' => $film['release_date'],
                    'runtime_minutes' => $film['runtime_minutes'],
                    'categories' => $film['categories'],
                    'cast' => $film['cast'],
                    'director' => $film['director'],
                    'world_premiere' => $film['world_premiere'],
                    'release_venue' => $film['release_venue'],
                    'featured' => $film['featured'],
                ],
            );
        }
    }
}
