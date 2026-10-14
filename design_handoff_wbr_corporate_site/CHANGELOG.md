# Design changelog

Add an entry here whenever the design changes after handoff. Give Claude Code the new entry and say: "Apply the latest CHANGELOG entry."

Format:

```
## YYYY-MM-DD — short title
Page: homepage | finder | search | foundation
Changes:
- [Section] what changed (old value → new value)
Reference: reference/<file>.dc.html (updated)
```

---

## 2026-10-14 — What's on Next: filters removed
Page: homepage
Changes:
- [What's on Next] Removed the sector chip row, the region chip row, the "Showing N of 100+" count and the empty state.
- [What's on Next] Now shows the next 6 upcoming events across all sectors and regions, in date order.
- [Event row, homepage only] Added a region tag pill after the event name (Americas / Europe / Asia / ANZ / MEA). Style: 11.5px Lato 700 uppercase, 0.08em tracking, radius 20px, padding 4px 10px, no border. Tinted per region: Americas #e8eef8 bg / #3b62b0 text; Europe #e3f4f1 / #23786c; Asia / ANZ / MEA #fdf0e1 / #9a5514.
- [Entry points] The homepage region/sector links into the Finder are removed; "View all 100+ events" goes to /conferences.
Reference: reference/01-homepage-3d.dc.html (updated)

## 2026-10-14 — Initial handoff
Page: all
Changes:
- First handoff: homepage (3d), Conference Finder (4a), search behaviour spec.
