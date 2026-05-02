---
name: spawn-pages
description: Given the product offering and existing page inventory, create new core landing and resource pages (homepage refresh, features, solutions, pricing, comparison, resource hubs, about) that capture core product intent using the query-fanout pattern. Use this skill whenever the user asks to "spawn pages", "generate landing pages", "create marketing pages", "build a pricing page", "add a solutions page", "build out the site", "fill in missing pages", or wants new top-level marketing/product pages. Output is one new page per route in the project's native file format (component or markdown), matching the existing page style and framework idiom.
user-invocable: true
argument-hint: "[optional: page type or audience seed]"
license: MIT
allowed-tools: WebSearch,Bash,Read,Edit,Write,Glob,Grep
---

# Overgrow — Spawn Pages (Core Marketing & Product Pages)

This skill plans and drafts net-new core pages that close gaps in the site's marketing structure — the pages buyers hit before they become leads. It applies the **query-fanout** pattern to audience-and-intent space (who is searching, what stage, what objection) rather than to blog topics.

## Prerequisites

1. Read `.overgrow/inventory.md`. If missing, run `init` first.
2. Read `.overgrow/audit.md` if present — flagged gaps are prime spawn targets.
3. Parse `$ARGUMENTS`: if a page type, audience, or vertical seed is given, scope to it. Otherwise propose 3-5 candidate pages to spawn and STOP and call the AskUserQuestion tool to clarify. which to run.

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

Before writing anything, read the `Authoring conventions` section of `.overgrow/inventory.md` and open **at least one existing page in the same route group** to mirror its imports, layout wrapper, metadata pattern, styling convention, and use of reusable section components. Never guess the idiom — copy it from what's already shipping.

Pick the output format from the inventory's detected framework:

### Component-first projects (Next.js App Router `.tsx`, SvelteKit `+page.svelte`, Astro `.astro`, Nuxt `.vue`, Remix, etc.)

