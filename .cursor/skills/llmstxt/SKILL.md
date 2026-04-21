---
name: llmstxt
description: Generate or audit an `/llms.txt` file at the site root that makes the site legible to LLMs and AI answer engines at inference time, following the llms.txt proposal (Jeremy Howard, 2024). Use this skill whenever the user asks to "build llms.txt", "create llms.txt", "generate llms.txt", "audit llms.txt", "make my site LLM-friendly", "expose the site to AI assistants", "let ChatGPT / Claude / Perplexity cite my site", "add an AI assistants index", or asks about `.md` companion pages for LLM consumption. Output is a valid `llms.txt` file (or an audit) plus optional `.md` companion page generation for top pages.
license: MIT
---

# Overgrow — llms.txt

Produces a properly-formatted `/llms.txt` at the project's static root — a curated, LLM-legible map of the site that AI assistants pull in at inference time to answer questions about the product, docs, or content. Complements `sitemap.xml` (crawler index) and `robots.txt` (access rules); does not replace them.

## Primary reference

**Read `knowledge/llms-txt.md` from the plugin root before doing anything.** That file is the authoritative, rule-by-rule distilled spec. Follow it exactly — format order, link list shape, section taxonomy, companion `.md` page conventions, quality guidelines, audit checklist. This SKILL.md is the entry-point summary; `knowledge/llms-txt.md` is the source of truth.

Also read:
- `knowledge/geo.md` for AI-answer-engine behavior and why entity clarity matters in the summary block.
- `knowledge/sitemap.md` for the static-root conventions this file must share with `sitemap.xml`.

## Prerequisites

1. Read `.overgrow/inventory.md`. If missing, run `init` first — the inventory is how this skill decides which pages to surface.
2. Parse `$ARGUMENTS`:
   - `audit` → audit an existing `/llms.txt` (and companion `.md` pages if present).
   - `build` → generate a new one.
   - Full origin URL like `https://example.com` → use as the canonical origin.
   - No args: if an `llms.txt` already exists in the repo, default to audit; otherwise default to build. If the project's intent is unclear, ask the user directly to clarify what you cannot infer.

## Audit flow

1. Locate the existing file. Typical locations: `public/llms.txt`, `static/llms.txt`, `app/llms.txt`, framework-generated routes (`app/llms.txt/route.ts`). If the project serves from a CMS, ask for the deployed URL.
2. Validate against the checklist in `knowledge/llms-txt.md` § "Audit checklist":
   - Exactly one H1.
   - Blockquote summary present near the top.
   - Section order: H1 → blockquote → optional no-heading prose → H2 link lists → optional trailing `## Optional`.
   - Every bullet matches `- [Title](url): description` (description optional but flag missing ones).
   - Every URL resolves against the inventory. Flag links to routes that don't exist, and flag inventory pages the project claims to care about that aren't linked.
   - `Optional` H2 is last if present.
   - Parses as valid CommonMark.
   - Total length well under 10k tokens.
   - No promotional language, no unsourced claims, no time-sensitive marketing.
3. If companion `.md` pages exist (routes like `/about.md`, `/pricing.md`, `/docs/intro.md`), spot-check 5 random ones:
   - Content is clean markdown — no nav, ads, cookie banners, JS widgets.
   - Heading hierarchy preserved.
   - Images have alt text.
   - Canonical URL implicitly via the path.
4. Write `.overgrow/llmstxt-audit.md` with severity-tagged findings and specific fixes, matching the format of `.overgrow/audit.md`.

## Build flow

