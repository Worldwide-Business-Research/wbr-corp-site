# Handoff: WBR corporate site redesign (homepage + Conference Finder + search)

## Overview
A redesign of wbresearch.com, moving the site from Bootstrap 4.2.1 to **Bootstrap 5.3**. The package covers three surfaces:

1. **Homepage**: design direction "3d"
2. **Conference Finder** (`/conferences`): design direction "4a"
3. **Hero search → Finder**: behaviour, URL parameters, API contract

The brief is in `brief/project-brief.md`. Main goals: show off the event photography, put community first, make it quick to reach the conference feed and filter it, and keep the WBR colours and fonts.

## About the design files
The files in `reference/` are **design references built in HTML**. They show the intended look and behaviour; they are not production code. Recreate them as clean, semantic Bootstrap 5.3 markup in the in-house CMS. Don't copy the inline styles or the `<x-dc>` / `<sc-for>` / `{{ }}` template syntax. They belong to the prototyping tool.

To view a reference, open it from the `reference/` folder in a browser. It needs `support.js` and `uploads/` alongside it, and works best over a local server (e.g. `npx serve reference`). Each design is drawn inside a 1280px browser frame. **Ignore the frame and the browser bar at the top.**

## Fidelity
**High fidelity** at desktop (1280px): final colours, type, spacing, copy and hover states. Match it closely.
**Mobile is not yet designed.** The brief asks for mobile-first; follow the responsive rules in this README and the Bootstrap grid. Mobile layouts will come in a later changelog entry.

## Recommended build order
Build one page at a time, on a shared foundation:

1. **Foundation**: load `foundation/wbr-theme.css`, then build the nav (with the Our brands panel), footer, buttons, chips and event row as reusable partials.
2. **Homepage** (3d)
3. **Conference Finder** (4a), reusing the event row and chips
4. **Search**: hero search dropdown and its handover to the Finder. The full spec is in `reference/03-search-handoff.dc.html`.

After each step, review it in the browser before moving on.

### Suggested Claude Code prompts
- *Step 1:* "Read `design_handoff_wbr_corporate_site/README.md`. Set up Bootstrap 5.3 with `foundation/wbr-theme.css` and build the shared nav, Our brands panel and footer partials. Match `reference/01-homepage-3d.dc.html`."
- *Step 2:* "Build the homepage from the README 'Homepage' section, using the partials from step 1."
- *Later changes:* "Apply the latest entry in `CHANGELOG.md`."

---

## Global

### Fonts and icons
- **Lato** 400/700/900: headings, buttons, labels, eyebrows. **Open Sans** 400/500/600/700: body text.
  `https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Open+Sans:wght@400;500;600;700&display=swap`
- **Font Awesome 6.5** (free) for **functional icons only**: arrows, chevrons, search, location, close, download, media-type glyphs and social. No decorative icons.

### Layout
- The design canvas is 1280px wide. Content inset is **72px** left/right (the nav uses 44px). In Bootstrap terms, use `.container-xxl` (max 1280px) with 72px horizontal padding at ≥1200px.
- **Section rhythm:** 84px vertical padding; the intro uses 88px and dark bands 72px. Each section has a 1px `#e3e8f0` top border.
- **Backgrounds alternate strictly between white and grey (`#f4f6fa`).** Dark navy bands (`#253a63`) can sit between them. Never put two whites or two greys next to each other.

### Type ladder (nine steps, all in `wbr-theme.css`)
| Step | Size | Font / weight | Line-height | Tracking | Used for |
|---|---|---|---|---|---|
| Hero | 64px | Lato 900 | 1.08 | -0.015em | Hero h1 |
| Stat | 60px | Lato 900 | 1.0 | -0.02em, tabular | Audience stats |
| H2 XL | 48px | Lato 900 | 1.08 | -0.015em | Sponsor, calendar, community, Finder h1 |
| H2 | 32px | Lato 900 | 1.08 | -0.015em | Route by role, Insights; intro paragraph (Lato 400, lh 1.34); calendar day numbers |
| H3 | 21px | Lato 700 (900 for Finder month headers) | 1.3 | -0.005em | Card titles, brand panel title, counts |
| Lead | 19px | Open Sans 400 / Lato 700 for event names | 1.55–1.65 | — | Hero sub, sponsor lead, quote, event names |
| Body | 15px | Open Sans 400 | 1.6 | — | Body copy, links, nav (600) |
| Small | 13px | Open Sans 400/600 | 1.5 | — | Meta, chips, small buttons, footer legal |
| Eyebrow | 11.5px | Lato 700, uppercase | — | 0.14em | Section overlines (orange; cyan on Insights) |

