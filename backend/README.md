# Backend Deployment Guide

I treat this backend as a small Laravel 13 JSON API for the Kenya-based Pazia frontend. It serves the film slate, stores newsletter/contact submissions, and uses the shared seed file at [`../data/seed.json`](../data/seed.json).

## What this service does

- `GET /api/films`
- `GET /api/films/{slug}`
- `POST /api/newsletter`
- `POST /api/contact`

The app persists film data in `films` and lead-capture data in `newsletter_submissions`. The API response is already shaped for the Next.js frontend, including computed fields like `premiereDate`, `launchFocus`, `teaserStatus`, and poster theme data.

## Production requirements

- PHP `8.3+`
- Composer `2+`
- A writable database:
  - SQLite is the default
  - MySQL, MariaDB, PostgreSQL, and SQL Server are also supported through Laravel config
- Write access for `storage/` and `bootstrap/cache/`
- A web server pointed at `backend/public`
- Optional: Node.js and npm only if I want to build the Laravel welcome-page assets with Vite

## How I deploy it

### 1. Install PHP dependencies

```bash
cd backend
composer install --no-dev --optimize-autoloader
```

### 2. Create the environment file

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Set the production environment values

At minimum I set these in `.env`:

```env
APP_NAME="Pazia API"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.pazia.co.ke

CORS_ALLOWED_ORIGINS=https://pazia.co.ke,https://www.pazia.co.ke

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/backend/database/database.sqlite

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

Notes:

- `CORS_ALLOWED_ORIGINS` is a comma-separated list. Add every frontend origin that should call the API.
- The frontend requests `/api/...`, so I expose this backend at the root of its own origin, not behind an extra path prefix.
- The default session, cache, and queue drivers use the database. That is fine for this app and the required tables are covered by migrations.
- `MAIL_MAILER=log` is still the default, which is fine because the current app stores submissions in the database instead of sending email.

### 4. Prepare the database

For SQLite, I make sure the file exists and is writable by the PHP process:

```bash
touch database/database.sqlite
```

For MySQL/PostgreSQL, I switch the `DB_*` variables in `.env` and create the database on the server before migrating.

### 5. Run migrations

```bash
php artisan migrate --force
```

This creates the Laravel support tables plus the app tables:

- `films`
- `newsletter_submissions`
- `cache`
- `cache_locks`
- `jobs`
- `job_batches`
- `failed_jobs`
- `sessions`
- `users`
- `password_reset_tokens`

### 6. Seed film data if I want the launch slate populated

```bash
php artisan db:seed --force
```

That loads the demo slate from [`../data/seed.json`](../data/seed.json), which keeps the backend and frontend mock data aligned. If I am deploying a clean production database with real content later, I can skip the seed step.

### 7. Cache Laravel for production

```bash
php artisan optimize
```

If I change `.env` values later, I clear and rebuild the cache:

```bash
php artisan optimize:clear
php artisan optimize
```

## Web server notes

- The document root must be `backend/public`.
- `storage/` and `bootstrap/cache/` must stay writable after deploy.
- The current feature set does not require a scheduler.
- The current feature set also does not dispatch background jobs, so I do not need a queue worker unless I add queued work later.

## Optional frontend connection check

To point the Next.js app at this backend locally:

```bash
cd ../frontend
cat <<'EOF' > .env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENABLE_MOCK_API=false
EOF
```

Then allow the frontend origin in `backend/.env`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## Smoke tests after deploy

```bash
curl https://api.pazia.co.ke/api/films
curl https://api.pazia.co.ke/api/films/moana
curl -X POST https://api.pazia.co.ke/api/newsletter \
  -H 'Content-Type: application/json' \
  -d '{"name":"Achieng Otieno","email":"achieng@ukwelipictures.co.ke","interest":"Premiere strategy","notes":"Need teaser timing support for the Nairobi rollout."}'
```

Expected newsletter response:

```json
{
  "success": true,
  "id": 1,
  "message": "You are on the bulletin for teaser drops, premiere dates, and opening-night notes."
}
```

Validation errors return Laravel's normal JSON `422` payload.

## Local development

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Helpful commands:

```bash
composer run dev
php artisan test
```

`composer run dev` expects the Node dependencies to be installed as well, either from the repo root with `npm install` or inside `backend/`.
