# Overgrow

**Overgrow is an open-source SEO + GEO toolkit that lives inside your AI coding tool.** It scans your site, audits its on-page signals, and generates the landing pages, blog posts, internal links, and sitemap entries your product needs to show up in Google, ChatGPT, Claude, Perplexity, and Gemini.

Distributed as a Claude Code plugin, with drop-in skill bundles for Cursor, Gemini CLI, and Codex. Seven commands, one source of truth, zero copy-paste from marketing blogs.

---

## One-line value propositions

- **For growth engineers:** turn your codebase into a discoverable semantic graph without leaving the editor.
- **For SEO specialists:** stop context-switching between SEO tools and devs — the audit, the fix plan, and the content all live in the repo.
- **For GEO practitioners:** ship content that AI answer engines actually cite, structured for RAG chunking and entity extraction.
- **For founders shipping fast:** a single `/overgrow:init` maps every page you have; the spawn commands fill the gaps the same afternoon.

---

## Why Overgrow exists

Traditional SEO tools live outside your codebase. They flag issues in dashboards, produce PDFs, and leave the actual implementation to engineers who context-switch between Ahrefs and VS Code and the CMS. AI-era search makes this worse: ChatGPT, Claude, Perplexity, and Google AI Overviews pull from your pages using semantic retrieval, not keyword matching — which means structure, clarity, and citability matter more than ever, and dashboards don't fix those.

Overgrow runs where the code is. It reads your framework's routes, it understands your pillars, it edits the files. The same skill that finds a thin pillar also drafts the blog posts to fill it. The same skill that flags an orphan page also adds the internal links that un-orphan it. Feedback loop compressed from weeks to minutes.

---

## Audience

- **Growth engineers** shipping marketing surfaces alongside product code.
- **SEO specialists** who want their fix plans to become pull requests instead of spreadsheets.
- **GEO (Generative Engine Optimization) practitioners** optimizing for ChatGPT / Claude / Perplexity / AI Overviews citations.
- **Founders and solo operators** running the whole growth loop themselves.
- **Content marketers** paired with engineers who want a structured editorial pipeline in the repo.

---

## The seven commands

All user-invocable. Namespaced in Claude Code as `/overgrow:<name>`. On Codex the prefix is `$`.

### `/overgrow:init` — site inventory & pillar mapping
Scans the repo, detects the framework (Next.js, Astro, SvelteKit, Nuxt, Gatsby, Hugo, Jekyll, MDX, CMS-fetch), enumerates every public page, classifies it (homepage, product, feature, solution, pricing, comparison, resource hub, blog post, case study, guide, docs, about, legal, utility), extracts its H1 / title / meta, and clusters pages into semantic pillars. Writes `.overgrow/inventory.md` — the foundation every other command reads from.

Produces: product summary, routing conventions, categorized page inventory, 3–7 semantic pillars, content gaps.

### `/overgrow:audit` — SEO + GEO on-page audit
Inspects each page for title length, meta description quality, heading hierarchy (single H1, no skipped levels), canonical tags, Open Graph, JSON-LD schema, content depth, internal link density, AI-citation readiness (definitional leads, answer-ready Q&A blocks, entity clarity, freshness signals), and robots/index posture. Returns a prioritized fix list by severity (critical / high / medium / low) with the exact file path and line number for each finding.

Produces: `.overgrow/audit.md` with top-5 fixes, per-page findings, cross-page issues (duplicate titles, orphans, missing schema).

### `/overgrow:spawn-pages` — query-fanout for core marketing pages
Given the product and the existing inventory, identifies missing landing pages (features, solutions by persona or vertical, pricing, comparison vs competitor, integration landings, security/trust, about) and drafts them using the **query-fanout pattern** — the technique of enumerating the sub-queries modern search and AI systems decompose a shopping intent into, then covering each with a dedicated page. Every drafted page ships with SEO metadata, heading hierarchy, schema recommendations, and internal links wired to real routes.

