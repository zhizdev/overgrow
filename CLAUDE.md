# Overgrow

Claude Code plugin (also distributed as skills for Cursor, Gemini, and Codex) for **SEO / GEO work** and **growth engineering**. Scans a codebase, audits on-page signals, and spawns landing pages, blog posts, internal links, and sitemaps using the query-fanout pattern.

## Audience

Built for SEO specialists, GEO (Generative Engine Optimization) practitioners, and growth engineers who ship landing/marketing/blog pages and need repeatable, on-brand, LLM-discoverable content. Output is content + structure, not code scaffolding.

## Commands (skills)

All user-invocable. In Claude Code they are namespaced as `/overgrow:<name>`.

| Skill | Purpose | Produces |
|-------|---------|----------|
| `init` | Scan repo, categorize pages, derive product summary + semantic pillars | `.overgrow/inventory.md` |
| `audit` | SEO/GEO on-page audit | `.overgrow/audit.md` |
| `spawn-pages` | Spawn missing core landing/marketing pages via query-fanout | markdown page files + entries in `.overgrow/content-plan.md` |
| `spawn-blogs` | Spawn blog posts covering missing sub-intents via query-fanout | markdown post files + entries in `.overgrow/content-plan.md` |
| `spawn-internal-links` | Build semantic graph, propose/apply missing internal links | `.overgrow/internal-links.md` |
| `sitemap` | Audit or build `sitemap.xml` + `robots.txt` (growth-first, AI-bot-allowed) | `sitemap.xml`, `robots.txt`, optional `.overgrow/sitemap-audit.md` |
| `humanize` | Deterministic 4-phase rule pipeline that rewrites AI-sounding text | rewritten text + change log |

`init` is the foundation — every other skill reads `.overgrow/inventory.md` and falls back to running `init` if it's missing.

## Repository layout

```
source/skills/<name>/SKILL.md               # canonical sources (edit here)
source/skills/<name>/reference/             # per-skill reference docs (bundled into each provider output)
knowledge/geo.md                            # SEO + GEO master reference
knowledge/query-fanout.md                   # 15-facet query fan-out taxonomy
knowledge/pages.md                          # H-tag + AI-overview formatting rules
knowledge/sitemap.md                        # sitemap/robots deterministic pipeline
scripts/build.js                            # compiles source → dist/<provider>/
scripts/lib/transformers/providers.js       # provider configs
.claude/skills/                             # synced Claude Code output
.claude-plugin/{plugin,marketplace}.json    # Claude Code plugin manifest
.cursor/ .gemini/ .codex/                   # synced outputs for other harnesses
dist/                                       # full build output + universal bundle
```

## Knowledge conventions

Every skill reads authoritative knowledge from the plugin's `knowledge/` directory:

- `init`, `audit` → `knowledge/geo.md`, `knowledge/pages.md`
- `spawn-pages`, `spawn-blogs` → `knowledge/query-fanout.md`, `knowledge/geo.md`, `knowledge/pages.md`
- `spawn-internal-links` → `knowledge/geo.md`, `knowledge/pages.md`
- `sitemap` → `knowledge/sitemap.md` (authoritative pipeline), `knowledge/geo.md`
- `humanize` → its own `source/skills/humanize/reference/` (word-lists, patterns)

When a SKILL.md conflicts with the knowledge file, prefer the knowledge file — SKILL.md is the entry summary, `knowledge/` is the source of truth.

## Supported providers

Only four harnesses are supported. Do not reintroduce trae, trae-cn, pi, opencode, kiro, or agents — those were intentionally removed.

- `claude-code` → `.claude/`
- `cursor` → `.cursor/`
- `gemini` → `.gemini/`
- `codex` → `.codex/`

Provider configs live in `scripts/lib/transformers/providers.js`; placeholder tables (`{{model}}`, `{{config_file}}`, `{{ask_instruction}}`, `{{command_prefix}}`) live in `scripts/lib/utils.js`.

## Workflow

- Edit skills in `source/skills/<name>/SKILL.md` only. Never edit files under `.claude/skills/`, `.cursor/`, `.gemini/`, `.codex/`, or `dist/` — they are regenerated.
- Knowledge docs live in `knowledge/` at repo root and ship with the plugin. Skills reference them by path; do not inline them.
- After editing sources: `bun run rebuild` (runs `clean` + `build`). The build re-syncs the 4 provider dirs at the repo root.
- Tests: `bun test` (see `tests/build.test.js`).
- Frontmatter supported in `SKILL.md`: `name`, `description`, `user-invocable`, `argument-hint`, `allowed-tools`, `license`, `compatibility`, `metadata`. Each provider whitelists which fields it emits (see `providers.js`).

## State directory

Skills write persistent state under `.overgrow/` in the user's project:

- `.overgrow/inventory.md` — site inventory (written by `init`)
- `.overgrow/audit.md` — audit findings (written by `audit`)
- `.overgrow/content-plan.md` — tracker for spawned pages/posts (written by `spawn-pages`, `spawn-blogs`)
- `.overgrow/internal-links.md` — internal-link plan (written by `spawn-internal-links`)
- `.overgrow/sitemap-audit.md` — sitemap audit (written by `sitemap` in audit mode)

Skills append or refresh these files rather than overwriting blindly.

## Guidance for content work

- This plugin generates **content and structure, not code**. Output is copy blocks, meta tags, heading structures, schema recommendations — not HTML/React/CSS unless the user asks.
- Favor GEO-friendly patterns: definitional leads, entity clarity, Q&A blocks, schema.org hints, semantic heading hierarchy, citable claims.
- Never invent customer names, stats, logos, testimonials, compliance certifications, or integrations. Placeholder them.
- Humanize rules are deterministic. If a rule feels wrong, update `source/skills/humanize/reference/` — do not inline creative rewrites.
