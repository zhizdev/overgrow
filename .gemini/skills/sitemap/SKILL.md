---
name: sitemap
description: Audit an existing sitemap.xml / robots.txt or generate new ones following sitemaps.org protocol and Google Search Central guidance, with a growth-first default that allows every crawler including AI search and AI training bots. Use this skill whenever the user asks to "build a sitemap", "generate sitemap.xml", "audit the sitemap", "refresh sitemap", "write robots.txt", "check robots", "allow AI crawlers", "block AI crawlers", "fix crawl budget", "submit to Google", or any other discovery / indexing configuration task. Output is a valid sitemap.xml (or sitemap index) and/or robots.txt, plus a written audit when auditing.
---

# Overgrow — Sitemap & robots.txt

This skill is the deterministic pipeline for producing and auditing `sitemap.xml`, sitemap indexes, and `robots.txt`. It is tuned for growth — by default it invites every compliant crawler, including AI search and AI training bots, unless the user explicitly opts out per user-agent.

## Primary reference

**Read `knowledge/sitemap.md` from the plugin root before doing anything.** That file is the canonical, rule-by-rule pipeline this skill implements. Follow it exactly. This SKILL.md is the entry-point summary; `knowledge/sitemap.md` is the source of truth.

Also consult `knowledge/geo.md` sections on technical SEO and indexability for AI visibility considerations that affect sitemap/robots decisions.

## Mode selection

Parse `$ARGUMENTS`:

- `audit` (or no args, existing sitemap present) → run the audit flow.
- `build` (or no args, no sitemap present) → run the generation flow.
- A full origin URL like `https://example.com` → use as the canonical origin.

If mode is ambiguous, ask the user directly to clarify what you cannot infer.

## Audit flow

1. Read `.overgrow/inventory.md` for the authoritative page list. If missing, run `init` first.
2. Locate existing sitemap(s): `public/sitemap.xml`, `static/sitemap.xml`, `sitemap.xml.ts`, Next.js `app/sitemap.ts`, framework-generated routes. If none found, switch to build mode.
3. Locate existing `robots.txt`: `public/robots.txt`, `static/robots.txt`, `app/robots.ts`, or config-driven.
4. Validate against `knowledge/sitemap.md`. Report findings:
   - Protocol violations (invalid URL, missing `<loc>`, bad encoding, over 50k URLs in one file, over 50MB uncompressed).
   - Coverage gaps (pages in inventory missing from sitemap, sitemap URLs missing from inventory — possible 404s or stale entries).
   - `lastmod` hygiene (missing, future-dated, identical across all entries).
   - Canonical mismatches (sitemap URL vs. rendered canonical tag).
   - robots.txt issues (blocking assets needed for render, blocking sitemap path, contradictory allow/disallow, outdated AI-bot rules).
   - AI-crawler posture (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot — flag if silently blocked).
5. Write findings to `.overgrow/sitemap-audit.md` with severity (critical / high / medium / low) and specific fixes.

## Build flow

1. Read `.overgrow/inventory.md` for the list of indexable pages. Exclude `utility` and anything the user flags.
2. Collect inputs (see `knowledge/sitemap.md` § "Inputs to collect"). If any input is missing, ask once in a single message.
3. Generate `sitemap.xml` following the rules in `knowledge/sitemap.md`. For > 50k URLs, emit a sitemap index plus shard files.
4. Generate or update `robots.txt`. Default posture: `open` (allow all user-agents, disallow explicit exclusion paths, reference the sitemap). Only switch to `restricted` or `closed` when the user says so — typically for staging, internal, or compliance-locked sites.
5. Write the files to the project's static root (`public/`, `static/`, framework-specific path). Do not overwrite existing files without asking; produce `.next`/`.proposed` variants if there's an existing file.
6. Print a short summary: URL count, shard count, AI-crawler posture, where the files were written.

## Defaults for AI bots (growth-first)

Unless the user says otherwise, `robots.txt` explicitly allows:

- `GPTBot` (OpenAI)
- `ChatGPT-User`
- `OAI-SearchBot`
- `ClaudeBot` / `anthropic-ai` / `Claude-Web`
- `PerplexityBot`
- `Google-Extended`
- `Applebot-Extended`
- `Bingbot` (always)
- `CCBot` (Common Crawl)

Explicit allow lines beat silence — spell them out so the posture is auditable. If the user wants to restrict one or more, ask for the list and write `Disallow: /` blocks per user-agent.

## Constraints

- Never emit sitemap entries for routes that do not exist in the inventory.
- Never include query-stringed URLs unless the user intentionally exposes them.
- Respect canonical tags — the sitemap URL must match the page's own canonical.
- Follow `knowledge/sitemap.md` for encoding, escaping, `lastmod` formatting, and sharding rules. Do not improvise.
- Output must pass XML validation against the sitemaps.org schema.

## What this skill does NOT do

- Does not submit sitemaps to Search Console / Bing Webmaster — print the URL for the user to submit.
- Does not generate HTML sitemaps (user-facing navigation pages).
- Does not touch `hreflang` beyond noting issues in the audit — i18n link generation lives in a dedicated sitemap that this skill will build if the inventory declares locales.