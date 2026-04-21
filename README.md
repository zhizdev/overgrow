# Overgrow

The SEO + GEO toolkit that lives inside your AI coding tool. 7 commands to inventory your site, audit it, grow it, and wire it for AI-search citation — all from the editor.

> **Quick start:** In Claude Code, run `/plugin marketplace add zhizdev/overgrow` then `/plugin install overgrow@overgrow`.

## Why Overgrow?

Traditional SEO tools live outside your codebase. They flag issues in dashboards, spit out PDFs, and leave the engineering work to someone context-switching between Ahrefs and VS Code. AI-era search makes this worse: ChatGPT, Claude, Perplexity, and Google AI Overviews retrieve from your pages semantically — which means structure, clarity, and citability matter more than ever, and dashboards don't fix those.

Overgrow runs where the code runs. The same skill that finds a thin pillar also drafts the blog posts to fill it. The same skill that flags an orphan page also wires the internal links to un-orphan it. Feedback loop compressed from weeks to minutes.

Overgrow fights SEO-tool bloat with:
- **A site-aware foundation** — every command reads a structured page inventory derived from your actual framework routes, not a crawl.
- **Query-fanout generation** — a 15-facet taxonomy of how search and AI answer engines decompose intent, applied to pages and blogs.
- **A deterministic humanize pipeline** — rule-based cleanup of AI-sounding text with a change log, safe for agentic loops.
- **Growth-first defaults** — the sitemap skill allows every AI crawler by default. Subtraction is a deliberate choice, not the silent default.

## What's included

### 7 commands

| Command | What it does | Output |
|---------|--------------|--------|
| `/overgrow:init` | Scan the repo, detect the framework, enumerate and classify every page, cluster into semantic pillars | `.overgrow/inventory.md` |
| `/overgrow:audit` | Check titles, meta, H-hierarchy, canonicals, OG, JSON-LD schema, content depth, internal links, AI-citation readiness | `.overgrow/audit.md` |
| `/overgrow:spawn-pages` | Draft missing core pages (features, solutions, pricing, comparison, integration, trust, about) via query-fanout | markdown page files + `.overgrow/content-plan.md` |
| `/overgrow:spawn-blogs` | Draft blog posts across the 15 fanout facets (definitional, comparative, how-to, migration, cost, trends, and more) | markdown post files + content-plan entries |
| `/overgrow:spawn-internal-links` | Build a hub-and-spoke semantic graph; propose (or apply) the missing links with descriptive anchor text | `.overgrow/internal-links.md` |
| `/overgrow:sitemap` | Audit or build `sitemap.xml` + `robots.txt` per sitemaps.org + Google guidance. Growth-first: every compliant crawler allowed by default | `sitemap.xml`, `robots.txt`, optional audit |
| `/overgrow:humanize` | 4-phase deterministic rule pipeline (vocabulary, sentence structure, structural removal, final checks) | rewritten text + change log |

### Knowledge base

Every skill reads authoritative guidance from `knowledge/` before acting. SKILL.md files are entry summaries; these are the source of truth.

| Knowledge file | Covers |
|----------------|--------|
| [`knowledge/geo.md`](knowledge/geo.md) | SEO + GEO master reference — foundations, RAG chunking behavior, content structure, E-E-A-T, technical SEO, authority, AI extraction, schema, measurement |
| [`knowledge/query-fanout.md`](knowledge/query-fanout.md) | 15-facet query fan-out taxonomy extracted from observed Claude / Gemini / ChatGPT search behavior |
| [`knowledge/pages.md`](knowledge/pages.md) | H-tag hierarchy, AI-overview formatting, answer-block structure, scanability |
| [`knowledge/sitemap.md`](knowledge/sitemap.md) | Deterministic sitemap + robots.txt pipeline, AI-crawler allowlists |

### Principles baked in

- **Inventory before opinion.** No skill offers suggestions until `init` has mapped what actually exists.
- **Pillar-first.** Every page gets one primary pillar. Every spawn and every link proposal is pillar-aware.
- **GEO-first.** Definitional leads, entity-consistent phrasing, answer-ready Q&A blocks, schema recommendations per page type.
- **Never fabricate.** No invented customers, stats, logos, testimonials, or certifications. Missing inputs become explicit placeholders.
- **Deterministic where possible.** Humanize rules, sitemap pipeline, and audit severity tiers produce the same output on the same input.