Paragraphs are capped at `max-width: 68ch`.

### Colour
| Token | Hex | Role |
|---|---|---|
| `--wbr-dark` | #253a63 | Headings, dark bands, footer, dark buttons, active chips |
| `--wbr-blue` | #3b62b0 | Links, Agenda buttons, Conferences accent |
| `--wbr-orange` | #f0942d | Primary CTA, eyebrows, Next-up dot, hover colour for links |
| `--wbr-orange-pale` | #f7c996 | Intro highlight sweep |
| `--wbr-green` | #33aa99 | Connect Events accent |
| `--wbr-cyan` | #03aeef | WBR Insights accent |
| `--wbr-grey` | #8490a7 | Secondary text |
| `--wbr-grey-pale` | #c8ced8 | Hover borders, stat dividers |
| `--wbr-ink` | #1f2d4a | Body text |
| `--wbr-mist` | #f4f6fa | Grey section background |
| `--wbr-line` | #e3e8f0 | Hairlines, card borders |
| on-dark text | #aeb9d4 / #8194b8 | Secondary text on navy |

Each line of business has its own accent colour, used for its links, swatches and card stripes: **Conferences = blue, Connect = green, Insights = cyan.** Orange is the CTA colour.

### Radii, shadows, motion
- Radii: 7px (small buttons), 8px (buttons, inputs), 9px (large buttons), 12px (brand cards, photo cells), 14px (cards), 30px (chips and pills).
- Shadows: card hover `0 26px 54px rgba(30,45,74,.15)`; brand panel `0 24px 48px rgba(37,58,99,.14)`; hero search `0 18px 40px rgba(0,0,0,.28)`; Finder filter bar `0 10px 30px rgba(37,58,99,.06)`.
- Motion: 150–220ms ease. Cards lift 8px on hover (6px for feed cards, 2px for brand cards). The gap in arrow links grows from 8px to 14px on hover. Respect `prefers-reduced-motion`.

---

## Shared components

### Nav (both pages)
- White background, 1px bottom border, padding 20px 44px, `justify-content: space-between`.
- **Left:** WBR logo (`wbr-acro.jpg`, 34px tall), a 1px × 26px divider, then the **Our brands** toggle button. The button has three 5px squares (blue, orange, green), the label in Lato 700 13px and a 10px chevron; padding 8px 14px, radius 8px.
- **Right** (30px gap): Conferences · Connect Events · WBR Insights · About Us (Open Sans 600 15px, `#253a63`, orange on hover/active), then the **Find an event →** orange button.
- **Our brands panel:** opens below the nav, full width. Background `#f4f6fa`, padding 32px 44px 34px, fades and slides down 8px over 180ms.
  - Header: eyebrow "The WBR family", title "40+ event brands, one research house." (Lato 900 21px), and a "See all brands →" link on the right.
  - A 4-column grid with 14px gaps. Three brand cards (eTail, LogiPharma, ProcureCon), each with a logo (max 24px tall), a 26×3px colour bar, a 13px description and an "N EVENTS" eyebrow. The fourth card has a dashed border and reads "+37 more".
  - Use a Bootstrap `collapse` or a custom disclosure with `aria-expanded`. Close it on Esc and on click outside.
  - Below 992px, move into the offcanvas menu as an accordion item.

### Event row (homepage calendar + Finder)
- Grid of `132px 1fr auto`, 1px bottom border; hover background is grey (white when the section itself is grey).
  - **Date cell:** month eyebrow over the day range (Lato 900 32px, tabular), with a right border.
  - **Body:** a 150px logo slot (max 30px tall), then the event name (Lato 700 19px) and a meta line: an 8px sector swatch, the sector, a location icon, then the city.
  - **Actions:** **Sponsor** (outlined) and **Agenda** (blue) small buttons.
- In the Finder, an uppercase type tag follows the name (11.5px, bordered pill).
- The whole row links to the event site; the buttons go to their own pages.

### Chips
- Pill-shaped, 13px Open Sans 600, 1px `#e3e8f0` border, 8px 14px padding. Active state: navy fill, white Lato 700 text.
- Sector chips show a count in a muted 11.5px span. Implement as `<button aria-pressed>`. (The homepage calendar no longer uses chips. They remain in the stylesheet for future filter UIs.)

