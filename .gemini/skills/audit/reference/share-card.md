# Audit share card — deterministic template

A fill-in-the-blanks ASCII dashboard styled after a Minecraft grass block:
green grass on top (`▓`), dirt (`░▒`) beneath, small block-letter wordmark,
`✦` sparkles as bonemeal particles. Wide landscape layout (100 cols × ~22
rows, roughly 4:3 visual on a standard terminal).

**Do not regenerate the layout.** Copy the template verbatim and substitute
every `{TOKEN}`. Field widths are fixed so alignment is preserved regardless
of the values.

## Hard rules

- Emit the card inside one triple-backtick fenced block. Nothing else inside
  that fence.
- Use only these glyphs: `█ ▓ ▒ ░ ┌ ┐ └ ┘ ├ ┤ ─ │ ✓ ! ✗ → ✦`. No ANSI color
  codes — they render as literal escapes in most chat harnesses. The "green
  grass / dirt" look is encoded by the block characters themselves.
- Never change box widths, indentation, or the banner rows. The card is
  exactly **100 columns** wide, three 32-col panels separated by one-space
  gaps (32 + 1 + 32 + 1 + 32 = 98, plus a leading and trailing space = 100).
- Every placeholder has a known field width (see "Field widths"). Right-pad
  strings with spaces, left-pad numbers with spaces. Truncate overflow —
  never let a value push a border rightward.

## Field widths (character counts)

| Token            | Width | Align | Notes                                          |
|------------------|-------|-------|------------------------------------------------|
| `{HOST}`         | 20    | left  | e.g. `example.com`; truncate at 20             |
| `{SCOPE}`        | 20    | left  | `all` or a filter string                       |
| `{N_PAGES}`      | 20    | left  | integer, stringified                           |
| `{DATESTAMP}`    | 20    | left  | `YYYY-MM-DD HH:MM` (16 chars, pad to 20)       |
| `{SCORE}`        | 3     | right | 0–100 integer                                  |
| `{PCT}`          | 4     | right | e.g. `72%` or ` 9%` (space + digits + `%`)     |
| `{GRADE}`        | 1     | —     | one of `A B C D F`                             |
| `{VERDICT}`      | 20    | left  | one of the five phrases below (pre-padded)     |
| `{BAR20}`        | 20    | —     | exactly 20 chars: N × `▓` then (20−N) × `░`    |
| `{BAR18}`        | 18    | —     | exactly 18 chars: N × `▓` then (18−N) × `░`    |
| `{BAR14}`        | 14    | —     | exactly 14 chars: N × `▓` then (14−N) × `░`    |
| `{BAR12}`        | 12    | —     | exactly 12 chars: N × `▓` then (12−N) × `░`    |
| `{N3}`           | 3     | right | count, right-aligned: `  3`, ` 12`, `147`      |
| `{T3}`           | 3     | right | total of severities                            |
| `{FIX25}`        | 25    | left  | top-fix text; truncate with `…` at 24 chars    |

## Deterministic formulas

- **Health score:**
  `score = round(clamp(100 − 10·critical − 4·high − 1.5·medium − 0.5·low, 0, 100))`
- **Percent:** `{PCT} = score` formatted as a 4-wide right-aligned string
  ending in `%` (e.g. `  9%`, ` 72%`, `100%`).
- **Grade / verdict** (each `{VERDICT}` is exactly 20 chars — copy as-is):
  - `score ≥ 90` → `A` — `ship it             `
  - `score ≥ 75` → `B` — `polish remaining    `
  - `score ≥ 60` → `C` — `fixable, not yet    `
  - `score ≥ 40` → `D` — `needs work          `
  - else           `F` — `rebuild required    `
- **Severity bars (18-cell):**
  `max_sev = max(critical, high, medium, low)`.
  `fill = round(value / max_sev × 18)` if `max_sev > 0` else `0`.
  Bar = `'▓' × fill + '░' × (18 − fill)`.
- **Status bars (14-cell):** same formula with `max_status = max(clean, warn, crit_pages)` over 14 cells.
- **Health bar (20-cell):** `fill = round(score / 100 × 20)`.
- **Check bars (12-cell):**
  `max_chk = max(titles, meta, heading, canon, og, schema, content, links, index, geo)`.
  `fill = round(value / max_chk × 12)` if `max_chk > 0` else `0`.
- **Zero rows:** still emit the full bar of `░` and the count right-aligned.

## The template

Copy this verbatim. Replace every `{TOKEN}`. Preserve every space and
box-drawing character. Tokens are shown with trailing dots (e.g.
`{HOST..............}`) to visualize the exact field width — when
substituting, replace the whole token including the dots.

