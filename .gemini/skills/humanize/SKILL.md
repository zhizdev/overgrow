---
name: humanize
description: Systematically rewrites AI-generated or AI-sounding text on web pages, documents, or pasted content to sound human. Use this skill whenever a user asks to "humanize", "de-AI", "make this sound less like AI", "rewrite to avoid AI detection", or "clean up AI writing". Also trigger when a user pastes text and asks to make it sound more natural, more human, or less robotic. The skill applies a strict deterministic rule pipeline — NOT creative rewriting — making it safe for agentic/automated use.
---

# Humanize Skill

## Purpose

Transforms AI-generated text into human-sounding writing by applying a **fixed, ordered pipeline of rules**. Each rule is a specific find/replace or structural operation. The agent executing this skill must follow rules exactly as written -- do NOT apply creative judgment, do NOT reword beyond what the rule specifies, do NOT skip rules because "the text seems fine."

## Critical Constraint

This skill is designed for **agentic use**. The rules are intentionally rigid. An agent must not:
- Decide a rule "doesn't apply" based on vibes
- Rephrase more than the rule requires
- Add new content
- Merge rules or apply them out of order

Work through the pipeline **in order, rule by rule.** Log which rules fired.

---

## Pipeline Overview

Run these phases in sequence on the target text:

1. **PHASE 1 -- Vocabulary Replacement** (word-level, regex-safe)
2. **PHASE 2 -- Sentence Structure Fixes** (pattern-level)
3. **PHASE 3 -- Structural / Paragraph-level Removal**
4. **PHASE 4 -- Final Checks**

Read `/reference/word-lists.md` before starting Phase 1.
Read `/reference/patterns.md` before starting Phase 2.

---

## PHASE 1 -- Vocabulary Replacement

### How to apply Phase 1 rules

For every rule below: scan the **entire text**. Replace **every instance** of the trigger term or phrase. Do not leave any behind. Replacements are case-preserving (if original is capitalized, keep it capitalized).

**Load the full banned word list from `/reference/word-lists.md` before proceeding.**

Apply these replacement rules in the listed order:

---

### 1.1 -- Copula Substitution (highest priority)

These phrases replace the simple verb "is/are/was/were" with elaborate constructions. Revert them.

| Find (case-insensitive) | Replace with |
|---|---|
| `serves as a` | `is a` |
| `serves as an` | `is an` |
| `serves as the` | `is the` |
| `stands as a` | `is a` |
| `stands as an` | `is an` |
| `stands as the` | `is the` |
| `marks a` | `is a` (only when followed by significance word -- see word-lists.md significance) |
| `represents a` | `is a` (only when followed by significance word) |
| `acts as a` | `is a` |
| `acts as an` | `is an` |
| `holds the distinction of being` | `is` |
| `boasts a` | `has a` |
| `boasts an` | `has an` |
| `boasts` (standalone verb) | `has` |
| `features` (as verb, not noun) | `has` or `includes` -- choose whichever is grammatically shorter |
| `offers` (when meaning "has") | `has` |

**Rule 1.1 Exception**: Do NOT apply these substitutions inside quoted text or titles.

---

### 1.2 -- Banned Adjective/Adverb Swaps

Replace the following with the listed alternative. If no alternative is listed, **delete the word entirely** (and fix spacing).

| Banned word | Replace with |
|---|---|
| `vibrant` | `busy` / `active` (pick shorter fit) |
| `rich` (when describing culture/heritage) | delete it |
| `diverse` (when describing "array" or "range") | delete it |
| `nestled` | `located` |
| `breathtaking` | delete it |
| `stunning` (landscape/beauty context) | delete it |
| `fascinating` | delete it |
| `captivating` | delete it |
| `meticulous` | `careful` |
| `meticulously` | `carefully` |
| `pivotal` | `key` then see Rule 1.3 |
| `crucial` | `important` |
| `vital` | `important` |
| `intricate` | `complex` |
| `intricacies` | `complexities` |
| `tapestry` (abstract/metaphorical) | delete the clause containing it and rewrite as a plain noun phrase |
| `landscape` (abstract: "evolving landscape") | delete it; rewrite as the underlying noun |
| `groundbreaking` | delete it |
| `renowned` | delete it |
| `indelible` | delete it |
| `enduring` (when used as filler adjective) | delete it |
| `vibrant` | `active` |

---

### 1.3 -- Banned Verb Swaps

