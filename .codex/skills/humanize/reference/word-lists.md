# Word Lists Reference

Used by SKILL.md Phase 1 rules. Load this file before starting Phase 1.

---

## significance -- Significance Words (for Rule 1.1 conditional replacements)

When Rule 1.1 says "only when followed by significance word," check if the word immediately after the target phrase appears in this list:

```
moment
shift
step
milestone
turning point
development
change
move
departure
advancement
achievement
breakthrough
transition
evolution
chapter
era
period
```

**Example**:
- `marks a pivotal moment` -> "moment" is in the list -> apply Rule 1.1 -> `is a pivotal moment` -> then Rule 1.2 removes "pivotal" -> `is a key moment` -> Rule 1.3 removes the "key" version -> `is an important moment` -> then Rule 3.1 checks: does this sentence have a fact? If not, delete.

---

## ai-vocab-master -- Complete AI Vocabulary Banned List

These words are statistically overused by LLMs. Every instance in the target text must be replaced or deleted per the rules in Phase 1.

### Era: 2023-mid 2024 (GPT-4 era)
```
additionally (at sentence start only)
boasts
bolstered / bolstering / bolster
crucial / crucially
delve / delves / delved / delving
emphasizing / emphasize / emphasizes
enduring (as filler)
garner / garnered / garnering
intricate / intricacies
interplay
key (as adjective -- only when used as filler before a noun)
landscape (abstract use)
meticulous / meticulously
pivotal
underscore / underscores / underscored
tapestry (abstract)
testament
valuable (as filler)
vibrant
```

### Era: mid 2024-mid 2025 (GPT-4o era)
```
align with / aligned with
bolstered (same as above)
crucial (same as above)
emphasizing (same as above)
enhance / enhances / enhancing / enhanced
enduring (same as above)
fostering / foster / fosters
highlighting / highlight / highlights
pivotal (same as above)
showcasing / showcase / showcases
underscore (same as above)
vibrant (same as above)
```

### Era: mid 2025+ (GPT-5 era / newer models)
```
emphasizing (same as above)
enhance (same as above)
highlighting (same as above)
showcasing (same as above)
[plus attribution-heavy patterns -- handled in Phase 3 Rule 3.5]
```

### Universal (all eras)
```
nestled
breathtaking
stunning (in landscape/nature context)
fascinating (as filler)
captivating (as filler)
groundbreaking (as filler)
renowned (as filler)
indelible
deeply rooted (as filler phrase)
focal point (when meaning just "center")
diverse array
rich tapestry
broader movement
broader context (when used as filler)
evolving landscape
the forefront of
at its core
in the heart of
```

---

## promo-phrases -- Promotional / Press-Release Phrases

These appear in AI-generated text about companies, people, and places. Delete or simplify per Phase 1 rules.

```
commitment to [X]
dedication to [X]
passion for [X]
in pursuit of [X]
striving to [X]
unwavering support
steadfast commitment
cutting-edge
state-of-the-art
world-class
best-in-class
industry-leading
game-changing
transformative (as filler)
innovative (as filler)
dynamic (as filler)
seamlessly
dependable, value-driven
active social media presence
strong digital presence
```

---

## weasel-attributions -- Vague Attribution Phrases (for Rule 3.5)

Any sentence whose main claim is attributed to one of these, delete the sentence.

```
experts argue
experts say
experts believe
observers have noted
observers have cited
industry reports suggest
industry reports indicate
analysts note
analysts say
several sources
several publications
many scholars
researchers believe
studies suggest (when no study is named)
it is widely believed
it is generally accepted
it has been argued
```

---

## boilerplate-openers -- Challenges Section Openers (for Rule 3.2)

Sentence starts that signal boilerplate challenges/future content:

```
Despite its [positive word],
Despite their [positive word],
Despite these challenges,
Despite this,
However, [subject] faces challenges
[Subject] faces several challenges
Looking ahead,
Going forward,
In the future,
The future of [X] lies in
[X] continues to evolve
[X] remains committed to
[X] continues to thrive
```
