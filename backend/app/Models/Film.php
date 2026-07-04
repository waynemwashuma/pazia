<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    /**
     * @var list<string>
     */
    protected $fillable = [
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
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'categories' => 'array',
            'cast' => 'array',
            'premiere_date' => 'date',
            'release_date' => 'date',
            'featured' => 'boolean',
        ];
    }
}