### Footer
- Navy background, padding 64px 72px 40px.
- Two columns (300px, then 1fr):
  - **Left:** globe mark and "WBR", a one-line description, and the weekly calendar email signup (dark input plus an orange "Sign up" button).
  - **Right:** four link columns: Events, Industries, Work with us, Company.
- Bottom bar (13px, `#8194b8`): copyright, social icons (LinkedIn, X, YouTube), and Privacy · Terms · Cookie preferences · Modern slavery statement.
- The Finder reference uses a short placeholder footer. **Use the full homepage footer on every page.**

---

## Page 1: Homepage (3d)
Reference: `reference/01-homepage-3d.dc.html`. Sections in order, with backgrounds:

1. **Nav**: white
2. **Hero**: full-bleed photo, 600px tall
   - Image `Older Events/i-MNGJw2F-XL.jpg` with `object-fit: cover`, under a left-to-right overlay: `linear-gradient(90deg, rgba(30,40,68,.72) 0%, rgba(30,40,68,.34) 46%, transparent 74%)`.
   - Text column is max 760px wide with 72px left padding, vertically centred:
     - Eyebrow "Worldwide Business Research" (white, 85% opacity, 15px)
     - H1 "Connecting Leaders.<br>Inspiring Innovation." (white, 64px)
     - Sub (19px, `#eaf0fb`, max 540px): "For 25 years we've brought the people who move industries into the same room — to meet, learn and build what's next, together."
   - **Search box:** white, radius 12px, 8px padding, max 560px, shadow; a search icon, an input with placeholder "Search events, industries, cities…" and an orange **Search** button. Behaviour is in section 4 below.
   - **Popular chips:** label "Popular:", then Retail & eCommerce · Procurement · Pharma · Finance. Chips are translucent white (12% fill, 28% border, 13px, radius 20px).
3. **Next up strip**: navy, padding 16px 72px. Orange pulsing dot with the eyebrow "Next up", the event name (Lato 700), venue and date (`#aeb9d4`), and "View agenda →" on the right. Data: the soonest upcoming event.
4. **Intro paragraph**: white, padding 88px 72px, centred, max 940px. Lato 400, 32px, lh 1.34. Three phrases have the highlight sweep (`.wbr-hisweep`): a 15%-height underline that fills to 90% on hover over 350ms.
   - "exciting virtual and in-person conferences" in orange-pale
   - "networking events" in green
   - "exceptional custom content" in cyan
5. **Three lines of business**: white (continues the intro block), padding 0 72px 84px. A top border, then 3 columns separated by vertical hairlines. Each has a 10px colour square and h3, a 15px grey description and an arrow link in its accent colour:
   - Conferences → "Browse conferences"
   - Connect Events → "See Connect"
   - WBR Insights → "Read Insights"
6. **What Brings You to WBR?**: navy, padding 72px.
   - Header row: eyebrow "Start here" and H2 on the left; a 15px paragraph on the right (max 380px).
   - Three white cards (radius 14px, gap 20px) that lift on hover. Each has a 128px photo with a navy tint and a 4px colour bar at the bottom, then a body (padding 28px 30px 30px) with an icon + h3, a description and an arrow link pinned to the bottom.
     - I Want to Attend: ticket icon, orange
     - I Want to Speak: microphone icon, cyan
     - Press & Partners: newspaper icon, green
7. **Sponsor proof**: white.
   - Two columns, 56px gap.
     - **Left:** eyebrow, H2 XL "The Room is the Audience Data.", 19px lead, a quote with a 3px orange left border (Lato 19px) and attribution, then buttons: **Download the media kit** (orange, download icon) and **Talk to the team** (outline).
     - **Right:** photo grid, 2 columns × 2 rows of 190px, 14px gap. The first photo spans both columns.
   - Below: a 4-column stat row with a top border and vertical dividers: 68% · 12k+ · 82% · 30+ (60px), each with a 15px label. Under it, a 13px source note. **The stats are placeholders; get real figures before launch.**
8. **What's on Next** (calendar): grey. **No filters.**
   - Header: eyebrow "100+ conferences a year", H2 XL, and a "Full calendar →" link.
   - The next 6 upcoming events in date order, across all sectors and regions.
   - Each event row has a **region tag** after the event name: an uppercase pill (11.5px Lato 700, 0.08em tracking, radius 20px, padding 4px 10px, no border), tinted per region: **Americas** bg `#e8eef8` / text `#3b62b0` · **Europe** bg `#e3f4f1` / text `#23786c` · **Asia / ANZ / MEA** bg `#fdf0e1` / text `#9a5514`.
   - Button: **View all 100+ events →** (navy), linking to `/conferences`.
