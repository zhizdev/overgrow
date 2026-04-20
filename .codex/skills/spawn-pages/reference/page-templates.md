# Landing & Marketing Page Templates — Section Patterns

Reference content for the `spawn-pages` skill. Use these per-page-type section templates and copy patterns when generating landing, solutions, pricing, features, resources, or about pages.

This skill produces structured website content — the actual words, headings, descriptions, calls-to-action, and SEO metadata that populate landing pages and marketing pages. The output is content-focused (not HTML/CSS), organized by section so a designer or developer can drop it into any template or CMS.

If the user provided arguments via `$ARGUMENTS`, parse them to determine the page type and company/product. Otherwise, ask the user directly to clarify what you cannot infer.

Also check AGENTS.md for any project-level conventions, brand guidelines, or design system details.

## Why content structure matters

The difference between a high-converting page and a forgettable one usually isn't the design — it's the content architecture. A strong landing page guides visitors through a narrative: it hooks them with a clear promise, builds credibility, addresses objections, and makes the next step obvious. Each section has a job, and the content needs to do that job well.

This skill encodes patterns from top-performing SaaS and tech company websites (Anthropic, Claude, Stripe, Vercel, ElevenLabs, Hume AI, and others) into a repeatable content framework. It also incorporates 2026 SEO best practices for heading hierarchy, meta tags, and AI-search-friendly content structure.

## How to use this skill

1. Ask the user what company/product the page is for and what type of page they need
2. Gather key inputs (see "Required Inputs" below)
3. Generate content following the appropriate page template
4. Include SEO metadata for every page
5. Output as a structured markdown document with clear section labels

---

## Required Inputs

Before generating any page, gather these from the user (or infer from provided context):

**Always needed:**
- **Company/product name** — what's being marketed
- **One-line value proposition** — what the product does and for whom
- **Target audience** — who visits this page (developers? executives? small business owners?)
- **Page type** — which template to use (see Page Types below)
- **Tone** — professional, conversational, technical, playful, etc.

**Helpful if available:**
- Existing brand guidelines or voice notes
- Competitor URLs for reference
- Key differentiators (what makes this product unique)
- Product features list
- Customer names/logos for social proof
- Pricing tiers (for pricing pages)
- Industry verticals (for solutions pages)
- Target keywords for SEO
- Audience awareness level (cold vs. warm traffic) — this affects content length and depth

---

## SEO & Meta Content

Every page should include SEO metadata at the top of the output. Search engines and AI systems rely heavily on structured content to surface pages.

### Page-Level SEO Block

Generate this for every page:

- **Title tag** (50-60 characters): Include primary keyword near the start. Should be unique per page and match search intent. Use a format like "[Primary Keyword] — [Brand Name]" or "[Benefit] | [Brand Name]"
- **Meta description** (120-158 characters): Compelling summary that drives clicks. Include the primary keyword naturally. Functions as a mini-ad in search results. Google rewrites 60-70% of meta descriptions, so clarity and relevance matter more than keyword stuffing.
- **URL slug**: Short, descriptive, lowercase, hyphen-separated. Example: `/solutions/healthcare` not `/solutions/healthcare-industry-page-2024`
- **Primary keyword**: The main search term this page targets
- **Secondary keywords** (3-5): Related terms to weave naturally into headings and body copy
- **Open Graph title** (for social sharing): Can differ slightly from the title tag — optimized for social clicks rather than search
- **Open Graph description** (for social sharing): 1-2 sentences describing the page for social media previews

### Heading Hierarchy for SEO and AI

Heading structure is one of the strongest signals for both traditional search engines and AI systems (LLMs, AI Overviews). Pages with clear H1->H2->H3 hierarchy are more consistently parsed and cited by AI systems.

Rules:
- **One H1 per page** — always. The H1 defines the page's primary topic. It should contain or closely relate to the primary keyword.
- **H1 length**: 20-70 characters (5-10 words). Under 8 words is ideal for scanning.
- **H2s** for major sections (20-60 characters each). Every major content block gets an H2. Use 5-10 H2s on a typical landing page.
- **H3s** for subsections within an H2 block. Use when content under an H2 exceeds ~300 words or contains multiple distinct items (features, steps, FAQ questions).
- **Never skip levels**: Don't jump from H1 to H3. Always go H1 -> H2 -> H3.
- **Keyword placement**: Include the primary keyword in the H1, and secondary keywords naturally in H2s and H3s. Write for humans first — headings that read like keyword strings hurt more than they help.
- **Descriptive over clever**: "How Our Platform Reduces Churn by 40%" beats "The Secret Sauce" every time. Both users and AI systems need headings that clearly signal what the section contains.

### FAQ Schema Considerations

