# WBR corporate site

This file is the project guide for anyone working on the wbresearch.com redesign, including Claude Code, which reads it automatically.

**Repository:** https://github.com/Worldwide-Business-Research/wbr-corp-site

## What this is

A rebuild of the WBR corporate site in **Bootstrap 5.3.8**, page by page and section by section, from a design handoff. Three surfaces are planned: the homepage, the Conference Finder (`/conferences`) and the hero search. The code ends up in WBR's in-house CMS, so production snippets are **body content only**: no `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`.

## The design handoff

The designs live in `design_handoff_wbr_corporate_site/`, committed with the code. The repo is public, handoff included, with manager approval (October 2026). Its `README.md` holds the full spec (colours, type, spacing and every section) and `reference/*.dc.html` are the visual references; open them in a browser and ignore the browser frame. `CHANGELOG.md` lists design changes after handoff.

## Files

| Path | What it is |
|---|---|
| `index.html` | Homepage preview. It has a full `<head>` for local viewing; copy only what's between `<body>` and `</body>` into the CMS. |
| `conferences.html` | Conference Finder preview (`/conferences`), same nav and footer as the homepage. The event row, month group and filter pill markup sits in `<template>` tags at the end of `<main>`. |
| `css/style.css` | **Variables only**: brand colours, fonts, font sizes and the Bootstrap overrides. Edit values here. |
| `css/base.css` | Everything else: global styles, type classes, components and sections, under banner headers. |
| `js/scripts.js` | Plain JavaScript. Closes the Our brands panel on Esc or a click outside. |
| `js/finder.js` | Conference Finder only: filters, sorts and groups the events, and keeps the filters in the URL. The event list at the top is placeholder data standing in for `/api/events/search`. |
| `img/` | Logo, brand logos (`img/brands/`) and photos (`img/photos/`). |

Load order: Bootstrap CSS → Google Fonts (Lato, Open Sans) → Font Awesome 6.5 → `css/base.css` → `css/style.css`. Scripts: `bootstrap.bundle.min.js` **before** `js/scripts.js` (then `js/finder.js` on the Finder).

To preview, open `index.html` or `conferences.html` in a browser. Links use the live URLs (`/conferences`), so they don't work between local files.

## Conventions

### Bootstrap first
- Use Bootstrap 5.3 utility classes (spacing, flex, colour, borders, radius, shadow, `object-fit-*`) before writing CSS. Accept Bootstrap's spacing steps when the difference from the design is small.
- Use Bootstrap containers, rows and columns for layout. Two container patterns, both with `px-3 px-md-4 px-xl-5` so edges line up with the nav up to 1400px:
  - Full-width bands (nav, Our brands panel, hero, Next up strip): `container-fluid`.
  - Content sections: `container-xxl`. It's full width up to 1400px, then caps at 1320px and centres, so text and grids don't stretch on big monitors.
- Section spacing: `<section class="py-5">` with `<div class="container-xxl px-3 px-md-4 px-xl-5 py-lg-4">` inside, so padding stacks from 48px on phones to 72px on desktop (the design says 84px). Keep stacking to these two levels.
- Check the Bootstrap docs for a built-in helper or component before writing CSS. Patterns in use:
  - `hstack gap-*` instead of `d-flex align-items-center gap-*` (and `vstack` for columns).
  - Arrow links: `icon-link icon-link-hover wbr-arrow-link`, with `bi` added to the Font Awesome arrow (`<i class="fa-solid fa-arrow-right bi">`). Bootstrap only animates icons that have the `bi` class.
  - Nav link colours come from the navbar's variables (`--bs-navbar-color`, `--bs-navbar-hover-color`, `--bs-navbar-active-color`) on `.wbr-nav`.
  - Stacking: `z-1` to `z-3` utilities rather than custom `z-index`.
  - Gutters: keep a row's gutter no wider than twice the container padding, or the page scrolls sideways. On phones (`px-3`, 16px) use up to `g-4`; `g-5` only from md (`g-4 g-md-5`).
  - Shared pieces: `wbr-card-lift` (cards that lift on hover) and `wbr-tag` (uppercase pills: region, Report, event type).
  - Phone bottom sheets: `offcanvas-md offcanvas-bottom` (the Finder filters). The same markup is a sheet below 768px and normal content above it.
  - Sort toggles: `btn-check` radios in a `btn-group`.
  - Clickable cards and rows: `stretched-link` on the main link (role cards, event rows). Buttons inside a clickable row get `position-relative z-2` so they stay clickable.
  - Buttons: `btn` plus `btn-wbr-primary` (orange), `-outline` (navy outline), `-outline-light` (grey outline), `-blue` or `-dark`. Add `btn-sm` for small row buttons.
  - Pills: `badge rounded-pill` (region tags).
  - Coming up: `ratio`, `placeholder`.
- Write custom CSS only for what Bootstrap can't do: hover, focus and open states, exact sizes it lacks, gradients, animation, letter-spacing and the type scale.

