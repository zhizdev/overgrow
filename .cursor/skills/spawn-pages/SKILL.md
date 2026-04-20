---
name: spawn-pages
description: Given the product offering and existing page inventory, create new core landing and resource pages (homepage refresh, features, solutions, pricing, comparison, resource hubs, about) that capture core product intent using the query-fanout pattern. Use this skill whenever the user asks to "spawn pages", "generate landing pages", "create marketing pages", "build a pricing page", "add a solutions page", "build out the site", "fill in missing pages", or wants new top-level marketing/product pages. Output is one markdown file per page plus an updated content plan.
license: MIT
---

# Overgrow — Spawn Pages (Core Marketing & Product Pages)

This skill plans and drafts net-new core pages that close gaps in the site's marketing structure — the pages buyers hit before they become leads. It applies the **query-fanout** pattern to audience-and-intent space (who is searching, what stage, what objection) rather than to blog topics.

## Prerequisites

1. Read `.overgrow/inventory.md`. If missing, run `init` first.
2. Read `.overgrow/audit.md` if present — flagged gaps are prime spawn targets.
3. Parse `$ARGUMENTS`: if a page type, audience, or vertical seed is given, scope to it. Otherwise propose 3-5 candidate pages to spawn and ask the user directly to clarify what you cannot infer. which to run.

## Reference knowledge

Before planning pages, read these from the plugin's `knowledge/` directory:

- `knowledge/geo.md` — SEO + GEO master reference. Pay attention to: foundations, content structure, E-E-A-T signals, AI extraction patterns, commercial intent.
- `knowledge/query-fanout.md` — the 15-facet query fan-out taxonomy; use it to pick which page types and sub-pages to spawn.
- `knowledge/pages.md` — H-tag structure and AI-overview-friendly formatting rules.
- `reference/page-templates.md` (this skill's own reference) — section-by-section templates and copy patterns for homepage, features, solutions, pricing, resources, and about pages.

If those files are not reachable from the current working directory, fall back gracefully using the rules summarized in this SKILL.md, but prefer the reference files when available.

## Query-fanout for pages (intent space)

Blogs fan out over questions. Pages fan out over **who is shopping and why**. Given the product's core value prop, generate candidate pages along these branches:

- **By audience / persona** — one solutions page per high-value persona (engineer, ops, CFO, founder, creator).
- **By vertical / industry** — one page per ICP vertical (healthcare, fintech, ecommerce, dev tools).
- **By use case / job-to-be-done** — one page per top JTBD.
- **By plan tier / offering** — pricing + per-tier landing pages (Starter, Team, Enterprise).
- **By comparison / alternative** — "X vs <top competitor>", "alternatives to <competitor>" pages.
- **By integration** — "X for <popular tool>" landing pages (often high-intent long-tail).
- **By company stage** — "X for startups", "X for enterprise".
- **By objection** — security, compliance, privacy landing pages; "is X right for us".
- **Trust hubs** — about, customers, press, security, status — often thin or missing.
- **Conversion surfaces** — demo, contact sales, book-a-call, free-trial explainer.

Cross-check every candidate against the inventory. Do not duplicate existing pages. Rank by: (1) search/AI intent volume, (2) conversion proximity, (3) competitive gap.

## Page types and templates

Use the section-by-section templates in `reference/page-templates.md` for:

- Homepage / main landing page
- Features page
- Solutions page (per use case or industry)
- Pricing page
- Resources page (hub, not individual posts)
- About page

For page types **not** covered there — comparison, integration landing, security/trust, demo — use this minimum structure:

1. Hero (H1 + subtitle + primary CTA + optional secondary CTA + visual direction note).
2. Social proof row (logos, stats, badges — only if real).
3. Two to four value/benefit blocks (H2 + short body + concrete outcome per block).
4. Evidence section (customer quote, case study summary, or data) — mark as placeholder if none is supplied.
5. Detail section tailored to the page type (comparison table / integration diagram / compliance list / demo form).
6. FAQ (3-6 Qs, structured for `FAQPage` schema).
7. Bottom CTA.
8. Schema recommendation (WebPage/Product/Service/FAQPage as appropriate).

## Required output per page

For every spawned page, write one markdown file at the project's conventional route location (detected from the inventory — e.g. `app/solutions/<slug>/page.md`, `content/pages/<slug>.md`, `src/pages/<slug>.md`). Respect the project's framework. If unsure, place under `content/pages/<slug>.md` and note the intended route in a comment.

Every page file ships with:

- **SEO metadata block**: title (50-60 chars), meta description (120-158 chars), URL slug, primary keyword, 3-5 secondary keywords, OG title, OG description, OG image dimensions note.
- **Heading hierarchy** following `knowledge/pages.md` — one H1, H2 per major section, H3 only where needed.
- **Schema recommendation** — JSON-LD type(s) the dev should implement.
- **Body copy** per the template for that page type.
- **Internal links** — at least 2-3 outbound links to routes that appear in `.overgrow/inventory.md`. Never invent routes. Leave descriptive anchor text.
- **Placeholder markers** — for any fact, stat, logo, or testimonial that was not supplied by the user, use `<!-- placeholder: replace with real <thing> -->` and list all placeholders at the bottom of the file.
- **draft flag** (where the project uses frontmatter drafts): `draft: true`.

Then update `.overgrow/content-plan.md` with an entry for each spawned page under a `## Pages` section.

## Intent-to-page mapping cheat sheet

- Comparison intent (`X vs Y`) → `/compare/<competitor>` or `/alternatives/<competitor>` page.
- Vertical intent (`X for <industry>`) → `/solutions/<industry>` page.
- Role intent (`X for <role>`) → `/solutions/<role>` page.
- Integration intent (`X with <tool>`) → `/integrations/<tool>` page.
- Pricing / cost intent → `/pricing` + optional tier-specific landings.
- Security / trust intent → `/security`, `/trust`, or `/compliance` page.
- Feature deep-dive → `/features/<feature>`.

## Writing rules

- Read `knowledge/geo.md` sections on content structure and AI extraction before drafting.
- Follow the project's voice (check `.cursorrules`, `BRAND.md`, `VOICE.md`). Default to clear, active, jargon-light.
- Avoid the vocabulary banned by `humanize/reference/word-lists.md` from the start — saves a humanize pass later.
- Keep paragraphs to 2-3 sentences.
- Feature-benefit transformation: every feature paired with a concrete outcome.
- One primary CTA per section, max two in the hero.
- Never invent customer names, logos, case studies, metrics, integrations, or compliance certifications. Placeholder them instead.

## What this skill does NOT do

- Does not generate blog posts or long-form content (that's `spawn-blogs`).
- Does not add internal links across existing pages (that's `spawn-internal-links`).
- Does not run the SEO audit or humanize pass — run `audit` and `humanize` on new pages before publishing.
- Does not publish or deploy. All output is draft markdown in the repo.