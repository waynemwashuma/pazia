# Pazia

Pazia is a Kenyan film-launch monorepo with a Next.js frontend in [`frontend/`](frontend/) and a Laravel API in [`backend/`](backend/). Both sides share the same fictional film-launch dataset through [`data/seed.json`](data/seed.json).

## Repository structure

- [`frontend/`](frontend/) - Next.js 16 app for the public site
- [`backend/`](backend/) - Laravel 13 API for films and lead capture
- [`data/seed.json`](data/seed.json) - shared film seed used by backend seeding and frontend mocks

## Documentation map

- Frontend setup and deployment: [`frontend/README.md`](frontend/README.md)
- Backend deployment guide: [`backend/README.md`](backend/README.md)

## Quick setup

### 1. Install dependencies

Node dependencies are managed from the repo root:

```bash
npm install
```

PHP dependencies are installed inside the backend:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
cd ..
```

### 2. Choose how the frontend gets data

For live backend mode:

```bash
cat <<'EOF' > frontend/.env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENABLE_MOCK_API=false
EOF
```

For mock mode, I can leave `frontend/.env.local` unset or explicitly force it:

```bash
cat <<'EOF' > frontend/.env.local
NEXT_PUBLIC_ENABLE_MOCK_API=true
EOF
```

### 3. Start the project

From the root:

```bash
npm start
```

That runs:

- `php artisan serve` in `backend/`
- `next dev` in `frontend/`

The default local URLs are:

- Frontend: `http://localhost:3000`
- Backend API: `http://127.0.0.1:8000/api`

## Important implementation notes

- The frontend automatically falls back to mock data when `NEXT_PUBLIC_API_URL` is not set.
- The live frontend expects the backend API to exist at `/api/*` on the configured backend origin.
- Film detail pages call the API during `next build` when live mode is enabled, so the backend must be reachable at build time for production frontend builds.
- The backend seed step loads the same data file the frontend uses for mocks, which keeps the demo content aligned across both apps.
- Root `npm run build` builds the frontend only. The backend does not require a build step unless I choose to compile the Laravel welcome-page assets with Vite.

## Common commands

```bash
npm start
npm run build
npm run lint
cd backend && php artisan test
cd frontend && npm run build
```

## Deployment

Use the detailed app-specific guides:

- [`backend/README.md`](backend/README.md) for Laravel deployment, environment variables, database setup, and API smoke tests
- [`frontend/README.md`](frontend/README.md) for Next.js local setup, mock/live API modes, and static or server deployment
