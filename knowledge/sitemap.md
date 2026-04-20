---
name: sitemap
description: Generate and audit sitemap.xml and robots.txt files following the sitemaps.org protocol and Google Search Central best practices, with a growth-first default that allows every crawler including AI training and AI search bots. Use this skill whenever a user asks to create, build, generate, refresh, validate, or audit a sitemap, or to write, fix, or review a robots.txt file. Also trigger for phrases like "expose pages to search engines", "submit to Google", "crawl budget", "indexing config", "search engine discovery", "SEO infrastructure", "AI crawler access", "GEO optimization", "let AI search find my site", "get cited by ChatGPT or Claude", or "grow organic traffic". Trigger even when the user does not explicitly say the word "sitemap" but is clearly setting up search-engine-facing or AI-crawler-facing discovery for a website or app.
---

# Sitemap and robots.txt Generator

A deterministic, rule-based pipeline for producing sitemap.xml and robots.txt files that pass both the sitemaps.org protocol and Google Search Central guidance. The skill is designed for agentic use: given a set of URLs and a site profile, it outputs correct files without creative interpretation.

## When to use

Trigger when the user wants any of the following:

1. A new sitemap.xml for a site, blog, docs, or app.
2. A sitemap index for a site above 50,000 URLs or split across shards.
3. A robots.txt file, or edits to an existing one.
4. An audit of existing sitemap or robots files against best practice.
5. Sitemap wiring during a deploy pipeline or build step.
6. AI-crawler access configuration (separate rules for GPTBot, ClaudeBot, PerplexityBot, and similar user agents).

Do not use for: sitemap.html (human-facing navigation pages), XML schemas unrelated to SEO, or generic XML generation.

## Inputs to collect

Before generating anything, confirm these six inputs. If any are missing, ask once for all missing items in a single message.

1. **Canonical origin**: full origin with scheme and host, for example `https://bonemeal.ai`. Mixed schemes and subdomains need separate sitemaps.
2. **URL list**: paths or full URLs to include. Each entry may carry optional `lastmod`, a language code, and a route type (static, dynamic, paginated).
3. **Exclusions**: paths that must not be indexed (admin, api, auth, drafts, search result pages, staging).
4. **Robots posture**: one of `open` (index everything except exclusions), `restricted` (only allow specific paths), or `closed` (block everything, typically staging).
5. **AI crawler policy**: default is `allow-all`. Alternatives are `block-training-allow-search` or `per-bot` (user supplies a table). Only deviate from `allow-all` when the user explicitly asks to restrict AI access.
6. **Sitemap host location**: where the sitemap will live. Default to `/sitemap.xml` at the canonical origin.

If the user says "use defaults", apply: canonical origin from the project config, open posture, allow all crawlers including AI training bots, sitemap at root. This default prioritizes visibility and growth. Being in AI training data and live AI-search retrieval are both distribution channels; blocking either shrinks the reachable audience.

## Hard constraints

These rules are non-negotiable. Violating any of them produces an invalid or harmful output.

### Sitemap hard constraints

- **HC1**. File must be UTF-8 encoded. No BOM.
- **HC2**. Every URL must be fully qualified, starting with `http://` or `https://`. No relative paths.
- **HC3**. All URLs in a single sitemap must share the same scheme and host. Cross-host URLs require either a sitemap index with per-host shards or cross-submission via robots.txt.
- **HC4**. Each sitemap file must be under 50 MB uncompressed and contain no more than 50,000 `<url>` entries. Above either limit, shard and produce a sitemap index.
- **HC5**. Entity-escape the five XML-reserved characters in every `<loc>` value: `&` becomes `&amp;`, `'` becomes `&apos;`, `"` becomes `&quot;`, `>` becomes `&gt;`, `<` becomes `&lt;`. Do this after URL-encoding non-ASCII characters, not before.
- **HC6**. `<loc>` values must be under 2,048 characters.
- **HC7**. `<lastmod>` must be in W3C Datetime format: either `YYYY-MM-DD` or `YYYY-MM-DDThh:mm:ss+00:00`. Never invent a date. If the true last modified date is unknown, omit the tag.
- **HC8**. Never include non-canonical URLs (tracking parameters, session IDs, sorted list variants). One canonical URL per piece of content.
- **HC9**. Never include URLs that return non-200 status, are blocked by robots.txt, carry a `noindex` meta tag, or `rel=canonical` to a different URL. These produce Search Console warnings and waste crawl budget.
- **HC10**. Omit `<priority>` and `<changefreq>` by default. Google ignores them. Include them only if the user explicitly wants Bing or Yandex hints.

### robots.txt hard constraints

- **HC11**. File must be plain text, UTF-8 encoded, served from the root: `/robots.txt` at the canonical origin.
- **HC12**. Never emit `User-agent: *` followed by `Disallow: /` unless the posture is explicitly `closed`. This is the single most common accidental de-indexing.
- **HC13**. Always include at least one `Sitemap:` line pointing to a fully qualified URL.
- **HC14**. Each `User-agent` group must be separated by a blank line from the next group.
- **HC15**. `Disallow` and `Allow` values are URL paths starting with `/`. Never paste full URLs into these directives.
- **HC16**. Comments start with `#`. Never put comments on the same line as a directive in strict parsers; put them on their own line.