````markdown
```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ █▄▄ █▀█ █▄ █ █▀▀ █▀▄▀█ █▀▀ ▄▀█ █                                                                 │
│ █▄█ █▄█ █ ▀█ ██▄ █ ▀ █ ██▄ █▀█ █▄▄     overgrow · seo / geo audit · fertilize your site          │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
┌─ SUMMARY ────────────────────┐ ┌─ HEALTH ─────────────────────┐ ┌─ PAGE STATUS ────────────────┐
│ site   {HOST..............}  │ │          {SCORE}/100         │ │ ✓ clean {BAR14...........}{N3}│
│ scope  {SCOPE.............}  │ │ {BAR20............}    {PCT} │ │ ! warn  {BAR14...........}{N3}│
│ pages  {N_PAGES...........}  │ │                              │ │ ✗ crit  {BAR14...........}{N3}│
│ run    {DATESTAMP.........}  │ │ {GRADE}  {VERDICT..........} │ │                              │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
┌─ SEVERITY ───────────────────┐ ┌─ CHECKS ─────────────────────┐ ┌─ TOP FIXES ──────────────────┐
│ crit {BAR18..........}   {N3}│ │ titles    {BAR12......}  {N3}│ │ 1 {FIX25................}    │
│ high {BAR18..........}   {N3}│ │ meta      {BAR12......}  {N3}│ │ 2 {FIX25................}    │
│ med  {BAR18..........}   {N3}│ │ heading   {BAR12......}  {N3}│ │ 3 {FIX25................}    │
│ low  {BAR18..........}   {N3}│ │ canonical {BAR12......}  {N3}│ │ 4 {FIX25................}    │
│ ──────────────────────────── │ │ og        {BAR12......}  {N3}│ │ 5 {FIX25................}    │
│ total                    {T3}│ │ schema    {BAR12......}  {N3}│ │                              │
│                              │ │ content   {BAR12......}  {N3}│ │ next ✦                       │
│ ✦ bonemeal grows the site    │ │ links     {BAR12......}  {N3}│ │  → .overgrow/audit.md        │
│ ✦ fix crits before sprouting │ │ indexable {BAR12......}  {N3}│ │  → spawn-pages · blogs       │
│ ✦ mine schema, plant anchors │ │ geo       {BAR12......}  {N3}│ │  → spawn-internal-links      │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
             ▓▓ overgrow · bonemeal · {DATESTAMP..........}  ·  grow your site ▓▓
```
````

## Worked example (the template after substitution)

Input: `critical=3, high=12, medium=24, low=8` → `score = 72`, grade `C`.
Checks: `titles=6, meta=4, heading=9, canonical=3, og=5, schema=15, content=3,
links=7, indexable=1, geo=4`. Pages: `clean=18, warn=24, crit=6`.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ █▄▄ █▀█ █▄ █ █▀▀ █▀▄▀█ █▀▀ ▄▀█ █                                                                 │
│ █▄█ █▄█ █ ▀█ ██▄ █ ▀ █ ██▄ █▀█ █▄▄     overgrow · seo / geo audit · fertilize your site          │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░▒░│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
┌─ SUMMARY ────────────────────┐ ┌─ HEALTH ─────────────────────┐ ┌─ PAGE STATUS ────────────────┐
│ site   example.com           │ │           72/100             │ │ ✓ clean ▓▓▓▓▓▓▓▓▓▓▓░░░  18   │
│ scope  all                   │ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░    72%  │ │ ! warn  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓  24   │
│ pages  48                    │ │                              │ │ ✗ crit  ▓▓▓▓░░░░░░░░░░   6   │
│ run    2026-04-22 14:03      │ │ C  fixable, not yet          │ │                              │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
┌─ SEVERITY ───────────────────┐ ┌─ CHECKS ─────────────────────┐ ┌─ TOP FIXES ──────────────────┐
│ crit ▓▓░░░░░░░░░░░░░░░░    3 │ │ titles    ▓▓▓▓▓░░░░░░░     6 │ │ 1 add H1 to /pricing         │
│ high ▓▓▓▓▓▓▓▓▓░░░░░░░░░   12 │ │ meta      ▓▓▓░░░░░░░░░░     4│ │ 2 dedupe "Home" title on 4   │
│ med  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   24 │ │ heading   ▓▓▓▓▓▓▓░░░░░     9 │ │ 3 canonical missing /blog/*  │
│ low  ▓▓▓▓▓▓░░░░░░░░░░░░    8 │ │ canonical ▓▓░░░░░░░░░░      3│ │ 4 7 orphan pages, wire links │
│ ──────────────────────────── │ │ og        ▓▓▓▓░░░░░░░░     5 │ │ 5 no schema on 14 blog posts │
│ total                     47 │ │ schema    ▓▓▓▓▓▓▓▓▓▓▓▓    15 │ │                              │
│                              │ │ content   ▓▓░░░░░░░░░░      3│ │ next ✦                       │
│ ✦ bonemeal grows the site    │ │ links     ▓▓▓▓▓▓░░░░░░     7 │ │  → .overgrow/audit.md        │
│ ✦ fix crits before sprouting │ │ indexable ▓░░░░░░░░░░░      1│ │  → spawn-pages · blogs       │
│ ✦ mine schema, plant anchors │ │ geo       ▓▓▓░░░░░░░░░      4│ │  → spawn-internal-links      │
└──────────────────────────────┘ └──────────────────────────────┘ └──────────────────────────────┘
             ▓▓ overgrow · bonemeal · 2026-04-22 14:03    ·  grow your site ▓▓
```
