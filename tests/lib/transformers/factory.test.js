import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { createTransformer } from '../../../scripts/lib/transformers/factory.js';
import { parseFrontmatter } from '../../../scripts/lib/utils.js';

const TEST_DIR = path.join(process.cwd(), 'test-tmp-factory');

// Minimal config using 'cursor' as provider (has existing PROVIDER_PLACEHOLDERS)
const baseConfig = {
  provider: 'cursor',
  configDir: '.test',
  displayName: 'Test Provider',
  frontmatterFields: [],
};

describe('createTransformer factory', () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should create correct directory structure', () => {
    const transform = createTransformer(baseConfig);
    transform([], TEST_DIR);
    expect(fs.existsSync(path.join(TEST_DIR, 'cursor/.test/skills'))).toBe(true);
  });

  test('should always emit name and description', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{ name: 'grow-pages', description: 'Generate landing pages', body: 'Body.' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/grow-pages/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.frontmatter.name).toBe('grow-pages');
    expect(parsed.frontmatter.description).toBe('Generate landing pages');
    expect(parsed.body).toBe('Body.');
  });

  test('should only emit allowlisted fields', () => {
    const config = { ...baseConfig, frontmatterFields: ['license'] };
    const transform = createTransformer(config);
    const skills = [{
      name: 'test',
      description: 'Test',
      license: 'MIT',
      compatibility: 'all',
      metadata: 'meta',
      body: 'Body'
    }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.frontmatter.license).toBe('MIT');
    expect(parsed.frontmatter.compatibility).toBeUndefined();
    expect(parsed.frontmatter.metadata).toBeUndefined();
  });

  test('should skip empty optional fields', () => {
    const config = { ...baseConfig, frontmatterFields: ['license'] };
    const transform = createTransformer(config);
    const skills = [{ name: 'test', description: 'Test', license: '', body: 'Body' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.frontmatter.license).toBeUndefined();
  });

  test('should emit user-invocable as true when skill is user-invocable', () => {
    const config = { ...baseConfig, frontmatterFields: ['user-invocable'] };
    const transform = createTransformer(config);
    const skills = [{ name: 'test', description: 'Test', userInvocable: true, body: 'Body' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.frontmatter['user-invocable']).toBe(true);
  });

  test('should not emit user-invocable when skill is not user-invocable', () => {
    const config = { ...baseConfig, frontmatterFields: ['user-invocable'] };
    const transform = createTransformer(config);
    const skills = [{ name: 'test', description: 'Test', userInvocable: false, body: 'Body' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.frontmatter['user-invocable']).toBeUndefined();
  });

  test('should emit argument-hint only when user-invocable', () => {
    const config = { ...baseConfig, frontmatterFields: ['argument-hint'] };
    const transform = createTransformer(config);

    // User-invocable with hint
    const skills1 = [{ name: 'test', description: 'Test', userInvocable: true, argumentHint: '[page-type]', body: 'Body' }];
    transform(skills1, TEST_DIR);
    let content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    let parsed = parseFrontmatter(content);
    expect(parsed.frontmatter['argument-hint']).toBe('[page-type]');

    // Non-user-invocable with hint
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
    const skills2 = [{ name: 'test', description: 'Test', userInvocable: false, argumentHint: '[page-type]', body: 'Body' }];
    transform(skills2, TEST_DIR);
    content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    parsed = parseFrontmatter(content);
    expect(parsed.frontmatter['argument-hint']).toBeUndefined();
  });

  test('should support prefix option', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{ name: 'grow-pages', description: 'Generate pages', userInvocable: true, body: 'Body' }];
    transform(skills, TEST_DIR, { prefix: 'o-', outputSuffix: '-prefixed' });

    const outputPath = path.join(TEST_DIR, 'cursor-prefixed/.test/skills/o-grow-pages/SKILL.md');
    expect(fs.existsSync(outputPath)).toBe(true);
    const content = fs.readFileSync(outputPath, 'utf-8');
    expect(content).toContain('name: o-grow-pages');
  });

  test('should copy reference files', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{
      name: 'test',
      description: 'Test',
      body: 'Body',
      references: [
        { name: 'seo', content: 'SEO reference content', filePath: '/fake/seo.md' },
        { name: 'copy', content: 'Copy reference content', filePath: '/fake/copy.md' },
      ]
    }];
    transform(skills, TEST_DIR);

    expect(fs.existsSync(path.join(TEST_DIR, 'cursor/.test/skills/test/reference/seo.md'))).toBe(true);
    expect(fs.existsSync(path.join(TEST_DIR, 'cursor/.test/skills/test/reference/copy.md'))).toBe(true);
    const seo = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/reference/seo.md'), 'utf-8');
    expect(seo).toBe('SEO reference content');
  });

  test('should clean existing directory before writing', () => {
    const transform = createTransformer(baseConfig);
    const existingDir = path.join(TEST_DIR, 'cursor/.test/skills/old');
    fs.mkdirSync(existingDir, { recursive: true });
    fs.writeFileSync(path.join(existingDir, 'SKILL.md'), 'old');

    const skills = [{ name: 'new', description: 'New', body: 'New' }];
    transform(skills, TEST_DIR);

    expect(fs.existsSync(path.join(TEST_DIR, 'cursor/.test/skills/old/SKILL.md'))).toBe(false);
    expect(fs.existsSync(path.join(TEST_DIR, 'cursor/.test/skills/new/SKILL.md'))).toBe(true);
  });

  test('should handle empty skills array', () => {
    const transform = createTransformer(baseConfig);
    transform([], TEST_DIR);

    const skillDirs = fs.readdirSync(path.join(TEST_DIR, 'cursor/.test/skills'));
    expect(skillDirs).toHaveLength(0);
  });

  test('should replace {{model}} placeholder', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{ name: 'test', description: 'Test', body: 'Ask {{model}} for help.' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    expect(content).toContain('Ask the model for help.');
  });

  test('should replace {{config_file}} placeholder', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{ name: 'test', description: 'Test', body: 'See {{config_file}}.' }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    expect(content).toContain('See .cursorrules.');
  });

  test('should preserve multiline body content', () => {
    const transform = createTransformer(baseConfig);
    const skills = [{
      name: 'test',
      description: 'Test',
      body: `First paragraph.\n\nSecond paragraph.\n\n- List item 1\n- List item 2`
    }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    const parsed = parseFrontmatter(content);
    expect(parsed.body).toContain('First paragraph.');
    expect(parsed.body).toContain('Second paragraph.');
    expect(parsed.body).toContain('- List item 1');
  });

  test('should emit all spec fields when configured', () => {
    const config = {
      ...baseConfig,
      frontmatterFields: ['user-invocable', 'argument-hint', 'license', 'compatibility', 'metadata', 'allowed-tools'],
    };
    const transform = createTransformer(config);
    const skills = [{
      name: 'test',
      description: 'Test',
      userInvocable: true,
      argumentHint: '[page-type]',
      license: 'MIT',
      compatibility: 'claude-code',
      metadata: 'v1',
      allowedTools: 'WebSearch,Bash',
      body: 'Body'
    }];
    transform(skills, TEST_DIR);

    const content = fs.readFileSync(path.join(TEST_DIR, 'cursor/.test/skills/test/SKILL.md'), 'utf-8');
    expect(content).toContain('user-invocable: true');
    expect(content).toContain('argument-hint:');
    expect(content).toContain('license: MIT');
    expect(content).toContain('compatibility: claude-code');
    expect(content).toContain('metadata: v1');
    expect(content).toContain('allowed-tools: WebSearch,Bash');
  });
});