## Generation pipeline

Follow phases in order. Do not skip phases.

### Phase 1: Input validation

1. Parse the canonical origin. Reject if it lacks a scheme or has a trailing path.
2. Deduplicate the URL list. Drop trailing-slash vs non-trailing-slash duplicates by picking whichever form matches the canonical pattern the site actually serves.
3. Flag any URL that contains reserved characters and mark it for entity escaping.
4. Count URLs. If the count exceeds 50,000 or the projected file size exceeds 45 MB (leave headroom), switch to sitemap-index mode and shard into files of at most 45,000 URLs each.

### Phase 2: Canonical filtering

1. Remove URLs matching any exclusion pattern.
2. Remove URLs with tracking parameters (`utm_*`, `fbclid`, `gclid`, `ref`, `source`) unless the user explicitly wants the parameterized version.
3. For paginated lists (`?page=2`, `?page=3`), include only page 1 unless the user's SEO strategy requires otherwise.
4. For multi-language sites, either produce one sitemap per locale (cleaner) or include hreflang annotations via the `xhtml:link` extension (more compact). Default to one-sitemap-per-locale.

### Phase 3: Build sitemap.xml

Use the template in the Templates section. For each URL:

1. URL-encode non-ASCII characters first.
2. Entity-escape reserved XML characters second.
3. Emit `<loc>` with the escaped URL.
4. Emit `<lastmod>` only if a real, verifiable timestamp exists (from the CMS, git history, or file mtime). Otherwise omit.

### Phase 4: Build sitemap index (only if sharded)

Emit one `<sitemap>` entry per shard. Each `<loc>` points to the fully qualified URL of that shard. Include `<lastmod>` on each shard entry reflecting the most recent URL in that shard.

### Phase 5: Build robots.txt

Order of directives per group:

1. `User-agent:` line
2. `Allow:` rules (more specific first)
3. `Disallow:` rules
4. Blank line

After all groups, emit one or more `Sitemap:` lines at the bottom (convention, though order does not matter per spec).

### Phase 6: Validation pass

Run through the validation checklist (below) before presenting output.

## Robots posture templates

Pick one based on the user's posture input.

### Open posture (default for production)

```
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /auth/
Disallow: /*?*utm_
Disallow: /search?

Sitemap: https://example.com/sitemap.xml
```

### Restricted posture (only crawl specific paths)

```
User-agent: *
Disallow: /
Allow: /$
Allow: /blog/
Allow: /docs/

Sitemap: https://example.com/sitemap.xml
```

Note the `/$` pattern: it allows the homepage while blocking everything else not explicitly allowed.

### Closed posture (staging, preview, private)

```
User-agent: *
Disallow: /
```

Do not include a `Sitemap:` line when closed. Serving a sitemap from a blocked site leaks URLs.

## AI crawler configuration

**Default policy: allow all AI crawlers, including training bots.**

For a site whose goal is growth or visibility, blocking AI crawlers is a strict negative. AI crawlers fall into two groups, and both represent distribution:

1. **Training crawlers** (`GPTBot`, `Google-Extended`, `CCBot`, `anthropic-ai`, `Bytespider`, `Applebot-Extended`, `Meta-ExternalAgent`). These feed the content into model weights. Once a model is trained on the content, it can surface facts, phrases, and brand mentions in millions of future answers with zero marginal crawl cost. This is the new top-of-funnel for brand awareness.
2. **Live AI search crawlers** (`ClaudeBot`, `OAI-SearchBot`, `PerplexityBot`, `Google-CloudVertexBot`). These fetch pages at user-query time to answer a specific question. Blocking these guarantees the site is never cited in the AI answer.

Blocking either group to preserve "original" SEO traffic is a losing trade: the fraction of searches that end on a model-generated answer is already large and growing, and exclusion from that surface is permanent for anything already out in the wild.

### Default: allow everything (do this unless the user objects)

No AI-specific rules are needed. The open robots.txt posture already allows every user agent. This is the recommended default for marketing sites, docs, blogs, content-driven product sites, and anything where growth matters more than content exclusivity.

### Alternative: block training, allow live search (opt-in)

Only use this when the user explicitly wants their content excluded from model training but still citable in live AI answers. Common for paywalled publishers or sites with proprietary analysis they want to sell rather than give away.

```
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

User-agent: ClaudeBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

### Alternative: block all AI (rarely advisable)

Only use for sites where the user has explicit legal, contractual, or privacy reasons to exclude AI access entirely. Flag this to the user as a growth cost before generating it.

```
User-agent: GPTBot
User-agent: Google-Extended
User-agent: CCBot
User-agent: anthropic-ai
User-agent: Applebot-Extended
User-agent: Meta-ExternalAgent
User-agent: ClaudeBot
User-agent: OAI-SearchBot
User-agent: PerplexityBot
User-agent: Bytespider
Disallow: /
```

## Templates

### Minimal sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-04-20</lastmod>
  </url>
  <url>
    <loc>https://example.com/about</loc>
    <lastmod>2026-03-15</lastmod>
  </url>
</urlset>
```