### Class names
- Custom classes start with `wbr-` and use plain hyphens: `wbr-brand-card`, `wbr-brand-card-logo`, `wbr-brand-card-more`. Use BEM (`__`, `--`) only if truly necessary.
- Names must explain themselves: no abbreviations like `wbr-t-*`. Keep them short.
- Page regions and sections get `wbr-` IDs: `#wbr-header`, `#wbr-nav`, `#wbr-content`, `#wbr-hero`, `#wbr-next-up`. Only add other IDs when something needs them (e.g. a Bootstrap `data-bs-target`). Don't use the live event sites' `eco-` names; this site isn't hosted on ECO.

### CSS format
- One line per rule, grouped under banner headers like `/**** Hero ****/`. No other comments, except the px notes in `style.css`.
- Mobile-first: base styles for phones, then `@media(min-width:…)` at Bootstrap's breakpoints (576, 768, 992, 1200, 1400).
- No `!important`.

### Colours
- Brand colours are `--wbr-*` variables in `style.css`. Bootstrap's own variables point at them, so `bg-dark` is WBR navy, `bg-light` is the grey section background, `text-body-secondary` is WBR grey and links are blue with an orange hover.
- For hover shades and transparent tints use `color-mix()`, e.g. `color-mix(in srgb, var(--wbr-orange) 60%, transparent)`, not new variables or `rgba()`.
- Links inside any `bg-dark` area are white with an orange hover automatically (one rule in `base.css`).
- `.wbr-heading-font` also sets navy text, so add `text-white` when using it on a dark background.
- Brand accent classes: `bg-wbr-blue|orange|green|cyan`, `text-wbr-*`, and `link-wbr-orange|green|cyan` for links that keep the orange hover. Conferences = blue, Connect Events = green, WBR Insights = cyan; orange is the call-to-action colour.

### Type and sizes
- Type classes: `.wbr-type-hero`, `-stat`, `-h2xl`, `-h2`, `-h3`, `-lead`, plus `.wbr-eyebrow` and `.fw-black` (weight 900). Eyebrows take their size from Bootstrap's `small` (`class="wbr-eyebrow small"`, about 13px; the handoff says 11.5px). The hero eyebrow leaves `small` off, so it stays at the 15px body size. Other 13px text also uses `small`; body text needs no class.
- Font sizes are in rem; padding, borders and image sizes stay in px.
- Hero, stat, H2 XL and H2 are fluid. Change them by editing the plain px numbers in `style.css` (e.g. `--wbr-fs-hero-phone:36; --wbr-fs-hero-desktop:64;`); the `clamp()` formulas in `base.css` use them and never need editing. They scale from 375px to 992px.
- The page starts with a "Skip to main content" link (`visually-hidden-focusable`) that appears on keyboard focus. Keep it as the first thing in `<body>`.
- Respect `prefers-reduced-motion` for any new animation (see the Reduced Motion block in `base.css`).

### JavaScript
Plain JavaScript (jQuery is available in the CMS but not needed). Use Bootstrap's components (`bootstrap.Collapse` and so on) rather than rebuilding them.

## Git workflow

- One branch per section, named `homepage-<section>` (e.g. `homepage-hero`); non-page work uses a prefix such as `docs-`.
- Start from an up-to-date `main`: `git checkout main`, `git pull origin main`, `git checkout -b <branch>`.
- Commit messages are commands in sentence case, under 50 characters: `Add hero section with search form`. Test: "If applied, this commit will ___."
- Push with `git push -u origin <branch>`, open a pull request on GitHub, review **Files changed**, merge, then pull `main` again before the next section.

## Status

**Done (homepage):** nav with the Our brands panel and mobile menu, hero with search form and popular chips, Next up strip, intro paragraph with highlight sweep and the three lines of business, What Brings You to WBR? (three role cards), sponsor proof and stats, What's on Next calendar, WBR Insights, community photo grid, sponsor logo marquee, footer.

**Done (Conference Finder):** header band with breadcrumb and filter bar (bottom sheet on phones), results with count, removable filter pills, Date/Name sort, month groups and the empty state. Filters are reflected in the URL and the back button works.

**To do:** a style guide page; the hero search dropdown (needs the dev team's endpoint, see below).

**Waiting on others**
- Search: the hero search is a plain form that goes to `/conferences?q=…`. The live dropdown, the `/api/events/search` endpoint and the analytics event names need the dev team.
- Content: event data, stats, the sponsor quote and Insights content are placeholders, to be wired to the CMS.
- Photos: the hero photo is only 1024px wide; it needs a version at least 2000px wide.
- Finder: the server has to render the results and the From/To month options from the URL (the handoff requires it, for no-JS and indexing). For now `js/finder.js` fills them in the browser.
- Footer logo: the JPG logo sits on a white tile until there is an SVG (or white) version for dark backgrounds.

**Known trade-offs**
- The page edge is 48px on desktop (Bootstrap's `px-5`), not the design's 72px.
- Popular chips are about 30px tall, below the handoff's 44px minimum tap target.
- Lead text and the hero eyebrow are fixed sizes (19px, 15px) rather than fluid.
- Sponsor logos don't use the handoff's `mix-blend-mode: multiply`. The marquee's fade edges are a CSS mask, which cancels the blend; on the white band the JPGs' white backgrounds don't show anyway.
- Footer link columns are 2 across on phones (the handoff suggests 1), and footer links are below the 44px tap target.
- Sector colours in the Finder reuse the four brand accents; the handoff's orange-pale and grey swatches weren't added.
