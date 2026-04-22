---
name: init
description: Scan the current codebase to identify and categorize every public-facing page (landing pages, product/feature pages, solutions, pricing, resources, blogs, case studies, about, legal) and produce a single authoritative inventory document. Use this skill whenever the user asks to "init overgrow", "set up overgrow", "scan the site", "inventory the pages", "categorize pages", "map the site", or whenever any other overgrow skill needs a baseline page map and none exists yet. Output is a structured markdown inventory at `.overgrow/inventory.md` that all other overgrow skills read from.
license: MIT
---

# Overgrow — Init (Site Inventory)

This skill builds the **foundation document** that every other overgrow skill depends on: a complete, categorized inventory of the site's public-facing pages and the core product/value offering behind them.

If the user provided a path via `$ARGUMENTS`, treat that as the site root. Otherwise scan from the current working directory. Also check .cursorrules for any project conventions. If product details cannot be inferred from the code, ask the user directly to clarify what you cannot infer.

## Reference knowledge

Before scanning, read from the plugin's `knowledge/` directory to calibrate what "good" looks like:

- `knowledge/geo.md` — SEO + GEO master reference. Use it to frame what signals are worth inventorying.
- `knowledge/pages.md` — H-tag structure and AI-overview formatting rules. Informs the H1 / meta capture fields below.

These files ship with the plugin. If not reachable, fall back to this SKILL.md and continue.

## What this skill produces

A single file at `.overgrow/inventory.md` with these sections:

1. **Product summary** — company/product name, one-line value prop, target audiences, primary verticals, key differentiators.
2. **Tech stack & routing conventions** — framework (Next.js, Astro, Nuxt, SvelteKit, MDX blog, Hugo, Jekyll, WordPress export, etc.), where pages live, how routes are generated, any i18n conventions.
3. **Authoring conventions** — how existing pages and posts are actually authored: file extension in use, layout/wrapper imports, metadata pattern, styling convention, reusable section components. This is the signal the spawn skills read to decide whether to emit `.tsx`, `.astro`, `.svelte`, `.mdx`, `.md`, or a CMS migration note.
4. **Page inventory** — every public page grouped by category, with route, source file path, H1 / current title, current meta description (if any), and one-line purpose.
5. **Content gaps** — missing page types relative to the product (no pricing page, no solutions pages, thin blog, missing comparison pages, etc.).
6. **Semantic pillars** — the 3-7 core topical areas the site should own, derived from the product and the existing content.

Other overgrow skills (`audit`, `spawn-pages`, `spawn-blogs`, `spawn-internal-links`, `sitemap`) read this file to avoid duplicating work.

## How to discover pages

Codebases differ. Work through this detection order and stop once you have reliable coverage:

1. **Framework hints** — look for `next.config.*`, `astro.config.*`, `nuxt.config.*`, `svelte.config.*`, `gatsby-config.*`, `_config.yml` (Jekyll), `hugo.toml`, `package.json` dependencies.
2. **Route files** — glob for the framework's page conventions:
   - Next.js app router: `app/**/page.{tsx,jsx,ts,js,md,mdx}`
   - Next.js pages router: `pages/**/*.{tsx,jsx,ts,js,md,mdx}` excluding `_*`, `api/**`
   - Astro / SvelteKit: `src/pages/**`, `src/routes/**/+page.*`
   - Nuxt: `pages/**`
   - Content-driven: `content/**/*.md(x)`, `posts/**/*.md`, `blog/**/*.md`, `_posts/**`
3. **Sitemap files** — `public/sitemap.xml`, `static/sitemap.xml`, `sitemap.xml.ts`, `sitemap.config.*` often list canonical URLs.
4. **MDX / Markdown front-matter** — for blogs and docs, parse frontmatter for `title`, `description`, `date`, `tags`, `category`, `draft`.
5. **CMS adapters** — if the repo fetches from Contentful/Sanity/Strapi/Payload/WordPress, note that pages are external and mark the inventory as "code routes + CMS-driven". Ask the user for a CMS export or sitemap URL.

For each page discovered, extract:
- **Route / URL path** (normalized, leading slash, no trailing slash except `/`)
- **Source file path**
- **H1** (from JSX/markdown), **current `<title>`**, **current meta description**
- **Category** (see taxonomy below)
- **Purpose** — one sentence in your own words

## Page taxonomy

Classify every page into exactly one primary category:

- `homepage` — the root landing page
- `product` — product overview or main product landing
- `feature` — feature detail page (one feature per page)
- `solution` — use-case or industry page
- `pricing` — pricing / plans
- `comparison` — vs-competitor pages, alternatives pages
- `resource-hub` — blog index, resource center, guides index
- `blog-post` — individual blog article
- `case-study` — customer story
- `guide` — long-form tutorial or pillar guide
- `docs` — technical documentation
- `about` — about / team / company
- `legal` — privacy, terms, security, compliance
- `utility` — 404, search, sitemap page, login, signup (note but exclude from SEO scope)

## Product summary heuristics

Derive the product summary from, in order of authority:

