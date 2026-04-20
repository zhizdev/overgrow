# SKILL: query_fanout — predict and generate LLM search fan-out

## What this skill does

Given any user prompt, generate the set of sub-queries that a search-augmented
LLM (Claude, Gemini, or ChatGPT) would fire behind the scenes to answer it.
The output is a structured JSON object with a classified intent, identified
named entities, and the predicted sub-query set for each model.

## When to trigger

- User asks to "generate fan-out queries" or "predict sub-queries" for a prompt
- User is building SEO/GEO content and wants to know what queries AI will fire
- User wants to evaluate what searches Overgrow/Bonemeal should generate
- User asks "what would Claude search for when asked X"
- Any request to reverse-engineer, simulate, or replicate LLM search behavior

---

## Background: the 15-facet taxonomy

These are the query facet types extracted from empirical observation across
Claude, Gemini, and ChatGPT on startup-oriented prompts. Each facet represents
a distinct retrieval intent.

| Code     | Name                    | Description |
|----------|-------------------------|-------------|
| DEFN     | Definition / background | What is X, how does X work |
| ENTITY   | Per-entity lookup       | Each named product/company gets its own query |
| COMPARE  | Head-to-head comparison | Explicit A vs B framing |
| TEMPORAL | Temporal / recency      | Year appended, "latest", specific date |
| SENTIMENT| Community / sentiment   | Reddit, HN, reviews, founder quotes |
| PRICING  | Pricing / quantitative  | Fee structures, benchmarks, numbers |
| HOWTO    | How-to / implementation | Step-by-step, setup guides |
| CAUSAL   | Causal / explanatory    | Why X happens, downstream effects |
| AUTHORITY| Regulatory / authority  | Official docs, legal text, gov sources |
| STRATEGY | Strategy / best practices | What should I do, recommended approach |
| CASE     | Case study / example    | How specific named companies do it |
| SCOPE+   | Scope broadening        | More general version of the query |
| SCOPE-   | Scope narrowing         | Drill into a specific sub-aspect |
| SOURCE   | Source-targeted         | site: operators, direct URL searches |
| ADJACENT | Adjacent concept        | Related concepts for context |

---

## Intent classification

Classify the prompt into one of these intent types before generating queries:

| Intent type     | Description                                  | Key facets triggered |
|-----------------|----------------------------------------------|----------------------|
| factual-single  | Who/what is one specific entity              | DEFN, ENTITY, TEMPORAL |
| factual-multi   | Current state across multiple named entities | ENTITY, TEMPORAL, AUTHORITY, PRICING |
| comparative     | A vs B (explicit or implied)                 | COMPARE, ENTITY, PRICING, SENTIMENT |
| how-to          | How do I do X                                | HOWTO, STRATEGY, CASE, SCOPE- |
| causal          | Why did/does X happen                        | CAUSAL, DEFN, TEMPORAL |
| multi-hop       | How does A affect B                          | CAUSAL, DEFN, TEMPORAL, STRATEGY |
| pricing-market  | What does X cost / benchmarks                | PRICING, COMPARE, ENTITY, SOURCE |
| compliance      | Legal/regulatory requirements for X          | AUTHORITY, DEFN, HOWTO, SCOPE- |
| sentiment       | What do people think about X                 | SENTIMENT, ENTITY, CASE, SOURCE |
| strategic       | What should I do about X                     | STRATEGY, COMPARE, CASE, CAUSAL |

---

## Per-model behavioral rules

### Claude rules (1–3 queries)
1. Always appends a year (2025 or 2026) to every query
2. Fires 0 queries for ~30% of prompts (stable knowledge, regulatory/compliance)
3. First query: broad + semantic + temporal
4. Second query (if any): different facet OR per-named-entity — never both
5. Never fires SENTIMENT, SOURCE, or AUTHORITY
6. Query length: 4–8 words maximum
7. Entity decomposition only if entities are the literal subject; never for context entities
8. Format: "{category} {key facet phrase} {year}"

### Gemini rules (3–6 queries)
1. Always fires 3–6 queries, never fewer than 3 except on trivial factual prompts
2. Uses conceptual framing: "how to X", "what is X", "pros and cons of X", "when to X"
3. Standard 4-query pattern: (1) definition/background, (2) facet A, (3) facet B, (4) restatement of original
4. Sometimes fires empty string "" as first query (ignore in output)
5. Breaks multi-entity prompts into criteria/facets — does NOT decompose per entity
6. Fires SCOPE+ and ADJACENT more than other models
7. Temporal: appends year only to final restatement query
8. Never fires SOURCE or AUTHORITY

### ChatGPT rules (4–16 queries)
1. Query count scales with named-entity count: N entities → at least N+2 queries minimum
2. Entity decomposition: always fires one dedicated query per named product/company
3. 3-tier cascade: (1) broad category, (2) per-entity queries, (3) specific detail/fact drill-down
4. Sentiment prompts: always includes Reddit/HN/Stack Overflow community queries
5. Compliance prompts: always includes AUTHORITY queries with specific CFR/article citations
6. Pricing prompts: searches pricing pages directly, runs 3–5 queries per price verification
7. Reality-check pattern: fires quote-based queries to verify specific claimed statistics
8. Temporal: uses full date (e.g. "April 2026"), not just year
9. Never fires SCOPE+ — always narrows or stays at entity level

---

## Execution sequence

When asked to generate fan-out for a prompt:

### Phase 1 — Parse
1. Extract all named entities (companies, tools, products, laws, people)
2. Count entities: N_entities
3. Identify the intent type from the table above
4. Note the domain: fintech / consumer-app / devtools / SaaS / infra / compliance / general

### Phase 2 — Select facets
Based on intent type, select the primary facets that apply.
Then apply domain-specific additions:
- fintech: add AUTHORITY (FDIC, IRS, etc.) for ChatGPT
- compliance (HIPAA, GDPR, CCPA): add AUTHORITY with specific citations for ChatGPT
- sentiment/opinion prompts: add SENTIMENT + SOURCE for ChatGPT and Gemini
- pricing comparison: add PRICING + SOURCE (direct pricing page URLs) for ChatGPT
- named case studies: add CASE for all models

### Phase 3 — Generate Claude queries
- Start with 1 broad query: "{topic} {key phrase} {current_year}"
- If N_entities ≥ 2 AND intent is comparative OR factual-multi:
  add 1 entity-specific query: "{entity1} vs {entity2} {key phrase} {year}"
- If intent is compliance or regulatory: output 0 queries
- Cap at 3 queries total

### Phase 4 — Generate Gemini queries
- Query 1: background/definitional framing ("what is X", "how does X work")
- Query 2: first key facet ("how to X", "pros and cons of X", "when to X")
- Query 3: second key facet (different angle — risks, alternatives, benchmarks)
- Query 4: combined restatement of the original prompt with year
- If N_entities ≥ 2: replace query 2 with per-entity comparison query
- Cap at 5 queries for most intents, 6 for multi-hop/strategic

### Phase 5 — Generate ChatGPT queries
- Query 1: broad category + intent phrase + year range
- Queries 2..N_entities+1: one per named entity (entity name + key attributes)
- Queries N+2..end: specific detail drill-downs based on facets selected:
  - PRICING: direct pricing page search for each entity
  - SENTIMENT: "site:reddit.com {topic}", "Hacker News {topic}"
  - AUTHORITY: specific regulation/section citation
  - SCOPE-: drill into the most specific sub-claim in the prompt
  - SOURCE: "{entity} documentation {specific endpoint or feature}"
- Reality-check query if the prompt makes a specific factual claim
- Cap at 12 queries for most prompts, 16 for highly comparative/regulatory

### Phase 6 — Format output

Return JSON:
```json
{
  "prompt": "<original prompt>",
  "intent": "<intent type>",
  "entities": ["entity1", "entity2"],
  "n_entities": 2,
  "domain": "SaaS",
  "facets_selected": ["COMPARE", "ENTITY", "PRICING", "SENTIMENT"],
  "queries": {
    "claude": ["query 1", "query 2"],
    "gemini": ["query 1", "query 2", "query 3", "query 4"],
    "chatgpt": ["query 1", "query 2", "query 3", "query 4", "query 5", "query 6"]
  }
}
```

---

## Quality checks

Before finalizing output:
- Claude queries MUST contain a year; remove any that don't
- Claude queries MUST NOT contain "site:", "reddit", "hacker news", "official", or CFR citations
- Gemini queries MUST use conceptual framing verbs (how, what, when, pros, factors)
- Gemini MUST NOT decompose into per-entity queries for comparative prompts
- ChatGPT MUST have at least one query per named entity
- ChatGPT MUST have at least one TEMPORAL query using the full current date
- No duplicate or near-duplicate queries within any model's output
- No query should be longer than 15 words for Claude/Gemini; ChatGPT may go up to 20

---

## Example

**Prompt:** "What's the best affiliate program software for a B2B SaaS company —
Dub, Rewardful, or PartnerStack — and how do their commission structures compare?"

**Expected output:**
```json
{
  "intent": "comparative",
  "entities": ["Dub", "Rewardful", "PartnerStack"],
  "n_entities": 3,
  "domain": "SaaS",
  "facets_selected": ["COMPARE", "ENTITY", "PRICING", "SENTIMENT", "CASE"],
  "queries": {
    "claude": [
      "best affiliate program software B2B SaaS Dub Rewardful PartnerStack comparison 2025",
      "Dub vs Rewardful PartnerStack commission structure pricing 2025"
    ],
    "gemini": [
      "how to choose affiliate software for B2B SaaS self-serve",
      "Rewardful vs PartnerStack commission structure features",
      "pros and cons of Dub affiliate software for SaaS",
      "best affiliate program software B2B SaaS Dub Rewardful PartnerStack comparison"
    ],
    "chatgpt": [
      "best affiliate program software B2B SaaS self-serve product 2025 2026",
      "Dub affiliate commission structure pricing plans revenue share",
      "Rewardful commission structure pricing plans SaaS recurring commission",
      "PartnerStack affiliate commission structure pricing partner tiers",
      "Dub Partners delegated affiliate program 30% recurring lifetime terms",
      "Rewardful pricing plans 2025 commission rates features",
      "PartnerStack partner commission structure flat percentage recurring documentation",
      "Rewardful vs PartnerStack for B2B SaaS self-serve product comparison"
    ]
  }
}
```

---

## Notes

- This skill is deterministic — given the same prompt, always produce the same output
- Do not make up plausible-sounding but unobserved query patterns
- The taxonomy was derived from empirical data; do not add new facet codes
- When unsure of intent, default to "strategic" (the most common in startup contexts)
- Entity names should be spelled exactly as they appear in the prompt