While Google limited FAQ rich results to authoritative sites in 2023, FAQ structured data still helps search engines understand content and increases chances of being cited in AI-generated answers. When writing FAQ sections:
- Write questions as natural, complete questions people actually search for
- Keep answers concise and factual (40-100 words)
- Avoid promotional language in FAQ answers — schema guidelines prohibit advertising in FAQs
- Structure supports JSON-LD FAQPage markup (note this in the output so developers know to implement it)

---

## Copywriting Frameworks

Choose the right framework based on the page type and audience awareness level:

### AIDA (Attention -> Interest -> Desire -> Action)
Best for: Homepage hero flows, feature pages, product pages
- **Attention**: Hook with a powerful headline or statistic
- **Interest**: Relate to the reader's situation or goals
- **Desire**: Show the benefits and paint a picture of the outcome
- **Action**: Clear, specific CTA

### PAS (Problem -> Agitate -> Solution)
Best for: Solutions pages, industry pages, pain-point-driven content
- **Problem**: Identify the specific problem the audience faces
- **Agitate**: Amplify the consequences of not solving it
- **Solution**: Present the product as the answer

### BAB (Before -> After -> Bridge)
Best for: Case studies, transformation-focused sections, testimonials
- **Before**: The current painful state
- **After**: The desired outcome
- **Bridge**: How the product gets them there

The page templates below already incorporate these frameworks structurally — the hero uses AIDA, solutions pages use PAS, case studies use BAB. But being aware of them helps write more compelling copy within each section.

---

## Page Types

### 1. Homepage / Main Landing Page

The homepage is the front door. It must communicate what the product is, who it's for, and why it matters — all within a few seconds of scanning. Aim for 800-1,500 words total depending on product complexity and audience awareness level.

**Section-by-section content requirements:**

#### Navigation Bar
Content needed:
- **Logo text or mark** — company name
- **Primary nav items** (4-6 items): Typically Product, Solutions, Pricing, Resources, Docs
- **Secondary nav items**: Login, Sign up / Get started
- **CTA button text** — one primary action ("Try Free", "Get Started", "Book a Demo")

Navigation principles:
- Limit to 5-7 top-level items maximum. Fewer items = higher engagement with each.
- Group nav items by how users think about their problems, not how the org is structured internally. For example, "Solutions" grouped by use case beats product-line-based navigation.
- Use mega-menus or dropdowns for subcategories. Organize by user persona/role, by solution/use case, or by product line.
- The primary CTA button should stand out visually and use action language. Include a secondary CTA like "Contact Sales" for enterprise-focused products.
- On mobile, the nav collapses to a hamburger menu — plan content that works in both formats.

#### Hero Section (Above the Fold)
This is the most important content on the page. 60.7% of SaaS websites have hero titles users understand within 5 seconds — the other 40% lose visitors. The hero must be immediately clear.

Content needed:
- **H1 headline** (5-10 words, ideally under 8 words / 44 characters): State the core value proposition or transformation. Focus on the outcome the user gets, not the features. Should be immediately understandable in under 3 seconds.
  - Good: "AI research and products that put safety at the frontier" (Anthropic)
  - Good: "Meet your thinking partner" (Claude)
  - Good: "Financial infrastructure for the internet" (Stripe)
  - Avoid: Vague superlatives ("The best platform ever"), jargon-heavy statements, feature lists, or clever-but-unclear wordplay
- **Subtitle/subheadline** (15-30 words): Expand on the H1 with specifics — who it's for, what it does, or the key benefit. This is where you add the detail the H1 left out.
  - Example: "Tackle any big, bold, bewildering challenge with Claude."
  - Example: "AI will have a vast impact on the world. Anthropic is a public benefit corporation dedicated to securing its benefits and mitigating its risks."
- **Primary CTA button** (2-4 words): Action-oriented, specific to the next step. "Start free trial", "Try [Product]", "Get started free". Specific, action-oriented CTAs consistently outperform generic ones like "Submit" or "Click here".
- **Secondary CTA** (optional): Lower-commitment alternative. "Watch demo", "See pricing", "Contact sales"
- **Hero visual direction** (brief note): Suggest what visual should accompany — product screenshot, demo video, animated illustration, interactive element. Product screenshots or demo videos build trust fastest.

Keep the hero to one primary CTA plus at most one low-commitment secondary CTA. Extra competing CTAs pull attention in multiple directions and reduce the chance any of them gets clicked.

#### Social Proof Bar
Placed directly after or within the hero. This is one of the highest-impact sections — 72% of consumers say positive reviews and testimonials increase their trust in a business.

