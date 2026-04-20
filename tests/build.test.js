import { describe, test, expect, beforeEach, afterEach, spyOn } from 'bun:test';
import fs from 'fs';
import path from 'path';
import * as utils from '../scripts/lib/utils.js';
import * as transformers from '../scripts/lib/transformers/index.js';

const TEST_DIR = path.join(process.cwd(), 'test-tmp-build');

describe('build orchestration', () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
    fs.mkdirSync(TEST_DIR, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should call readSourceFiles with root directory', () => {
    const readSourceFilesSpy = spyOn(utils, 'readSourceFiles').mockReturnValue({
      skills: []
    });

    const transformCursorSpy = spyOn(transformers, 'transformCursor').mockImplementation(() => {});
    const transformClaudeCodeSpy = spyOn(transformers, 'transformClaudeCode').mockImplementation(() => {});
    const transformGeminiSpy = spyOn(transformers, 'transformGemini').mockImplementation(() => {});
    const transformCodexSpy = spyOn(transformers, 'transformCodex').mockImplementation(() => {});

    const ROOT_DIR = TEST_DIR;
    const DIST_DIR = path.join(ROOT_DIR, 'dist');

    const { skills } = utils.readSourceFiles(ROOT_DIR);
    transformers.transformCursor(skills, DIST_DIR);
    transformers.transformClaudeCode(skills, DIST_DIR);
    transformers.transformGemini(skills, DIST_DIR);
    transformers.transformCodex(skills, DIST_DIR);

    expect(readSourceFilesSpy).toHaveBeenCalledWith(ROOT_DIR);

    readSourceFilesSpy.mockRestore();
    transformCursorSpy.mockRestore();
    transformClaudeCodeSpy.mockRestore();
    transformGeminiSpy.mockRestore();
    transformCodexSpy.mockRestore();
  });

  test('should call all transformers with correct arguments', () => {
    const skills = [
      { name: 'grow-pages', description: 'Generate landing pages', license: 'MIT', body: 'Skill body' }
    ];

    const readSourceFilesSpy = spyOn(utils, 'readSourceFiles').mockReturnValue({ skills });

    const transformCursorSpy = spyOn(transformers, 'transformCursor').mockImplementation(() => {});
    const transformClaudeCodeSpy = spyOn(transformers, 'transformClaudeCode').mockImplementation(() => {});
    const transformGeminiSpy = spyOn(transformers, 'transformGemini').mockImplementation(() => {});
    const transformCodexSpy = spyOn(transformers, 'transformCodex').mockImplementation(() => {});

    const ROOT_DIR = TEST_DIR;
    const DIST_DIR = path.join(ROOT_DIR, 'dist');

    const sourceFiles = utils.readSourceFiles(ROOT_DIR);
    transformers.transformCursor(sourceFiles.skills, DIST_DIR);
    transformers.transformClaudeCode(sourceFiles.skills, DIST_DIR);
    transformers.transformGemini(sourceFiles.skills, DIST_DIR);
    transformers.transformCodex(sourceFiles.skills, DIST_DIR);

    expect(transformCursorSpy).toHaveBeenCalledWith(skills, DIST_DIR);
    expect(transformClaudeCodeSpy).toHaveBeenCalledWith(skills, DIST_DIR);
    expect(transformGeminiSpy).toHaveBeenCalledWith(skills, DIST_DIR);
    expect(transformCodexSpy).toHaveBeenCalledWith(skills, DIST_DIR);

    readSourceFilesSpy.mockRestore();
    transformCursorSpy.mockRestore();
    transformClaudeCodeSpy.mockRestore();
    transformGeminiSpy.mockRestore();
    transformCodexSpy.mockRestore();
  });

  test('should handle empty source files', () => {
    const readSourceFilesSpy = spyOn(utils, 'readSourceFiles').mockReturnValue({ skills: [] });

    const transformCursorSpy = spyOn(transformers, 'transformCursor').mockImplementation(() => {});
    const transformClaudeCodeSpy = spyOn(transformers, 'transformClaudeCode').mockImplementation(() => {});
    const transformGeminiSpy = spyOn(transformers, 'transformGemini').mockImplementation(() => {});
    const transformCodexSpy = spyOn(transformers, 'transformCodex').mockImplementation(() => {});

    const ROOT_DIR = TEST_DIR;
    const DIST_DIR = path.join(ROOT_DIR, 'dist');

    const { skills } = utils.readSourceFiles(ROOT_DIR);
    transformers.transformCursor(skills, DIST_DIR);
    transformers.transformClaudeCode(skills, DIST_DIR);
    transformers.transformGemini(skills, DIST_DIR);
    transformers.transformCodex(skills, DIST_DIR);

    expect(transformCursorSpy).toHaveBeenCalledWith([], DIST_DIR);

    readSourceFilesSpy.mockRestore();
    transformCursorSpy.mockRestore();
    transformClaudeCodeSpy.mockRestore();
    transformGeminiSpy.mockRestore();
    transformCodexSpy.mockRestore();
  });

  test('integration: full build creates all expected outputs', () => {
    const skillContent = `---
name: grow-pages
description: Generate landing pages
license: MIT
user-invocable: true
---

This is the grow-pages skill body.`;

    const skillDir = path.join(TEST_DIR, 'source/skills/grow-pages');
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const DIST_DIR = path.join(TEST_DIR, 'dist');
    const { skills } = utils.readSourceFiles(TEST_DIR);

    transformers.transformCursor(skills, DIST_DIR);
    transformers.transformClaudeCode(skills, DIST_DIR);
    transformers.transformGemini(skills, DIST_DIR);
    transformers.transformCodex(skills, DIST_DIR);

    // Verify all provider outputs
    expect(fs.existsSync(path.join(DIST_DIR, 'cursor/.cursor/skills/grow-pages/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'claude-code/.claude/skills/grow-pages/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'gemini/.gemini/skills/grow-pages/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'codex/.codex/skills/grow-pages/SKILL.md'))).toBe(true);
  });

  test('integration: verify provider-specific transformations', () => {
    const skillContent = `---
name: grow-pages
description: Generate landing pages
user-invocable: true
argument-hint: "[page-type] [company]"
license: MIT
allowed-tools: WebSearch,Bash
---

Check {{config_file}} for conventions. Ask {{model}} for help. {{ask_instruction}}`;

    const skillDir = path.join(TEST_DIR, 'source/skills/grow-pages');
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const DIST_DIR = path.join(TEST_DIR, 'dist');
    const { skills } = utils.readSourceFiles(TEST_DIR);

    transformers.transformClaudeCode(skills, DIST_DIR);
    transformers.transformGemini(skills, DIST_DIR);
    transformers.transformCodex(skills, DIST_DIR);

    // Claude Code: full frontmatter, Claude-specific placeholders
    const claudeContent = fs.readFileSync(path.join(DIST_DIR, 'claude-code/.claude/skills/grow-pages/SKILL.md'), 'utf-8');
    expect(claudeContent).toContain('user-invocable: true');
    expect(claudeContent).toContain('allowed-tools: WebSearch,Bash');
    expect(claudeContent).toContain('CLAUDE.md');
    expect(claudeContent).toContain('Claude');
    expect(claudeContent).toContain('AskUserQuestion');

    // Gemini: minimal frontmatter, Gemini-specific placeholders
    const geminiContent = fs.readFileSync(path.join(DIST_DIR, 'gemini/.gemini/skills/grow-pages/SKILL.md'), 'utf-8');
    expect(geminiContent).toContain('GEMINI.md');
    expect(geminiContent).toContain('Gemini');
    expect(geminiContent).not.toContain('user-invocable');

    // Codex: GPT-specific placeholders, $ command prefix
    const codexContent = fs.readFileSync(path.join(DIST_DIR, 'codex/.codex/skills/grow-pages/SKILL.md'), 'utf-8');
    expect(codexContent).toContain('AGENTS.md');
    expect(codexContent).toContain('GPT');
  });

  test('integration: multiple skills', () => {
    const skill1Dir = path.join(TEST_DIR, 'source/skills/grow-pages');
    fs.mkdirSync(skill1Dir, { recursive: true });
    fs.writeFileSync(path.join(skill1Dir, 'SKILL.md'), '---\nname: grow-pages\nuser-invocable: true\n---\nGrow pages');

    const skill2Dir = path.join(TEST_DIR, 'source/skills/grow-blog');
    fs.mkdirSync(skill2Dir, { recursive: true });
    fs.writeFileSync(path.join(skill2Dir, 'SKILL.md'), '---\nname: grow-blog\nuser-invocable: true\n---\nGrow blog');

    const DIST_DIR = path.join(TEST_DIR, 'dist');
    const { skills } = utils.readSourceFiles(TEST_DIR);

    expect(skills).toHaveLength(2);

    transformers.transformCursor(skills, DIST_DIR);
    transformers.transformClaudeCode(skills, DIST_DIR);

    expect(fs.existsSync(path.join(DIST_DIR, 'cursor/.cursor/skills/grow-pages/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'cursor/.cursor/skills/grow-blog/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'claude-code/.claude/skills/grow-pages/SKILL.md'))).toBe(true);
    expect(fs.existsSync(path.join(DIST_DIR, 'claude-code/.claude/skills/grow-blog/SKILL.md'))).toBe(true);
  });

  test('should export the four supported provider transformers', () => {
    expect(typeof transformers.transformCursor).toBe('function');
    expect(typeof transformers.transformClaudeCode).toBe('function');
    expect(typeof transformers.transformGemini).toBe('function');
    expect(typeof transformers.transformCodex).toBe('function');
  });
});