| Banned verb | Replace with |
|---|---|
| `underscore` (metaphorical) | `show` |
| `underscores` | `shows` |
| `underscored` | `showed` |
| `highlight` (metaphorical) | `show` |
| `highlights` | `shows` |
| `highlighted` | `showed` |
| `emphasize` / `emphasizes` / `emphasizing` | `stress` / `stresses` / `stressing` -- or delete the "-ing" tail clause entirely (see Phase 2) |
| `showcase` / `showcases` / `showcasing` | `show` / `shows` / `showing` |
| `foster` / `fosters` / `fostering` | `build` / `builds` / `building` |
| `cultivate` / `cultivates` / `cultivating` | `develop` / `develops` / `developing` |
| `garner` / `garnered` / `garnering` | `get` / `got` / `getting` |
| `bolster` / `bolstered` / `bolstering` | `strengthen` / `strengthened` / `strengthening` |
| `delve` / `delves` / `delving` | `look` / `looks` / `looking` |
| `align with` | `match` |
| `resonate with` | `match` / `fit` |
| `encompass` / `encompasses` | `include` / `includes` |
| `exemplify` / `exemplifies` | `show` / `shows` |

---

### 1.4 -- Banned Transition Words at Sentence Start

These words are fine mid-sentence but **must not open a sentence** in AI-generated text (they signal padding).

If the sentence begins with any of the following, either:
- Delete the word and capitalize the next word, OR
- If deleting creates a run-on with the previous sentence, replace with a period and start fresh.

| Remove at sentence start |
|---|
| `Additionally,` |
| `Furthermore,` |
| `Moreover,` |
| `In addition,` |
| `Notably,` |
| `It is worth noting that` |
| `It's worth noting that` |
| `It is important to note that` |
| `It's important to note that` |
| `It is crucial to note that` |
| `It is critical to note that` |

---

### 1.5 -- Banned Noun Phrases

| Banned phrase | Replace with |
|---|---|
| `a testament to` | `proof of` |
| `a vital role` | `an important role` (then consider deleting the sentence -- see Phase 3) |
| `a significant role` | `an important role` |
| `a crucial role` | `an important role` |
| `a pivotal role` | `an important role` |
| `a key role` | `an important role` |
| `the evolving landscape of` | `the changing` + [underlying noun] |
| `the broader` | delete `broader` |
| `the rich tapestry of` | delete this phrase entirely; rewrite as the noun only |
| `a diverse array of` | `many` |
| `a wide range of` | `many` |
| `a comprehensive understanding of` | `an understanding of` |
| `valuable insights` | `information` |
| `deeply rooted` | delete it |
| `focal point` | `center` |
| `indelible mark` | delete the clause |
| `active social media presence` | delete the sentence entirely |

---

## PHASE 2 -- Sentence Structure Fixes

Read `/reference/patterns.md` for examples of each pattern type before applying.

---

### 2.1 -- Delete "-ing Tail" Superficial Analysis Clauses

**Pattern**: A sentence ends with a participial phrase that makes a vague significance claim. These clauses add no factual content.

**Detection rule**: If a sentence ends with a comma + present participle (-ing word) + clause that uses any of {highlighting, emphasizing, underscoring, showcasing, reflecting, symbolizing, contributing to, fostering, cultivating, ensuring, demonstrating}, AND the clause makes a significance/impact claim rather than a factual one, **delete everything from the comma onward.**

**Example**:
- Before: `The bridge was built in 1923, reflecting the region's commitment to infrastructure development.`
- After: `The bridge was built in 1923.`

**Do not apply** if the -ing clause contains a specific, verifiable fact (dates, names, numbers).

---

### 2.2 -- Delete "Not Just X, But Also Y" Negative Parallelisms

**Pattern**: `not just [X], but [also] [Y]` or `not only [X], but [also] [Y]` or `It's not [X], it's [Y]`

**Rule**: Rewrite as the positive claim only. Keep Y, delete the "not just X" scaffolding.

**Example**:
- Before: `The museum is not just an exhibition space, but also a center for community engagement.`
- After: `The museum is a center for community engagement.`

**Example 2**:
- Before: `It's not just about the music -- it's about the culture.`
- After: `It's about the culture.`

---

### 2.3 -- Collapse Rule-of-Three Padding

**Pattern**: Three consecutive adjectives or short noun phrases joined by commas or "and" where 2 or more items are near-synonyms or vague.

**Rule**: Keep only the most specific/concrete item. Delete the others.

**Example**:
- Before: `The event features keynote sessions, panel discussions, and networking opportunities.`
- After: `The event features keynote sessions and panels.`

**Do not collapse** if all three items are meaningfully distinct and specific.

---

### 2.4 -- Remove Elegant Variation (Repetition-Penalty Synonyms)

**Pattern**: Within 3 sentences, the same entity is referred to by 3+ different noun phrases (e.g., "the organization", "the body", "the institution", "the entity", "the group").

**Rule**: Pick the most common/simple noun phrase and use it consistently throughout the paragraph. Delete the variants.

---

### 2.5 -- Flatten "Serves to" Infinitive Constructions

**Pattern**: `serves to [verb]` / `aims to [verb]` (when used as padding)

**Rule**: Replace with the verb directly.

**Example**:
- Before: `This initiative serves to enhance community wellbeing.`
- After: `This initiative improves community wellbeing.`

---