Content needed:
- **Section label** (optional): "Trusted by", "Used by teams at", "Powering innovation at"
- **Logo list**: 5-8 recognizable company names/logos. Match logos to the target audience (enterprise logos for enterprise products, creator brands for creator tools)
- **Stats** (optional but powerful): "50,000+ teams", "4.8/5 on G2", "99.9% uptime". Displaying user counts can increase conversion by up to 15%.

Types of social proof to consider:
- **Logo bar**: Client/customer company logos (most common, highest trust for B2B)
- **Rating badges**: G2, Capterra, TrustRadius scores
- **User count**: "Join 50,000+ teams" — popularity signal
- **Media mentions**: "Featured in TechCrunch, Forbes, Wired" — authority signal
- **Trust badges**: SOC 2, ISO 27001, GDPR compliant — security signal (especially important for enterprise/healthcare/finance)

#### Value Proposition / Benefits Section
Show visitors why this product matters to them specifically. Use the Feature-Benefit Transformation: instead of "Advanced encryption" say "Protect customer data with AES-256 encryption, so your security team signs off in days, not months."

Content needed:
- **Section H2**: Frame around the user's world, not the product. "Why teams choose [Product]" or "Built for [audience]"
- **3-4 benefit blocks**, each containing:
  - **H3 headline** (3-7 words): Benefit-first, not feature-first. "Ship 10x faster" not "CI/CD Pipeline"
  - **Description** (30-60 words): Explain the benefit, mention the feature that enables it, include a concrete outcome or metric
  - **Visual direction**: Icon, screenshot, or illustration suggestion

#### Features Section
Deeper dive into what the product actually does. Use progressive disclosure — show the most important features prominently and allow deeper exploration for those who want it.

Content needed:
- **Section H2**: "Features", "What you can do", "Capabilities", or something more specific like "Everything you need to [outcome]"
- **Feature blocks** (4-8 features), each with:
  - **H3 headline**: Feature name framed as a capability or benefit
  - **Description** (40-80 words): What it does + why it matters + what makes it different from alternatives
  - **Supporting detail** (optional): A specific metric, use case, or technical detail
- **Features can be organized as**:
  - Grid (3-4 columns for shorter descriptions)
  - Alternating rows (image + text, swapping sides) for longer feature descriptions with screenshots
  - Tabbed interface for many features grouped by category

#### How It Works Section
Reduce perceived complexity. Make the product feel approachable. This section is particularly important for products with a signup/onboarding flow.

Content needed:
- **Section H2**: "How it works", "Get started in 3 steps", "Simple to start"
- **3-4 steps** (never more than 4 — complexity kills conversion), each with:
  - **Step number and H3 title**: "1. Connect your data"
  - **Description** (20-40 words): What happens in this step and what the user gets from it
  - **Visual direction**: Screenshot or illustration of this step

#### Social Proof / Testimonials Section
Build trust with evidence from real users. Testimonials with specific outcomes convert significantly better than generic praise.

Content needed:
- **Section H2** (optional): "What our customers say", "Trusted by industry leaders"
- **2-3 testimonials**, each with:
  - **Quote** (30-60 words): Specific, outcome-focused. Include a metric or concrete result. "We reduced deployment time from 3 days to 4 hours" beats "Great product, highly recommend!"
  - **Attribution**: Full name, title, company name
  - **Company logo** (optional but recommended)
- **OR a case study summary**: Company name, challenge, result (with specific metrics)

Testimonial best practices:
- Match testimonials to the target audience (developer testimonials on developer pages, executive quotes on enterprise pages)
- Place testimonials near related claims to reinforce them
- Include diverse use cases to show breadth

#### Metrics / Stats Section (optional but powerful)
Concrete numbers build credibility faster than paragraphs. Place this section where it reinforces a specific claim.

Content needed:
- **3-4 stat blocks**, each with:
  - **Number**: "10M+", "99.9%", "3x faster", "50%"
  - **Label**: What the number measures. "API calls per day", "Uptime SLA", "Developer productivity increase", "Cost reduction"
- Numbers should be impressive but believable. Round numbers feel less trustworthy than specific ones ("10,847 teams" > "10,000+ teams")

#### CTA / Conversion Section
Repeat the primary call-to-action before the footer. This catches visitors who scrolled the full page and are now ready to act.

Content needed:
- **H2 headline**: Reinforce the value prop or create urgency. "Ready to get started?", "Start building today"
- **Supporting text** (15-25 words): Address the last objection or emphasize ease of starting. "Free to start. No credit card required."
- **Primary CTA button**: Same as hero or slight variation
- **Secondary CTA** (optional): "Talk to sales", "See pricing"

#### FAQ Section
Address remaining objections and capture long-tail search traffic. FAQ sections serve two purposes: removing conversion barriers and providing SEO value through question-based content that AI systems love to cite.

