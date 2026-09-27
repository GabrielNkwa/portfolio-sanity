# Portfolio frontend

React 18 single-page site built with Vite. Content comes from the public Sanity dataset `rm2ky6he/production`. The contact form posts to a Vercel function in `api/contact.js`, which writes to Sanity with a server-side token.

## Setup

Requires Node 22.12+ and pnpm.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The site runs at http://localhost:3000. `pnpm dev` also serves `/api/contact` through a small Vite middleware, so the form works locally when `SANITY_WRITE_TOKEN` is set in `.env`. Submitting it writes a real `contact` document to the production dataset.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `VITE_SANITY_PROJECT_ID` | build | Optional. Defaults to `rm2ky6he`. |
| `SANITY_WRITE_TOKEN` | Vercel and local `.env` | Editor token used only by `api/contact.js`. |

Anything prefixed `VITE_` is bundled into the browser JavaScript. Never give a secret that prefix.

## Scripts

- `pnpm dev`: dev server with hot reload
- `pnpm build`: production build to `dist/`
- `pnpm preview`: serve the production build locally

## Deploy

Vercel reads `vercel.json` (Vite preset, pnpm, output in `dist/`). Set `SANITY_WRITE_TOKEN` in the Vercel project settings.