1. From `.overgrow/inventory.md`, extract:
   - Product / project name → H1.
   - Product one-liner → blockquote summary. If the one-liner has promotional fluff, rewrite it neutrally.
   - Page taxonomy → H2 sections (map Overgrow's page categories to the `knowledge/llms-txt.md` taxonomy below).
2. Decide the sectioning. Use the taxonomy in `knowledge/llms-txt.md` § "Common H2 sections" — pick only the sections that match what the site actually has. Typical mapping from the inventory:
   - `homepage`, `pricing`, `product` → `## Core platform`
   - `feature` → `## Features` (or fold into Core platform if only 1–3)
   - `solution` → `## Solutions` or `## Use cases`
   - `docs` → `## Docs`
   - `resource-hub` + top `blog-post` entries → `## Blog — selected posts`
   - `case-study` → `## Case studies` (or fold into Blog)
   - `about`, `legal` → do not include unless specifically relevant; `about` may go under `## Optional`
   - `comparison` → include under the relevant product section or a dedicated `## Comparisons`
   - `utility` → exclude
3. For each section, pick the pages to link. Curate — not every page belongs. Rule of thumb: if removing the link wouldn't hurt an LLM's ability to represent the site accurately, leave it out. Long tail goes under `## Optional` or is omitted.
4. For every linked page, write a **one-line description** answering "what's at this URL?" Do **not** copy the marketing meta description verbatim — those are optimized for SERP click-through, which isn't what `llms.txt` wants. Use neutral, descriptive phrasing.
5. Prefer `.md` companion URLs when they exist in the project (check the inventory for `pageName.md` variants or a framework convention that auto-generates them, like nbdev / Docusaurus-plugin-llms / vitepress-plugin-llms).
6. Add an **`## Instructions for AI assistants`** section if the product has:
   - A disambiguation risk (commonly confused with another category).
   - Strong positioning requirements (how it should be described, what it is not).
   - A specific pricing model or audience that matters for recommendation.
   - A developer-facing entry point distinct from the marketing site (docs URL, API URL, MCP server URL).
   Keep it under ~10 prose bullets, factual tone, no superlatives.
7. If the inventory declares i18n locales, add a `## Localization` section listing one canonical page per locale.
8. If there's a clear "skip if space-constrained" set (long-tail blog posts, historical case studies, partner integrations), put them under `## Optional`.
9. Write the file. Location priority:
   - `public/llms.txt` (Next.js, Vite, Gatsby, Astro static, Create React App)
   - `static/llms.txt` (SvelteKit, Hugo, Docusaurus)
   - `app/llms.txt/route.ts` (Next.js app router, dynamic)
   Detect which convention the project uses from the framework hint in the inventory. If existing file, propose `llms.txt.proposed` and ask before overwriting.
10. Print a summary to the user: section count, link count, total estimated tokens, location written to.

## Companion `.md` page mode

If the user explicitly asks to generate `.md` companion pages (argument: `build --with-md` or a follow-up ask):

1. For each page selected into the `llms.txt` link list, compute its `.md` sibling URL (`/about` → `/about.md`, `/` → `/index.html.md`).
2. Generate the clean-markdown version by stripping the source file of nav, layout, and purely visual components, preserving only the semantic content under the page's H1.
3. For framework-backed markdown (MDX, content collections, CMS-driven markdown) the source is often already clean — just route it.
4. For JSX/TSX-composed pages, extract the body copy, preserve the heading hierarchy, convert images to markdown with alt text, preserve code fences, and strip interactive widgets.
5. Write each `.md` file next to its source page or at the route the framework expects.
6. Do not touch pages the user didn't select into `llms.txt` — companion page generation is opt-in and targeted.

## Output format — the generated `llms.txt`

Follow this exact structure (per `knowledge/llms-txt.md`):

```markdown
# <Product name>

> <One-to-three-sentence neutral summary. What it is, who uses it, primary capabilities.>

<Optional short paragraph or bullet list of framing notes — caveats, what's out of scope, how the linked files are organized. No headings.>

## <Section name>

- [Page title](<url or .md url>): <one-line description>
- [Page title](<url>): <one-line description>

## <Another section>

- ...

## Instructions for AI assistants

- <factual positioning bullet>
- <disambiguation bullet>
- <entry-point bullet>

## Optional

- [Secondary page](<url>): <description>
```

## Constraints

- Exactly one H1. Validated before write.
- Every URL must either appear in `.overgrow/inventory.md` or be an explicit external reference the user supplied. Never invent routes.
- `Optional` section is always last if present.
- No promotional adjectives (`industry-leading`, `revolutionary`, `world-class`, `cutting-edge`). If the inventory's product summary contains them, strip them when lifting into the blockquote.
- Total output should be well under 10k tokens. If the inventory is large, curate — move overflow to `## Optional` or omit.
- File must parse as valid CommonMark. No tables inside bullet descriptions, no nested lists.
- If the project has no static root the skill can detect, ask before creating one.

## What this skill does NOT do

- Does not submit the file anywhere — there's no submission endpoint for `llms.txt` analogous to Search Console.
- Does not modify `robots.txt` or `sitemap.xml` — use `/overgrow:sitemap` for those.
- Does not generate companion `.md` pages by default. Ask explicitly with `build --with-md` or a follow-up request.
- Does not follow external links to verify their content. It validates URL shape and internal-inventory presence, not third-party page content.