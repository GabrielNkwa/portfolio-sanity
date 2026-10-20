# frontend_react

The portfolio site: React 18, Vite, CSS Modules and framer-motion, with content from Sanity (`../backend_sanity`) and a Vercel function at `api/contact.js` for the contact form. The Apollo design (black ground, one amber accent, space theme) is described in `../DESIGN.md`; product context is in `../PRODUCT.md`; the audit and phases behind the redesign are in `../docs/redesign-plan.md`.

```
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

Run the dev server on port 3000. The Sanity project only allows CORS requests from `http://localhost:3000` and the production domain, so any other origin (another port, a Vercel preview URL) gets no project data until you add it under the project's API settings at sanity.io/manage.

The contact form needs `SANITY_WRITE_TOKEN`, set as in `.env.example`.