9. **WBR Insights**: white.
   - Eyebrow (cyan), H2 "The Research Between the Events.", and an "All reports and webinars →" link.
   - Grid of `1.4fr 1fr 1fr`, 22px gap:
     - A Report card with a 210px image and a "Report" badge
     - A Webinar card ("Webinar · on demand", play icon)
     - An Article card
   - Each card has an h3, a description and a cyan arrow link (Download / Watch / Read).
10. **Community**: grey, full-bleed photo grid.
    - Header: eyebrow, H2 XL "This is Where<br>The Industry Meets." on the left; a 15px paragraph on the right (380px column).
    - Grid of `1.7fr 1fr 1fr`, rows 270px and 190px, 8px gap, no radius. The lead photo spans 2 rows and has the orange corner glow (`.wbr-glow`).
11. **Sponsor logo marquee**: white, padding 52px 0 58px.
    - Logos scroll continuously (46s loop, pause on hover) with 60px fade edges. Logos are 38px tall with `mix-blend-mode: multiply`, because the source files are JPGs on white.
    - "Sponsor an event →" on the right.
12. **Footer**: navy.

## Page 2: Conference Finder (4a)
Reference: `reference/02-conference-finder-4a.dc.html`. URL: `/conferences`.

1. **Nav**, with "Conferences" in the active (orange) state.
2. **Header band**: grey, padding 56px 72px 48px.
   - Background photo `2026/_TEL6242.jpg` at 32% opacity and `saturate(.8)`, with a mist gradient over it (`rgba(244,246,250,.2)` → `.75`, top to bottom).
   - Breadcrumb: Home › Conferences.
   - Eyebrow "100+ conferences a year", then H1 "Find an Event" (48px).
   - **Filter bar:** a white card (radius 14px, padding 20px, shadow). Grid of `1.6fr repeat(4, 1fr)`, 12px gap, `align-items: end`. Each field has a 13px grey label:
     - **Keyword**: input with a search icon; placeholder "Event, city or topic"
     - **Region**: All regions / Americas / Europe / Asia / ANZ / MEA
     - **Event type**: All types / Conference / Summit / Connect / Webinar
     - **From** month and **To** month: the next 12 months
3. **Results**: white, padding 40px 72px 84px.
   - **Toolbar:**
     - Left: the count ("17 events", Lato 900 21px), then one removable pill per active filter (keyword in quotes, region, type, date range), then **Clear all**.
     - Right: "Sort by" with a Date | Name segmented toggle.
   - **Date sort:** results grouped by month. Each group has a header (h3 "October 2026" plus a 13px count), a top border, then event rows.
   - **Name sort:** a single "A–Z" group.
   - **Empty state:** dashed-border box with a calendar-xmark icon, "No Events Match These Filters", "Try a wider date range or another region." and **Clear all filters**.
4. **Footer** (use the full homepage footer).

**Behaviour:**
- Filters combine with AND. If From is after To, swap them.
- Removing a pill resets only that filter.
- Every filter is reflected in the URL (section 4), so filtered views can be shared and the back button works.
- The keyword field updates 300ms after typing stops. Dropdowns apply immediately.
- **The page must also render server-side from the URL**, so links work without JavaScript and pages can be indexed.

## Page 3: Search (hero → Finder)
The complete spec is in `reference/03-search-handoff.dc.html`. It contains a live prototype, the flow, every dropdown state, the URL parameters, entry points, behaviour rules and the API contract. Treat that file as the spec. Summary:

- **Dropdown:**
  - Opens on focus. Search starts at 2 characters, with a 150ms debounce and in-flight requests cancelled.
  - Shows up to 5 event rows, plus "See all N results".
  - The loading skeleton appears only if the response takes over 300ms.
- **Keyboard:** ↑/↓ move through rows and wrap. Enter opens the highlighted row, or goes to the Finder if nothing is highlighted. Esc closes; a second Esc clears.
- **Accessibility:** ARIA combobox/listbox pattern, plus a polite live region announcing the result count.
- **Mobile (<768px):** search opens as a full-screen sheet.
- **One endpoint serves both surfaces:** `GET /api/events/search?q=&region=&type=&from=&to=&sort=&limit=`. The dropdown passes `limit=5`, so its "See all" count always matches the Finder.
- **Analytics events:** `search_suggest_shown`, `search_suggest_click`, `search_see_all`, `search_no_results`, `finder_filter_change`. **Event names to be confirmed with the team.**

