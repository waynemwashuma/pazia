<?php

namespace App\Support;

use RuntimeException;

class FrontendSeedData
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public static function films(): array
    {
        $contents = file_get_contents(self::path());

        if ($contents === false) {
            throw new RuntimeException('Unable to read frontend seed data.');
        }

        $decoded = json_decode($contents, true, flags: JSON_THROW_ON_ERROR);

        if (! is_array($decoded) || ! isset($decoded['films']) || ! is_array($decoded['films'])) {
            throw new RuntimeException('Frontend seed data is missing the films array.');
        }

        return $decoded['films'];
    }

    public static function path(): string
    {
        return base_path('../data/seed.json');
    }
}