Content needed:
- **Section H2**: "Frequently asked questions"
- **5-8 Q&A pairs**, each with:
  - **Question (H3)**: Written as a natural question a real visitor would ask or search for. "How long does setup take?", "Is there a free tier?", "Can I use it with my existing tools?"
  - **Answer** (40-100 words): Direct, specific, factual. Lead with the answer, then provide supporting detail. If the answer references another page (pricing, docs), note the link.
- **Developer note**: Recommend JSON-LD FAQPage schema markup for this section

FAQ best practices:
- Lead with the most common objection (usually about pricing, complexity, or security)
- Include questions about security/compliance if selling to enterprise
- Include at least one question about getting started or onboarding
- End with a question that leads to the CTA ("How do I get started?")
- Write questions using words people actually search for — natural language, not marketing speak
- Keep answers factual and avoid promotional language

#### Footer
The footer is one of the most-clicked areas on any website. For B2B sites, it serves as a secondary navigation and trust signal.

Content needed:
- **Column 1 — Product**: Features, pricing, integrations, changelog, API docs, status page
- **Column 2 — Solutions**: Links by use case or industry vertical
- **Column 3 — Resources**: Blog, case studies, guides, webinars, community, events, tutorials
- **Column 4 — Company**: About, careers, press, contact, partners
- **Column 5 — Legal**: Privacy policy, terms of service, security, compliance, cookie settings, acceptable use policy
- **Bottom bar**: Copyright notice, social media links (LinkedIn, Twitter/X, GitHub, YouTube — pick the 3-4 most relevant to your audience)
- **Trust badges** (optional): SOC 2, ISO, GDPR badges if relevant — placed in footer for persistent visibility

Footer principles:
- 3-5 columns is optimal. Single column for minimal sites, 4-5 for complex products.
- Keep the footer consistent across all pages — it's a site-wide element
- Include "last updated" dates on policy links when possible
- On mobile, stack columns vertically or use collapsible accordions
- LinkedIn should come first for B2B products; GitHub first for developer tools

---

### 2. Features Page

The features page is for visitors who already understand the product at a high level and want to go deeper. They're evaluating whether the product can do what they need. Structure content to answer: "Does this product match what I'm searching for? Can it solve my specific problems?"

**Section-by-section content requirements:**

#### Hero Section
- **H1 headline**: Frame around capability, not just "Features". Examples: "Everything you need to build with AI", "Powerful features, simple experience"
- **Subtitle** (20-40 words): Overview of the product's capability breadth and who benefits most
- **CTA**: "Get started", "Try it free", "See it in action"

#### Feature Categories
Organize features into 3-5 logical groups. Each group should correspond to a user goal or workflow, not an internal product team.

For each category:
- **Category H2**: Clear group label — "Developer Tools", "Security & Compliance", "Collaboration", "Analytics & Insights"
- **Category description** (20-40 words): What this group of features enables and why it matters

For each feature within a category:
- **H3 feature name**: Clear, specific, benefit-oriented when possible
- **Description** (50-100 words): What it does + why it matters + what makes it unique. Use the Feature-Benefit Transformation: frame every feature in terms of the outcome it creates.
- **Key specs or details** (optional): Specific numbers, supported formats, limits, performance benchmarks
- **Visual direction**: Screenshot, diagram, code snippet, or short demo video suggestion

Use progressive disclosure: show feature headlines and short descriptions by default, with expandable detail for users who want to go deeper.

#### Comparison Table (optional)
If the product competes on features, a comparison table can be effective.
- **Columns**: Your product vs. 1-2 competitors (or plan tiers)
- **Rows**: Key features as checkmarks, specific values, or brief descriptions

#### Integration Section
- **H2**: "Integrations", "Works with your stack", "Connects to everything"
- **Integration list**: Logo grid or categorized list of supported tools/platforms
- **Integration count**: "200+ integrations" as a headline stat
- **Categories**: Group integrations by type (CRM, Analytics, DevOps, Communication, etc.)

#### Bottom CTA
- **H2**: Reinforce product value with a benefit-driven headline
- **Supporting text**: Brief reassurance (free tier, no credit card, setup time)
- **CTA button**: "Start building", "Try it free"

---

### 3. Solutions Page (by Use Case or Industry)

Solutions pages translate generic features into specific outcomes for a particular audience. Each solutions page targets one use case or industry. The key insight: visitors on a solutions page think in terms of their industry's problems and language, not your product's feature names.

Follow the PAS framework: identify the Pain, Agitate the consequences, present the Solution.

**Section-by-section content requirements:**

