# SEO + AI Visibility: Master Reference

A consolidated operating manual covering traditional SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI Optimization (AIO), LLM Optimization (LLMO), Search Experience Optimization (SXO), programmatic content at scale, and Local SEO. Sections are deduplicated, ordered by dependency (foundation → content → technical → authority → AI extraction → commercial intent → distribution → programmatic → local → measurement → execution), and annotated with concrete thresholds where they exist.

---

## Part I. Foundations

### Section 1. Terminology and scope

**Rule 1.1.** SEO optimizes pages so search engines rank them for queries; the unit of success is a click from a ranked result.
**Rule 1.2.** GEO, AEO, LLMO, and AIO are overlapping labels for the same underlying objective: being selected, quoted, or cited by AI-generated answers (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews, Bing Copilot). Do not treat them as separate disciplines; treat them as layers.
**Rule 1.3.** SXO is the UX-side discipline that shapes post-click behavior (dwell time, task completion, return-to-SERP rate) and feeds back into both ranking and AI trust.
**Rule 1.4.** AI optimization is an extension of SEO, not a replacement. Crawlability, authority, and content quality remain prerequisites; AI engines retrieve from the same indexable web.
**Rule 1.5.** Success metric shifts: SEO measures rankings and clicks; GEO/AEO measure AI citations, inclusion in answer boxes, and brand mentions inside generated responses.

### Section 2. How the systems actually work

**Rule 2.1.** Classical search follows three stages: crawl (fetching URLs), index (parsing, deduplicating, storing), rank (scoring against a query using hundreds of signals).
**Rule 2.2.** AI answer engines add a semantic retrieval layer: they re-query the index or a curated sub-index, embed candidate passages, rank by relevance to intent, then synthesize. This favors content that reads as a self-contained answer rather than a keyword-optimized landing page.
**Rule 2.3.** Retrieval-Augmented Generation (RAG) pipelines chunk source pages (typically 200–1000 tokens) before embedding. Content that fragments cleanly into self-contained chunks surfaces more often than content where meaning depends on distant context.
**Rule 2.4.** AI engines weight authority signals (brand mentions, cited-by-media, entity recognition in knowledge graphs) and structural signals (heading hierarchy, Schema, clean HTML) more heavily than raw backlink counts.
**Rule 2.5.** Zero-click is the dominant trajectory. A growing share of queries resolve inside SERP features or AI answers without a visit; strategy must account for brand exposure without a click.

### Section 3. Time horizons and budget

**Rule 3.1.** SEO compounds. Expect 6–12 months for meaningful organic traffic on a new or low-authority domain; faster on authoritative domains adding new content.
**Rule 3.2.** GEO/AEO can produce visibility gains in weeks once structural and authority prerequisites are met, because AI engines re-retrieve frequently and reward explicit answer formatting.
**Rule 3.3.** Budget allocation differs: SEO spend concentrates on content, links, and technical work; GEO spend adds monitoring tools (AI citation tracking), schema implementation, and editorial validation of AI-assisted drafts.
**Rule 3.4.** Treat SEO and GEO as one integrated program. Splitting them duplicates effort and produces conflicting priorities.

---

## Part II. Keyword and intent strategy

### Section 4. Keyword hierarchy

**Rule 4.1.** Build a three-tier pyramid: (1) core keywords (high volume, high competition, broad intent) mapped to pillar/category pages; (2) long-tail keywords (lower volume, higher intent, conversion-ready) mapped to supporting articles; (3) question queries mapped to FAQ sections and answer blocks.
**Rule 4.2.** Prioritize low-competition, high-intent terms before chasing head terms. Long-tail converts at multiples of head-term traffic.
**Rule 4.3.** Expand keyword coverage across dimensions: comparisons ("X vs Y"), specifications, use cases, problems, pricing, alternatives, integrations, tutorials.
**Rule 4.4.** Map each keyword to a single canonical URL to avoid internal cannibalization. Multiple pages competing for the same query dilute signals.
**Rule 4.5.** Revisit keyword lists quarterly. Intent shifts, SERP features change, and new long-tails emerge from AI-driven query expansion.

### Section 5. Intent classification

**Rule 5.1.** Classify every target query by intent: informational (learn), navigational (find a brand/site), commercial investigation (compare), transactional (buy/sign up), local (near me).
**Rule 5.2.** Match content format to intent. Informational → guide or explainer. Commercial → comparison tables, pros/cons. Transactional → product page with reviews, pricing, CTAs.
**Rule 5.3.** Inspect the live SERP before writing. The formats already ranking (videos, listicles, forums, tools) are Google's stated answer to the query; content that ignores that format rarely overtakes it.
**Rule 5.4.** Use AI tools (ChatGPT, Gemini, Perplexity) to expand a seed query into its common follow-up and adjacent questions. These become H2/H3 candidates and FAQ entries.
**Rule 5.5.** Replace keyword density thinking with intent completeness: does the page fully resolve the user's task, or does it leave an unanswered step?

---

## Part III. On-page content

### Section 6. Title tags and meta descriptions

**Rule 6.1.** Title tag: 50–60 characters, primary keyword near the front, one semantic variation, a value hook. Example: "LCP Optimization: 7 Techniques That Cut Load Time Under 2 Seconds."
**Rule 6.2.** Meta description: 120–155 characters, clear value proposition, implicit or explicit CTA. Google frequently rewrites meta descriptions; write one anyway because it still influences click-through when kept.
**Rule 6.3.** Every page needs a unique title and meta. Duplicates are a quality signal against you.
**Rule 6.4.** Include the brand name in titles on YMYL pages (Your Money or Your Life: health, finance, legal) to reinforce trust signals.
**Rule 6.5.** For AEO, the first H1 and the opening sentence matter more than the title tag, because AI engines frequently lift the first direct answer rather than the title.

### Section 7. Content structure for human and AI readers

