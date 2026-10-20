# frontend_space

Space-theme redesign of the portfolio. Same Sanity data and `/api/contact` endpoint as `frontend_react`, different design system (see `../PRODUCT.md`, `DESIGN.md` and `../docs/redesign-plan.md`).

```
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

Run the dev server on port 3000. The Sanity project only allows CORS requests from `http://localhost:3000` and the production domain, so any other origin (another port, a new Vercel preview URL) gets no project data until you add it under the project's API settings at sanity.io/manage.

The contact form needs `SANITY_WRITE_TOKEN`, set as in `.env.example`.