#### Hero Section
- **H1 headline**: Speak directly to the audience's problem using their language. "Build AI support agents with a more human touch" (Claude for Customer Support). The headline should make the visitor immediately think "this is for me."
- **Subtitle** (20-40 words): How the product specifically solves this use case. Mention the audience by name.
- **Primary CTA**: "Start building", "Contact sales", "Request a demo" — match to the audience's buying process
- **Secondary CTA**: "See case study", "Watch demo", "Download whitepaper"

#### Social Proof (industry-specific)
- **Logo bar**: Show logos of companies in this specific industry or use case. Generic logos dilute the message.
- **Stat** (optional): Industry-specific metric. "Serving 50+ financial institutions"

#### Pain Points / Challenges Section
This is where PAS's "Problem" and "Agitate" steps live. Make the visitor feel understood.
- **H2**: "The challenge" or framed around the audience's struggle
- **3-4 pain points**, each with:
  - **H3**: The problem stated clearly in the audience's language
  - **Description** (30-50 words): How this problem manifests day-to-day, what it costs, and what happens if it's not solved

#### Solution Section
PAS's "Solution" step. Map every solution directly to a pain point above — this 1:1 mapping is what makes solutions pages feel tailored rather than generic.
- **H2**: "How [Product] helps" or "The [Product] approach"
- **3-5 solution blocks**, each mapping directly to a pain point:
  - **H3**: The solution headline (outcome-focused)
  - **Description** (50-80 words): How the product solves this specific problem, using industry-specific language
  - **Feature callout**: Which specific feature or capability enables this
  - **Result**: A concrete outcome or metric

#### Case Study / Customer Story
Use BAB (Before -> After -> Bridge) framework for maximum impact.
- **H2**: "See it in action" or specific customer name
- **Summary** (80-150 words): Challenge (Before) -> How they used the product (Bridge) -> Results (After)
- **Key metric**: The headline number ("60% reduction in ticket volume")
- **Quote** (optional): One sentence from a stakeholder at the customer
- **CTA**: "Read full story"

#### Industry-Specific Features
- **H2**: "Built for [industry]"
- **Feature list**: 4-6 features particularly relevant to this audience, with industry-specific framing
- **Compliance/certification callouts**: SOC 2, HIPAA, FedRAMP, PCI DSS, GDPR — prominently displayed if relevant
- **Industry terminology**: Use the language of the industry

#### FAQ Section (industry-specific)
- **H2**: "Common questions about [Product] for [industry]"
- **5-8 Q&A pairs** addressing industry-specific concerns

#### Bottom CTA
- **H2**: Industry-specific call to action
- **CTA**: Tailored to the audience's buying process

---

### 4. Pricing Page

Pricing pages need to reduce decision anxiety. Clarity and comparison are paramount. Three tiers is the psychological sweet spot. Pricing pages with more whitespace convert 28% better.

**Section-by-section content requirements:**

#### Hero Section
- **H1 headline**: Simple and direct. "Pricing", "Simple, transparent pricing", "Plans for every team"
- **Subtitle** (15-30 words): Address the most common pricing concern upfront
- **Toggle** (if applicable): Monthly / Annual pricing switch. Highlight annual savings ("Save 20%", "2 months free")

#### Pricing Tiers
3-4 tiers is optimal.

For each tier:
- **Tier name**: Clear and intuitive (Free, Starter, Pro, Enterprise)
- **Price**: Monthly or annual price, clearly formatted
- **Price qualifier**: "/month", "/user/month", "billed annually", "starting at"
- **Tier tagline** (5-15 words): Who this tier is for
- **Feature list**: 6-12 features included, organized from most to least important
- **Feature differentiators**: Bold or highlight features new in this tier vs. the one below
- **CTA button**: Tier-appropriate action
- **Most popular badge** (on the recommended tier)

#### Feature Comparison Table
- **Rows**: Complete feature list across all tiers
- **Columns**: Each pricing tier
- **Values**: Checkmarks, specific limits, "Unlimited", or specific values
- **Category groupings**: Group features under section headers

#### Enterprise / Custom Section
- **H2**: "Need something custom?" or "Enterprise"
- **Description** (40-80 words): What custom pricing includes
- **Feature highlights**: 4-6 enterprise-specific features
- **CTA**: "Contact sales", "Get a custom quote"

#### FAQ Section
- **H2**: "Pricing FAQ"
- **6-8 questions** focused on billing, trials, upgrades, refunds, limits, discounts

#### Add-ons Section (optional)
- **H2**: "Add-ons" or "Enhance your plan"
- **Add-on cards**: Name, price, brief description for optional extras

---

### 5. Resources Page

The resources page is a content hub that builds authority and supports the buyer journey at every stage.

**Section-by-section content requirements:**