## 4. URL parameters (Finder)
| Param | Values | Default |
|---|---|---|
| `q` | free text | empty |
| `region` | `americas` · `europe` · `asia-anz-mea` | all |
| `type` | `conference` · `summit` · `connect` · `webinar` | all |
| `from` / `to` | `YYYY-MM` | current month / +11 |
| `sort` | `date` · `name` | `date` |

- Leave out any parameter that is at its default.
- Ignore invalid values rather than erroring.
- Entry points into the Finder:
  - Hero search → `?q=`
  - Popular chips → `?q=retail` etc.
  - Nav "Conferences" / "Find an event" → `/conferences`

The live site's hash routing (`#/`) is being replaced and does not need to be supported.

---

## Responsive rules (until mobile is designed)
Build mobile-first using Bootstrap breakpoints:
- **Nav (<992px):** logo plus a hamburger that opens an offcanvas menu. The menu holds the links, an Our brands accordion and the Find an event button.
- **Hero:** keep the photo and switch to a bottom-up gradient. Search goes full width; Popular chips scroll horizontally.
- **Multi-column grids:**
  - Lines of business, role cards, Insights and footer columns: 3–4 columns at lg, 2 at md, 1 below md.
  - Stats: 2×2 below lg.
  - Community grid: 2 columns at md, horizontal scroll or 1 column below md.
- **Chip rows** (Popular chips): single-line horizontal scroll below md.
- **Event row (<768px):** date column narrows to 76px, the logo is hidden, and the buttons drop under the details (already in `wbr-theme.css`).
- **Finder filter bar (<768px):** collapses to the Keyword field plus a **Filters** button that opens a bottom sheet (Bootstrap offcanvas-bottom) with Region, Type and Dates.
- **Touch targets:** at least 44px.

## State / data
- **Event model** (shared by the calendar, Finder and search): `id, name, url, logo, start, end, city, region, type, sector, brand`. Sector colour comes from a lookup on `sector`.
- **Homepage calendar:** no state. The query is the next 6 upcoming events, ordered by start date. Each event needs `region` for the tag.
- **Finder state:** `q, region, type, from, to, sort`, read from and written to the URL.
- **Our brands:** a static list, or fed from the CMS (brand, logo, colour, description, event count).
- **All event data, counts, stats and quotes in the references are placeholders.** Wire them to the CMS.

## Assets
- `reference/uploads/…/Logos/Corporate Site Logo/wbr-acro.jpg`: the main logo (wordmark plus globe, no tagline). It's a JPG on white; swap in an SVG when one is available.
- `reference/uploads/…/Logos/WBR Event Logos/`: event logos for the event rows.
- `reference/uploads/…/Logos/Company Logos/`: sponsor logos for the marquee. They're JPGs, so they use `mix-blend-mode: multiply`.
- `reference/uploads/*.svg`: eTail, LogiPharma and ProcureCon logos for the Our brands panel.
- `reference/uploads/…/Event Photography/`: hero, role card, sponsor, community and Finder header photos. Treat these as CMS-replaceable image slots.
- The footer globe mark is drawn in CSS in the reference (dotted halves in blue and orange). Replace it with the real globe SVG.

## Files
```
design_handoff_wbr_corporate_site/
├── README.md                          this file
├── CHANGELOG.md                       design changes after handoff
├── brief/project-brief.md             original project brief
├── foundation/
│   ├── wbr-theme.css                  Bootstrap 5.3 overrides + WBR components (plain CSS)
│   └── _wbr-variables.scss            Sass variable overrides, if compiling Bootstrap
└── reference/
    ├── 01-homepage-3d.dc.html         homepage design reference
    ├── 02-conference-finder-4a.dc.html Finder design reference
    ├── 03-search-handoff.dc.html      search spec + live prototype
    ├── support.js                     runtime for viewing the references
    └── uploads/                       images and logos used by the references
```

## Open items
- Confirm the real event data source, final URLs and analytics event names with the dev team.
- Replace the placeholder stats, sponsor quote and Insights content.
- Mobile layouts, plus loading/empty/filter interaction states, will arrive as changelog entries.
- Speaker section: in progress in the design file (3f), not part of this handoff.
