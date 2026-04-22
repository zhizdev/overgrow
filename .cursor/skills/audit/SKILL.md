---
name: audit
description: Audit on-page SEO and GEO (generative engine optimization) signals across the site — title tags, meta descriptions, H1/H2/H3 hierarchy, canonical tags, Open Graph, structured data, content length, internal link density, and AI-citation readiness. Use this skill whenever the user asks to "audit SEO", "check metadata", "review titles and descriptions", "check heading structure", "run an SEO audit", "GEO audit", "check schema markup", "find SEO issues", or review any on-page signal affecting organic or AI-search visibility. Output is a prioritized issue list with per-page findings and fixes.
license: MIT
---

# Overgrow — SEO / GEO Audit

This skill inspects existing pages for on-page SEO and generative-engine visibility issues and returns a prioritized fix list. It does not rewrite content — use `spawn-pages` or `humanize` to implement the fixes afterwards.

## Prerequisites

Read `.overgrow/inventory.md` first. If it does not exist, run the `init` skill before continuing. If the user scoped the audit via `$ARGUMENTS` (e.g. `blog`, `/pricing`, `solutions/*`), limit the scope to matching pages. Otherwise audit every page in the inventory except `utility` and `legal`.

## Reference knowledge

Before auditing, read from the plugin's `knowledge/` directory:

- `knowledge/geo.md` — SEO + GEO master reference. Authoritative on foundations, content structure, E-E-A-T, technical SEO, AI extraction, schema, and measurement. The checks below are a summary; `geo.md` is the source of truth for thresholds.
- `knowledge/pages.md` — H-tag hierarchy and AI-overview formatting rules. Heading and answer-block checks come from here.
- `knowledge/sitemap.md` — referenced only for the indexability / robots / canonical checks.

When an audit check differs between this SKILL.md and the knowledge file, prefer the knowledge file.

## What to check

Run every page through the following checks. Each check produces zero or more findings.

### 1. Title tag

- **Exists** — `<title>` or framework equivalent is present and non-empty.
- **Length** — 50-60 characters ideal. Flag < 30 (too thin) or > 65 (truncates in SERPs).
- **Uniqueness** — no two pages share the same title.
- **Primary keyword present** — the page's target keyword (from inventory purpose or H1) should appear.
- **Brand placement** — homepage can lead with brand; every other page should lead with the topic/keyword then brand.
- **Avoid** — generic titles ("Home", "Untitled", brand-only, "Page N"), keyword stuffing, ALL CAPS.

### 2. Meta description

- **Exists** — present and non-empty.
- **Length** — 120-158 characters ideal. Flag < 70 or > 165.
- **Uniqueness** — no two pages share the same description.
- **Click-worthy** — reads like ad copy, not a sentence copy-pasted from the body.
- **Primary keyword present** — appears naturally once.
- **No truncated sentences** — does not end mid-word.

### 3. Heading hierarchy

- **Exactly one H1** per page. Flag 0, 2+, or multiple H1s rendered from components.
- **H1 content** — matches or closely aligns with the title tag and page purpose.
- **No skipped levels** — H1 → H2 → H3 with no jumps to H3 or H4 directly under H1.
- **H2 presence** — every section break has an H2. Pages with a single H1 and only paragraphs are flagged for structure.
- **Heading length** — H1 ≤ 70 chars, H2 ≤ 60, H3 ≤ 60.
- **No heading-as-styling** — headings should convey document structure, not be used for visual emphasis on body text.

### 4. URL and canonical

- **Canonical tag** present on every indexable page and self-referential unless intentionally consolidated.
- **URL shape** — lowercase, hyphen-separated, no query strings for content pages, no trailing slash inconsistencies.
- **Depth** — flag any content page > 3 path segments deep (indicates poor IA).
- **Localized duplicates** — if i18n, each locale needs its own canonical + hreflang.

### 5. Open Graph / social

- `og:title`, `og:description`, `og:image`, `og:url`, `og:type` present.
- `twitter:card` set (usually `summary_large_image`).
- OG image dimensions: 1200x630 px recommended. Flag missing OG image.

### 6. Structured data (schema.org, JSON-LD)

Per page category:
- `homepage` → `Organization` + `WebSite` (with SearchAction)
- `product` / `feature` → `Product` or `SoftwareApplication`
- `solution` → `Service`
- `pricing` → `Product` with `Offer`
- `blog-post` → `BlogPosting` or `Article` (required: headline, author, datePublished, image)
- `case-study` → `Article` with `about`
- `resource-hub` → `CollectionPage`
- Every page with a breadcrumb UI → `BreadcrumbList`
- FAQ sections → `FAQPage`
- Review/testimonial sections → `Review` or `AggregateRating`

Flag any missing schema for the page's category, and any schema with invalid required fields.

