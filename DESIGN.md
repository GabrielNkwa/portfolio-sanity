---
name: Apollo
description: A black page with one amber accent, a fixed starfield that answers scroll speed, and a CSS planet horizon lit along its edge.
colors:
  void-black: "#000000"
  panel-ink: "#0c0c0e"
  field-ink: "#151518"
  starlight: "#f5f5f7"
  dust-gray: "#a1a1a6"
  limb-amber: "#f2a65a"
  limb-amber-hi: "#ffd9b0"
  amber-ink: "#1a0f05"
  signal-coral: "#ff8f85"
  hairline: "rgba(255, 255, 255, 0.1)"
  hairline-strong: "rgba(255, 255, 255, 0.24)"
typography:
  display:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7.2vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  lede:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.5vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Variable, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
rounded:
  control: "10px"
  frame: "12px"
  panel: "16px"
  phone: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  huge: "72px"
  gutter: "clamp(20px, 5vw, 56px)"
  section: "clamp(96px, 13vw, 168px)"
components:
  button-primary:
    backgroundColor: "{colors.limb-amber}"
    textColor: "{colors.amber-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.limb-amber-hi}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.starlight}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "34px"
    padding: "0 16px"
  button-link:
    textColor: "{colors.starlight}"
    typography: "{typography.body}"
  button-link-hover:
    textColor: "{colors.limb-amber}"
  panel:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.starlight}"
    rounded: "{rounded.panel}"
    padding: "32px"
  field:
    backgroundColor: "{colors.field-ink}"
    textColor: "{colors.starlight}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "14px 16px"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.dust-gray}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "34px"
    padding: "0 16px"
  filter-chip-selected:
    backgroundColor: "{colors.starlight}"
    textColor: "{colors.void-black}"
---

# Design System: Apollo

## Overview

**Creative North Star: "One Flight"**

Apollo is a pure black page read in one pass, like a flight. A single canvas of stars sits fixed behind every section and responds to how fast the visitor scrolls. The ground never changes: black everywhere, near-white text, one amber accent that reads as sunlight catching the limb of a planet. The hero and the contact section each carry that planet as a CSS horizon, so the page opens and ends at the same edge of light.

The density is low and the type is plain. Geist semibold with tight tracking, sentence case, left-aligned, no ornament around the headings. Work is shown at full size inside quiet 16px panels with a single hairline border. The scene (stars, horizon glow, orbit rings) carries the atmosphere, and the panels carry the content.

The site's brand commitment from PRODUCT.md is a space-travel theme on a black Apple-style system, in the plain voice of a project engineer. Apollo is that, with the amber used sparingly enough to stay meaningful.

