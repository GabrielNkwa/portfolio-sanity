# Portfolio redesign: audit and phased plan

Three prototypes live in this folder. Open `index.html` through a local server (`python -m http.server 3000 --directory redesign`) to compare them. Each one reads the public Sanity dataset directly, with `shared/snapshot.js` as a fallback, so the content is your real content.

| File | Direction | Personality |
| --- | --- | --- |
| `a-keynote.html` | Apple product page | Calm, centered, Geist, blue accent, scroll-scaled showcase |
| `b-volt.html` | Nike campaign | Loud, Anton display type, volt accent, pinned horizontal rail, cursor previews |
| `c-console.html` | 2026 B2B SaaS (Linear, Vercel) | Sales-led, grid and bento, deploy-log hero, engagement options, Ctrl+K menu |

## Fix this first: the Sanity write token is public

`frontend_react/.env` is tracked in git and pushed to `github.com/GabrielNkwa/portfolio-sanity`. It holds `REACT_APP_SANITY_TOKEN`, and because of the `REACT_APP_` prefix, Create React App also bakes that token into the JavaScript bundle every visitor downloads. The contact form uses it to call `client.create()` from the browser. Anyone who reads the repo or the bundle can write to or delete from your dataset.

1. Revoke the token now in sanity.io/manage, under the project's API settings.
2. Add `.env` to `frontend_react/.gitignore` and run `git rm --cached frontend_react/.env`. The old value stays in history, which is why step 1 comes first.
3. Remove `token` from `src/client.js`. The dataset is public, so reads need no token.
4. Move contact submissions to a serverless function (Vercel or Netlify) that holds a new write token server-side, or send them to an email service such as Resend.

## Audit of the current site

### Broken behavior

- The work filter never matches. The buttons are `Web App`, `React Js`, `Next JS`, but Sanity tags are `React.Js`, `Next Js`, `Mobile App` and so on. Your two mobile apps can only be seen under "All".
- Work tags show only `tags[0]`, which is often the literal string "All".
- `Work.jsx` returns early for loading, error and empty states, so the section heading and filters vanish while data loads.
- Skills tooltips use react-tooltip v4 attributes (`data-tip`, `data-for`) with v5 installed, so descriptions never appear. The fragments in that loop also lack keys.
- The contact form has no validation, never clears `loading` on failure, and logs errors to the console only.
- Navigation dots link to `#testimonial`, which no longer exists.
- The social icons in `SocialMedia.jsx` are not links.
- The About heading is empty (`<h2 className="head-text"></h2>`).
- `valdinenergy.com` has no protocol in Sanity, so its link resolves relative to your own domain.

### Content

- Text saved with the wrong encoding shows as `Letâ€™s` and `â€¢` in About and Experience.
- Typos and inconsistencies in the CMS: "JavaScriptp", "MongoDb", "Pharmaidafrica", company names in all caps with full street addresses.
- Fantasy Pro League appears twice, and four projects have no description. Every project needs one line on the problem and one on the result.
- The copyright reads 2023, and the page description is still "Web site created using create-react-app".
- The hero says "Web Developer / Freelancer / ICT Specialist" with a waving-hand emoji. A B2B buyer needs to learn in five seconds what you build, for whom, and how to hire you.

### Design

- The palette is light gray with a saturated indigo (`#313bac`), the default look of the tutorial this site started from.
- DM Sans at 400 and 700 only gives two levels of hierarchy.
- Every section repeats the same centered layout, heading, grid and copyright line (the copyright renders five times).
- Motion is `whileInView` fades that replay on every scroll and animate `x` from -100px, which causes layout jank on mobile.
- Images load at full resolution (a 2568px screenshot for a 470px card), and there are no skeletons.
- There is no focus styling, no skip link, and several images have no useful alt text.

### Stack

- Create React App is deprecated and `react-scripts` 5 no longer receives updates.
- `sanity@^2` is listed as a frontend dependency but the frontend never uses it.
- Both `.scss` and compiled `.css` files are committed side by side, and `sass` is still in devDependencies after the "removing sass" commit.
- The repo contains `yarn.lock` and new untracked `pnpm-lock.yaml` files. Pick one package manager.

## Phased plan

Each phase ships on its own and leaves the site better than before.

### Phase 0: security and correctness (half a day)

Revoke and rotate the token, untrack `.env`, remove the token from the client, and move the contact form server-side. Fix the filter mismatch, the tag display, the encoding problem, the missing protocol, the dead `#testimonial` link and the copyright year. Clean the CMS entries by hand.

### Phase 1: foundation (2 to 3 days)

Move from CRA to Vite (or Next.js if you want server-rendered pages for SEO). Keep React, Framer Motion and `@sanity/client`, delete `sanity@2`, pick one lockfile. Replace the `AppWrap` and `MotionWrap` HOCs with a `Section` component. Move all `urlFor()` calls to sized, auto-format URLs (`?w=1200&auto=format`), which is the single biggest page-weight win. Add meta tags, Open Graph image and favicon.

### Phase 2: design system (2 days)

Port the chosen prototype's `:root` tokens (color, type scale, radius, easing) into one `tokens.css`. Load its fonts. Build the primitives every section uses: `Button`, `Tag`, `SectionHeader`, `Card`, `Field`. Add focus rings, a skip link and a `prefers-reduced-motion` path from day one.

### Phase 3: sections (3 to 4 days)

Rebuild hero, work, capabilities, experience and contact in the chosen style. Normalize data in one place, the way `shared/data.js` does: fix text encoding, map tags to Web and Mobile, sort by a priority list. Add skeleton, empty and error states that keep the section heading visible.

### Phase 4: motion (2 days)

Rebuild the prototype's signature interactions with Framer Motion's `useScroll` and `useTransform`: the scaling showcase and word fill in A, the pinned rail and cursor preview in B, spotlight borders and the typed log in C. Use `transform` and `opacity` only, run reveals once, and budget one large motion moment per viewport.

### Phase 5: B2B conversion (ongoing)

This phase is what moves the site from portfolio to sales page. Add a short case study per project with the problem, what you built and a number (users, load time, launch date). Add a Cal.com booking link beside the form. Add the engagement options from version C, whichever direction you pick. Add Plausible or Vercel Analytics and track form submits and booking clicks. Ask two clients for a one-line quote with their name and title.

### Phase 6: quality gate (1 day)

Aim for Lighthouse 95+ on mobile. Test keyboard-only navigation, test at 375px and 1440px, and check color contrast on muted text. Add a Sanity webhook that triggers a redeploy when content changes.

## Notes on the prototypes

- They are single HTML files with vanilla JS so they run without a build step. They are references for the React port, not production code.
- The contact forms validate inline, then open the visitor's mail app. That stands in for the Phase 0 serverless endpoint.
- Copy such as "Taking 2 new clients for Q4 2026", the engagement terms in C and the deploy-log numbers are placeholders. Replace them with facts before launch.
- The Sanity read API allowed `http://localhost:3000` during testing. Add your production domain under CORS origins in sanity.io/manage, or the pages will fall back to the snapshot.