#### Hero Section
- **H1**: "Resources", "Learn & Explore", "Resource Center"
- **Subtitle** (15-25 words): What visitors will find here
- **Search bar** (note to include): Essential for large content libraries
- **Filter/category tabs**: Blog, Case Studies, Guides, Webinars, Documentation, etc.

#### Featured Content
- **1-3 featured resources** with type label, H3 title, description, CTA, visual direction

#### Content Grid
For each resource card: content type badge, H3 title, description (15-30 words), metadata (date, read time), CTA link

#### Resource Categories
Align to the buyer's journey:
- **Top of funnel (Awareness)**: Blog posts, infographics, educational videos
- **Middle of funnel (Consideration)**: Case studies, whitepapers, webinars, comparison guides
- **Bottom of funnel (Decision)**: Product demos, free trial guides, ROI calculators
- **Post-purchase**: Documentation, API references, tutorials, community forums

#### Newsletter / Subscribe Section
- **H2**: "Stay updated"
- **Description** (15-25 words): What subscribers receive and how often
- **Email input field + CTA button**

---

### 6. About Page

The about page humanizes the company. Visitors come here to understand who's behind the product, especially for high-trust purchases.

**Section-by-section content requirements:**

#### Hero Section
- **H1**: Company name or mission-driven headline
- **Subtitle** (20-40 words): Elevator pitch for the company
- **Visual direction**: Team photo, office environment, or brand illustration

#### Mission / Vision Section
- **H2**: "Our mission" or "Why we exist"
- **Mission statement** (30-60 words): Clear, specific, authentic
- **Vision** (optional, 20-40 words): Where you're headed

#### Story / History Section
- **H2**: "Our story" or "How we got here"
- **Narrative** (100-200 words): Origin story using BAB framework
- **Timeline** (optional): Key milestones with dates

#### Values Section
- **H2**: "Our values"
- **3-5 values**, each with H3 name + description (30-50 words)

#### Team Section
- **H2**: "Our team"
- **Leadership profiles**: Name, title, headshot direction, 1-2 sentence bio
- **Team size / culture note** (optional)

#### Investors / Partners Section (optional)
- **H2**: "Backed by" or "Our partners"
- **Logo bar** + funding note (optional)

#### Bottom CTA
- **H2**: "Join us" or "Work with us"
- **Dual CTAs**: "See open roles" and "Contact us" or "Try [Product]"

---

## Content Writing Guidelines

These principles apply across all page types:

### Headlines (H1)
- 5-10 words maximum (under 70 characters for SEO, ideally under 44 characters)
- Focus on outcomes and transformation, not features
- Be specific enough that a visitor immediately understands the product's value
- Avoid jargon unless the audience is highly technical
- Include or closely relate to the primary keyword
- Test: Can someone understand what this product does from the H1 alone in under 3 seconds?

### Section Headlines (H2)
- 20-60 characters (8-15 words)
- Expand on the section's purpose
- Create a narrative flow — reading all H2s in order should tell the page's story
- Use parallel structure across sections when possible
- Include secondary keywords naturally

### Subsection Headlines (H3)
- 3-8 words (20-60 characters)
- Benefit-oriented for features ("Ship faster" not "CI/CD Pipeline")
- Problem-oriented for solutions ("Eliminate data silos" not "Data Integration")
- Question-format for FAQs (natural, conversational)
- Use when content under an H2 exceeds ~300 words

### Body Copy
- Short paragraphs (2-3 sentences maximum)
- Lead with the most important information (inverted pyramid)
- Use concrete numbers: "Reduces deployment time by 73%" beats "significantly faster"
- Front-load key terms for scanners
- Avoid filler: "revolutionary", "game-changing", "cutting-edge", "next-generation", "world-class"
- Use active voice
- Content length: 500-800 words for simple pages, 800-1,500 for homepages, 1,000-2,000 for solutions pages

### CTAs (Calls to Action)
- Use action verbs: "Start", "Get", "Try", "Build", "Deploy", "Create"
- Be specific: "Start free trial" > "Get started" > "Submit" > "Click here"
- Personalized and context-specific CTAs outperform generic ones like "Submit" or "Learn more"
- Match CTA intensity to funnel stage
- One primary CTA per section
- Include low-commitment language where appropriate: "No credit card required", "Free to start"

### Social Proof
- Use specific outcomes and numbers in testimonials
- Match social proof to the page audience
- Place social proof immediately after making a claim
- 92% of B2B buyers are more likely to purchase after reading a trusted review
- Include diverse types: logos (trust), testimonials (credibility), stats (scale), badges (security)

---

## Output Format

Generate content as a structured markdown document following this template:

```markdown
# [Page Type]: [Company/Product Name]

**Page:** [Homepage / Features / Solutions / Pricing / Resources / About]
**Target audience:** [Who this page is for]
**Tone:** [Professional / Conversational / Technical / etc.]

---

## SEO Metadata

**Title tag:** [50-60 characters]
**Meta description:** [120-158 characters]
**URL slug:** [/path/to-page]
**Primary keyword:** [main search term]
**Secondary keywords:** [keyword 1], [keyword 2], [keyword 3]
**OG title:** [social sharing title]
**OG description:** [social sharing description]

---

## Navigation Bar

**Primary nav:** [Item 1] | [Item 2] | [Item 3] | [Item 4] | [Item 5]
**CTA button:** [Button text]
**Secondary link:** [Login / Sign in]

---

## Hero Section

**H1:** [Headline]
**Subtitle:** [Subheadline text]
**Primary CTA:** [Button text]
**Secondary CTA:** [Button text or "None"]
**Visual direction:** [Brief description of recommended visual]

---

## [Section Name]

**H2:** [Section headline]

### [Subsection or item]
**H3:** [Headline]
[Content...]

[Continue for all sections...]

---

## FAQ Section

**H2:** Frequently asked questions
**Schema note:** Implement JSON-LD FAQPage markup for this section

### [Question 1]
**H3:** [Question text]
[Answer text]

[Continue for all Q&A pairs...]

---

## Footer

**Column 1 — [Label]:** [Links]
**Column 2 — [Label]:** [Links]
[etc.]

**Bottom bar:** [Copyright] | [Social links]
**Trust badges:** [Applicable certifications]
```

---

## Common Mistakes to Avoid

- **Feature-dumping without context**: Don't just list features. Every feature needs a "so what?" — frame it as a benefit with a concrete outcome.
- **Generic headlines**: "Welcome to our website" or "The best solution" say nothing. Be specific about the value proposition.
- **Missing CTAs**: Every section should guide the visitor toward action. No section should be a dead end.
- **No social proof**: Pages without evidence of real usage feel untrustworthy. Include at minimum a logo bar.
- **Too much text**: Web visitors scan. Keep paragraphs to 2-3 sentences. Use visual hierarchy to guide the eye.
- **Inconsistent tone**: A playful hero followed by dry corporate copy feels disconnected. Maintain voice consistency.
- **Ignoring the footer**: The footer is one of the most-clicked areas on any website. Make it comprehensive.
- **FAQs that don't address real objections**: "What makes you the best?" isn't a real FAQ. "How much does it cost after the trial?" is.
- **No clear heading hierarchy**: H1 -> H2 -> H3 should create a logical outline. Never skip heading levels.
- **Missing SEO metadata**: Every page needs a unique title tag and meta description.
- **Keyword stuffing in headings**: Headings should read naturally.
- **No mobile consideration**: 58% of SaaS pricing page traffic is mobile.
- **Weak or generic CTAs**: "Submit" and "Click here" convert poorly. Be specific.
- **Ignoring audience awareness level**: Cold traffic needs more education. Warm traffic needs less.
- **No social proof on the page**: Most top-performing landing pages include at least one form of social proof (logos, testimonials, stats, or ratings); pages with none feel untrustworthy to cold traffic.
- **Missing trust seals**: Security and compliance badges (SOC 2, ISO 27001, GDPR, HIPAA) materially reduce drop-off near forms and pricing CTAs, especially for enterprise buyers.
- **Skipping Open Graph tags**: Pages shared without proper OG tags get generic previews.
- **Forgetting accessibility**: Screen readers rely on heading hierarchy.

---

## Schema Markup Recommendations

Include schema markup recommendations in the output so developers can implement structured data:

- **Homepage**: Organization, WebSite, BreadcrumbList
- **Features/Product page**: Product or SoftwareApplication, BreadcrumbList
- **Solutions page**: Service, BreadcrumbList, optionally FAQPage
- **Pricing page**: Product (with Offer), BreadcrumbList
- **Resources/Blog page**: BlogPosting or Article, BreadcrumbList
- **About page**: Organization, Person (for team members), BreadcrumbList
- **FAQ sections on any page**: FAQPage

