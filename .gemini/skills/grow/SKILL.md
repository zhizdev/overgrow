---
name: grow
description: Pull the open Bonemeal action queue (landing pages and blog posts the user has not built yet) via the bonemeal MCP server, let the user pick which ones to build, dispatch each to the spawn-pages or spawn-blogs skill with the action's brief, and mark each completed in Bonemeal once the file is written. Use this whenever the user says "grow", "/grow", "build my Bonemeal queue", "what's in my Bonemeal queue", "build the suggested pages", or wants to act on Bonemeal's content suggestions. Stop and ask the user before marking actions complete the first time, then remember their preference.
---

# Overgrow — Grow (Bonemeal Action Queue)

This skill is the integration point between the Bonemeal MCP server and the rest of overgrow. It surfaces the open action queue from the user's Bonemeal project, lets them pick what to build, dispatches each item to the existing `spawn-pages` or `spawn-blogs` skill with the action's brief as input, then marks each one completed back on Bonemeal — attributing the completion to "Overgrow" in the Bonemeal UI.

## Prerequisites

1. The user must already have authenticated the bonemeal MCP server. If `mcp__overgrow__list_projects` is unavailable, tell them to run `/mcp` and authenticate the `overgrow` server, then re-invoke this skill.
2. Two state files. Create on first run.

## State files

State is split into project-scoped (committed to git, shared across collaborators) and developer-scoped (per-machine).

**`.overgrow/bonemeal.json`** (in repo root, committed)
```json
{
  "project_id": "<uuid>",
  "project_name": "<for log lines>"
}
```
Identifies which Bonemeal project this repo represents. Same answer for every developer who clones the repo, so it belongs in version control.

**`~/.config/overgrow/preferences.json`** (per-developer, never committed)
```json
{
  "auto_complete": true | false | null
}
```
Each developer's personal answer to "should /grow auto-mark actions complete in Bonemeal?". `null` until they answer, then `true` ("always") or `false` ("ask each time").

If `$XDG_CONFIG_HOME` is set, prefer `$XDG_CONFIG_HOME/overgrow/preferences.json` over `~/.config/...`. If running on a system without `~/.config/` (e.g. some Windows setups), fall back to a sensible per-user location and tell the user where you wrote it.

Create either file (and parent directories) on first read if missing. Treat unreadable / malformed JSON as "uninitialized" — re-prompt the user for what's needed and rewrite cleanly.

## Flow

### 1. Resolve the project

Read `.overgrow/bonemeal.json`. If `project_id` is null/missing:
- Call `mcp__overgrow__list_projects` (no arguments).
- If exactly one project is returned, use it; tell the user "Linking this repo to Bonemeal project: **{name}**".
- If multiple, present a numbered list with `name`, `workspace.name`, `id`, and call `AskUserQuestion` to ask which one this repo represents.
- Persist `project_id` and `project_name` to `.overgrow/bonemeal.json`.
- Suggest the user commit the file so collaborators don't get re-prompted.

If `project_id` is set, skip the resolve step. (User can edit the file by hand to relink.)

### 2. Pull the queue

Call `mcp__overgrow__get_project_actions` with:

- `project: <state.project_id>`
- `status: "proposed"` (default — the open queue)
- `action_type:` filter based on `$ARGUMENTS`:
  - `"landing"` → `landing_page`
  - `"blogs"` → `blog_post`
  - empty → call once with `landing_page`, once with `blog_post`, merge results.
- `limit: 50` (generous; the daily generator caps lower than this anyway).

If the queue is empty, tell the user "Your Bonemeal queue is clear — no proposed landing pages or blog posts." and stop.

### 3. Present the queue

Render a numbered list grouped by `action_type`. Each row: `[N] [type icon] {title} — {opportunity_overview}`.

`opportunity_overview` is markdown with **bold** on the hook; render as-is.

Then call `AskUserQuestion` asking which to build. Accept these reply forms:

- `all` — build everything in the list.
- `1, 3, 5` — comma-separated numbers (or ranges like `1-3`).
- `landing` / `blogs` — only that type from the list.
- `skip` / `cancel` — exit without building.

### 4. Build each chosen action

Process the selected actions in order. For each:

#### 4a. Landing page (`action_type === "landing_page"`)

The action's `metadata` is shaped:
```json
{
  "target_keywords": ["..."],
  "gap_prompts": ["..."],
  "competing_domains": ["..."]
}
```

Invoke the `spawn-pages` skill with a brief built from:

- `title` (the action title; this is the page intent)
- `description` and `opportunity_overview` (rationale and 1-line hook)
- `metadata.target_keywords` (primary + secondary keywords)
- `metadata.gap_prompts` (the AI-search prompts the page must answer; pass these into spawn-pages's query-fanout step instead of generating new ones)
- `metadata.competing_domains` (sites currently winning the keyword; reference for differentiation)

Phrase the dispatch as a natural-language sub-task to spawn-pages so it triggers the existing skill machinery — don't try to call it as a tool.

#### 4b. Blog post (`action_type === "blog_post"`)

The action's `metadata` is shaped:
```json
{
  "topic": "...",
  "target_keywords": ["..."],
  "gap_prompts": ["..."],
  "competing_content_urls": ["..."]
}
```

Invoke the `spawn-blogs` skill with a brief built from:

- `title` (post title)
- `description` and `opportunity_overview`
- `metadata.topic` (the pillar / cluster anchor)
- `metadata.target_keywords`
- `metadata.gap_prompts` (sub-intents to cover)
- `metadata.competing_content_urls` (for the "what to do differently" pass)

Same dispatch style as 4a.

### 5. Mark completed

After each successful build (file written and saved):

1. Compute the relative URL of the created page. Examples:
   - `app/foo/page.tsx` → `/foo`
   - `app/blog/(post)/foo/page.mdx` → `/blog/foo`
   - `content/blog/foo.md` → `/blog/foo`

   If the routing convention is ambiguous (custom framework), use the file path the user can `git diff` to find it; better than no URL.

2. Determine whether to confirm. Read `auto_complete` from the per-developer
   preferences file (`~/.config/overgrow/preferences.json` or `$XDG_CONFIG_HOME/overgrow/preferences.json`):
   - If `auto_complete === true`, skip the prompt.
   - If `auto_complete === false`, prompt once per action: "Mark **{title}** complete in Bonemeal? [y/n]".
   - If `auto_complete` is null/missing, prompt once with three options via `AskUserQuestion`: `Yes`, `No`, `Always (don't ask again)`.
     - On `Always`, write `auto_complete: true` to the preferences file before calling.
     - On `Yes`, leave `auto_complete` unset for this run, but ask again next run (current-run yeses don't change the persistent setting).
     - On `No`, leave `auto_complete` unset and skip the call for this action.

3. If confirmed, call `mcp__overgrow__mark_action_complete`:
   - `action_id: <action.id>`
   - `output_url: <relative URL from step 1>` (omit if the URL really can't be derived)

4. If the call returns `isError`, log the message but continue to the next action — Bonemeal-side failures shouldn't block the local build queue.

### 6. End-of-run summary

Print:

- `Built X / Y selected actions.`
- For each successful action: `✓ {title} → {output_url}` (and `· marked complete in Bonemeal` if applicable)
- For each failed action: `✗ {title} — {short reason}`
- `Z proposed actions still in your queue. Re-run /grow to refresh.`

## Failure modes

- **MCP not authenticated**: tell the user to run `/mcp`. Don't try to skip and rebuild blindly.
- **Build failed for an action**: do NOT mark complete. Leave it in `proposed` state so it shows up next run.
- **Action already marked complete in Bonemeal between fetch and mark**: the MCP tool's UPDATE will no-op and return `isError: true`; treat as a benign skip.
- **State files corrupted or unreadable**: treat as uninitialized — re-prompt and rewrite cleanly. The two files are independent; a broken `preferences.json` doesn't invalidate the project link, and vice versa.

## Conventions

- Always tell the user what you're doing (one-line status: "Pulling queue…", "Building landing page X of Y…", "Marked complete in Bonemeal").
- Don't batch silent calls — each MCP call is a remote write and the user should see them happen.
- If `$ARGUMENTS` is `landing` or `blogs`, pass through to the `action_type` filter and skip the other type entirely.