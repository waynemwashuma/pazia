# Frontend

This frontend is a Next.js 16 app for the Pazia experience. It has five public routes:

- `/`
- `/films`
- `/films/[slug]`
- `/about`
- `/contact`

It can run in two modes:

- Mock mode, powered entirely by local mock data
- Live API mode, powered by the Laravel backend in [`../backend`](../backend)

## Requirements

- Node.js `20+`
- npm

## Install and run locally

From the repository root:

```bash
npm install
cd frontend
npm run dev
```

The app starts on `http://localhost:3000`.

## Environment variables

Create `frontend/.env.local` when I need to change the default data mode or deployment path.

### Live backend mode

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_ENABLE_MOCK_API=false
```

Use this when the Laravel backend is running. Important details:

- `NEXT_PUBLIC_API_URL` should be the backend origin, not a nested path. The frontend itself calls `/api/...`.
- The backend must allow the frontend origin through `CORS_ALLOWED_ORIGINS`.
- Film detail pages generate static params from the API during `next build`, so the backend must be reachable while building.

### Mock mode

```env
NEXT_PUBLIC_ENABLE_MOCK_API=true
```

Mock mode is also the fallback when `NEXT_PUBLIC_API_URL` is missing and `NEXT_PUBLIC_ENABLE_MOCK_API` is not explicitly set to `false`.

### Optional path-based hosting

```env
NEXT_PUBLIC_BASE_PATH=/chill-flix
```

Set this only when the frontend is hosted under a subdirectory instead of the domain root.

### Optional static export

```env
STATIC_EXPORT=true
```

When `STATIC_EXPORT=true`, Next.js writes a static export instead of a server build.

## Deployment options

### Option 1: Next.js server deployment

Use this when I want the standard Next.js production server:

```bash
cd frontend
npm run build
npm run start
```

Notes:

- Works in mock or live API mode.
- In live mode, the backend must be reachable during `npm run build` and by browsers at runtime.

### Option 2: Static export

Use this when I want a fully static build:

```bash
cd frontend
STATIC_EXPORT=true npm run build
```

Output is written to `frontend/out/`.

Recommended patterns:

- Mock-only static brochure build:

```bash
cd frontend
NEXT_PUBLIC_ENABLE_MOCK_API=true STATIC_EXPORT=true npm run build
```

- Static frontend that still talks to a live backend:

```bash
cd frontend
NEXT_PUBLIC_API_URL=https://api.example.com \
NEXT_PUBLIC_ENABLE_MOCK_API=false \
STATIC_EXPORT=true \
npm run build
```

That still requires the backend at build time because film detail routes are generated from live API data.

## Project behavior worth knowing

- The contact form submits through the shared newsletter API contract.
- If the service worker mock cannot boot in the browser, the app falls back to in-memory local mocks.
- The frontend and backend share the same demo film slate through [`../data/seed.json`](../data/seed.json).
- `NEXT_PUBLIC_ENABLE_MOCK_API=true` always wins over `NEXT_PUBLIC_API_URL`.

## Quality checks

```bash
cd frontend
npm run lint
npm run build
```

## Related docs

- Backend deployment guide: [`../backend/README.md`](../backend/README.md)
- Monorepo overview and top-level setup: [`../README.md`](../README.md)
