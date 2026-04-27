<p align="center">
  <img src="assets/banner.svg" alt="Overgrow" width="360">
</p>

# Overgrow - The Scientific AI CMO Plugin

Overgrow is your AI CMO as a plugin, with a comprehrensive suite of commands to optimize your SEO and GEO. Overgrow is distilled from human written knolwedge and official web standards documentation. 

**Get Started in Claude Code**
```
/plugin marketplace add zhizdev/overgrow
/plugin install overgrow@overgrow
```

### Commands
`/overgrow:init`  
    &emsp;Scans the repo to build an understanding of the existing project.   
`/overgrow:audit`  
    &emsp;Check titles, meta, H-hierarchy, canonicals, OG, JSON-LD schema, content depth, internal links, AI-citation readiness  
`/overgrow:spawn-pages`  
    &emsp;Draft landing pages that target query fan-out patterns to maximize AI visibility.   
`/overgrow:spawn-blogs`  
    &emsp;Draft blogs that target query fan-out patterns to maximize AI visibility.   
`/overgrow:spawn-internal-links`  
    &emsp;Build a web of internal links around semantic pillars.   
`/overgrow:sitemap`  
    &emsp;Audit or build `sitemap.xml` + `robots.txt` to maximize growth.  
`/overgrow:llmstxt`  
    &emsp;Audit or build `/llms.txt` to maximize growth.   
`/overgrow:humanize`  
    &emsp;Make it sounds human.   

#### Usage examples


```
/overgrow:init                    # build the inventory
/overgrow:audit                   # find gaps & issues
/overgrow:spawn-pages             # fill missing core pages
/overgrow:spawn-blogs             # fill thin pillars
/overgrow:spawn-internal-links    # wire the semantic graph
/overgrow:humanize                # clean AI-sounding drafts
/overgrow:sitemap                 # expose everything to search & AI
/overgrow:llmstxt                 # ship an LLM-legible site map
```


#### Humanize

```
/overgrow:humanize "paste AI-generated text here"
/overgrow:humanize content/blog/new-post.md
```

## Designed from First Principles 

#### The GEO Guide
We curated hundreds of SEO and GEO best practices from official documentations and tutorials and distilled the knowledge into this set of skills for overgrow. Each individual primary source is summarized by gpt-5.4 into a few concise bullet points. We then use opus-4.7 to group and cluster all summarized bullet points into a condensed markdown format ready for skill usage at `knowledge/geo.md`.

#### Query Fan-out 
Web searches on ChatGPT, Gemini, and Claude all use query fan-out to discover releveant content pieces before answering the prompt. We curated a base set of searches covering both specific and broad search intents and capture hundreds of real query fan-out behavior. We distill the behavior into a set of rules for reverse engineering fan-out patterns in `knowledge/query-fanout.md`. Overgrow uses this knowledge to propose new landing, blog, and resources pages.  

## Installation

#### Claude Code (recommended)

```
/plugin marketplace add zhizdev/overgrow
/plugin install overgrow@overgrow
```

Commands appear as `/overgrow:init`, `/overgrow:audit`, etc. Update with `/plugin update overgrow@overgrow`, or enable auto-update in `/plugin` → Marketplaces.

#### Cursor

```bash
cp -r .cursor your-project/
```

> Cursor skills require setup: switch to Nightly in Settings → Beta, then enable Agent Skills in Settings → Rules. [Cursor skills docs](https://cursor.com/docs/context/skills)
>
> The drop-in includes `.cursor/mcp.json` wiring the Bonemeal MCP server (powers `/grow`). Cursor handles OAuth / dynamic client registration on first tool call.

#### Gemini CLI

```bash
cp -r .gemini your-project/
```

> Gemini CLI requires the preview channel: `npm i -g @google/gemini-cli@preview`, then `/settings` → enable Skills, then `/skills list`. [Gemini CLI skills docs](https://geminicli.com/docs/cli/skills/)
>
> The drop-in includes `.gemini/settings.json` wiring the Bonemeal MCP server with `oauth.enabled = true`, so Gemini CLI runs the discovery + DCR + PKCE flow itself.

#### Codex CLI

```bash
cp -r .codex your-project/
```

> Codex uses a different command prefix: `$overgrow:init`, `$overgrow:audit`, etc.
>
> The drop-in includes `.codex/config.toml`, which Codex loads as a project-scoped override once the project is trusted (Codex prompts on first run). The `mcp_servers.overgrow` entry uses Codex's built-in OAuth login (`scopes` + `oauth_resource`), so on first `$overgrow:grow` call Codex opens a browser for consent — no bearer token to paste.

#### Supported tools

- [Claude Code](https://claude.ai/code) — primary, plugin-install
- [Cursor](https://cursor.com) — drop-in `.cursor/`
- [Gemini CLI](https://github.com/google-gemini/gemini-cli) — drop-in `.gemini/`
- [Codex CLI](https://github.com/openai/codex) — drop-in `.codex/`

One source of truth in `source/skills/`. The build transforms it into each provider's expected layout, frontmatter shape, and placeholder conventions — authored once, shipped four ways.

## Contributing and Local Workflow

Skills are authored in `source/skills/<name>/SKILL.md`. The four dotfolders at the repo root (`.claude/`, `.cursor/`, `.gemini/`, `.codex/`) are **generated artifacts**.

### Workflow

```bash
bun install                         # once
# edit source/skills/<name>/SKILL.md or files under knowledge/
bun run rebuild                     # regenerates the 4 dotfolders
bun test                            # 103 tests, ~60ms
git add -A
git commit -m "..."
```

### Architecture

- `source/skills/<name>/SKILL.md` — canonical source per skill
- `source/skills/<name>/reference/` — per-skill reference docs (bundled per provider)
- `knowledge/*.md` — shared authoritative references (shipped with the plugin)
- `scripts/build.js` — orchestrator: reads source, swaps provider placeholders, filters frontmatter, copies refs, writes `dist/` + syncs the 4 dotfolders
- `scripts/lib/transformers/` — provider config table + generic factory
- `.claude-plugin/plugin.json` — Claude Code plugin manifest
- `.claude-plugin/marketplace.json` — catalog so `/plugin marketplace add zhizdev/overgrow` works

See [CLAUDE.md](CLAUDE.md) for a deeper walk-through.

## License

MIT. 

Created by [@zhizdev](https://x.com/zhizdev) and [bonemeal.ai](https://bonemeal.ai/).