**Key Characteristics:**
- Black ground (#000000) behind everything; panels are only a step lighter (#0c0c0e).
- One accent, amber, used for the primary action, focus, the horizon limb and the timelines.
- Fixed canvas starfield plus a CSS planet horizon are the two signature components.
- Geist Variable throughout, weight 600 for headings, 400 and 500 for the rest.
- Flat panels: 16px radius, one hairline border, no shadow.
- One signature motion (scroll-velocity starfield warp); everything else is supporting.

## Colors

A black, near-neutral palette with a single warm accent. The neutrals lean faintly cool (hue near 286 in OKLCH, chroma under 0.01) and the amber is the only saturated color besides the error coral.

### Primary
- **Limb Amber** (`limb-amber`): The sunlight accent. Fills the primary button, the focus ring, the text selection, the caret in fields, the current-year numerals in Record, the reached timeline nodes and fill, link hover color, and the glow of the planet horizon. It is the only thing on the page that asks to be pressed.
- **Limb Amber High** (`limb-amber-hi`): The hover state of the primary button and the warm tint on a quarter of the stars.
- **Amber Ink** (`amber-ink`): Text on amber fills and on selected text. A very dark brown, never pure black.

### Neutral
- **Void Black** (`void-black`): Page ground, `html` and `body` background, the starfield's backdrop, the nav's frosted fill (at 62% alpha) and the interior of screenshot frames.
- **Panel Ink** (`panel-ink`): Panel and status-box background. The Contact card uses the same ink at 86% alpha so stars show faintly through it.
- **Field Ink** (`field-ink`): Form control background, one step above the panel. Focus lifts it slightly to #19191d.
- **Starlight** (`starlight`): Body text, headings, the active filter chip fill and the skip-link fill.
- **Dust Gray** (`dust-gray`): Secondary text, ledes, metadata, labels and idle nav links. About 8:1 on black.
- **Hairline** (`hairline`) and **Hairline Strong** (`hairline-strong`): The only border colors. Hairline (10% white) edges panels, rows and the nav once scrolled. Hairline Strong (24% white) edges quiet buttons, hovered fields, link underlines and the portrait phone frame.
- **Signal Coral** (`signal-coral`): Form errors only, on text and the invalid field border.

### Named Rules
**The One Sun Rule.** Amber is the only accent. If a second hue is wanted, the answer is a different weight, a hairline, or Starlight, not a new color. The error coral is a status color and does not count as an accent.

**The Black Ground Rule.** Every section sits on the same black. Separation comes from spacing and one hairline, never from alternating background bands or tinted sections.

## Typography

**Display Font:** Geist Variable (self-hosted through `@fontsource-variable/geist`, fallback `-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif`)
**Body Font:** the same family
**Label/Mono Font:** none; numerals use `font-variant-numeric: tabular-nums` set on `body`

**Character:** One family at a few weights. Headings are semibold with negative tracking so they sit tight and confident; body and labels return to regular and medium so the contrast is in size and tracking, not in a second typeface.

### Hierarchy
- **Display** (600, `clamp(2.75rem, 7.2vw, 5.75rem)`, 1.02, -0.035em): The hero headline only. Left-aligned, balanced wrapping, split by word for the blur-in.
- **Headline** (600, `clamp(2rem, 4.4vw, 3.5rem)`, 1.05, -0.035em): Section titles (Work, Services, Process, Record, Contact).
- **Title** (600, `clamp(1.5rem, 2.6vw, 2.125rem)`, 1.1, -0.025em): Panel and step names, the Archive heading, the form-sent confirmation. Record role names step down to `clamp(1.125rem, 2vw, 1.5rem)`; Archive row names and the Kit marquee use the same size at weight 500.
- **Lede** (400, `clamp(1.0625rem, 1.5vw, 1.3125rem)`, 1.5, Dust Gray): The sentence under a section title and the hero positioning line, capped near 54ch in the hero and 34 to 46ch elsewhere.
- **Body** (400, 1rem, 1.55): Panel descriptions (capped at 40 to 62ch), form text and buttons.
- **Label** (500 for buttons, labels and the stack line, 400 elsewhere, 0.875rem): Field labels, metadata, filter chips, footer, the proof line.

### Named Rules
**The Sentence Case Rule.** Everything is sentence case. There is no uppercase styling, no letter-spaced small caps, and no label sitting above a heading to introduce it.

**The Tight Heading Rule.** Headings carry negative tracking (-0.035em for display and headlines, -0.025em for titles). Body copy keeps default tracking.

## Layout

A single centered column capped at 1200px content width plus a fluid gutter (`clamp(20px, 5vw, 56px)`), with sections separated by `clamp(96px, 13vw, 168px)` of vertical padding. Content is left-aligned. Spacing steps are 4, 8, 12, 16, 24, 32, 48 and 72px; panel interiors use 32 or 48px and 24px on small screens.

The page order is hero, Work, Archive, Services, Process, Record, Kit marquee, Contact. Work uses a 4fr / 8fr grid inside each panel (copy left, screenshot right); Services is 7fr / 5fr; Process and Contact are 5fr / 6fr with a sticky heading in Process. Below 900px every two-column layout collapses to one column and the stacking behavior in Work turns off. The fixed nav is 56px tall; scroll anchors are padded by nav height plus 16px.

The hero fills the viewport height (100dvh) with the planet horizon in its bottom third (up to 520px, 260px under 720px wide). The page content sits in a stacking layer above the fixed canvas.

## Elevation & Depth

Flat. Panels carry no shadow at rest and none on hover. Depth comes from three things: the starfield behind the page (stars move at different rates by depth), a one-step tonal lift from black to Panel Ink to Field Ink, and the hairline border. Stacked project panels overlap by sliding over each other, and the one underneath recedes by scaling to 0.94 and darkening under a black overlay, not by casting a shadow.

Glow exists only where light is the subject. The planet horizon uses box-shadow in amber to make its lit edge, and a reached timeline node in Process gets a small amber glow (`0 0 18px` at 55% alpha). Neither is applied to a panel, card or button.

The nav gains a frosted backdrop (`blur(20px) saturate(180%)` over 62% black) and a hairline bottom edge once the page has scrolled 12px.

### Named Rules
**The Flat Panel Rule.** Panels are #0c0c0e, 16px radius, one 1px hairline border, no box-shadow. If a panel needs emphasis, change its size or position, not its shadow.

**The Light Is Amber Rule.** The only glows on the page are amber and only on things that are literally lit: the planet limb and the reached timeline node.

## Shapes

Round but quiet. Panels are 16px (`rounded.panel`). Form controls are 10px. Buttons, filter chips and the retry button are fully pill-shaped (999px). Screenshot frames inside panels are 12px, and a portrait phone screenshot is 28px with a stronger border. Timeline nodes and orbit dots are true circles. Focus rings are a 2px amber outline offset 3px with a 4px corner.

Everything is bounded by a 1px hairline or no line at all; there are no thick borders, double borders or outlines used as decoration. The planet is the one large curve on the page: a circle about 190vw wide whose top edge reads as a shallow arc.

## Components

### Buttons
- **Shape:** Pill (999px). Medium is 48px tall with 24px side padding; small is 34px (44px on coarse pointers) with 16px.
- **Primary:** Limb Amber fill, Amber Ink text, weight 500, -0.01em tracking, optional right arrow. Hover shifts to Limb Amber High. Pressing scales to 0.97. Used once per view for "Book an intro call" and the form submit.
- **Quiet:** Transparent with a Hairline Strong border; the border goes to Starlight on hover. Used for "Visit site" and "Visit app" on project panels and for retry.
- **Link:** Text only, with an arrow that moves 3px right on hover and the text turning amber. Used for "See shipped work".
- **Disabled:** 55% opacity and a progress cursor while the form is sending.

### Panels
The content container for projects, services, the contact form and status boxes. Panel Ink fill, 1px hairline, 16px radius, no shadow, 24 to 48px padding, `overflow: hidden`. Project panels hold copy on the left and a screenshot frame on the right (16:9, 12px radius, hairline, black behind the image). The Contact card is the same panel at 86% alpha.

### Fields
- **Style:** Field Ink fill, 1px hairline, 10px radius, 14px by 16px padding, a Dust Gray 0.875rem label above.
- **Focus:** Border turns amber, fill lifts to #19191d, the default outline is removed because the border change is the indicator. The caret is amber.
- **Error:** Border and message in Signal Coral, message at 0.875rem below the field.

### Filter chips
Pill, 34px tall, hairline border, Dust Gray text with an optional dimmed count. Hover brightens the text and border. Selected is a solid Starlight fill with Void Black text.

### Navigation
A fixed 56px bar: a small ring-and-dot mark (the dot is amber) with "Gabriel Nkwa" on the left, text links in Dust Gray 0.875rem in the middle with the section in view shown in Starlight (via `aria-current`), and a small primary button ("Book an intro call") at the right edge. The mark turns 180 degrees on brand hover. Under 720px the name drops, only the Work link stays, and the button shortens to "Book call". It is transparent at the top and frosted after scrolling.

### Archive rows
Hairline-divided rows with the project name, muted tags and an arrow. Hovering a linked row adds side padding, a faint white wash (4%) and turns the arrow amber while it moves up and right by 2px.

### Starfield (signature)
A fixed full-screen canvas at the lowest layer, `pointer-events: none`, hidden from assistive tech. Up to 280 stars (about one per 6500px of viewport), most near-white and about a quarter tinted pale amber. Each star has a depth: it shifts with scroll by depth, drifts slowly, twinkles, and shifts sideways a few pixels with the pointer. Scroll speed (clamped at 90px per frame and smoothed) stretches stars into vertical streaks scaled by depth, which is the one signature motion: the page feels like it accelerates when scrolled fast. A thin shooting star crosses every 9 to 17 seconds. The loop pauses when the tab is hidden.

### Planet horizon (signature)
A CSS-only component (`Horizon`): a huge black circle sitting low in a container, a thin lit arc along its top edge that is brightest at the center and fades out along the curve, an amber box-shadow halo above it, and a blurred amber haze. It appears twice: at the bottom of the hero (masked to fade into the black below, dropping away as the page scrolls) and in the Contact section (rising back into place as the end of the page approaches), so the page starts and ends on the same horizon.

### Timelines
Process and Record each have a 1px hairline rail with circular nodes. In Process the rail fills with amber from top to bottom as the section scrolls, and each node lights amber when reached. In Record the nodes are amber-outlined and the year is set in amber.

### Orbit rings
Services panels each open with an SVG of concentric rings: circles for Web, tilted ellipses for Mobile, with small dots (one amber) travelling the paths and an amber core. Pure SVG drawn in code, with strokes at 14% white.

### Kit marquee
Two rows of tool names in Dust Gray drifting in opposite directions at 48s and 60s per loop, edge-faded by a mask, paused on hover. The list is also exposed to screen readers as a hidden heading.

### Motion
One signature, several supporting moves, and a hard stop.
- **Signature:** the scroll-velocity starfield warp described above.
- **Supporting:** the hero headline resolves word by word out of a 14px blur and a 0.35em drop (1.1s each, 0.08s apart); Work panels pin and stack on screens 900px and wider, with the lower panel scaling to 0.94 and dimming and the screenshot easing from 1.14x to 1x as it arrives; the Process rail and node draw as you scroll; orbit dots travel their paths; sections fade and rise 28px once on entry.
- **Timing:** one easing, `cubic-bezier(0.16, 1, 0.3, 1)`; 180ms for state changes, 360ms for larger ones, 0.9 to 1.1s for entrances.
- **Reduced motion:** the starfield draws one static frame with no twinkle, drift, streaks, pointer shift or shooting star; CSS animations and transitions are cut to 0.01ms; orbit dots are removed; framer-motion is configured with `reducedMotion="user"`, which keeps opacity fades and drops movement. The scroll-linked effects (hero copy lift and planet drop, Work panel scale, the Process rail, the Contact planet rise) have no separate reduced-motion branch in the code; they follow scroll position rather than playing on their own, and the hero word blur-in relies on the same framer-motion setting. New motion should add an explicit static fallback instead of assuming this covers it.

## Do's and Don'ts

### Do:
- **Do** keep every section on #000000 and let the starfield show behind it.
- **Do** spend amber on the primary action, focus, the horizon limb and timelines, and nowhere else.
- **Do** build panels as Panel Ink, 16px radius, a single 1px hairline, no shadow.
- **Do** write headings in Geist 600, sentence case, with -0.035em (display, headline) or -0.025em (title) tracking.
- **Do** start a section with its title and a one-sentence lede in Dust Gray, then the content.
- **Do** make the scroll-velocity starfield warp the only motion that is a signature, and add a static fallback for any new motion.
- **Do** keep text readable at AA contrast: Dust Gray on black is about 8:1.

### Don't:
- **Don't** add a kicker, eyebrow, section number or small label above a heading.
- **Don't** use gradient text, grain, noise overlays or a custom cursor.
- **Don't** put a box-shadow on a panel, card, button or field.
- **Don't** add a second accent hue, or tint whole sections.
- **Don't** let an effect run in front of the content: the starfield stays behind the page and never blocks pointer events.
- **Don't** introduce another typeface or uppercase letter-spaced styling.
- **Don't** invent proof. Metrics, quotes, client logos and prices appear only when they come from Sanity or from Gabriel.
