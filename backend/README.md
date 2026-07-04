# Backend API

This repository already contains the Laravel API in `/backend`.

## Local setup

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The default local API base URL is `http://127.0.0.1:8000/api`.

## Frontend connection

Point the Next.js app at the Laravel API with:

```bash
cd frontend
printf 'NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api\nNEXT_PUBLIC_ENABLE_MOCK_API=false\n' > .env.local
```

`NEXT_PUBLIC_ENABLE_MOCK_API=false` disables the mock service worker so the existing data-access layer uses Laravel instead.

## CORS

Laravel allows local frontend origins through `CORS_ALLOWED_ORIGINS` in [`.env.example`](/home/reign/Code/chill_flix/backend/.env.example).

Default value:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## Migrations and seed data

The backend creates:

- `films`
- `newsletter_submissions`

Running `php artisan migrate --seed` loads a launch slate from [data/seed.json](/home/reign/Code/chill_flix/data/seed.json:1), so the backend seeder and frontend mocks share the same source data.

## API endpoints

- `GET /api/films`
- `GET /api/films/{slug}`
- `POST /api/newsletter`
- `POST /api/contact`

Example responses:

```bash
curl http://127.0.0.1:8000/api/films
curl http://127.0.0.1:8000/api/films/moana
curl -X POST http://127.0.0.1:8000/api/newsletter \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jordan Lee","email":"jordan@studio.example","interest":"Premiere strategy","notes":"Need teaser timing support."}'
```

Successful submission response:

```json
{
  "success": true,
  "id": 1,
  "message": "You are on the bulletin for teaser drops, premiere dates, and opening-night notes."
}
```

Validation failures use Laravel's standard JSON `422` response format.
