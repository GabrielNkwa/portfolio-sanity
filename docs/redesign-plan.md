# Portfolio redesign: audit and phases

This plan replaced the Volt design in `frontend_react/` (last Volt commit: `f72cd60`) with the Apollo space-theme design. Audience and offer come from `PRODUCT.md`: startup founders and CTOs, fixed-scope project delivery.

## What the current site does well

- Data layer is clean: one Sanity query, normalized at the edge, with fixes for bad CMS text.
- Accessibility basics are in place: skip link, focus ring, reduced-motion handling, aria on decorative layers.
- Performance work is visible: self-hosted fonts, grayscale done server-side by the image API, `startTransition` for the render.
- Contact form has validation, a honeypot and a server-side token.

All of this carries over unchanged.

## Findings

1. **The hero names no offer.** "Ship it." is a verb without an object. A founder learns what Gabriel sells only from the small paragraph under it, and "Project Engineer . Abuja" is the only label.
2. **The look signals agency, not delivery partner.** Anton in capitals, acid green and a film-grain overlay read as streetwear or a creative studio. A CTO comparing engineers looks for calm, precise and senior.
3. **The work is hidden behind effects.** The hero mosaic shows project screenshots at 32% opacity under a headline, and the featured section is a pinned horizontal rail that takes over vertical scroll. Then `WorkIndex` lists the same projects again.
4. **Proof is thin.** Each project has a title, a line of description and tags. There is no problem, role or result. No testimonials, client logos or numbers exist in the CMS, and none should be invented.
5. **The stats band does not help a buyer.** "Tools in the kit" and "Years building" are a hero-metric template. Two of the four numbers say nothing about delivery.
6. **No process section.** B2B buyers ask how an engagement runs: scope, cadence, handoff, support after launch. The site never says.
7. **One entrance animation everywhere.** Every section reveals with the same 1s, 60px rise, so motion carries no meaning. The custom cursor adds a pointer-move listener and a spring for decoration only.
8. **Conversion gaps.** The form asks name, email and message only. There is no booking link, no stated response time next to the button (it appears only in the message), and no structured data for search (`index.html` has no JSON-LD).
9. **CMS clean-up lives in the client.** `TITLE_FIX`, `SKILL_FIX` and the encoding repair in `normalize.js` patch bad content on every page load. They belong in Sanity.

## Phases

**Phase 0, foundation (done).** `PRODUCT.md` written. The new app was built beside the old one with the same data layer, contact endpoint and Vercel config, then replaced the Volt design in `frontend_react/` so the existing Vercel project builds it.

**Phase 1, positioning and structure.** New order: hero, work, services, process, record, kit, contact. The hero states the offer and the single action ("Book an intro call"). Stats move into one sentence under the work heading. The pinned rail and the duplicate index become one sequence of full-size project panels followed by a compact archive. A process section is added.

**Phase 2, space design system.** Pure black ground, one amber accent taken from sunlight on a planet's limb, Geist at semibold with tight tracking, 16px panels with hairline borders, no grain, no custom cursor. A fixed canvas starfield sits behind the whole page.

**Phase 3, scroll motion.** One signature: the starfield streaks with scroll speed, the planet horizon drops away as you leave the hero and rises again at the contact section. Supporting moves, each used once: word-by-word hero entrance, project panels that stack and recede, a timeline and process trajectory that draw as you scroll, orbit rings on the services panels. Everything falls back to static under `prefers-reduced-motion`.

**Phase 4, conversion and search.** Sticky nav with a "Book an intro call" button, response time beside the form button, JSON-LD for the person and service. Not in this pass: a calendar link (needs a Cal.com or similar URL from Gabriel) and extra form fields (needs a change to the Sanity `contact` schema).

**Phase 5, proof (needs content from Gabriel).** For each of the top three projects: the problem, Gabriel's role, what shipped, and one real result. A client quote with permission. Then a page per case study. Until this content exists the site stays honest and the slots stay empty.

**Phase 6, ship.** Run Lighthouse on mobile, budget the canvas to under 4 ms a frame, add privacy-friendly analytics with a "contact form submitted" event, review the pull request's Vercel preview with Gabriel, then merge to ship it on the existing project.

## Copy that needs Gabriel's confirmation

The process steps, the fixed-scope wording and the after-launch policy in `frontend_react/src/sections/Process.jsx` are drafted from the offer in `PRODUCT.md`. They describe how Gabriel works, so he should confirm or rewrite them before launch.