Produces: one markdown page per spawn, plus entries in `.overgrow/content-plan.md`. All drafts default to `draft: true` for review.

### `/overgrow:spawn-blogs` — query-fanout for long-form content
Same pattern applied to blog content. Fans a seed topic across the 15-facet query taxonomy (definitional, comparative, how-to, problem/symptom, role-based, integration, migration, cost, trends, and more), filters against what already exists, and drafts posts tuned for AI-answer citation: crisp TL;DR leads, sub-query H2s, structured comparison blocks, FAQ sections ready for `FAQPage` schema, and at least two internal links per post to pages that actually exist.

Produces: one markdown post per spawn, plus content-plan tracker entries.

### `/overgrow:spawn-internal-links` — semantic graph wiring
Turns a flat set of pages into a **hub-and-spoke semantic graph** organized around the pillars identified by `init`. Maps every page to its pillar, computes current vs target link density, proposes specific link insertions with descriptive anchor text at natural insertion points, and flags orphan pages and missing link targets. Respects the project's framework idiom (markdown links for MDX, `<Link>` components for React routes, etc.). Never links to routes that don't exist.

Produces: `.overgrow/internal-links.md` with per-source-file insertion plans. Can apply directly or stay as a plan for review.

### `/overgrow:sitemap` — sitemap + robots, growth-first
Audit mode validates an existing `sitemap.xml` / `robots.txt` against sitemaps.org protocol and Google Search Central guidance, flagging coverage gaps, canonical mismatches, stale `lastmod`, and AI-crawler posture. Build mode generates both files from the inventory, including sitemap indexes for 50k+ URL sites. Default robots.txt posture: **allow every compliant crawler including AI search and AI training bots** (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, CCBot). Opt-out per user-agent when you want restriction.

Produces: `sitemap.xml`, `robots.txt`, optional `.overgrow/sitemap-audit.md`.

### `/overgrow:humanize` — deterministic AI-text cleanup
Rewrites AI-generated or AI-sounding text through a fixed 4-phase pipeline: vocabulary replacement (banned words and phrases → plain alternatives), sentence structure fixes (kill -ing tail clauses, negative parallelisms, rule-of-three padding), structural removal (vague significance sentences, "despite challenges" boilerplate, unnamed expert attributions), and final checks (em-dash reduction, sentence-length variation, opening-word diversity). Every pass emits a change log of which rules fired.

Produces: rewritten text + structured change log. Safe for agentic automation — no creative rewriting, no added content.

---

## How it fits together

```
  /overgrow:init          →  .overgrow/inventory.md
         │
         ▼
  /overgrow:audit         →  .overgrow/audit.md
         │
         ├──────────────────────────────┐
         ▼                              ▼
  /overgrow:spawn-pages           /overgrow:spawn-blogs
  (fill structural gaps)          (fill topical gaps)
         │                              │
         └──────────────┬───────────────┘
                        ▼
         /overgrow:spawn-internal-links   →  .overgrow/internal-links.md
                        │
                        ▼
              /overgrow:humanize           (pass drafts through)
                        │
                        ▼
              /overgrow:sitemap            →  sitemap.xml + robots.txt
```

Each command reads the inventory, writes its output to a scoped file under `.overgrow/`, and feeds the next command in the chain. Rerunning `init` refreshes the foundation after structural edits.

---

## What makes Overgrow different

- **Code-native.** The artifact is a file in your repo, not a row in a dashboard. Fixes become commits.
- **Pillar-first.** Every page is classified into one of 3–7 semantic pillars on `init`. Every spawn and every link proposal is pillar-aware. Your site becomes a graph, not a flat list.
- **Query-fanout everywhere.** Both page and blog generation use the same taxonomy that powers `knowledge/query-fanout.md` — 15 distinct retrieval intents modeled from observed LLM search behavior. You cover the sub-queries search engines and answer engines actually decompose user intent into.
- **GEO-first, not just SEO.** Every output is tuned for AI citation: definitional leads, entity-consistent phrasing, answer-ready Q&A blocks, schema recommendations per page type, RAG-friendly chunking.
- **Deterministic humanize pipeline.** No vibes-based rewriting. A rule either fires or it doesn't, and you get a log of which ones fired — safe for agentic loops.
- **Growth-first defaults.** The sitemap skill's robots.txt defaults to allowing every AI crawler. Most toolchains default to blocking them; Overgrow assumes you want to be cited.
- **Never fabricates.** No invented customer names, stats, logos, testimonials, or certifications. Anywhere a real input is needed and not supplied, output is placeholdered with an explicit marker.
- **One source, four tools.** Author once in `source/`; ship to Claude Code, Cursor, Gemini, Codex.