## PHASE 3 -- Structural / Paragraph-Level Removal

These rules operate on **whole sentences or whole paragraphs**, not words.

---

### 3.1 -- Delete Legacy/Significance Sentences

**Rule**: Delete any sentence that ONLY claims something is important/significant/pivotal without providing a specific fact. Apply this test:

> "Does this sentence contain a date, number, name, or verifiable claim?"

If NO, delete the sentence.

**Examples to delete**:
- `This marked a pivotal moment in the evolution of regional statistics.`
- `This initiative was part of a broader movement to enhance regional governance.`
- `This highlights the enduring legacy of the community's spirit.`
- `The station has supported the socio-economic development of the region.`

---

### 3.2 -- Delete "Despite Challenges" Boilerplate

**Pattern**: A paragraph or sentence that follows the formula:
`Despite [positive description], [subject] faces [challenges/difficulties]...` followed by a vague optimistic conclusion.

**Rule**: Delete the entire boilerplate block. If there is specific factual content buried in it (named challenges with data), extract only the factual sentences and keep those. Delete the framing.

---

### 3.3 -- Delete Conservation/Future Prospects Speculation

**Pattern**: Sentences speculating about future potential, ongoing preservation efforts with no named program, or claiming "factors such as X, Y, and Z could potentially impact..."

**Rule**: Delete if the sentence contains no specific named program, budget figure, or verifiable fact.

---

### 3.4 -- Delete "Maintains an Active Social Media Presence" Sentences

**Rule**: Any sentence stating that a person, company, or organization "maintains an active social media presence" or "has a strong digital presence", **delete entirely.**

---

### 3.5 -- Delete Vague Attribution Sentences

**Pattern**: Sentence attributes a claim to `experts`, `observers`, `industry reports`, `several sources`, `scholars`, or `researchers` with no specific citation.

**Rule**: Delete the sentence entirely. Do not attempt to fix it.

---

### 3.6 -- Remove "Challenges and Future Prospects" Section Headers

**Rule**: If a section is titled any of the following, delete the entire section header and merge content into surrounding prose (applying Rules 3.2-3.5 to its contents):
- "Challenges and Future Prospects"
- "Future Outlook"
- "Challenges and Legacy"
- "Future Directions"
- "Ongoing Challenges"

---

## PHASE 4 -- Final Checks

Run these checks after all above phases are complete.

### 4.1 -- Em Dash Reduction

Count em dashes in the text. If more than 1 per 150 words on average:
- Replace em dashes used as parenthetical brackets with commas or parentheses
- Replace em dashes before a concluding clause with a period (start new sentence)
- Keep em dashes only when they set off a genuine appositive with no cleaner option

### 4.2 -- Sentence Length Variation Check

Scan for runs of 3+ consecutive sentences of similar length (all short or all long).
- If 3+ consecutive short sentences (< 10 words each): combine two of them with a conjunction
- If 3+ consecutive long sentences (> 30 words each): split one at a natural clause boundary

### 4.3 -- Opening Word Diversity Check

Check the first word of every sentence in a paragraph. If any word appears as the sentence opener more than twice in the same paragraph, rewrite one instance so it opens differently.

### 4.4 -- Passive Voice Audit

Find passive voice constructions (`was [verb]ed by`, `were [verb]ed by`, `is [verb]ed by`).
- If the agent is named (e.g., "was built by engineers"): consider converting to active voice
- If the agent is unnamed: leave it -- unnamed passives are natural

### 4.5 -- Output a Change Log

After completing all phases, produce a **change log** in this format:

```
PHASE 1 CHANGES:
- Rule 1.1: Replaced "serves as" -> "is" [N instances]
- Rule 1.3: Replaced "underscore" -> "show" [N instances]
- ...

PHASE 2 CHANGES:
- Rule 2.1: Deleted [N] -ing tail clauses
- ...

PHASE 3 CHANGES:
- Rule 3.1: Deleted [N] legacy/significance sentences
- ...

PHASE 4 CHANGES:
- Rule 4.1: Reduced em dashes from [X] to [Y]
- ...

RULES THAT DID NOT FIRE: [list any rule numbers where 0 instances were found]
```

---

## Web Page Workflow

When running this skill on a **live web page** (agent context):

1. **Extract** the editable text region (article body, document, text box -- not nav/footer/headers)
2. **Copy text** to working buffer
3. **Apply all 4 phases** in order on the buffer
4. **Output** the rewritten text -- do NOT auto-submit/replace unless explicitly instructed
5. **Show the change log** to the user
6. Wait for user approval before writing back

If the page is read-only (news article, published page), output the rewritten version as text for the user to copy.

---

## What This Skill Does NOT Do

- Does not rewrite for style/tone beyond the rules
- Does not add new content
- Does not restructure paragraphs beyond what Phase 3 specifies
- Does not check facts
- Does not remove content simply because it's poorly written -- only removes content matching specific rule patterns