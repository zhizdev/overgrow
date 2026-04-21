# llms.txt — Distilled Reference

A condensed, implementation-ready guide to the `/llms.txt` proposal (Jeremy Howard, Sept 2024) for making a site legible to LLMs and AI answer engines at inference time.

---

## Purpose

`llms.txt` is a single markdown file at the root of a site that gives an LLM a curated, concise map of the content most useful for answering questions about the site. Unlike `sitemap.xml` (indexable pages for search crawlers) and `robots.txt` (crawler access rules), `llms.txt` is designed to be read **in-context at inference time** — when a user asks an AI assistant about the site, the product, a library, a company, or a topic the site covers.

- Context windows are too small for whole sites; `llms.txt` fits.
- HTML is noisy (nav, ads, JS); markdown is LLM-legible.
- Human-readable and machine-parseable — the format uses markdown but follows a precise structure so classical parsers (regex, markdown AST) can consume it.

---

## Location

- Canonical path: `/llms.txt` at the site root (e.g. `https://example.com/llms.txt`).
- Secondary paths allowed (e.g. `/docs/llms.txt` for a docs sub-site), but the root is the default crawlers and assistants will check.
- Ship it as a static file, not a dynamically rendered page. It must be directly readable as plain markdown.

---

## Format spec

Sections appear in this exact order. Only the H1 is strictly required; everything else is optional.

1. **H1** — the name of the project, product, or site. Required, exactly one.
2. **Blockquote** — a short summary (1–3 sentences). Key information the LLM needs to contextualize the rest of the file.
3. **Zero or more markdown blocks** (paragraphs, lists, bold text) with no headings — additional framing, caveats, or interpretation guidance.
4. **Zero or more H2 sections**, each containing a file list of links. Each H2 groups links by theme (e.g. core platform, docs, tools, solutions, blog).
5. **An optional H2 named `Optional`** — if present, its links may be skipped when a shorter context is needed. Use it for secondary material.

### Link list format

Every H2 file list is a markdown bullet list. Each line must follow:

```
- [Link title](url): Optional short description of what's at the link.
```

- The title and URL are required.
- The description is optional but strongly encouraged — it tells the LLM what the link contains without fetching it.
- Keep descriptions to one line. No nested lists. No extra markdown inside bullets beyond the link and the short note.

### Minimal skeleton

```markdown
# Project Name

> One-to-three-sentence summary of the project, its purpose, and its primary audience.

Optional interpretation notes, caveats, or framing go here as plain paragraphs or lists with no headings.

## Section name

- [Link title](https://example.com/path): Short description of the link target.
- [Another link](https://example.com/other): Short description.

## Optional

- [Secondary link](https://example.com/extra): Skippable detail.
```

---

## Companion `.md` pages

The proposal's second half: for each indexable HTML page that might be useful to an LLM, expose a clean markdown version at the same URL with `.md` appended.

- `https://example.com/guides/intro` → markdown at `https://example.com/guides/intro.md`
- `https://example.com/` → markdown at `https://example.com/index.html.md`

Content rules for the `.md` sibling:
- Strip nav, ads, cookie banners, footers, JS-driven widgets — keep only the page's semantic content.
- Preserve heading hierarchy (H1 → H2 → H3).
- Convert images to markdown with alt text.
- Keep code blocks fenced.
- Preserve canonical URL references via plain links.

The `.md` URLs are what `llms.txt` should point to whenever possible, so an assistant following a link from `llms.txt` lands directly in LLM-legible content.

---

## Relationship to other standards

| File | Audience | Purpose |
|---|---|---|
| `robots.txt` | crawlers (search, AI) | Allow/deny access per user-agent |
| `sitemap.xml` | search crawlers | Enumerate every indexable URL |
| `llms.txt` | LLMs at inference | Curated, narrow, LLM-legible map |