---

## Supported AI tools

- **Claude Code** — primary. Install via `/plugin marketplace add zhizdev/overgrow` then `/plugin install overgrow@overgrow`. Commands appear as `/overgrow:<name>`. Full frontmatter support (`user-invocable`, `allowed-tools`, `argument-hint`). Uses `CLAUDE.md` as the project convention file and `AskUserQuestion` as the clarification tool.
- **Cursor** — drop `.cursor/` into project root. Uses `.cursorrules`. Minimal frontmatter.
- **Gemini CLI** — drop `.gemini/` into project root. Uses `GEMINI.md`. Frontmatter stripped.
- **Codex CLI** — drop `.codex/` into project root. Uses `AGENTS.md` and `$` command prefix.

---

## Knowledge base

Every skill reads authoritative guidance from the plugin's `knowledge/` directory before acting. SKILL.md files are entry summaries; `knowledge/` is the source of truth.

- **`knowledge/geo.md`** — SEO + GEO master reference (~56KB). Foundations, terminology, how classical search + AI answer engines actually work, RAG chunking behavior, content structure, E-E-A-T, technical SEO, authority, AI extraction patterns, schema, commercial intent, distribution, programmatic content, local SEO, measurement. Referenced by `init`, `audit`, `spawn-pages`, `spawn-blogs`, `spawn-internal-links`, `sitemap`.
- **`knowledge/query-fanout.md`** — the 15-facet query fan-out taxonomy: DEFN, ENTITY, COMPARE, and 12 more retrieval intents extracted from empirical Claude/Gemini/ChatGPT behavior on shopping prompts. Referenced by `spawn-pages` and `spawn-blogs`.
- **`knowledge/pages.md`** — H-tag hierarchy rules, AI-overview formatting, question-and-answer structure, scanability, engagement signals. Referenced by every skill that writes or audits page structure.
- **`knowledge/sitemap.md`** — deterministic pipeline for `sitemap.xml` + `robots.txt`: input collection, shard rules, encoding, AI-crawler allowlists, audit checks. Authoritative for the sitemap skill.

Humanize is self-contained: `source/skills/humanize/reference/word-lists.md` and `patterns.md` hold the banned vocabulary and structural patterns the pipeline detects.

---

## Install, upgrade, uninstall

**Install** (Claude Code):
```
/plugin marketplace add zhizdev/overgrow
/plugin install overgrow@overgrow
```

**Upgrade**:
```
/plugin update overgrow@overgrow
```
Or enable auto-update per marketplace in `/plugin` → Marketplaces tab.

**Where it lives on disk**: `~/.claude/plugins/cache/overgrow/`. Old versions stay 7 days after update so in-flight sessions don't break.

**Other tools**: clone the repo and copy `.cursor/`, `.gemini/`, or `.codex/` into the target project's root.

---

## Philosophy

1. **The repo is the source of truth.** Dashboards rot. Spreadsheets fragment. The thing that ships is the thing in the code.
2. **Inventory before opinion.** No skill offers suggestions until `init` has mapped what actually exists. Half the bad SEO advice in the world comes from tools that couldn't see the whole site.
3. **Structure over style.** AI answer engines reward clarity, hierarchy, and citability. Overgrow spends its generation budget on structure first, wording second.
4. **Defaults should be generous.** Allow every crawler. Keep every page discoverable. Subtraction is a deliberate action, not the default.
5. **Deterministic where possible.** The humanize rules, the sitemap pipeline, the audit severity tiers are rule-based — they produce the same output on the same input. Predictability is a feature.
6. **Never fabricate.** If a fact, customer, or integration isn't real, it's a placeholder. Shipping invented proof is worse than shipping none.

