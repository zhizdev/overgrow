---
name: grow
description: Pull the open Bonemeal action queue (landing pages and blog posts the user has not built yet) via the bonemeal MCP server, let the user pick which ones to build, dispatch each to the spawn-pages or spawn-blogs skill with the action's brief, and mark each completed in Bonemeal once the file is written. Use this whenever the user says "grow", "/grow", "build my Bonemeal queue", "what's in my Bonemeal queue", "build the suggested pages", or wants to act on Bonemeal's content suggestions. Stop and ask the user before marking actions complete the first time, then remember their preference.
user-invocable: true
argument-hint: "[optional: 'landing' to filter to landing pages only, 'blogs' to filter to blog posts only]"
license: MIT
allowed-tools: Read,Write,Edit,Bash,Glob,Grep
---

# Overgrow — Grow (Bonemeal Action Queue)

This skill is the integration point between the Bonemeal MCP server and the rest of overgrow. It surfaces the open action queue from the user's Bonemeal project, lets them pick what to build, dispatches each item to the existing `spawn-pages` or `spawn-blogs` skill with the action's brief as input, then marks each one completed back on Bonemeal — attributing the completion to "Overgrow" in the Bonemeal UI.

## Prerequisites

1. The user must already have authenticated the bonemeal MCP server. If `mcp__overgrow__list_projects` is unavailable, tell them to run `/mcp` and authenticate the `overgrow` server, then re-invoke this skill.
2. State file lives at `.overgrow/bonemeal.json` in the repo root. Create it on first run.

## State file shape

`.overgrow/bonemeal.json`:

```json
{
  "project_id": "<uuid>",
  "project_name": "<for log lines>",
  "auto_complete": true | false | null
}
```

- `project_id` — once chosen, persisted so we don't ask every run.
- `auto_complete` — `null` first run; flips to `true` if the user replies "always", `false` if they reply "ask each time". Determines whether to confirm before calling `mark_action_complete`.

If the file is missing, initialize with `{"project_id": null, "auto_complete": null}` after directory creation.

## Flow

### 1. Resolve the project

If `state.project_id` is null:
- Call `mcp__overgrow__list_projects` (no arguments).
- If exactly one project is returned, use it; tell the user "Linking this repo to Bonemeal project: **{name}**".
- If multiple, present a numbered list with `name`, `workspace.name`, `id`, and call `AskUserQuestion` to ask which one this repo represents.
- Persist `project_id` and `project_name` to `.overgrow/bonemeal.json`.

If `state.project_id` is set, skip the resolve step. (User can edit the file by hand to relink.)

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

2. Determine whether to confirm:
   - If `state.auto_complete === true`, skip the prompt.
   - If `state.auto_complete === false`, prompt once per action: "Mark **{title}** complete in Bonemeal? [y/n]".
   - If `state.auto_complete === null`, prompt once with three options via `AskUserQuestion`: `Yes`, `No`, `Always (don't ask again)`.
     - On `Always`, set `state.auto_complete = true` and persist before calling.
     - On `Yes`, leave `auto_complete = null` for this run, but ask again next run (current-run yeses don't change the persistent setting).
     - On `No`, leave `auto_complete = null` and skip the call for this action.

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
- **State file corrupted or unreadable**: rebuild it (resolve project again).

## Conventions

- Always tell the user what you're doing (one-line status: "Pulling queue…", "Building landing page X of Y…", "Marked complete in Bonemeal").
- Don't batch silent calls — each MCP call is a remote write and the user should see them happen.
- If `$ARGUMENTS` is `landing` or `blogs`, pass through to the `action_type` filter and skip the other type entirely.