### 7. Content quality signals

- **Word count** — flag thin content: < 300 words for blog posts / guides, < 250 for landing pages (excluding nav/footer).
- **First-paragraph lead** — first paragraph under H1 should state what the page is about within 2 sentences.
- **Answer-ready blocks** — blog posts should have at least one concise definition or Q-style block for AI citation. Flag long posts with no scannable answer block.
- **Images** — every contentful image has descriptive alt text. Flag empty or missing alt on non-decorative images.
- **Outbound evidence** — guides and blog posts with zero outbound citations to authoritative sources are flagged (weak GEO signal).

### 8. Internal link signals

- **Orphan pages** — pages with zero internal inbound links from other content pages.
- **Dead-end pages** — pages with zero internal outbound links to other relevant content.
- **Anchor quality** — "click here", "read more", "link", or raw URL anchor text is flagged.
- Full semantic graph work belongs to `spawn-internal-links`; here only surface the symptoms.

### 9. Technical indexability (best-effort static checks)

- `robots` meta — flag any unintentional `noindex` on content pages.
- `<link rel="alternate" hreflang=...>` — flag missing hreflang on i18n sites.
- `lang` attribute on `<html>` present.

### 10. GEO-specific signals

- **Entity clarity** — the product, people, and key terms are named with consistent phrasing across pages.
- **Factual assertions** — claims that cite data include the number and source.
- **Q&A blocks** — FAQ or inline Q-headings that mirror natural-language queries.
- **Date freshness** — blog posts and guides show visible `datePublished` and `dateModified` where appropriate.
- **Definitional lead** — pillar pages lead with a crisp 1-2 sentence definition of the core term (what LLMs extract).

## How to run the audit

1. Load `.overgrow/inventory.md`. If scope is given, filter the page list.
2. For each page, read its source file(s). For CMS-driven pages, ask the user for an export or a rendered HTML sample.
3. Run every check against the page. Be conservative — only flag real issues, not style preferences.
4. Aggregate findings into `.overgrow/audit.md` (overwrite with timestamp; archive prior runs to `.overgrow/audit-<YYYY-MM-DD>.md` if present).

## Output format

Write `.overgrow/audit.md`:

```markdown
# Overgrow SEO/GEO Audit

_Run: <YYYY-MM-DD HH:MM>_
_Scope: <all | filter>_
_Pages audited: <N>_

## Summary

- **Critical issues:** <count> (blocks indexing or major ranking loss)
- **High:** <count>
- **Medium:** <count>
- **Low / polish:** <count>

Top 5 fixes by impact:
1. ...

## Findings by page

### <Route> (<category>)
_Source: <path>_

- [severity] **<Check name>:** <specific finding>. **Fix:** <one-line fix>.
- ...

(Repeat for every page with at least one finding. Pages with zero findings are listed once under "Clean pages" at the bottom.)

## Cross-page findings

- **Duplicate titles:** <list of routes sharing a title>
- **Duplicate descriptions:** <...>
- **Orphan pages:** <list>
- **Missing schema by category:** <summary>

## Clean pages

<routes with zero findings>
```

Severity guide:
- **critical** — noindex on a content page, missing or duplicate title, H1 missing, canonical pointing off-domain, invalid required schema fields.
- **high** — meta description missing/duplicated, multiple H1s, heading skips, thin content, orphan page.
- **medium** — heading length out of range, missing OG image, weak anchor text, missing optional schema.
- **low** — stylistic title tweaks, minor length polish, freshness notes.

## Terminal share card

After `.overgrow/audit.md` is written, print a visual ASCII dashboard to the
conversation so the result is screenshot-friendly. Follow
`reference/share-card.md` exactly:

- Read the template, rules, and worked example in `reference/share-card.md`
  before emitting anything.
- Wrap the entire card in a single triple-backtick fenced block so monospace
  alignment survives rendering.
- Lead the card with the block-letter `BONEMEAL` logo from the template. Do not
  substitute with a different wordmark or a smaller logo.
- Compute the health score, grade, and bar widths deterministically per the
  rules in the reference. Do not freestyle the numbers.
- The card is the final output of the turn. After the closing code fence, write
  one short sentence pointing the user at `.overgrow/audit.md` — nothing else.

If the terminal is narrower than 80 columns (user has said so, or you can tell
from prior output wrapping), still emit the card — users screenshot it, and
reflowing would break the ASCII art.

## Execution principles

- Report findings, don't fix. Fixes go to `spawn-pages` (regenerate) or to the user (manual tweak).
- Be specific — reference the exact file path and line when possible so the user can jump to it.
- Do not invent findings to pad the report. Empty sections are fine.
- If the page source cannot be parsed (dynamic CMS, heavy runtime composition), state that clearly rather than guessing.