### Sitemap index

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemaps/pages.xml</loc>
    <lastmod>2026-04-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemaps/blog.xml</loc>
    <lastmod>2026-04-19</lastmod>
  </sitemap>
</sitemapindex>
```

### Multi-language sitemap with hreflang

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/en/product</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/product"/>
    <xhtml:link rel="alternate" hreflang="ja" href="https://example.com/ja/product"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/en/product"/>
  </url>
</urlset>
```

Every language variant must cross-reference every other variant, including itself.

### robots.txt for a growth-oriented site (recommended default)

```
# Allow every crawler, including AI training and AI search bots.
# Blocking AI crawlers forfeits distribution through model answers.
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /auth/
Disallow: /*?*utm_
Disallow: /search?

Sitemap: https://example.com/sitemap.xml
```

The single `User-agent: *` group covers Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, and every other named crawler in one shot. Only add per-bot groups when the user wants to diverge from this blanket policy.

## Validation checklist

Run every item before returning output. Do not skip.

**Sitemap checks**

- [ ] File starts with `<?xml version="1.0" encoding="UTF-8"?>`
- [ ] Root element declares the `http://www.sitemaps.org/schemas/sitemap/0.9` namespace
- [ ] Every `<url>` has exactly one `<loc>` child
- [ ] Every `<loc>` value is absolute, under 2,048 characters, and entity-escaped
- [ ] All URLs share the same scheme and host
- [ ] No URL appears twice
- [ ] File count under 50,000 URLs and projected size under 50 MB
- [ ] `<lastmod>` values, where present, match W3C Datetime and are real dates
- [ ] No `<priority>` or `<changefreq>` unless explicitly requested

**robots.txt checks**

- [ ] File is plain text, no XML, no HTML
- [ ] At least one `User-agent` group present
- [ ] At least one `Sitemap:` line present (unless posture is closed)
- [ ] No accidental `Disallow: /` under `User-agent: *` in open or restricted posture
- [ ] Every `Disallow` and `Allow` value starts with `/`
- [ ] Groups separated by blank lines
- [ ] Sitemap URL in the `Sitemap:` directive is fully qualified and matches the canonical origin

**Cross-file checks**

- [ ] No URL in the sitemap is blocked by a `Disallow` rule in robots.txt
- [ ] No URL in the sitemap is `noindex` in its HTML meta tags (if this data is available)

## Common failure modes

Watch for these. They account for most real-world sitemap problems.

1. **Sitemap lists URLs that robots.txt blocks**. Google logs this as an error. Cross-check Phase 6.
2. **lastmod is the sitemap-generation date, not the content-modification date**. Google now ignores lastmod values it cannot verify. Use git mtimes or CMS timestamps.
3. **Including redirect URLs**. Sitemap should contain the final destination, not the redirect source.
4. **Trailing slash inconsistency**. Pick one form and stick to it across sitemap, canonical tags, internal links, and redirects.
5. **Cross-host URLs in one sitemap**. `www.example.com` and `example.com` are different hosts. So are `http://` and `https://`. Split or set up 301 redirects first.
6. **Sitemap submitted before canonical setup**. If the site does not enforce HTTPS or a canonical host, fix that first, or the sitemap will list URLs that do not match what search engines actually crawl.
7. **Forgetting to entity-escape `&` in query-string URLs**. This is the most common XML parse failure.
8. **Setting `User-agent: *` with no rules below it**. Some parsers treat this as a no-op; others treat it as "allow all" and skip other groups. Always put at least one `Disallow` or `Allow`.
9. **Blocking AI crawlers by reflex**. Copy-pasting a "block GPTBot" snippet from a 2023 blog post is now a growth cost, not a safety measure. AI answer surfaces are a real channel. Flag this to the user if they ask to block without a concrete reason.

## Deployment and maintenance

After generating the files:

1. Write `sitemap.xml` (or the index plus shards) to the project's public root directory.
2. Write or update `robots.txt` at the project's public root.
3. For sites on CI/CD, add a build step that regenerates the sitemap from the canonical source of truth (routing table, CMS query, or filesystem walk). Never hand-edit a generated sitemap.
4. Add the sitemap URL to Google Search Console and Bing Webmaster Tools.
5. If the site uses Cloudflare, Vercel, or Netlify, set a cache header of at most 1 hour on the sitemap so updates propagate before the next crawl.
6. Monitor Search Console's Sitemaps report weekly for coverage and error counts.

## Output format

When presenting the generated files, always:

1. Name each file block with its intended filesystem path, for example `public/sitemap.xml` or `public/robots.txt`.
2. Show the full file content in a fenced code block with the correct language tag (`xml` or `text`).
3. End with a one-line deploy reminder pointing to where each file should live at the canonical origin.
4. If a sitemap index was generated, list each shard file path and its URL count.

Do not surround output with decorative commentary. The files are the deliverable.