1. Homepage H1 + subtitle + hero CTA text.
2. `<title>` and meta description of the homepage.
3. `README.md`, `package.json` `description`.
4. About page copy.
5. Repeated phrasing across multiple pages (strong signal of positioning).

If two of these conflict, prefer the homepage hero (it's the one the site is actually shipping). Flag the conflict in the inventory.

## Semantic pillars

Pillars are the 3-7 topic clusters the site should rank for. Derive them by clustering existing pages and blog posts by topic, then naming the cluster. A healthy pillar has:
- A pillar/hub page (often a solution page or a long guide)
- 3+ supporting pages/posts
- A clear keyword territory

If the site has <3 blog posts per pillar, flag it under "Content gaps" — `spawn-blogs` will use this to plan query-fanout expansion.

## Output format

Write (or overwrite) `.overgrow/inventory.md` using exactly this structure:

```markdown
# Overgrow Inventory

_Generated: <YYYY-MM-DD>_
_Site root: <absolute path>_
_Framework: <detected framework + version>_

## Product

- **Name:** <product name>
- **One-liner:** <value prop in one sentence>
- **Primary audience:** <who>
- **Secondary audiences:** <who, if any>
- **Verticals / industries:** <list>
- **Key differentiators:** <3-5 bullets>
- **Source of truth:** <homepage hero | README | about page | mix — note conflicts>

## Routing

- **Framework:** <name>
- **Page roots:** <paths>
- **Content roots:** <paths for MDX/markdown if any>
- **Sitemap location:** <path or "none found">
- **i18n:** <none | locales list>
- **CMS:** <none | name — how content is fetched>

## Authoring conventions

Read 2-3 representative existing pages (one landing page and one blog post if both exist) and record:

- **Landing / product pages**
  - **File extension:** <.tsx | .jsx | .astro | .svelte | .vue | .mdx | .md>
  - **Layout wrapper:** <import path, or "none" — e.g. `import Layout from '@/components/Layout'` | `<Layout>` in Astro | `+layout.svelte` | root layout in Next.js App Router>
  - **Metadata pattern:** <Next.js `export const metadata` | Next.js `<Head>` | SvelteKit `<svelte:head>` | Astro frontmatter + `<SEO>` | markdown frontmatter | CMS field>
  - **Styling:** <Tailwind | CSS modules | styled-components | vanilla CSS | UnoCSS | etc.>
  - **Reusable section components found:** <e.g. `<Hero />`, `<FeatureGrid />`, `<CTA />`, `<FAQ />` — with source paths, or "none">
  - **Example page to mirror:** <source path of a good representative page>
- **Blog posts**
  - **File extension:** <.md | .mdx | .tsx | CMS>
  - **Frontmatter shape:** <exact keys and order from an existing post, e.g. `title, description, date, author, tags, draft`>
  - **Content source:** <filesystem | Contentful | Sanity | Payload | WordPress | Strapi | etc.>
  - **Example post to mirror:** <source path>
- **Placeholder idiom to use in new files:** <`{/* placeholder: ... */}` for JSX | `<!-- placeholder: ... -->` for markdown/Astro/Svelte template regions>

If the site has no existing blog posts or no existing landing pages, mark that sub-block as "none yet — spawn skills should match the other authoring branch."

## Page inventory

### Homepage
| Route | Source | H1 | Title | Meta description | Purpose |
|---|---|---|---|---|---|

### Product / Features
### Solutions
### Pricing
### Comparison
### Resource hub
### Blog posts
### Case studies
### Guides
### Docs
### About
### Legal
### Utility (excluded from SEO scope)

(Include only the categories that have at least one page. Within each table, one row per page. Use `—` for missing data.)

## Semantic pillars

1. **<Pillar name>** — <one-line scope>. Hub: <route or "missing">. Supporting: <count> pages/posts.
2. ...

## Content gaps

- <Missing page type or thin pillar — one bullet each>

## Notes

<Anything surprising: duplicate routes, pages with no meta description, mismatched H1s, stale dates, broken internal links noticed during scan, CMS-driven content not fully enumerated, etc.>
```

## Execution steps

1. Read `.overgrow/inventory.md` if it exists — ask the user whether to refresh or append before overwriting.
2. Detect framework and routing conventions.
3. Enumerate all page source files with Glob.
4. Read 2-3 representative page files in full to capture authoring conventions (layout imports, metadata pattern, styling, reusable section components, frontmatter shape for posts).
5. For each file, extract route + H1 + title + meta + purpose. Skip API routes, middleware, layouts, and `_*` helper files.
6. Classify into the taxonomy above.
7. Derive the product summary.
8. Cluster into semantic pillars.
9. Identify content gaps.
10. Write the inventory file including the `Authoring conventions` section. Create the `.overgrow/` directory if missing.
11. Print a short summary to the user: page count per category, pillar count, top 3 gaps.

## What this skill does NOT do

- Does not rewrite any page content (that's `spawn-pages` / `spawn-blogs` / `humanize`).
- Does not audit SEO quality (that's `audit`).
- Does not add internal links (that's `spawn-internal-links`).
- Does not publish or submit anything. Output is a local markdown file only.