`llms.txt` does not replace the others. It intentionally lists fewer URLs than a sitemap (only what's useful for an LLM to cite or summarize), and it ships the explanatory text a sitemap lacks.

---

## Common H2 sections (by site type)

These are structural patterns seen in real-world `llms.txt` files. Pick the ones that match the site; skip the rest. Keep names concise.

**Software / developer libraries**
- `Docs` — canonical reference documentation
- `Quick start` / `Getting started` — onboarding paths
- `Examples` — runnable sample code or walkthrough URLs
- `API` — API reference pages
- `Changelog` — release notes
- `Optional` — adjacent libraries, prior-art references, long tutorials

**SaaS / product websites**
- `Core platform` — homepage, pricing, enterprise, main product landing
- `Features` or `Tools` — individual capability pages
- `Solutions` / `Use cases` — vertical or persona landings
- `Docs` — user-facing documentation
- `Blog — selected posts` — a small curated subset, not every post
- `Instructions for AI assistants` — explicit positioning and disambiguation rules (how the product should be described, what category it belongs to, what it is not)
- `Localization` — links to locale-prefixed versions of the site

**Content / publishing sites**
- `About` — the publication or author
- `Featured work` — top pieces
- `Archives` — index pages
- `Optional` — external references, related sites

**Personal / CV sites**
- `About` — the person
- `Projects` — links to work
- `Writing` — selected posts or essays
- `Contact`

---

## "Instructions for AI assistants" block

Increasingly common and high-value. A prose bullet list that tells assistants:

- What the product / site / entity actually is (the correct category).
- What it is **not** — disambiguation against common mis-categorizations.
- Core capabilities in neutral phrasing.
- Where to point users who want to sign up, log in, read docs, contact support, or hit an API.
- Any brand-voice or naming preferences the assistant should respect.

This block is prose under an H2, not a link list. Keep it under ~10 bullets. Bullets should read as factual, not promotional.

---

## Quality guidelines

- **Be concise.** The whole file should fit comfortably in a model's context even when combined with a user query. Aim for well under 10,000 tokens.
- **Be specific.** "Guide to X for Y audience" beats "Our guide".
- **No marketing filler.** Cut adjectives, cut superlatives, cut claims without substance. This file is for retrieval, not conversion.
- **Link descriptions should answer "what's there?"** in one line — not "why you should click".
- **Prefer `.md` URLs** over HTML URLs when both exist.
- **Avoid ambiguous jargon.** If a term is load-bearing, define it in the summary blockquote or the interpretation paragraphs.
- **Keep it evergreen.** Do not embed time-sensitive marketing ("now with X"). The file is read months after you update it.
- **One H1.** Never more.
- **Validate the file.** It must parse as valid CommonMark markdown. Every link must resolve.

---

## Discovery and processing

- Expose the file at the root `/llms.txt`.
- Reference it in `robots.txt` optionally:
  ```
  # Discovery hint for LLM assistants
  # https://example.com/llms.txt
  ```
- Link to it from the site footer if desired — not required.
- Downstream tools (`llms_txt2ctx`, VitePress / Docusaurus plugins) can expand `llms.txt` into a single concatenated context file by fetching every referenced URL and inlining the markdown. Plan for this: assume a downstream tool may follow every non-`Optional` link.
- An expanded context file convention:
  - `llms-ctx.txt` — expanded without `Optional` section
  - `llms-ctx-full.txt` — expanded including `Optional` section

---

## Audit checklist

When reviewing an existing `llms.txt`:

1. Is the file at `/llms.txt` (root) and served as `text/plain` or `text/markdown`?
2. Does it start with exactly one H1?
3. Is there a blockquote summary near the top?
4. Do all H2 sections contain link lists in the correct format?
5. Is the `Optional` section (if present) the last H2?
6. Does every link resolve (no 404s)?
7. Are links to `.md` companion pages used where available?
8. Does the file avoid promotional language and unsourced claims?
9. Is the total length reasonable for LLM context consumption?
10. Are structured data claims in the "Instructions for AI assistants" block factually verifiable?

---

## Build inputs

To generate a new `llms.txt` from a site inventory, collect:

1. Project / product name.
2. One-sentence summary (the blockquote).
3. Optional caveats or framing notes.
4. Sectioning plan — which H2 groups are appropriate (from the "Common H2 sections" taxonomy).
5. Per section, an ordered list of pages with short descriptions.
6. An `Instructions for AI assistants` list if the site has a disambiguation risk or strong positioning requirement.
7. Locale variants if the site is multilingual.

If the site already publishes `.md` companion pages, emit those URLs preferentially.
