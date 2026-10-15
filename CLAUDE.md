# WBR corporate site

This file is the project guide for anyone working on the wbresearch.com redesign, including Claude Code, which reads it automatically.

**Repository:** https://github.com/leo12534/wbr-corp-site

## What this is

A rebuild of the WBR corporate site in **Bootstrap 5.3.8**, page by page and section by section, from a design handoff. Three surfaces are planned: the homepage, the Conference Finder (`/conferences`) and the hero search. The code ends up in WBR's in-house CMS, so production snippets are **body content only**: no `<!DOCTYPE>`, `<html>`, `<head>` or `<body>`.

## The design handoff

The designs live in `design_handoff_wbr_corporate_site/`, committed with the code. The repo is private; if it is ever made public, remove this folder first, since it holds the internal brief and event photography. Its `README.md` holds the full spec (colours, type, spacing and every section) and `reference/*.dc.html` are the visual references; open them in a browser and ignore the browser frame. `CHANGELOG.md` lists design changes after handoff.

## Files

| Path | What it is |
|---|---|
| `index.html` | Homepage preview. It has a full `<head>` for local viewing; copy only what's between `<body>` and `</body>` into the CMS. |
| `css/style.css` | **Variables only**: brand colours, fonts, font sizes and the Bootstrap overrides. Edit values here. |
| `css/base.css` | Everything else: global styles, type classes, components and sections, under banner headers. |
| `js/scripts.js` | Plain JavaScript. Closes the Our brands panel on Esc or a click outside. |
| `img/` | Logo, brand logos (`img/brands/`) and photos (`img/photos/`). |

Load order: Bootstrap CSS → Google Fonts (Lato, Open Sans) → Font Awesome 6.5 → `css/base.css` → `css/style.css`. Scripts: `bootstrap.bundle.min.js` **before** `js/scripts.js`.

To preview, open `index.html` in a browser.

## Conventions

### Bootstrap first
- Use Bootstrap 5.3 utility classes (spacing, flex, colour, borders, radius, shadow, `object-fit-*`) before writing CSS. Accept Bootstrap's spacing steps when the difference from the design is small.
- Use Bootstrap containers, rows and columns for layout. The nav, Our brands panel, hero and Next up strip use `container-fluid px-3 px-md-4 px-xl-5` (full width). Each new section chooses between full width and `container-xl`; content-heavy grids usually suit `container-xl`.
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
- Brand accent classes: `bg-wbr-blue|orange|green|cyan` and `text-wbr-*`. Conferences = blue, Connect Events = green, WBR Insights = cyan; orange is the call-to-action colour.

### Type and sizes
- Type classes: `.wbr-type-hero`, `-stat`, `-h2xl`, `-h2`, `-h3`, `-lead`, `-body`, `-small`, plus `.wbr-eyebrow` and `.fw-black` (weight 900).
- Font sizes are in rem; padding, borders and image sizes stay in px.
- Hero, stat, H2 XL and H2 are fluid. Change them by editing the plain px numbers in `style.css` (e.g. `--wbr-fs-hero-phone:36; --wbr-fs-hero-desktop:64;`); the `clamp()` formulas in `base.css` use them and never need editing. They scale from 375px to 992px.
- Respect `prefers-reduced-motion` for any new animation (see the Reduced Motion block in `base.css`).

### JavaScript
Plain JavaScript (jQuery is available in the CMS but not needed). Use Bootstrap's components (`bootstrap.Collapse` and so on) rather than rebuilding them.

## Git workflow

- One branch per section, named `homepage-<section>` (e.g. `homepage-hero`); non-page work uses a prefix such as `docs-`.
- Start from an up-to-date `main`: `git checkout main`, `git pull origin main`, `git checkout -b <branch>`.
- Commit messages are commands in sentence case, under 50 characters: `Add hero section with search form`. Test: "If applied, this commit will ___."
- Push with `git push -u origin <branch>`, open a pull request on GitHub, review **Files changed**, merge, then pull `main` again before the next section.

## Status

**Done (homepage):** nav with the Our brands panel and mobile menu, hero with search form and popular chips, Next up strip.

**To do (homepage), in order:** intro paragraph and three lines of business; What Brings You to WBR?; sponsor proof and stats; What's on Next calendar; WBR Insights; community photo grid; sponsor logo marquee; footer. Then a style guide page, the Conference Finder and search.

**Waiting on others**
- Search: the hero search is a plain form that goes to `/conferences?q=…`. The live dropdown, the `/api/events/search` endpoint and the analytics event names need the dev team.
- Content: event data, stats, the sponsor quote and Insights content are placeholders, to be wired to the CMS.
- Photos: the hero photo is only 1024px wide; it needs a version at least 2000px wide.

**Known trade-offs**
- The page edge is 48px on desktop (Bootstrap's `px-5`), not the design's 72px.
- Popular chips are about 30px tall, below the handoff's 44px minimum tap target.
- Lead text and the hero eyebrow are fixed sizes (19px, 15px) rather than fluid.