**Rule 7.1.** Open each section with the direct answer in one or two sentences, then expand with evidence, examples, and nuance. AI engines commonly extract the first clear answer within a relevant heading.
**Rule 7.2.** Use modular answer blocks. Each H2/H3 section should be independently quotable: if an AI engine lifts just that block, it should still make sense without the surrounding page.
**Rule 7.3.** Keep paragraphs short (2–4 sentences). Dense blocks resist chunking during embedding and reduce on-page readability.
**Rule 7.4.** Follow a Question → Answer → Evidence structure within answer blocks. Evidence includes data, examples, citations, quotes from named experts, original research.
**Rule 7.5.** Use H1 once per page, H2 for top-level sections, H3 for sub-sections. Never skip levels (no H1 → H3). One core topic per H2 section.
**Rule 7.6.** Convert comparisons and specifications into tables. Tables rank well in SERPs and are easily structured for AI extraction.
**Rule 7.7.** Use ordered lists for procedures, unordered lists for parallel items. Both formats improve featured-snippet eligibility.
**Rule 7.8.** Include an FAQ section on every substantial page, targeting "People Also Ask" queries. Wrap it with FAQPage schema.

### Section 8. E-E-A-T and trust signals

**Rule 8.1.** E-E-A-T stands for Experience, Expertise, Authoritativeness, Trustworthiness. Trust is the load-bearing attribute; the other three are inputs to it.
**Rule 8.2.** Name authors on every substantive article. Provide an author page with credentials, publications, affiliations, and links to authoritative profiles (LinkedIn, ORCID, institutional pages).
**Rule 8.3.** Cite primary sources (studies, official documentation, original data) with clear attribution. Avoid citing only aggregators.
**Rule 8.4.** Publish original data: surveys, benchmarks, case studies with real numbers, analyses of proprietary datasets. Original data is the strongest organic backlink magnet and the strongest AI-citation magnet.
**Rule 8.5.** For YMYL topics, add medical/legal/financial reviewer credits. Google's guidelines explicitly elevate reviewer expertise in those categories.
**Rule 8.6.** Display trust furniture: last-updated date, review date, editorial policy page, contact information, physical address where relevant.

### Section 9. Content freshness

**Rule 9.1.** Refresh high-value and declining pages on a recurring cycle (quarterly for competitive topics, annually for evergreen). Update dates on the page and in Schema.
**Rule 9.2.** Genuine refreshes change substance: new data, new examples, restructured sections, new FAQs. Cosmetic date bumps without content changes do not help and can hurt.
**Rule 9.3.** Track content decay using a "pages with declining clicks over 90 days" report in Search Console. Refresh the top of that list first.
**Rule 9.4.** Retire or consolidate thin, redundant, and outdated pages. 301 to the closest-matching surviving URL to preserve equity.
**Rule 9.5.** Treat freshness as a continuous editorial function, not a one-time migration.

### Section 10. AI-assisted content: rules of use

**Rule 10.1.** Pure unedited AI output is a liability. Google's policy penalizes scaled AI content created primarily to manipulate rankings, not AI use itself.
**Rule 10.2.** Use AI for drafts, outlines, and research synthesis; require human editing for voice, accuracy, and original insight.
**Rule 10.3.** Layer human-only elements onto AI drafts: direct quotes from interviews, proprietary data, first-person experience, controversial takes backed by reasoning, corrections of common misconceptions.
**Rule 10.4.** Fact-check every statistic, date, and attribution produced by AI. Hallucinations are common and damage trust.
**Rule 10.5.** Strip AI tells during editing: repetitive tricolons, generic openers ("In today's fast-paced world"), hedged filler ("It's important to note that"), and overused connectives.

---

## Part IV. Technical SEO

### Section 11. Site architecture

**Rule 11.1.** Use a flat architecture: Home → Category → Content. No important page should be more than three clicks from the homepage.
**Rule 11.2.** URLs: lowercase, hyphen-separated, under 60 characters, include the primary keyword, avoid parameters when a clean slug is possible. Stable URLs; never change a ranking URL without a 301 redirect.
**Rule 11.3.** Internal linking: every new article should receive at least 2–3 contextual internal links from existing relevant content, and should link out to 3–5 related internal pages. Use descriptive anchor text, not "click here."
**Rule 11.4.** Implement breadcrumbs on category and content pages; mark them up with BreadcrumbList schema.
**Rule 11.5.** Submit XML sitemaps for pages, images, and video. Keep sitemaps under 50,000 URLs or 50 MB uncompressed; split with a sitemap index if larger. Submit in Google Search Console and Bing Webmaster Tools.
**Rule 11.6.** Reference the sitemap in robots.txt with `Sitemap: https://example.com/sitemap.xml`.
**Rule 11.7.** Use canonical tags (`<link rel="canonical">`) on every page to resolve duplicate and parameterized URL variants.

### Section 12. Crawlability and indexing

**Rule 12.1.** robots.txt must not accidentally block CSS, JavaScript, or important content directories. Test with Google Search Console's URL Inspection tool.
**Rule 12.2.** Avoid relying on client-side JavaScript for critical content and internal links. Googlebot renders JS, but with delay and failure modes; LLM crawlers often do not render at all. Prefer SSR, SSG, or hybrid rendering for public-facing content.
**Rule 12.3.** Return the correct HTTP status codes. 200 for live, 301 for permanent moves, 404 for genuine gone, 410 for deliberate removal, 5xx only for actual server errors. Soft 404s (200 status on a "not found" page) waste crawl budget.
**Rule 12.4.** Use `noindex` (not robots.txt) to suppress indexing of low-value pages; robots.txt blocks crawling, which prevents the noindex directive from ever being seen.
**Rule 12.5.** Monitor Search Console's Coverage and Page Indexing reports weekly. Investigate every "Discovered, not indexed" and "Crawled, not indexed" bucket.
**Rule 12.6.** Maintain a clean HTML structure. Semantic tags (`<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`) aid both accessibility and AI parsing.

### Section 13. Core Web Vitals and performance

**Rule 13.1.** Core Web Vitals (2024+) thresholds: LCP (Largest Contentful Paint) under 2.5s, INP (Interaction to Next Paint, which replaced FID in March 2024) under 200ms, CLS (Cumulative Layout Shift) under 0.1. All three measured at the 75th percentile of real-user data.
**Rule 13.2.** LCP optimization: preload hero images, use modern formats (AVIF, WebP), serve appropriately sized images with `srcset` and `sizes`, eliminate render-blocking resources, use a CDN.
**Rule 13.3.** INP optimization: minimize long tasks, debounce expensive handlers, defer non-critical JS, avoid heavy third-party scripts on interactive paths.
**Rule 13.4.** CLS optimization: set width/height attributes on images and videos, reserve space for ads and embeds, avoid injecting content above existing content.
**Rule 13.5.** Measure with real-user data from the Chrome UX Report (CrUX), not only lab tools like Lighthouse. Lab scores and field data frequently diverge.
**Rule 13.6.** TTFB (Time to First Byte) should stay under 800ms; it bounds LCP and affects crawler efficiency.