## Usage examples

### Full workflow on a fresh site

```
/overgrow:init                    # build the inventory
/overgrow:audit                   # find gaps & issues
/overgrow:spawn-pages             # fill missing core pages
/overgrow:spawn-blogs             # fill thin pillars
/overgrow:spawn-internal-links    # wire the semantic graph
/overgrow:humanize                # clean AI-sounding drafts
/overgrow:sitemap                 # expose everything to search & AI
```

### Scoped runs

```
/overgrow:audit blog                         # audit only blog posts
/overgrow:audit /pricing                     # audit a single route
/overgrow:spawn-blogs observability          # expand one pillar
/overgrow:spawn-pages healthcare             # one vertical solutions page
/overgrow:spawn-internal-links observability # wire links within one pillar
/overgrow:sitemap audit                      # check the existing sitemap
/overgrow:sitemap build https://example.com  # generate new sitemap + robots
```

### Humanize

```
/overgrow:humanize "paste AI-generated text here"
/overgrow:humanize content/blog/new-post.md
```

## Installation

### Claude Code (recommended)

```
/plugin marketplace add zhizdev/overgrow
/plugin install overgrow@overgrow
```

Commands appear as `/overgrow:init`, `/overgrow:audit`, etc. Update with `/plugin update overgrow@overgrow`, or enable auto-update in `/plugin` → Marketplaces.

### Cursor

```bash
cp -r .cursor your-project/
```

> Cursor skills require setup: switch to Nightly in Settings → Beta, then enable Agent Skills in Settings → Rules. [Cursor skills docs](https://cursor.com/docs/context/skills)

### Gemini CLI

```bash
cp -r .gemini your-project/
```

> Gemini CLI requires the preview channel: `npm i -g @google/gemini-cli@preview`, then `/settings` → enable Skills, then `/skills list`. [Gemini CLI skills docs](https://geminicli.com/docs/cli/skills/)

### Codex CLI

```bash
cp -r .codex/* ~/.codex/
```

> Codex uses a different command prefix: `$overgrow:init`, `$overgrow:audit`, etc.

## Supported tools

- [Claude Code](https://claude.ai/code) — primary, plugin-install
- [Cursor](https://cursor.com) — drop-in `.cursor/`
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) — drop-in `.gemini/`
- [Codex CLI](https://github.com/openai/codex) — drop-in `.codex/`

One source of truth in `source/skills/`. The build transforms it into each provider's expected layout, frontmatter shape, and placeholder conventions — authored once, shipped four ways.

## Contributing

Skills are authored in `source/skills/<name>/SKILL.md`. The four dotfolders at the repo root (`.claude/`, `.cursor/`, `.gemini/`, `.codex/`) are **generated artifacts** — committed to git so end users can install, but never edited by hand.

### Workflow

```bash
bun install                         # once
# edit source/skills/<name>/SKILL.md or files under knowledge/
bun run rebuild                     # regenerates the 4 dotfolders
bun test                            # 103 tests, ~60ms
git add -A
git commit -m "..."
```

If you only touch `README.md`, `CLAUDE.md`, `.claude-plugin/*.json`, tests, or other non-source files, no rebuild is needed.

### CI enforcement

`.github/workflows/verify-build.yml` runs `bun run rebuild` on every push and PR and fails if the committed dotfolders drift from `source/`. Reproduce locally:

```bash
bun run rebuild
git diff --exit-code .claude .cursor .gemini .codex
```

If that reports a diff, commit it.

### Architecture

- `source/skills/<name>/SKILL.md` — canonical source per skill
- `source/skills/<name>/reference/` — per-skill reference docs (bundled per provider)
- `knowledge/*.md` — shared authoritative references (shipped with the plugin)
- `scripts/build.js` — orchestrator: reads source, swaps provider placeholders, filters frontmatter, copies refs, writes `dist/` + syncs the 4 dotfolders
- `scripts/lib/transformers/` — provider config table + generic factory
- `.claude-plugin/plugin.json` — Claude Code plugin manifest
- `.claude-plugin/marketplace.json` — catalog so `/plugin marketplace add zhizdev/overgrow` works

See [CLAUDE.md](CLAUDE.md) for a deeper walk-through.

## License

MIT. 

---

Created by [@zhizdev](https://github.com/zhizdev).
