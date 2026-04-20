import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import fs from 'fs';
import path from 'path';
import { PROVIDERS } from '../../../scripts/lib/transformers/providers.js';
import { createTransformer } from '../../../scripts/lib/transformers/factory.js';
import { parseFrontmatter, PROVIDER_PLACEHOLDERS } from '../../../scripts/lib/utils.js';

const TEST_DIR = path.join(process.cwd(), 'test-tmp-providers');

function skillPath(config, skillName, suffix = '') {
  return path.join(TEST_DIR, `${config.provider}${suffix}/${config.configDir}/skills/${skillName}/SKILL.md`);
}

// Test every provider config
for (const [key, config] of Object.entries(PROVIDERS)) {
  describe(`Provider: ${config.displayName} (${key})`, () => {
    const transform = createTransformer(config);

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
      transform([], TEST_DIR);
      expect(fs.existsSync(path.join(TEST_DIR, `${config.provider}/${config.configDir}/skills`))).toBe(true);
    });

    test('should replace {{model}} placeholder correctly', () => {
      const skills = [{ name: 'test', description: 'Test', body: 'Ask {{model}} for help.' }];
      transform(skills, TEST_DIR);
      const content = fs.readFileSync(skillPath(config, 'test'), 'utf-8');
      const expected = PROVIDER_PLACEHOLDERS[config.placeholderProvider || config.provider].model;
      expect(content).toContain(`Ask ${expected} for help.`);
    });

    test('should replace {{config_file}} placeholder correctly', () => {
      const skills = [{ name: 'test', description: 'Test', body: 'See {{config_file}}.' }];
      transform(skills, TEST_DIR);
      const content = fs.readFileSync(skillPath(config, 'test'), 'utf-8');
      const expected = PROVIDER_PLACEHOLDERS[config.placeholderProvider || config.provider].config_file;
      expect(content).toContain(`See ${expected}.`);
    });

    test('should support prefix option', () => {
      const skills = [{ name: 'grow-pages', description: 'Generate pages', userInvocable: true, body: 'Body' }];
      transform(skills, TEST_DIR, { prefix: 'o-', outputSuffix: '-prefixed' });
      expect(fs.existsSync(skillPath(config, 'o-grow-pages', '-prefixed'))).toBe(true);
      const content = fs.readFileSync(skillPath(config, 'o-grow-pages', '-prefixed'), 'utf-8');
      expect(content).toContain('name: o-grow-pages');
    });

    test('should copy reference files', () => {
      const skills = [{
        name: 'test',
        description: 'Test',
        body: 'Body',
        references: [{ name: 'ref', content: 'Ref content', filePath: '/fake/ref.md' }]
      }];
      transform(skills, TEST_DIR);
      const refPath = path.join(TEST_DIR, `${config.provider}/${config.configDir}/skills/test/reference/ref.md`);
      expect(fs.existsSync(refPath)).toBe(true);
    });

    // Field-specific tests based on provider config
    if (config.frontmatterFields.includes('user-invocable')) {
      test('should emit user-invocable for user-invocable skills', () => {
        const skills = [{ name: 'test', description: 'Test', userInvocable: true, body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter['user-invocable']).toBe(true);
      });

      test('should omit user-invocable for non-user-invocable skills', () => {
        const skills = [{ name: 'test', description: 'Test', userInvocable: false, body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter['user-invocable']).toBeUndefined();
      });
    }

    if (config.frontmatterFields.includes('argument-hint')) {
      test('should emit argument-hint for user-invocable skills', () => {
        const skills = [{ name: 'test', description: 'Test', userInvocable: true, argumentHint: '[page-type]', body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter['argument-hint']).toBe('[page-type]');
      });

      test('should not emit argument-hint for non-user-invocable skills', () => {
        const skills = [{ name: 'test', description: 'Test', userInvocable: false, argumentHint: '[page-type]', body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter['argument-hint']).toBeUndefined();
      });
    }

    if (config.frontmatterFields.includes('license')) {
      test('should emit license when present', () => {
        const skills = [{ name: 'test', description: 'Test', license: 'MIT', body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter.license).toBe('MIT');
      });

      test('should omit license when empty', () => {
        const skills = [{ name: 'test', description: 'Test', license: '', body: 'Body' }];
        transform(skills, TEST_DIR);
        const parsed = parseFrontmatter(fs.readFileSync(skillPath(config, 'test'), 'utf-8'));
        expect(parsed.frontmatter.license).toBeUndefined();
      });
    }

    if (config.frontmatterFields.includes('allowed-tools')) {
      test('should emit allowed-tools when present', () => {
        const skills = [{ name: 'test', description: 'Test', allowedTools: 'WebSearch,Bash', body: 'Body' }];
        transform(skills, TEST_DIR);
        const content = fs.readFileSync(skillPath(config, 'test'), 'utf-8');
        expect(content).toContain('allowed-tools: WebSearch,Bash');
      });
    }

    // Fields NOT in this provider's allowlist should not appear
    const allOptionalFields = ['user-invocable', 'argument-hint', 'license', 'compatibility', 'metadata', 'allowed-tools'];
    const excludedFields = allOptionalFields.filter(f => !config.frontmatterFields.includes(f));

    if (excludedFields.length > 0) {
      test('should not emit fields outside allowlist', () => {
        const skills = [{
          name: 'test',
          description: 'Test',
          userInvocable: true,
          argumentHint: '[page-type]',
          license: 'MIT',
          compatibility: 'all',
          metadata: 'meta',
          allowedTools: 'Bash',
          body: 'Body'
        }];
        transform(skills, TEST_DIR);
        const content = fs.readFileSync(skillPath(config, 'test'), 'utf-8');

        for (const field of excludedFields) {
          const lines = content.split('\n');
          const frontmatterLines = [];
          let inFrontmatter = false;
          for (const line of lines) {
            if (line === '---') {
              if (inFrontmatter) break;
              inFrontmatter = true;
              continue;
            }
            if (inFrontmatter) frontmatterLines.push(line);
          }
          const hasForbiddenField = frontmatterLines.some(l => l.startsWith(`${field}:`));
          expect(hasForbiddenField).toBe(false);
        }
      });
    }
  });
}
