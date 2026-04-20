# Overgrow

SEO and GEO (Generative Engine Optimization) toolkit for growth engineers. Scans a codebase, audits on-page signals, and spawns landing pages, blog posts, internal links, and sitemaps using the query-fanout pattern.

Built as a Claude Code plugin (also distributed as skills for Cursor, Gemini, and Codex).

## Installation

In Claude Code:

```
/install zhizdev/overgrow
```

## Commands

| Command | What it does |
|---------|--------------|
| `/overgrow:init` | Scan the codebase, categorize every page, identify semantic pillars, and write `.overgrow/inventory.md`. Every other command reads from this file. |
| `/overgrow:audit` | Audit on-page SEO/GEO signals — titles, meta descriptions, H structure, schema, canonicals, OG, internal links, AI-citation readiness. Writes `.overgrow/audit.md`. |
| `/overgrow:spawn-pages` | Given the product + inventory, spawn missing core pages (features, solutions, pricing, comparison, integration, trust, about) using the query-fanout pattern. |
| `/overgrow:spawn-blogs` | Given the product + inventory, spawn missing blog posts along the query-fanout facets (definitional, comparative, how-to, migration, cost, trends). |
| `/overgrow:spawn-internal-links` | Build a semantic graph over existing pages, propose (or apply) missing hub ↔ spoke links with descriptive anchor text. Writes `.overgrow/internal-links.md`. |
| `/overgrow:sitemap` | Audit or build `sitemap.xml` and `robots.txt` following sitemaps.org + Google guidance. Growth-first default allows every compliant crawler, including AI bots. |
| `/overgrow:humanize` | Deterministic rule pipeline that rewrites AI-sounding text to read human. Runs in 4 phases (vocab, sentence structure, structural removal, final checks) and emits a change log. |

## Recommended workflow

```
/overgrow:init                    # build the inventory
/overgrow:audit                   # find gaps & issues
/overgrow:spawn-pages             # fill missing core pages
/overgrow:spawn-blogs             # fill thin pillars
/overgrow:spawn-internal-links    # wire the semantic graph
/overgrow:humanize                # clean AI-sounding drafts
/overgrow:sitemap                 # expose everything to search & AI
```

## Knowledge base

The plugin ships with a `knowledge/` directory that every skill reads for authoritative guidance:

- `knowledge/geo.md` — SEO + GEO master reference (foundations, content, technical, authority, AI extraction, measurement).
- `knowledge/query-fanout.md` — 15-facet query fan-out taxonomy used by `spawn-pages` and `spawn-blogs`.
- `knowledge/pages.md` — H-tag hierarchy and AI-overview formatting rules.
- `knowledge/sitemap.md` — sitemap and robots.txt deterministic pipeline.

## Contributing

All skills are authored in one place: `source/skills/<name>/SKILL.md`. The four dotfolders at the repo root (`.claude/`, `.cursor/`, `.gemini/`, `.codex/`) are **generated artifacts** — they are what end users install, so they are committed to git, but you should never edit them by hand.

### Workflow

```bash
bun install                         # once, for the single `archiver` dep
# edit source/skills/<name>/SKILL.md or files under knowledge/
bun run rebuild                     # regenerates .claude/ .cursor/ .gemini/ .codex/
bun test                            # optional but fast
git add -A
git commit -m "..."
```

If you only touch `README.md`, `CLAUDE.md`, `.claude-plugin/*.json`, tests, or other non-source files, no rebuild is needed.

### What the build does

`bun run rebuild` reads every `source/skills/<name>/SKILL.md`, swaps provider-specific placeholders (`{{model}}`, `{{config_file}}`, `{{ask_instruction}}`, `{{command_prefix}}`), filters the frontmatter to fields each provider understands, copies `reference/*.md` through, and writes the result into `dist/<provider>/` plus the four synced dotfolders at the repo root. Provider configs live in `scripts/lib/transformers/providers.js`.

### CI enforcement

A GitHub Actions workflow (`.github/workflows/verify-build.yml`) runs `bun run rebuild` on every push and pull request and fails if the committed dotfolders drift from what `source/` produces. This catches PRs that edited `source/` without rebuilding.

To reproduce the check locally before pushing:

```bash
bun run rebuild
git diff --exit-code .claude .cursor .gemini .codex
```

If that command reports a diff, commit it.

## License

MIT