Emit a real page component at the framework's expected route path:
- Next.js App Router: `app/<route>/page.tsx` (or `.jsx` / `.mdx` if that's what the project uses).
- Next.js Pages Router: `pages/<route>.tsx`.
- SvelteKit: `src/routes/<route>/+page.svelte`.
- Astro: `src/pages/<route>.astro`.
- Nuxt: `pages/<route>.vue`.

The component must:
- Import the same layout wrapper the existing pages use.
- Put metadata where the framework expects it: Next.js `export const metadata = { ... }`, SvelteKit `<svelte:head>`, Astro frontmatter + `<SEO>` component, Nuxt `useHead()` / `definePageMeta()`.
- Compose from the project's existing reusable section components when they exist (`<Hero />`, `<FeatureGrid />`, `<Pricing />`, `<CTA />`, `<FAQ />`) — pass copy in as props. If a needed primitive is missing, inline the section as JSX/Svelte/Astro markup in the same style used elsewhere in the repo, not as raw HTML.
- Use the project's styling convention exactly: Tailwind class strings, CSS modules, styled-components, UnoCSS — whatever `Authoring conventions` says.
- Include JSON-LD via a `<script type="application/ld+json">` block or the project's existing schema helper.

### Markdown / MDX content-driven projects (Astro content collections, Next.js `app/**/page.mdx`, Nuxt Content, Hugo, Jekyll, Gatsby MDX, Docusaurus)

Emit `.md` or `.mdx` at the content root used by the project (detected from the inventory — e.g. `src/content/pages/<slug>.md`, `content/pages/<slug>.mdx`). Match the **exact frontmatter shape** used by an existing page in the same collection (key names, order, required fields). Body uses the project's MDX components if any are in use.

### CMS-driven projects (Contentful, Sanity, Payload, Strapi, WordPress, etc.)

Do not write a file. Instead append a **migration note** to `.overgrow/content-plan.md` under a `## CMS migrations` section, with field-by-field copy mapped to the CMS model the user is using, plus the target route and which CMS content type to create it in.

### Every output includes

- **SEO metadata**: title (50-60 chars), meta description (120-158 chars), URL slug, primary keyword, 3-5 secondary keywords, OG title, OG description, OG image note — expressed in the idiom above (metadata export / frontmatter / CMS fields).
- **Heading hierarchy** per `knowledge/pages.md` — one H1, H2 per major section, H3 only where needed.
- **JSON-LD schema** — for component output, inline a `<script type="application/ld+json">` block or use the project's schema helper. For markdown output, include a `jsonLd:` field in frontmatter if the project supports it, otherwise leave a clearly labeled block at the top of the body.
- **Internal links** — at least 2-3 outbound links to routes that appear in `.overgrow/inventory.md`. Never invent routes. Use the project's link primitive (`<Link>`, `<a>`, `[text](route)`).
- **Placeholder markers** — for any fact, stat, logo, or testimonial not supplied by the user, use `{/* placeholder: replace with real <thing> */}` in JSX, `<!-- placeholder: replace with real <thing> -->` in markdown/Astro/Svelte template regions, or the framework's comment syntax. List all placeholders at the bottom of the file or in a `TODO` block.
- **Draft gating**: for markdown projects with a `draft` frontmatter convention, set `draft: true`. For component projects, add a `// TODO: review before shipping` header comment — the reviewer's signal, not a framework mechanism.

Then update `.overgrow/content-plan.md` with an entry for each spawned page under a `## Pages` section, noting the output file path and format (component / markdown / CMS migration).

## Surface the new page in existing index/list locations

A new page that nothing else links to is invisible. After writing the file, find every place on the site that already lists pages of the same type and add the new entry there too. Match the existing entry pattern exactly — copy the markup of an adjacent entry, swap the route, title, description, any fields to make the new page fit in cohesively.

Check, in order:

- **Footer link lists.** Open the footer component (`Footer.tsx`, `footer.astro`, `_layout`'s footer partial, etc.). If it manually lists pages of the same type as the one you spawned (alternatives, integrations, solutions, comparison pages, popular blog posts), add a link to the new page in the same list.
- **Index / hub pages.** `/alternatives`, `/integrations`, `/solutions`, `/resources`, `/compare`, `/customers`, etc. If a hub page exists for the type you spawned and lists entries manually (a hard-coded array, a JSX list, MDX with manual links), add the new page there.
- **Sibling cross-links.** If existing alternatives or comparison pages cross-link to each other (e.g. a "More comparisons" section), add the new page to those lists.
- **Sitemap and route manifests.** If the project maintains a manual `sitemap.xml` or a route array (e.g. for static export or for nav generation), add the new route.

Skip when the listing is auto-generated from a content collection or filesystem glob — the new file is picked up automatically. Only edit when the listing is manual.

This is **not** general semantic interlinking — that's `spawn-internal-links`. This is just surfacing the new page where pages of the same type are already surfaced.

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
- Follow the project's voice (check `CLAUDE.md`, `BRAND.md`, `VOICE.md`). Default to clear, active, jargon-light.
- Avoid the vocabulary banned by `humanize/reference/word-lists.md` from the start — saves a humanize pass later.
- Keep paragraphs to 2-3 sentences.
- Feature-benefit transformation: every feature paired with a concrete outcome.
- One primary CTA per section, max two in the hero.
- Never invent customer names, logos, case studies, metrics, integrations, or compliance certifications. Placeholder them instead.

## What this skill does NOT do

- Does not generate blog posts or long-form content (that's `spawn-blogs`).
- Does not add internal links across existing pages (that's `spawn-internal-links`).
- Does not run the SEO audit or humanize pass — run `audit` and `humanize` on new pages before publishing.
- Does not publish or deploy. Output lands in the repo in the project's native format, gated behind a draft flag or TODO comment for human review.
- Does not invent layout wrappers, UI primitives, or utility helpers that aren't already in the project. If a needed component is missing, inline the section in the idiom the rest of the site uses and flag it in the content plan.