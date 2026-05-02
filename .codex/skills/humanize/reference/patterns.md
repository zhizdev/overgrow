# Patterns Reference

Used by SKILL.md Phase 2 rules. Load this file before starting Phase 2.

Each section contains the detection rule, a positive example (apply the rule), and a negative example (do NOT apply the rule).

---

## Rule 2.1 -- "-ing Tail" Superficial Analysis Clauses

### Detection Rule
A sentence ends with: `[,] [present-participle-verb] [clause that makes a significance/impact claim]`

The participle must be one of:
```
highlighting
emphasizing
underscoring
showcasing
reflecting
symbolizing
contributing to
fostering
cultivating
ensuring
demonstrating
reinforcing
cementing
solidifying
illustrating (when making significance claim)
affirming
signaling
```

AND the clause must NOT contain a specific verifiable fact (no date, number, named entity, or measurement).

### Positive Examples -- APPLY RULE (delete from comma onward)

```
Before: The bridge was constructed in 1923, reflecting the region's enduring commitment to infrastructure.
After:  The bridge was constructed in 1923.

Before: The institute publishes annual reports, showcasing its dedication to transparency.
After:  The institute publishes annual reports.

Before: She won three consecutive championships, cementing her status as a dominant force in the sport.
After:  She won three consecutive championships.

Before: The festival draws visitors from across the country, contributing to the cultural vitality of the region.
After:  The festival draws visitors from across the country.
```

### Negative Examples -- DO NOT APPLY RULE

```
# Contains a specific fact (name) -- keep
The policy was reversed in 2019, reflecting a decision made by the new board of directors.

# The -ing verb isn't a significance claim word -- keep
She entered the room, carrying a folder of documents.

# The clause contains a number -- keep
The fund grew to $4 million, reinforcing the government's $2M annual commitment.
```

---

## Rule 2.2 -- "Not Just X, But Also Y" Negative Parallelisms

### Detection Rule
Sentence contains one of these structural patterns:
```
not just [X], but [also] [Y]
not only [X], but [also] [Y]
It's not [X], it's [Y]
It is not [X], it is [Y]
not merely [X], but [Y]
[X], but also [Y]  (when paired with a preceding negation)
no [X], no [Y], just [Z]
```

### Positive Examples -- APPLY RULE

```
Before: The organization is not just a charity, but also a political force.
After:  The organization is a political force.

Before: It's not just about the data -- it's about the people.
After:  It's about the people.

Before: The event is not merely a celebration, but a rallying point for the movement.
After:  The event is a rallying point for the movement.

Before: No bureaucracy, no red tape -- just results.
After:  The focus is on results.
```

### Negative Examples -- DO NOT APPLY RULE

```
# Genuine contrast with factual claims on both sides -- keep
The drug is not a cure, but it can slow progression by 40%.

# "Not" modifying only a single word, not a full parallel -- keep
He is not a doctor, but he has nursing credentials.
```

---

## Rule 2.3 -- Rule-of-Three Padding Collapse

### Detection Rule
Three consecutive items in a list where 2+ items are:
- Near-synonyms (e.g., "keynote sessions, panel discussions, and networking opportunities")
- Vague/abstract (e.g., "innovation, creativity, and excellence")
- Predictable triples for the topic (e.g., any list of three positive attributes of a place)

### Positive Examples -- APPLY RULE (keep most specific; delete vague ones)

```
Before: The conference features keynote sessions, panel discussions, and networking opportunities.
After:  The conference features keynote sessions and panels.
[Rationale: "networking opportunities" is generic; "panel discussions" and "keynote sessions" overlap]

Before: The city is known for its culture, history, and natural beauty.
After:  The city is known for its history.
[Rationale: all three are vague filler for a city description; keep only the most specific]

Before: The program fosters innovation, creativity, and collaboration among participants.
After:  The program brings participants together to collaborate.
[Rationale: "innovation" and "creativity" are near-synonyms and both vague]
```

### Negative Examples -- DO NOT APPLY RULE

```
# All three items are specific and distinct -- keep
The compound contains a gym, a medical clinic, and a school.

# Two items + genuinely different third -- keep
The study examined age, income, and self-reported health outcomes.
```

---

## Rule 2.4 -- Elegant Variation (Synonym Cycling)

### Detection Rule
Within a span of 3 sentences, the same real-world entity (person, org, place, concept) is referred to by 3 or more different noun phrases where none of them is a pronoun.

Count only **substantive noun phrases**, not pronouns.

### Positive Examples -- APPLY RULE

```
Before (3 sentences):
"The organization was founded in 1990. The body has since grown to 500 members. The institution now operates in 12 countries. The group publishes an annual report."

Detected variants: "the organization", "the body", "the institution", "the group" -> 4 variants for same entity

After: Pick "the organization" (most natural/first-introduced) and use it throughout.
"The organization was founded in 1990. It has since grown to 500 members. It now operates in 12 countries. The organization publishes an annual report."
```

### Negative Examples -- DO NOT APPLY RULE

```
# Only 2 variants -- acceptable variation -- keep
"The company was founded in 2005. The firm now employs 3,000 people."

# Pronouns used -- not elegant variation -- keep
"The director resigned in May. She cited health reasons."
```

---

## Rule 2.5 -- "Serves to" Infinitive Flattening

### Detection Rule
Sentence contains `serves to [verb]` or `aims to [verb]` or `seeks to [verb]` where the subject is an institution/initiative/policy (not a person with stated intent).

### Positive Examples -- APPLY RULE

```
Before: The initiative serves to enhance community wellbeing.
After:  The initiative improves community wellbeing.

Before: The framework seeks to address systemic inequality.
After:  The framework addresses systemic inequality.

Before: The policy aims to reduce carbon emissions by 2030.
After:  The policy targets a carbon emission reduction by 2030.
[Note: keep the factual "by 2030"]
```

### Negative Examples -- DO NOT APPLY RULE

```
# Person with stated intent -- "aims to" is natural -- keep
She aims to complete the project by Q3.

# "Seeks to" in legal/formal context where it's the standard phrasing -- keep
The plaintiff seeks to recover damages.
```

---

## Phase 3 Pattern Examples

### Rule 3.1 -- Legacy/Significance Sentence Detection

**Delete if the sentence passes this test: remove the sentence -- does the paragraph lose any specific fact?**

If NO fact is lost, delete.

```
Delete: "This marked a pivotal moment in the evolution of regional policy."
Delete: "The project reflects the community's enduring commitment to progress."
Delete: "This development highlights the significance of cross-border cooperation."
Delete: "The event underscores the growing importance of digital literacy."

Keep: "The bridge opened in 1971, five years ahead of schedule."
Keep: "Membership grew from 200 to 4,500 between 1990 and 2005."
```

### Rule 3.2 -- "Despite Challenges" Boilerplate

Full block pattern to recognize and delete:

```
Block structure:
  Sentence 1: "[Subject], despite [positive attribute], faces [challenges including]..."
  Sentence 2: [List of vague challenges -- pollution, funding, competition]
  Sentence 3: "Despite these challenges, [subject] continues to thrive$grow/serve..."

Action: Delete Sentences 1 and 3. Evaluate Sentence 2:
  - If challenges are named with specifics (e.g., "a 2023 funding cut of $4M") -> keep
  - If challenges are generic (e.g., "pollution, competition, and funding") -> delete too
```
