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
| `VITE_BOOKING_URL` | build | Optional. Booking link for the "Book a 20-min call" buttons; the buttons are hidden when it's empty. |

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

## Motion

- Featured work is a pinned rail: the section is as tall as the track is wide, and vertical scroll moves the track sideways (`useScroll` + `useTransform`). Tabbing to a slide's link scrolls the page to that slide.
- The project index shows a screenshot that trails the cursor, and its rows stagger in again when the filter changes.
- Stats count up once when they come into view; screen readers get the final number.
- `Cursor.jsx` draws a volt dot that grows over links. The system cursor stays visible.
- Cursor effects only run on mouse and trackpad (`pointer: fine`). With reduced motion turned on in the OS, the rail becomes a swipe row, counters show final values, the cursor preview is off, and reveals only fade.

Run `pnpm dev` and open http://localhost:3000/styleguide.html to see every component and state. The style guide is not part of the production build.

Framer Motion animations respect the OS reduced-motion setting through `<MotionConfig reducedMotion="user">` in `main.jsx`.

## Content for business clients

- **Case studies**: in Sanity, open a project and use the **Case study** tab (client, year, role, problem, what I built, result number and label, "Feature in case studies"). A case study appears once problem, what I built and result number are filled in. Featured ones (up to three) show in the Results section; any project with a case study shows it in the project dialog.
- **Testimonials**: Sanity → Testimonials (name, role, company, feedback). The first two are shown.
- **Placeholders**: `src/data/placeholders.js` fills missing case studies, a second testimonial and the booking link *in dev only*, each marked with a striped PLACEHOLDER badge. Production builds contain none of it; sections without real content are hidden instead.

## Analytics

`src/analytics.js` loads Vercel Web Analytics. Enable it in the Vercel project (Analytics tab) to get page views. Custom events (`contact_submit`, `booking_click`, `project_open`, `project_visit`) are recorded on Vercel's Pro plan; on Hobby they're ignored. To use another provider, change the two functions in that file.

## Deploy

Vercel reads `vercel.json` (Vite preset, pnpm, output in `dist/`). Set `SANITY_WRITE_TOKEN` in the Vercel project settings.

Content changes don't need a redeploy. The page queries Sanity's CDN API in the browser on every visit, so a published edit shows up once the CDN cache refreshes (usually seconds). Only `index.html` metadata and `og.png` are baked in at build time.

## Performance budget

Measured with Lighthouse 12 (mobile preset) against `pnpm build && pnpm preview`. Targets: performance 95+, everything else 100.

- Fonts are self-hosted through `@fontsource`. Don't reintroduce the Google Fonts `<link>`; it blocked rendering for about 1.2 s on mobile.
- The Sanity query uses plain `fetch` (`src/client.js`). `@sanity/client` added about 50 KB of JavaScript for that one GET request.
- Framer Motion loads through `<LazyMotion features={domAnimation} strict>`. Use `m.div`, not `motion.div`; `strict` throws if a full `motion.*` component is added.
- Sanity images go through `imageUrl()` / `imageSrcSet()` with a `sizes` that matches the layout. Pass `{ gray: true }` for grayscale instead of a CSS filter.
- `usePortfolio()` commits the data inside `startTransition`. Rendering every section at once is the page's longest task, so keep it interruptible.
- The film-grain overlay only renders above 700px wide.