Schema implementation notes:
- Use JSON-LD format (Google's preference)
- Wire schema values to CMS content — never hardcode
- BreadcrumbList replaces raw URLs in search results with clean navigation paths
- Schema is critical for AI search visibility

---

## Open Graph & Social Sharing

Include these recommendations for every page:

- **OG Image**: Recommend 1200x630px (1.91:1 aspect ratio), JPEG or PNG, under 5MB
- **OG Title**: Under 60 characters, catchy and action-oriented
- **OG Description**: 155-160 characters, written like ad copy
- **Twitter Card**: Recommend `summary_large_image` card type
- Each page needs unique OG tags
- Professional OG previews increase click-through rates 2-3x

---

## Accessibility Considerations

- **Heading hierarchy**: Must be sequential (H1->H2->H3). Screen readers use headings to navigate.
- **Alt text**: Every contentful image needs descriptive alt text. Decorative images get empty alt="".
- **CTA buttons**: Must have clear, descriptive text.
- **Form labels**: Every form field needs a visible label or aria-label.
- **Color contrast**: WCAG 2.2 Level AA contrast ratios (4.5:1 for normal text, 3:1 for large text).
- **Keyboard navigation**: All interactive elements must be reachable via keyboard.
- **WCAG 2.2 Level AA** is the standard to target in 2026.

---

## Brand Voice & Tone Framework

When generating content, establish a consistent voice:

### Voice Dimensions
Define the brand voice on these spectrums (1-5 scale):
- **Funny <-> Serious**
- **Formal <-> Casual**
- **Enthusiastic <-> Matter-of-fact**
- **Respectful <-> Irreverent**

### Voice vs. Tone
- **Voice** stays consistent across all pages (brand personality)
- **Tone** flexes based on context:
  - Homepage hero: Confident, inspiring
  - Features page: Informative, precise
  - Pricing page: Transparent, reassuring
  - Solutions page: Empathetic, authoritative
  - Error pages: Helpful, lighthearted

---

## Conversion Optimization Notes

### Above the Fold
The visible area without scrolling must answer three questions instantly:
1. What is this?
2. Why should I care?
3. What do I do next?

### Reducing Friction
- "No credit card required" removes the two biggest barriers: cost and commitment
- Short forms with only essential fields
- Clear data security statements near forms
- Progress indicators for multi-step processes

### Social Proof Placement Strategy
- **Hero area**: Logo bar or user count
- **After claims**: Testimonials immediately after product claims
- **Near CTAs**: Trust badges and guarantees near conversion points
- **Pricing page**: "Most Popular" badge leverages herd behavior

### Page Speed
- Landing pages should load in under 2 seconds
- Every additional second reduces conversion by 7-10%
- Recommend lazy-loading images below the fold

### Mobile Optimization
- 60%+ of web visits come from mobile
- Stack pricing tiers vertically on mobile
- Use large tap targets (minimum 44x44px)
- Simplify navigation to hamburger menu
- Collapsible FAQ accordions on mobile

### Testing Recommendations
Include a note at the end of each page output:
- A/B test the H1 headline (biggest conversion impact)
- Test CTA button text variations
- Test social proof placement
- Test pricing page: highlighted tier, toggle default

---

## AI Company Website Patterns (Reference)

These patterns were observed across top AI/SaaS company websites:

### Navigation Patterns
- **Anthropic/Claude**: Product, Solutions (by use case + industry), Pricing, Resources, Docs
- **ElevenLabs**: Products organized by platform, Pricing, Docs, Enterprise
- **HeyGen**: Product (with use cases), Pricing, Resources, Enterprise

### Pricing Model Patterns
- **Per-seat/user**: Common for collaboration tools
- **Credit-based**: Common for AI generation tools
- **Tiered flat rate**: Common for creator tools
- **Usage-based**: API products (pay per call/token)
- **Freemium**: Almost universal
- **Annual discount**: Typically 17-20% savings

### Hero Section Patterns
- **Outcome-focused**: "Meet your thinking partner" (Claude)
- **Capability-focused**: "Simulate any business decision in seconds"
- **Category-defining**: "Financial infrastructure for the internet" (Stripe)
- **Problem-solving**: "Build AI support agents with a more human touch"

---

## Internal Linking & Content Architecture

### Page Hierarchy
- **Pillar pages** (homepage, main features): Comprehensive, link to all related pages
- **Cluster pages** (individual solutions, industry): Deep dives, link back to pillars
- **Conversion pages** (pricing, contact): Focused on action, linked from all others

### Internal Linking Rules
- Every page should link to 2-3 other pages on the same site
- Solutions pages should link to relevant case studies
- All pages should link to pricing
- Use descriptive anchor text with target keywords

### URL Structure
Recommend clean, hierarchical URLs:
- `/product/features`
- `/solutions/healthcare`
- `/pricing`
- `/resources/case-studies`
- `/about`

---

## Competitive Differentiation in Content

### Differentiation Strategies
- **"We finally fixed [category]"**: Position as the category innovator
- **Specific metrics**: "73% faster than the industry average"
- **Unique capability callout**: One feature no competitor offers
- **Customer-validated**: Let testimonials make competitive claims

### What to Avoid
- Never name competitors negatively on landing pages
- Avoid "best in class" or "industry-leading" without evidence
- Don't compete on features alone — compete on outcomes and experience