---

## Repository layout (for contributors)

```
source/skills/<name>/SKILL.md               # canonical sources (edit here)
source/skills/<name>/reference/             # per-skill reference docs (bundled into each provider output)
knowledge/geo.md                            # SEO + GEO master reference
knowledge/query-fanout.md                   # 15-facet query fan-out taxonomy
knowledge/pages.md                          # H-tag + AI-overview formatting rules
knowledge/sitemap.md                        # sitemap/robots deterministic pipeline
scripts/build.js                            # compiles source → dist/<provider>/
scripts/lib/transformers/providers.js       # provider configs (4 supported)
scripts/lib/utils.js                        # frontmatter parser, placeholder tables
.claude/skills/                             # synced Claude Code output (committed artifact)
.claude-plugin/{plugin,marketplace}.json    # Claude Code plugin manifest + marketplace catalog
.cursor/ .gemini/ .codex/                   # synced outputs for other harnesses (committed artifacts)
tests/                                      # 103 build-pipeline tests
dist/                                       # full build output + universal bundle (gitignored)
.github/workflows/verify-build.yml          # CI — rejects PRs where source/ is out of sync
```

---

## Contributor workflow

- Edit skills in `source/skills/<name>/SKILL.md` only. Never hand-edit files under `.claude/skills/`, `.cursor/`, `.gemini/`, `.codex/`, or `dist/` — they are regenerated from source.
- Knowledge docs live in `knowledge/` at repo root and ship with the plugin. Skills reference them by path; do not inline them into SKILL.md.
- After editing sources: `bun run rebuild`. The build re-syncs the 4 provider dirs at the repo root, and CI rejects PRs where they drift from source.
- Tests: `bun test` (103 tests, ~60ms). Covers the build pipeline, not skill content.
- Frontmatter supported in `SKILL.md`: `name`, `description`, `user-invocable`, `argument-hint`, `allowed-tools`, `license`, `compatibility`, `metadata`. Each provider whitelists which fields it emits (see `providers.js`).

Only four harnesses are supported. Do not reintroduce trae, trae-cn, pi, opencode, kiro, or agents — those were intentionally removed.

---

## State directory

Skills write persistent state under `.overgrow/` in the user's project. These files are the interface between commands — later commands read what earlier commands wrote.

- `.overgrow/inventory.md` — site inventory (written by `init`, read by all)
- `.overgrow/audit.md` — audit findings (written by `audit`)
- `.overgrow/content-plan.md` — tracker for spawned pages/posts (written by `spawn-pages`, `spawn-blogs`)
- `.overgrow/internal-links.md` — internal-link plan (written by `spawn-internal-links`)
- `.overgrow/sitemap-audit.md` — sitemap audit (written by `sitemap` in audit mode)

Skills append or refresh rather than overwriting blindly; prior runs get timestamped archives where it matters.

---

## Content principles (applies to every skill output)

- **Content and structure, not code.** Output is copy blocks, meta tags, heading structures, schema recommendations — not HTML/React/CSS unless explicitly asked.
- **GEO-friendly patterns by default.** Definitional leads, entity clarity, Q&A blocks, schema.org hints, semantic heading hierarchy, citable claims, explicit `datePublished` / `dateModified` where freshness matters.
- **Never invent customers, stats, logos, testimonials, compliance certifications, or integrations.** If a fact is missing, placeholder it with an explicit marker.
- **Humanize rules are deterministic.** If a rule feels wrong, update `source/skills/humanize/reference/` — do not inline creative rewrites.
- **Project voice wins.** Every skill checks `CLAUDE.md`, `BRAND.md`, `VOICE.md`, or style-guide files before imposing its own defaults.

---

## License

MIT. 
