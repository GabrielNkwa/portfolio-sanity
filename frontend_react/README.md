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

## Design system (Volt)

- `src/styles/tokens.css`: colors, type scale, spacing, motion and z-index as CSS variables. Loaded globally.
- `src/styles/a11y.css`: skip link, two-tone focus ring, `.visually-hidden`. Loaded globally.
- `src/styles/base.css`: dark page, reset, grain overlay, reduced-motion rules. Loaded globally.
- `src/ui/`: `Button`, `IconLink`, `Chip`, `Tag`, `Label`, `SectionHeader`, `MediaFrame`, `Field`, `Reveal`, `MaskLine`, `Skeleton`, `StatusMessage`. Each has a CSS Module, so styles can't leak between components.

## Page structure

- `src/data/portfolio.js`: one GROQ query for the whole page, plus all content cleanup (text repair, tag mapping, title fixes, project order via `PRIORITY`). `usePortfolio()` returns `{ status, data, retry }`.
- `src/sections/`: `Nav`, `Hero`, `Ticker`, `Stats`, `FeaturedWork`, `WorkIndex`, `Services`, `Experience`, `Stack`, `Contact`, composed in `App.jsx`. Sections keep their headings visible while loading and show skeletons, empty and error states.

To change which projects lead the page, edit `PRIORITY` in `src/data/portfolio.js`.

Run `pnpm dev` and open http://localhost:3000/styleguide.html to see every component and state. The style guide is not part of the production build.

Framer Motion animations respect the OS reduced-motion setting through `<MotionConfig reducedMotion="user">` in `main.jsx`.

## Deploy

Vercel reads `vercel.json` (Vite preset, pnpm, output in `dist/`). Set `SANITY_WRITE_TOKEN` in the Vercel project settings.