### Section 14. Mobile-first

**Rule 14.1.** Google indexes the mobile version of pages. If mobile content differs from desktop (hidden sections, smaller navigation, reduced schema), the mobile version is what ranks.
**Rule 14.2.** Use responsive design rather than separate m.domain sites. One URL, one set of signals.
**Rule 14.3.** Touch targets should be at least 48×48 CSS pixels with 8 pixels of spacing. Font size minimum 16px for body text.
**Rule 14.4.** No horizontal scroll at common viewport widths (375px, 390px, 414px). Test on real devices, not only emulators.
**Rule 14.5.** Mobile page weight budget: aim for under 1 MB total transfer for the above-the-fold view on a median 4G connection.

### Section 15. HTTPS and security

**Rule 15.1.** HTTPS is a baseline ranking requirement. Serve every page over TLS; redirect HTTP to HTTPS with 301.
**Rule 15.2.** Use HSTS (`Strict-Transport-Security`) to prevent downgrade attacks.
**Rule 15.3.** Fix mixed-content warnings; they degrade trust and occasionally block resources.
**Rule 15.4.** Keep TLS certificates current with auto-renewal (Let's Encrypt or equivalent).

### Section 16. Structured data (Schema.org)

**Rule 16.1.** Schema markup is the most direct lever for AI comprehension. Implement it with JSON-LD in the `<head>` or near the top of `<body>`.
**Rule 16.2.** Apply the right type per content form: `Article`, `NewsArticle`, `BlogPosting` for editorial; `Product` + `Offer` + `AggregateRating` for commerce; `FAQPage` for FAQ sections; `HowTo` for procedures (note: Google has reduced HowTo rich results but the semantic value remains); `Organization` and `Person` for entity recognition; `BreadcrumbList` for navigation; `VideoObject` for video; `ImageObject` for hero images; `Review` for reviews; `LocalBusiness` for physical locations.
**Rule 16.3.** Mark up authors with `Person` and link via `sameAs` to authoritative profiles. This strengthens entity association in knowledge graphs.
**Rule 16.4.** Validate with Google's Rich Results Test and Schema.org's validator. Invalid JSON-LD is silently ignored.
**Rule 16.5.** Emerging: `llms.txt` is a community-proposed file at `/llms.txt` that exposes a curated, markdown-formatted summary of a site's key resources for LLM consumption. Adoption is uneven, but publishing one is low cost and helps select AI crawlers.
**Rule 16.6.** Do not mark up content that is not visible on the page. Google treats this as spam and may issue a manual action.

---

## Part V. Images and multimedia

### Section 17. Classification and intent

**Rule 17.1.** Assign every image a role before optimizing: hero (brand and emotional impact), inline (explanatory), product (conversion), diagram (clarification), decorative (texture only).
**Rule 17.2.** Optimization priorities differ by role. Hero: visual quality first, then size. Inline: clarity and context. Product: sharpness and multiple angles. Decorative: minimum weight, often `aria-hidden`.
**Rule 17.3.** Do not use an image where text would serve better. Text is indexable; text baked into images is not.

### Section 18. Format, compression, responsiveness

**Rule 18.1.** Format choice: AVIF for maximum compression with modern browser support (fallback required), WebP for broad compatibility, JPEG for photographic fallback, PNG only when transparency or sharp edges matter, SVG for logos/icons/diagrams.
**Rule 18.2.** Compress to a target quality of 75–85 for photographic content; diminishing returns beyond that and visible artifacts below.
**Rule 18.3.** Use responsive images with `srcset` and `sizes` so each device downloads an appropriately sized variant. Use `<picture>` with `<source type="image/avif">` for format negotiation.
**Rule 18.4.** Lazy-load below-the-fold images with `loading="lazy"`. Never lazy-load the LCP image; preload it instead.
**Rule 18.5.** Serve images through a CDN with automatic format negotiation and on-the-fly transforms (Cloudflare Images, Cloudflare R2 + transform URLs, Bunny, Imgix).

### Section 19. Image SEO and AI readability

**Rule 19.1.** Filenames: descriptive, hyphen-separated, keyword-relevant. `red-wool-runner-shoe-side-view.webp` beats `IMG_4782.webp`.
**Rule 19.2.** Alt text: describe the image's content and function in one sentence, including a keyword where natural. Decorative images get empty alt (`alt=""`), not omitted alt.
**Rule 19.3.** Add captions when context would benefit the reader; captions get more scrutiny from both users and AI than alt text.
**Rule 19.4.** Use `ImageObject` schema with `caption`, `contentUrl`, `creator`, `license`, and `description` properties for important images.
**Rule 19.5.** Include an image sitemap (or image tags in the main sitemap) so Google discovers images that would be missed by content parsing.
**Rule 19.6.** For AI extraction, provide a detailed textual description of complex visuals (charts, diagrams, infographics) adjacent to the image. AI engines cannot reliably parse embedded chart data.

### Section 20. Ownership and compliance

**Rule 20.1.** Do not use copyrighted images without a license. DMCA takedowns remove pages from the index and can trigger manual actions.
**Rule 20.2.** Prefer original photography, original illustrations, or licensed stock (Unsplash, Pexels with attribution where required, paid stock).
**Rule 20.3.** Verify provenance with reverse image search when using third-party assets.
**Rule 20.4.** Add subtle brand marks to hero and original images to establish provenance when content is scraped or reposted.

---

## Part VI. Off-page authority

### Section 21. Backlinks

**Rule 21.1.** Relevance and authority beat volume. One link from a recognized industry publication outweighs dozens of links from generic directories.
**Rule 21.2.** Anchor text distribution should look natural: mostly branded ("Bonemeal," "bonemeal.ai"), some generic ("this guide," "here"), some partial-match, minimal exact-match. Heavy exact-match anchors trigger Penguin-era spam signals.
**Rule 21.3.** Earn rather than build. Linkable assets (original research, free tools, data studies, authoritative guides) attract links passively at scale; manual outreach amplifies but does not replace them.
**Rule 21.4.** Guest posting works when the host is topically relevant, has a real audience, and edits contributions. Avoid paid-placement networks and private blog networks (PBNs); these carry direct penalty risk.
**Rule 21.5.** Audit backlinks quarterly. Disavow only toxic patterns (obvious link farms, hacked-site links); most unnatural links are now ignored by Google's algorithms and disavowing is often unnecessary.
**Rule 21.6.** Grow link velocity in line with content and brand velocity. Sudden spikes without a triggering event look manipulative.

### Section 22. Brand mentions and citations

**Rule 22.1.** Unlinked brand mentions count as trust signals and can feed knowledge-graph entity strength. Track them with Google Alerts, Brand24, or Mention.
**Rule 22.2.** Mentions in AI training data (published on high-authority, frequently-crawled sites) influence whether an AI engine recognizes your brand when a user asks. This is a distinct channel from backlinks.
**Rule 22.3.** Build entity consistency: NAP (Name, Address, Phone) identical across the site, Google Business Profile, and major directories. For digital brands, a consistent tagline, description, and founder name across LinkedIn, Crunchbase, Wikipedia (where eligible), and the website.

### Section 23. PR, communities, and indirect signals

**Rule 23.1.** Digital PR (data stories pitched to journalists, expert commentary via HARO/Qwoted, op-eds on industry sites) is the most scalable modern link-and-mention tactic.
**Rule 23.2.** Participate in communities where your audience is actually present (specialized subreddits, Discord servers, Slack communities, Hacker News, niche forums). Depth of contribution matters; link-dropping is counterproductive.
**Rule 23.3.** Publish long-form content on secondary platforms (LinkedIn articles, Substack, Medium, YouTube, podcast appearances). These build author authority and create additional retrievable surfaces for AI engines.
**Rule 23.4.** Social signals are not direct ranking factors, but they correlate with visibility through exposure that leads to links, mentions, and branded search.

---

## Part VII. GEO / AEO / AIO specifics

### Section 24. Writing for extraction

**Rule 24.1.** The "3-second answer" principle: a user or AI skimmer should have the core answer within three seconds of landing on the section. Front-load the conclusion; back-load the reasoning.
**Rule 24.2.** Headings phrased as the user's question outperform clever editorial headings for AEO. "How much does X cost?" beats "The price question."
**Rule 24.3.** Use definition patterns for entity queries: "`<Term>` is `<class>` that `<distinguishing function>`." This pattern is the single most extracted structure in AI Overviews and featured snippets.
**Rule 24.4.** Use enumeration patterns for list queries: start with a sentence that names the count and the category ("The five most common causes of LCP regressions are:"), then the list.
**Rule 24.5.** Use comparison patterns for "X vs Y" queries: opening sentence naming both entities and the headline difference, then a table, then detailed differences.

### Section 25. Structural design for AI retrieval

**Rule 25.1.** One topic per page. Consolidated mega-pages confuse chunk-level retrieval and dilute topical signal. Split into a pillar + supporting articles, cross-linked.
**Rule 25.2.** Keep paragraphs, sections, and list items self-contained. A chunk that makes sense only with the previous paragraph loses when retrieved in isolation.
**Rule 25.3.** Summary-first, then detail. A TL;DR at the top of long content serves both humans and retrieval systems.
**Rule 25.4.** Include key facts in plain prose, even when they appear in tables or images. AI engines extract prose more reliably than tables and cannot see rasterized images.
**Rule 25.5.** Add a Key Takeaways or At a Glance box on long articles. It becomes a prime extraction target.

### Section 26. Authority for AI citation

**Rule 26.1.** AI engines preferentially cite sources that have been cited elsewhere. Appearing in Wikipedia, established industry publications, government sites, and academic citations dramatically increases AI citation probability.
**Rule 26.2.** Publish original statistics and frame them for citation: "According to Bonemeal's 2026 SEO benchmark, 73% of mid-market sites fail INP targets." Quote-ready phrasing gets quoted.
**Rule 26.3.** Claim your Wikidata entity and keep it populated with authoritative references. Wikidata feeds both Google's Knowledge Graph and several AI training pipelines.
**Rule 26.4.** Cross-list on platforms AI engines crawl heavily: GitHub (for technical topics), Stack Overflow, Reddit, YouTube, podcast networks with searchable transcripts.

### Section 27. Zero-click and SERP features

**Rule 27.1.** Target featured snippets with Q&A patterns in the first 40–60 words of a section.
**Rule 27.2.** Target People Also Ask with FAQPage schema and headings phrased as the PAA questions (which you can harvest from SERPs or tools).
**Rule 27.3.** Target knowledge-panel inclusion for entity queries through Organization and Person schema plus consistent external references.
**Rule 27.4.** Accept that many queries resolve without a click, and design content so the brand is named even in an extracted answer. Branded attribution ("Bonemeal's research shows...") is more valuable than an unattributed quote.

### Section 28. Commercial intent and AI-driven buyer decisions

**Rule 28.1.** Buyer journeys increasingly start in AI interfaces. A large share of B2B software evaluation, consumer product research, and service-provider comparison now happens inside ChatGPT, Perplexity, and Gemini before any traditional search session. Content designed only for SERP ranking misses the first touchpoint.
**Rule 28.2.** AI engines evaluating commercial queries weight specificity, transparency, and recency over domain age or raw backlink count. A new, precise, well-structured comparison page can out-cite an established generic category page.
**Rule 28.3.** Four commercial query patterns dominate AI commercial retrieval: "Best X for [constraint]" (best CRM for small teams), "X vs Y" (Stripe vs Adyen), "X alternatives" (Figma alternatives), and "X for [industry or use case]" (project management for agencies). Build a page for each relevant combination.
**Rule 28.4.** Generate candidate queries by prompting the AI engines themselves. Ask: "What questions do buyers of [category] ask?", "What comparisons do prospects make?", "What constraints differentiate buyers?" Log repeat phrasings; those are the exact strings users enter. Supplement with Reddit thread titles and G2/Capterra review language.
**Rule 28.5.** Structure decision pages with a standardized pattern: one-sentence verdict at the top; a "best for" and "not for" block within the first screen; a transparent comparison table; explicit trade-offs; pricing overview; and a summary paragraph written to be lifted verbatim by an AI answer.
**Rule 28.6.** Transparency outperforms self-promotion. Pages that acknowledge when a competitor is the better choice for a specific use case earn more AI citations because they read as neutral references. AI engines demote obviously biased sources on comparison queries.
**Rule 28.7.** Scale across variations deliberately. Generate a page per (use case × industry × size × budget) combination where each combination represents a real buyer segment. Switching and migration pages ("moving from X to Y") and competitor-comparison matrices are high-yield variations.
**Rule 28.8.** Repeat positioning language consistently across variations. AI engines reinforce associations through repetition; if the brand is consistently described as "the fastest analytics tool for ecommerce teams under 50 employees," that phrase propagates into generated answers.
**Rule 28.9.** Optimize for being recommended, not only ranked. The headline metric for AI is citation frequency in generated answers to commercial queries. Track it as a first-class KPI alongside clicks.
**Rule 28.10.** Move early. AI visibility for a commercial niche tends to consolidate around the first sources to publish thorough, well-structured decision content. Once a few sources are cited repeatedly, breaking in is harder than if you had published first.
**Rule 28.11.** Combine AI-optimized decision pages with SEO fundamentals (schema, internal links, page experience) so the same asset captures both AI citation and classical ranking.

---

## Part VIII. Distribution beyond your website

### Section 29. Multi-surface presence

**Rule 29.1.** A modern content program publishes to at least three surfaces beyond the owned site: video (YouTube, TikTok for short-form), long-form social (LinkedIn, X threads), and community platforms (Reddit, niche forums, Discord).
**Rule 29.2.** Adapt, do not syndicate verbatim. Each surface has a preferred length, tone, and format. Syndication without adaptation underperforms and can create duplicate-content noise.
**Rule 29.3.** Transcribe video and podcast content. Transcripts are indexable, embedding-friendly, and often become the surface AI engines retrieve from.
**Rule 29.4.** YouTube is the second-largest search engine and a primary AI citation source for procedural and comparison queries. Upload, caption, chapter, and tag deliberately.

### Section 30. Content pipeline discipline

**Rule 30.1.** Consistent publishing cadence beats burst-and-silence patterns. Set a weekly or biweekly rhythm and hold it.
**Rule 30.2.** Structure content plans around clusters: a pillar page plus 8–15 supporting articles, internally linked, released over a quarter. Clusters build topical authority faster than scattered articles.
**Rule 30.3.** Template the production pipeline: brief → outline → draft → fact-check → edit → SEO review → schema → publish → promote. Document each step and enforce gates.
**Rule 30.4.** Depth over volume. One 2,500-word guide with original data outperforms five 500-word rewrites of existing content.

---

## Part IX. Programmatic content at scale

### Section 31. When programmatic SEO works (and when it doesn't)

**Rule 31.1.** Programmatic SEO produces value when each generated page answers a distinct real user query and contains information that does not exist in the same consolidated form elsewhere. Strong candidates: directories with verified data, comparison matrices, calculators, interactive tools, location-specific pages with real local content, glossary and reference databases, template galleries, compatibility tables.
**Rule 31.2.** Programmatic SEO fails (and risks manual actions) when pages are thin permutations of identical text with a swapped noun, when data is hallucinated or unverified, or when pages lack any unique utility beyond keyword targeting.
**Rule 31.3.** The decisive test: would this page exist if search engines did not? If no, the page is a doorway. If yes, the page is an asset that happens to be produced programmatically. Anything failing this test compromises the entire site's quality signal and should not be published.
**Rule 31.4.** Programmatic and editorial content live on the same domain under the same quality bar. Googlebot does not grade them separately; thin programmatic pages drag editorial pages down.

### Section 32. System design

**Rule 32.1.** Separate data from presentation. Store content as structured records (database rows, JSON documents, headless CMS entries) and render via templates. This allows independent iteration on content, structure, and design without regenerating everything.
**Rule 32.2.** Enforce schemas on generated content. Use typed structures (Zod, TypeScript interfaces, Pydantic, JSON Schema) so every record has the same fields and no template renders with missing data. Invalid records never reach production.
**Rule 32.3.** Use deterministic templates for high-leverage SEO elements. Title tags, meta descriptions, H1s, URL slugs, canonical tags, and schema markup are too important to vary by AI output; generate them with formulas from the structured data.
**Rule 32.4.** Treat the pipeline as software: version-controlled templates, automated validation, staged deployment (preview → staging → production), rollback capability. Content generation is a build step, not a one-off script.
**Rule 32.5.** Reserve AI generation for prose fields where natural-language variation adds value. Wrap those fields in validation and spot-check randomly sampled output before each deploy.

### Section 33. Taxonomy and niche

**Rule 33.1.** Taxonomy is the single largest lever for programmatic quality. A well-designed taxonomy (dimensions, values, combinations) determines which queries the system can address and how differentiated each page is from the next.
**Rule 33.2.** For each niche, capture structured context before generation: audience persona, primary pain points, vocabulary, success criteria, typical constraints, adjacent alternatives. Inject this context into every generation call so output is niche-specific rather than generic.
**Rule 33.3.** Expand across multiple dimensions: topic × audience × use case × constraint × geography. Each added dimension multiplies long-tail coverage; combinations yield highly specific landing pages with high intent.
**Rule 33.4.** Start narrow and deep before going wide. Fifty high-quality subtopics in one niche beats five hundred shallow subtopics across ten niches. Depth builds topical authority; surface-level breadth spreads signal thin.
**Rule 33.5.** Prune based on performance. Kill combinations that return zero impressions after 90 days; expand dimensions that drive outsized traffic or conversions.

### Section 34. Generation pipeline

**Rule 34.1.** Use models that support structured output (OpenAI JSON mode, Anthropic tool use, Pydantic-backed wrappers). At scale, unstructured text generation creates validation debt and indexing noise.
**Rule 34.2.** Parallelize aggressively. Batch APIs, concurrent request pools, and queue-based workers let you produce thousands of validated records per hour. Rate limits and cost, not throughput, become the practical ceilings.
**Rule 34.3.** Optimize for cost-to-quality, not raw capability. The cheapest model producing schema-compliant, fact-correct output is usually the right choice. Reserve premium models for high-stakes prose fields (hero copy, summaries) and cheap models for templated fields.
**Rule 34.4.** Validate every record before publication: required fields present, types correct, lengths within limits, factual claims sourced or flagged, duplicate detection against existing records, prohibited-content checks, broken-link checks on any embedded URLs.
**Rule 34.5.** Automate deployment end to end. Generated records flow through CI, staging, and production with no manual file-pushing. Sitemap regeneration and indexing hints (IndexNow for Bing/Yandex, Google's Indexing API where eligible) should be part of the deploy.

### Section 35. Functional pages over static templates

**Rule 35.1.** The highest-performing programmatic pages are functional: calculators, filters, interactive comparisons, configurators, search interfaces, generators. Static text-only templates saturate quickly and decay as competitors produce the same; functional pages hold traffic because they produce unique output per interaction.
**Rule 35.2.** Each content type deserves a tailored component. A "city page" for a service business needs different structure than a "product comparison" page or a "template gallery." Reusing one generic component across all types produces a samey site that loses to specialized competitors.
**Rule 35.3.** Ensure each page stands alone without search traffic. If a user landing cold on the page would get real value, search and AI engines are likely to surface it. If not, it is a doorway regardless of production method.
**Rule 35.4.** Programmatic pages must clear the same CWV, schema, and mobile bars as editorial pages. Scale does not exempt them. A thousand slow, unschema'd, template-identical pages hurt the domain more than ten slow editorial pages.
**Rule 35.5.** Treat pages as products. Measure engagement (scroll depth, interaction rate, conversion, return visits) per template type and iterate on underperformers.

### Section 36. Rollout, indexing, iteration

**Rule 36.1.** Roll out in waves, not all at once. Publishing 10,000 pages in a day triggers crawl-budget issues and looks unnatural; publishing 500 per week with clean internal linking allows Google to discover, crawl, and index sustainably.
**Rule 36.2.** Indexing is the bottleneck at scale. Large programmatic sites routinely have 50%+ of pages stuck in "Discovered, not indexed." The fix is rarely more pages; it is fewer, better pages with denser internal linking and stronger signals.
**Rule 36.3.** Use server log analysis, not just Search Console, to see what Googlebot actually crawls. Orphaned pages with no internal links are rarely indexed; deep taxonomy pages need hub-page linking to surface.
**Rule 36.4.** Build feedback loops: which taxonomy branches perform, which templates convert, which niches are already saturated by competitors. Kill low-signal branches and double down on high-signal ones.
**Rule 36.5.** Invest in frontend polish. Programmatic sites that look and feel designed (typography, spacing, microinteractions) outperform those that look auto-generated, even with identical underlying data. Users and quality raters treat visual quality as a proxy for content quality.
**Rule 36.6.** The system evolves continuously. Taxonomy, templates, components, and generation prompts should each have an explicit iteration roadmap driven by performance data. One-time deployments decay.

---

## Part X. Local SEO and Google Business Profile

### Section 37. Local SEO fundamentals

**Rule 37.1.** Local SEO operates on signals largely distinct from general SEO: Google Business Profile (GBP) data, citation consistency across directories, local reviews, and proximity to searcher. Ranking in the Local Pack (map + top-3 results) follows different mechanics than organic blue links.
**Rule 37.2.** GBP is the primary asset. Every local business must claim, verify, and fully populate its profile: name, address, phone (exact, consistent), hours, categories, attributes, services, photos, posts, Q&A, products where relevant.
**Rule 37.3.** NAP consistency across the web (website, GBP, Yelp, Bing Places, Apple Business Connect, industry directories) is a trust signal. Inconsistencies (abbreviated street names, formatting differences, old phone numbers on old directory entries) dilute entity association.
**Rule 37.4.** Local ranking factors in rough priority order: proximity to searcher (partly out of your control), relevance (category and content match), prominence (reviews, citations, backlinks, brand signals), engagement (clicks, calls, direction requests from the profile).

### Section 38. Structured local audit

**Rule 38.1.** Centralize all local data before auditing: GBP export, top-3 competitor GBPs, service area definitions, target keyword list, current rankings by geo, review data. Diagnosing in isolation misses gaps; all local analysis is comparative.
**Rule 38.2.** Break the audit into single-purpose workflows, each producing a discrete action list: category and attribute audit, services audit, description audit, photo audit, post audit, review audit, Q&A audit, citation audit, backlink audit.
**Rule 38.3.** Output audit results as structured data (sheets, tables) with competitor columns visible, so gaps and opportunities are obvious at a glance. Narrative audits rarely get acted on; ranked action lists do.
**Rule 38.4.** Prioritize findings by impact × effort. Fixing a missing primary category or adding 30 missing services outranks minor description tweaks by orders of magnitude.

### Section 39. Google Business Profile optimization

**Rule 39.1.** Primary category is the single most influential GBP setting. Match it to the query terms competitors rank for, not to how you describe yourself internally. Use a GBP category-finder tool and cross-reference top-3 local competitors in your geo.
**Rule 39.2.** Secondary categories should cover every service the business legitimately offers. Missing secondaries forfeit query coverage; irrelevant secondaries confuse the profile and can trigger filters.
**Rule 39.3.** Populate the services section exhaustively with keyword-rich names and descriptions. Each service entry is a retrieval target for "near me" queries and feeds GBP's internal matching engine.
**Rule 39.4.** The business description (750 character limit) should open with the primary value proposition, name the city or service area, list top services, and close with a differentiator. Keyword stuffing is detected and discounted; natural phrasing wins.
**Rule 39.5.** Attributes (woman-owned, LGBTQ+ friendly, wheelchair accessible, online appointments, free Wi-Fi, and category-specific attributes) are ranking and SERP-filter signals. Audit against top-ranking competitors and match every relevant attribute.
**Rule 39.6.** Treat GBP as a living asset, not a one-time setup. Hours, photos, posts, offers, and services all benefit from ongoing updates; profiles that go stale lose ranking weight.

### Section 40. Reviews and review engine

**Rule 40.1.** Review velocity (reviews per week or month) is a stronger ranking signal than total count. A business with 80 reviews gaining 3 per week outranks one with 400 reviews and no recent activity.
**Rule 40.2.** Define a target review acquisition rate benchmarked against top-3 local competitors. If they average 8 new reviews per month, match or exceed; falling behind velocity cedes ranking over time.
**Rule 40.3.** Review content matters as much as count. Extract keywords, service mentions, and neighborhood/city names from reviews; reviews saying "great emergency plumbing in Oakland" feed both relevance and geographic signals directly.
**Rule 40.4.** Build a review request system tied to job completion: automated SMS or email after service, a direct link to the GBP review form (not a landing page in between), optional follow-up for non-responders. Ask at the moment satisfaction is highest.
**Rule 40.5.** Respond to every review within 48 hours using structured templates varied by rating tier. 5-star: thank plus mention the service and location. 3–4 star: thank plus address specific feedback constructively. 1–2 star: acknowledge, apologize where appropriate, offer a resolution channel, avoid argument. Never argue publicly.
**Rule 40.6.** Use responses to reinforce keywords and geo mentions naturally. A response that reads "Thanks for trusting us with your kitchen remodel in Berkeley" strengthens both the service-term and geo association in Google's understanding of the business.
**Rule 40.7.** Review policy compliance: never offer compensation for reviews, never review-gate (filtering happy customers toward reviews and unhappy ones away), never post fake reviews. Violations trigger filtering, rating resets, or profile suspension.

### Section 41. Local content and activity

**Rule 41.1.** Publish GBP posts on a steady weekly cadence (or more often). Posts are a freshness signal; profiles that go silent for weeks lose some ranking weight. Cadence matters more than post length.
**Rule 41.2.** Rotate post types across weeks: offers, events, project showcases, service highlights, staff features, community involvement, seasonal content. Each type targets different query patterns and prevents content monotony.
**Rule 41.3.** Include keywords, service names, and neighborhood/city mentions in posts. The first sentence is the highest-leverage place; the CTA is the second.
**Rule 41.4.** Photo cadence beats photo count. A steady drip of 2–5 photos per week outperforms a single upload of 50. Prioritize before/after work, team on-site, completed projects, real job locations, staff, and premises — not stock imagery.
**Rule 41.5.** Build location-specific landing pages on the website for each service area served: "Plumbing in Oakland," "Plumbing in Berkeley," one per meaningful geo. These must contain genuinely local content (neighborhoods served, local landmarks, real local projects, local phone numbers, embedded local reviews) or they function as doorway pages and hurt the site. If you cannot write local content for a geo, do not publish a page for it.
**Rule 41.6.** Embed Google Maps on contact and service-area pages. Link NAP consistently. Mark up `LocalBusiness` (or the appropriate subtype: `Plumber`, `Dentist`, `Restaurant`, etc.) schema with `PostalAddress`, `geo` coordinates, `openingHoursSpecification`, `areaServed`, `priceRange`, and `sameAs` pointing to GBP URL and social profiles.
**Rule 41.7.** Local backlinks and citations from local media, chambers of commerce, local sponsorships, BBB, and local industry associations carry disproportionate weight for local ranking compared to equivalent national links.
**Rule 41.8.** Treat local SEO as compounding weekly actions: one post, a few photos, a review request, a review response round, one citation audit, one competitor check. Small consistent effort outperforms quarterly bursts every time.

---

## Part XI. Monitoring and measurement

### Section 42. Ranking and traffic monitoring

**Rule 42.1.** Google Search Console is the ground truth for impressions, clicks, CTR, and positions. Connect it day one; export data regularly.
**Rule 42.2.** Third-party rank trackers (Ahrefs, Semrush, Sistrix, SERanking) add historical depth, competitor tracking, and granular keyword universes that GSC lacks.
**Rule 42.3.** Manual SERP checks remain valuable for unusual queries, geographic targeting, and spotting SERP feature shifts.
**Rule 42.4.** Track rankings over time, not in single snapshots. Small fluctuations within a few positions are noise; persistent drops of 5+ positions on multiple related queries are signals.
**Rule 42.5.** Diagnose drops by layer: algorithmic (Google update timeline), page-level (CWV regression, content decay), site-level (crawl errors, indexation drop), external (lost backlinks, competitor gains).

### Section 43. AI visibility monitoring

**Rule 43.1.** Track AI citations with purpose-built tools (Profound, Peec.ai, Otterly, Scrunch AI, Goodie AI, and others). These query AI engines with your target keywords and report which sources appear.
**Rule 43.2.** Supplement with manual audits: prompt ChatGPT, Perplexity, Gemini, and Claude with your top 20 queries monthly. Log which sources are cited and where your brand appears in answers.
**Rule 43.3.** Watch Google AI Overviews for your target queries. Inclusion there drives zero-click visibility even when traditional clicks stay flat.
**Rule 43.4.** Track branded search volume as a leading indicator. Rising branded search signals growing AI and social exposure even before it shows in organic clicks.

### Section 44. User-behavior and conversion metrics

**Rule 44.1.** Engaged sessions, scroll depth, and time on page signal content quality to both ranking systems and your own prioritization. Low-engagement top pages are refresh candidates.
**Rule 44.2.** Conversion tracking must tie back to specific landing pages and query patterns. Traffic without conversion is a signal to reexamine intent match.
**Rule 44.3.** Bounce rate alone is not a reliable quality signal; a user who gets their answer and leaves is a success for informational intent. Pair with scroll depth and task completion proxies.
**Rule 44.4.** Set up event tracking for meaningful interactions (CTA clicks, form starts, video plays, code copies). These surface intent within the session.

### Section 45. Competitor and gap monitoring

**Rule 45.1.** Maintain a tracked set of 5–10 primary competitors. Log their new content, new backlinks, ranking gains, and SERP feature wins monthly.
**Rule 45.2.** Content gap analysis: keywords where competitors rank top 10 and you do not rank top 50. These are the shortest paths to new traffic.
**Rule 45.3.** Backlink gap analysis: referring domains linking to multiple competitors but not to you. These are the highest-probability outreach targets.
**Rule 45.4.** Feature gap analysis: SERP features competitors own (featured snippets, PAA, AI Overview citations) for queries relevant to you.

---

## Part XII. Execution roadmap

### Section 46. Prioritization

**Rule 46.1.** Sequence: technical fixes first (crawlability, indexation, CWV), then on-page content (titles, headings, answer blocks, schema), then authority (links, mentions, PR), then expansion (new clusters, new surfaces, programmatic at scale, local scaling). Reversing this sequence wastes effort because content and links amplify a broken foundation.
**Rule 46.2.** Within each layer, prioritize by impact × effort. High-impact/low-effort items (fixing noindex on money pages, adding FAQ schema, rewriting title tags, fixing a wrong GBP primary category) ship first.
**Rule 46.3.** Business-model variations change weighting. B2B SaaS weights GEO and thought leadership heavily. eCommerce weights technical SEO, product schema, and SXO. Publishers weight AEO and freshness. Local service businesses weight GBP, reviews, and local content (Part X) over global backlinks. Marketplaces and directories weight programmatic design (Part IX) and indexing discipline. Align the roadmap to model.
**Rule 46.4.** Do not scale content or link building before the foundation is solid. Premature scaling amplifies problems and burns budget. The same rule applies with more force to programmatic: never publish 10,000 template pages on a domain whose first 100 pages are not yet clean.

### Section 47. 90-day plan

**Rule 47.1.** Days 1–30 (AIO foundation): technical audit and fixes (CWV, crawl errors, broken links, sitemap, robots.txt, HTTPS, mobile), heading hierarchy cleanup, schema implementation (Organization, Article, FAQ, Breadcrumb, LocalBusiness if relevant), title and meta rewrite on top 50 pages, author pages, canonical tags. For local businesses: complete GBP audit and fix primary category, missing services, and missing attributes.
**Rule 47.2.** Days 31–60 (GEO + AEO): rewrite top 20 pages into answer-block format with front-loaded answers; add TL;DRs, Key Takeaways, FAQ sections; publish one original-data piece designed as a linkable asset; build the first set of decision/comparison pages for commercial queries (Section 28); begin digital PR and HARO responses; claim or update entity profiles (Wikidata, Crunchbase, LinkedIn Company). For local businesses: start weekly GBP posting cadence and review request system.
**Rule 47.3.** Days 61–90 (SXO + expansion): optimize page experience (INP, CLS regressions, mobile interactions); launch first topic cluster (1 pillar + 8 supporting); if programmatic is in scope, ship a small first wave (under 500 pages) across a narrow taxonomy to validate indexing and quality before scaling; begin AI citation monitoring; establish recurring content refresh cycle; evaluate results and plan the next 90.
**Rule 47.4.** Continuous throughout: weekly GSC review, monthly rank tracking review, monthly AI citation audit, quarterly backlink audit, quarterly content decay refresh, weekly local activity (if applicable).

### Section 48. Anti-patterns to avoid

**Rule 48.1.** Keyword stuffing and over-optimized anchor text. Both are detected easily and penalized or ignored.
**Rule 48.2.** Scaled AI content without human editorial. Violates Google's spam policies and produces low-trust output that AI engines do not cite.
**Rule 48.3.** Link schemes: buying links, private blog networks, excessive reciprocal linking, large-scale paid guest-post networks.
**Rule 48.4.** Cloaking: serving different content to crawlers than to users. Manual action risk is high and recovery is slow.
**Rule 48.5.** Thin content at scale: doorway pages, auto-generated location pages without genuine local content, programmatic pages without unique value, competitor-name pages with nothing but a template swap. See Section 31 for the distinction between valuable and doorway programmatic output.
**Rule 48.6.** Review manipulation: gating, incentivizing, buying, or self-posting reviews. GBP filters are aggressive; detected violations erase reviews and can suspend profiles.
**Rule 48.7.** Neglecting mobile, CWV, or HTTPS. These are table stakes; the penalty for failing them is exclusion from consideration.
**Rule 48.8.** Chasing short-term tricks over long-term value. The algorithm roadmap consistently punishes shortcuts; compounding compounds for those who build durably.

---

## Appendix A. Quick-reference thresholds

| Metric | Threshold | Notes |
|---|---|---|
| Title tag length | 50–60 chars | Longer gets truncated in SERP |
| Meta description length | 120–155 chars | Google may rewrite |
| URL length | under 60 chars | Shorter ranks and shares better |
| LCP | < 2.5 s | 75th percentile real-user |
| INP | < 200 ms | Replaced FID in March 2024 |
| CLS | < 0.1 | 75th percentile real-user |
| TTFB | < 800 ms | Bounds LCP |
| Mobile body font | ≥ 16 px | Readability and mobile usability |
| Touch target | ≥ 48×48 px | With 8 px spacing |
| Sitemap size | ≤ 50k URLs / 50 MB | Split with index if larger |
| Content depth (competitive) | 1500–3000+ words | Intent-dependent |
| Internal links per new article | 2–3 in / 3–5 out | Minimum |
| Refresh cycle (competitive) | Quarterly | Annual for evergreen |
| GBP description | ≤ 750 chars | Front-load value prop and geo |
| Review response time | ≤ 48 hours | Tiered templates by star rating |
| Programmatic rollout rate | ~500 pages/week | Avoid crawl-budget shock |

## Appendix B. Schema types cheat sheet

| Content form | Primary schema | Supporting |
|---|---|---|
| Blog article | `BlogPosting` | `Person` (author), `BreadcrumbList` |
| News article | `NewsArticle` | `Person`, `Organization` |
| Product page | `Product` | `Offer`, `AggregateRating`, `Review` |
| Service page | `Service` | `Organization`, `Offer` |
| FAQ section | `FAQPage` | one `Question` per item |
| How-to guide | `HowTo` | `HowToStep`, `HowToSupply` |
| Homepage | `Organization` or `WebSite` | `SearchAction` for sitelinks search |
| Author page | `Person` | `sameAs` to authoritative profiles |
| Local business | `LocalBusiness` subtype | `PostalAddress`, `openingHoursSpecification`, `geo`, `areaServed` |
| Video | `VideoObject` | `thumbnailUrl`, `uploadDate`, `duration` |
| Image | `ImageObject` | `caption`, `creator`, `license` |
| Event | `Event` | `Place`, `Offer` |
| Course | `Course` | `Provider`, `CourseInstance` |
| Review | `Review` | `itemReviewed`, `Rating` |
| Comparison page | `Article` + `ItemList` | Items as `Product` or `SoftwareApplication` |
| Calculator / tool page | `WebApplication` or `SoftwareApplication` | `applicationCategory`, `featureList` |

## Appendix C. Layer mapping

| Layer | What it optimizes | Primary signals | Primary output |
|---|---|---|---|
| SEO | Organic rankings | Content, links, technical | Clicks from SERP |
| AIO | Structural AI comprehension | Headings, schema, clean HTML | Correct parsing by AI |
| AEO | Direct-answer extraction | Answer blocks, Q&A structure | Featured snippets, AI answers |
| GEO | Inclusion in generative answers | Authority, citations, entity strength | Brand named in AI responses |
| LLMO | Recognition in LLM-native surfaces | Training-data presence, canonical sources | Recognition across LLM products |
| SXO | Post-click experience | Speed, UX, readability, task completion | Engagement, conversion, return |
| Local SEO | Local Pack and map visibility | GBP, NAP, reviews, proximity | Local Pack placement, calls, directions |
| Programmatic | Long-tail coverage at scale | Taxonomy, structured data, unique value per page | Indexed pages per query combination |

All eight operate on the same content and the same domain. Designing for one well designs for the others, provided the foundation is sound.