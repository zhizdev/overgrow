#!/usr/bin/env node

/**
 * Build System for Cross-Provider Landing Page Skills
 *
 * Transforms source skills into provider-specific formats:
 * - Cursor: .cursor/skills/
 * - Claude Code: .claude/skills/
 * - Gemini: .gemini/skills/
 * - Codex: .codex/skills/
 *
 * Also assembles a universal directory containing all providers.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { readSourceFiles } from './lib/utils.js';
import { createTransformer, PROVIDERS } from './lib/transformers/index.js';


/**
 * Copy directory recursively
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

/**
 * Assemble universal directory from all provider outputs
 */
function assembleUniversal(distDir) {
  const universalDir = path.join(distDir, 'universal');

  if (fs.existsSync(universalDir)) {
    fs.rmSync(universalDir, { recursive: true, force: true });
  }

  const providerConfigs = Object.values(PROVIDERS);

  for (const { provider, configDir } of providerConfigs) {
    const src = path.join(distDir, provider, configDir);
    const dest = path.join(universalDir, configDir);
    if (fs.existsSync(src)) {
      copyDirSync(src, dest);
    }
  }

  fs.writeFileSync(path.join(universalDir, 'README.txt'),
`Overgrow — Landing page generation skills for AI harnesses

This folder contains skills for all supported tools:

  .cursor/    → Cursor
  .claude/    → Claude Code
  .gemini/    → Gemini CLI
  .codex/     → Codex CLI

To install, copy the relevant folder(s) into your project root.
These are hidden folders (dotfiles) — press Cmd+Shift+. in Finder to see them.
`);

  console.log(`✓ Assembled universal directory (${providerConfigs.length} providers)`);
}

/**
 * Main build process
 */
async function build() {
  console.log('Building cross-provider landing page skills...\n');

  // Read source files (unified skills architecture)
  const { skills } = readSourceFiles(ROOT_DIR);
  const userInvocableCount = skills.filter(s => s.userInvocable).length;
  console.log(`Read ${skills.length} skills (${userInvocableCount} user-invocable)\n`);

  // Transform for each provider
  for (const config of Object.values(PROVIDERS)) {
    const transform = createTransformer(config);
    transform(skills, DIST_DIR);
  }

  // Assemble universal directory
  assembleUniversal(DIST_DIR);

  // ZIP creation requires Node.js-compatible streams (may not work with all Bun versions)
  // To create ZIPs manually: cd dist && zip -r universal.zip universal/

  // Copy all provider outputs to project root for local testing
  const syncConfigs = Object.values(PROVIDERS);

  for (const { provider, configDir } of syncConfigs) {
    const skillsSrc = path.join(DIST_DIR, provider, configDir, 'skills');
    const skillsDest = path.join(ROOT_DIR, configDir, 'skills');

    if (fs.existsSync(skillsSrc)) {
      if (fs.existsSync(skillsDest)) fs.rmSync(skillsDest, { recursive: true });
      copyDirSync(skillsSrc, skillsDest);
    }
  }

  console.log(`\nSynced skills to: ${syncConfigs.map(p => p.configDir).join(', ')}`);

  console.log('\nBuild complete!');
}

// Run the build
build();
