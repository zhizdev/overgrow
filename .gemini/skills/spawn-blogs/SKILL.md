---
name: spawn-blogs
description: Given the product and the existing page inventory, identify missing blog topics and generate new blog posts that capture search/AI intent using the query-fanout pattern. Use this skill whenever the user asks to "spawn blogs", "generate blog posts", "expand the blog", "build out a content cluster", "write blog ideas", "cover more search intents", "query fanout for blogs", or wants new long-form content that supports existing pillars. Output is one markdown file per blog post plus an updated content plan.
---

# Overgrow — Spawn Blogs (Query Fanout)

This skill plans and drafts net-new blog posts that close gaps in the site's semantic pillars. It uses the **query-fanout** pattern: one seed intent is expanded into a fan of related sub-intents that modern search and AI systems decompose queries into, then each sub-intent becomes a post.

## Prerequisites

1. Read `.overgrow/inventory.md`. If missing, run `init` first.
2. Read `.overgrow/audit.md` if present — thin pillars and orphan topics are prime spawn targets.
3. Parse `$ARGUMENTS`: if a pillar name or topic seed is given, scope to it. If not, propose up to 3 candidate pillars to expand and ask the user directly to clarify what you cannot infer. which to run. Once chosen, proceed for that pillar.

## Reference knowledge

Before planning topics or drafting, read from the plugin's `knowledge/` directory:

- `knowledge/query-fanout.md` — the 15-facet query fan-out taxonomy (DEFN, ENTITY, COMPARE, etc.). Use it to build the candidate sub-intent set. This SKILL.md's "Query-fanout pattern" section is a summary; `query-fanout.md` is the authoritative list.
- `knowledge/geo.md` — SEO + GEO master reference. Pay particular attention to the sections on content structure, AI extraction / RAG chunking, and answer-engine citation patterns. Post structure below is distilled from this file.
- `knowledge/pages.md` — H-tag and AI-overview formatting rules. Apply directly when drafting headings and the TL;DR lead.

If any of those files are not reachable, fall back to the summaries in this SKILL.md and continue.

## Query-fanout pattern

Given a seed intent (e.g. "observability for PostgreSQL"), produce a fan of sub-intents covering the natural ways users and AI systems decompose the topic. A complete fan covers:

- **Definitional** — "what is X", "X explained", "X vs Y" disambiguation
- **Comparative** — "X vs Y", "X vs Z", "alternatives to X", "best X for <audience>"
- **How-to / procedural** — "how to do X with Y", step-by-step guides
- **Why / justification** — "why X matters", "benefits of X", "when to use X"
- **Problem / symptom** — "fix X error", "X not working", "X slow"
- **Role-based** — "X for <role>", "X for <vertical>", "X for <team size>"
- **Integration** — "X with <tool>", "connect X to Y", "X + Y workflow"
- **Migration** — "migrate from X to Y", "move off X"
- **Cost / pricing** — "how much does X cost", "X pricing explained", "is X worth it"
- **Trends / forward-looking** — "future of X", "X in <year>", "X trends"

You do not need every branch for every pillar — pick the 5-10 branches that are both relevant and missing from existing content (per the inventory).

## How to choose topics

For the chosen pillar:

1. List existing pages in that pillar from the inventory. These are off-limits — don't duplicate.
2. Generate candidate sub-intents using the fanout branches above. Aim for 15-25 raw candidates.
3. Filter: keep only candidates that
   - Are **not** already covered by an existing page.
   - Have clear audience overlap with the product.
   - Can be answered with real substance (not filler).
   - Map to a search query a human or LLM would actually issue.
4. Rank by a rough intent-to-conversion score: bottom-of-funnel (comparison, pricing, migration, "alternatives to") > middle (how-to, integration, role-based) > top (definitional, trends). Keep a mix — top-of-funnel builds GEO pillar authority even when conversion is lower.
5. Pick the top N (default 5, or whatever the user requested).

## Blog post structure (GEO-first)

Every post the skill drafts uses this structure — it's tuned for both classic SEO ranking and AI-overview / chatbot citation.

1. **Title** (H1, 50-65 chars): leads with the primary keyword phrased as the user would search.
2. **Meta description** (120-158 chars): direct answer + why the post is worth reading.
3. **Slug:** lowercase, hyphen-separated, under ~60 chars.
4. **Definitional lead (TL;DR)** — 2-4 sentences directly under the H1 answering the query. This is the block LLMs extract.
5. **Why it matters / context** — 1-2 short paragraphs giving stakes.
6. **Body sections** — H2 per major question, H3 per sub-point. Every H2 reads like a natural-language sub-query (continues the fanout inside the post).
7. **Comparison or decision block** — table, list, or decision tree wherever the sub-intent is comparative. AI systems love structured blocks.
8. **Step-by-step section** — for how-to intents, a numbered list with code/config/config-example if relevant.
9. **FAQ (3-6 Qs)** — the long-tail sub-queries you didn't fully cover in the body. These double as `FAQPage` schema fodder.
10. **Callouts for evidence** — named sources, data, dates. Avoid bare claims.
11. **Internal links** — at least 2 outbound to other pages on the site (pillar hub + 1-2 supporting). Use descriptive anchor text, never "click here". Do not invent routes — only link to routes that appear in `.overgrow/inventory.md`.
12. **CTA** — one soft CTA at the end tied to the product (try, book, download), matched to the post's intent stage.

## Output

For each chosen topic, write one markdown file under `content/blog/<slug>.md` (or the blog content root detected in the inventory — respect the project's convention). Use frontmatter matching the project's existing posts; if unsure, default to:

```markdown
---
title: <title>
description: <meta description>
slug: <slug>
date: <YYYY-MM-DD>
pillar: <pillar name>
intent: <definitional | comparative | how-to | why | problem | role | integration | migration | cost | trends>
keywords: [<primary>, <secondary1>, <secondary2>]
draft: true
---

<body — following the structure above>
```

Then update `.overgrow/content-plan.md` (create if missing) with an entry per spawned post:

```markdown
## <Pillar>

- [ ] <slug> — <title> — intent: <branch> — status: drafted <YYYY-MM-DD>
```

Leaving posts as `draft: true` is intentional — the user should run `audit` and `humanize` before publishing.

## Writing guidelines

- Write for a real reader first, then optimize for keyword/entity coverage.
- Keep paragraphs short (2-3 sentences).
- Every claim with a number needs a source or a caveat.
- Do not fabricate case studies, customer quotes, benchmarks, or partner names. If the product team hasn't given you real examples, write illustrative ones and mark them `<!-- placeholder: replace with real example -->`.
- Follow the project's voice if a brand voice doc exists (check `GEMINI.md`, `BRAND.md`, `VOICE.md`, `style-guide.md`). Otherwise default to clear, active, jargon-light.
- Do not run the humanize pipeline inline — that's a separate skill. But avoid the banned vocabulary listed in `humanize/reference/word-lists.md` from the start so there's less to clean.

## What this skill does NOT do

- Does not generate landing or product pages (that's `spawn-pages`).
- Does not add internal links across existing pages (that's `spawn-internal-links`). It only adds outbound links from the new posts it drafts.
- Does not publish. Posts ship with `draft: true` and land in the repo for review.
- Does not invent facts, customers, or stats.