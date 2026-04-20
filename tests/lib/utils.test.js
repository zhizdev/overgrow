import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import fs from 'fs';
import path from 'path';
import {
  parseFrontmatter,
  readFilesRecursive,
  readSourceFiles,
  ensureDir,
  cleanDir,
  writeFile,
  generateYamlFrontmatter,
  replacePlaceholders,
  prefixSkillReferences
} from '../../scripts/lib/utils.js';

const TEST_DIR = path.join(process.cwd(), 'test-tmp');

describe('parseFrontmatter', () => {
  test('should parse basic frontmatter with simple key-value pairs', () => {
    const content = `---
name: test-skill
description: A test skill
---

This is the body content.`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter.name).toBe('test-skill');
    expect(result.frontmatter.description).toBe('A test skill');
    expect(result.body).toBe('This is the body content.');
  });

  test('should parse frontmatter with argument-hint', () => {
    const content = `---
name: test-skill
description: A test skill
argument-hint: [page-type] [company]
---

Body here.`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter.name).toBe('test-skill');
    expect(result.frontmatter['argument-hint']).toBe('[page-type] [company]');
  });

  test('should return empty frontmatter when no frontmatter present', () => {
    const content = 'Just some content without frontmatter.';
    const result = parseFrontmatter(content);

    expect(result.frontmatter).toEqual({});
    expect(result.body).toBe(content);
  });

  test('should handle empty body', () => {
    const content = `---
name: test
---
`;
    const result = parseFrontmatter(content);

    expect(result.frontmatter.name).toBe('test');
    expect(result.body).toBe('');
  });

  test('should handle frontmatter with license field', () => {
    const content = `---
name: skill-name
description: A skill
license: MIT
---

Skill body.`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter.license).toBe('MIT');
  });

  test('should parse user-invocable boolean', () => {
    const content = `---
name: test-skill
user-invocable: true
---

Body.`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter['user-invocable']).toBe(true);
  });

  test('should parse allowed-tools field', () => {
    const content = `---
name: test-skill
allowed-tools: WebSearch,Bash,Read
---

Body.`;

    const result = parseFrontmatter(content);
    expect(result.frontmatter['allowed-tools']).toBe('WebSearch,Bash,Read');
  });
});

describe('generateYamlFrontmatter', () => {
  test('should generate basic frontmatter', () => {
    const data = {
      name: 'test-skill',
      description: 'A test'
    };

    const result = generateYamlFrontmatter(data);
    expect(result).toContain('---');
    expect(result).toContain('name: test-skill');
    expect(result).toContain('description: A test');
  });

  test('should generate frontmatter with argument-hint', () => {
    const data = {
      name: 'test',
      description: 'Test skill',
      'argument-hint': '[page-type] [company]'
    };

    const result = generateYamlFrontmatter(data);
    expect(result).toContain('argument-hint: "[page-type] [company]"');
  });

  test('should generate frontmatter with boolean', () => {
    const data = {
      name: 'test',
      description: 'Test',
      'user-invocable': true
    };

    const result = generateYamlFrontmatter(data);
    expect(result).toContain('user-invocable: true');
  });

  test('should roundtrip: generate and parse back', () => {
    const original = {
      name: 'roundtrip-test',
      description: 'Testing roundtrip',
    };

    const yaml = generateYamlFrontmatter(original);
    const content = `${yaml}\n\nBody content`;
    const parsed = parseFrontmatter(content);

    expect(parsed.frontmatter.name).toBe(original.name);
    expect(parsed.frontmatter.description).toBe(original.description);
  });
});

describe('ensureDir', () => {
  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should create directory if it does not exist', () => {
    const testPath = path.join(TEST_DIR, 'new-dir');
    ensureDir(testPath);

    expect(fs.existsSync(testPath)).toBe(true);
    expect(fs.statSync(testPath).isDirectory()).toBe(true);
  });

  test('should create nested directories', () => {
    const testPath = path.join(TEST_DIR, 'level1', 'level2', 'level3');
    ensureDir(testPath);

    expect(fs.existsSync(testPath)).toBe(true);
  });

  test('should not throw if directory already exists', () => {
    const testPath = path.join(TEST_DIR, 'existing');
    fs.mkdirSync(testPath, { recursive: true });

    expect(() => ensureDir(testPath)).not.toThrow();
  });
});

describe('cleanDir', () => {
  beforeEach(() => {
    ensureDir(TEST_DIR);
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should remove directory and all contents', () => {
    const filePath = path.join(TEST_DIR, 'test.txt');
    fs.writeFileSync(filePath, 'content');

    expect(fs.existsSync(filePath)).toBe(true);

    cleanDir(TEST_DIR);
    expect(fs.existsSync(TEST_DIR)).toBe(false);
  });

  test('should not throw if directory does not exist', () => {
    const nonExistent = path.join(TEST_DIR, 'does-not-exist');
    expect(() => cleanDir(nonExistent)).not.toThrow();
  });

  test('should remove nested directories', () => {
    const nestedPath = path.join(TEST_DIR, 'level1', 'level2');
    ensureDir(nestedPath);
    fs.writeFileSync(path.join(nestedPath, 'file.txt'), 'content');

    cleanDir(TEST_DIR);
    expect(fs.existsSync(TEST_DIR)).toBe(false);
  });
});

describe('writeFile', () => {
  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should write file with content', () => {
    const filePath = path.join(TEST_DIR, 'test.txt');
    const content = 'Hello, world!';

    writeFile(filePath, content);

    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe(content);
  });

  test('should create parent directories automatically', () => {
    const filePath = path.join(TEST_DIR, 'nested', 'deep', 'file.txt');
    writeFile(filePath, 'content');

    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, 'utf-8')).toBe('content');
  });

  test('should overwrite existing file', () => {
    const filePath = path.join(TEST_DIR, 'file.txt');
    writeFile(filePath, 'first');
    writeFile(filePath, 'second');

    expect(fs.readFileSync(filePath, 'utf-8')).toBe('second');
  });
});

describe('readFilesRecursive', () => {
  beforeEach(() => {
    ensureDir(TEST_DIR);
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  test('should find all markdown files in directory', () => {
    writeFile(path.join(TEST_DIR, 'file1.md'), 'content1');
    writeFile(path.join(TEST_DIR, 'file2.md'), 'content2');
    writeFile(path.join(TEST_DIR, 'file3.txt'), 'not markdown');

    const files = readFilesRecursive(TEST_DIR);
    expect(files).toHaveLength(2);
    expect(files.some(f => f.endsWith('file1.md'))).toBe(true);
    expect(files.some(f => f.endsWith('file2.md'))).toBe(true);
  });

  test('should find markdown files in nested directories', () => {
    writeFile(path.join(TEST_DIR, 'root.md'), 'root');
    writeFile(path.join(TEST_DIR, 'sub', 'nested.md'), 'nested');
    writeFile(path.join(TEST_DIR, 'sub', 'deep', 'deeper.md'), 'deeper');

    const files = readFilesRecursive(TEST_DIR);
    expect(files).toHaveLength(3);
  });

  test('should return empty array for non-existent directory', () => {
    const files = readFilesRecursive(path.join(TEST_DIR, 'does-not-exist'));
    expect(files).toEqual([]);
  });
});

describe('readSourceFiles', () => {
  const testRootDir = TEST_DIR;

  beforeEach(() => {
    ensureDir(testRootDir);
  });

  afterEach(() => {
    if (fs.existsSync(testRootDir)) {
      fs.rmSync(testRootDir, { recursive: true, force: true });
    }
  });

  test('should read and parse skill files from directory-based structure', () => {
    const skillContent = `---
name: test-skill
description: A test skill
license: MIT
---

Skill instructions here.`;

    const skillDir = path.join(testRootDir, 'source/skills/test-skill');
    ensureDir(skillDir);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toHaveLength(1);
    expect(skills[0].name).toBe('test-skill');
    expect(skills[0].description).toBe('A test skill');
    expect(skills[0].license).toBe('MIT');
    expect(skills[0].body).toBe('Skill instructions here.');
  });

  test('should read skill with user-invocable flag', () => {
    const skillContent = `---
name: grow-pages
description: Generate landing pages
user-invocable: true
---

Generate pages.`;

    const skillDir = path.join(testRootDir, 'source/skills/grow-pages');
    ensureDir(skillDir);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toHaveLength(1);
    expect(skills[0].userInvocable).toBe(true);
  });

  test('should read skill with reference files', () => {
    const skillContent = `---
name: grow-pages
description: Landing page skill
---

Instructions.`;

    const skillDir = path.join(testRootDir, 'source/skills/grow-pages');
    ensureDir(skillDir);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const refDir = path.join(skillDir, 'reference');
    ensureDir(refDir);
    fs.writeFileSync(path.join(refDir, 'seo-guidelines.md'), 'SEO reference content.');
    fs.writeFileSync(path.join(refDir, 'copywriting.md'), 'Copy reference content.');

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toHaveLength(1);
    expect(skills[0].references).toHaveLength(2);
    const refNames = skills[0].references.map(r => r.name).sort();
    expect(refNames).toEqual(['copywriting', 'seo-guidelines']);
  });

  test('should use directory name if no name in frontmatter', () => {
    const skillDir = path.join(testRootDir, 'source/skills/my-skill');
    ensureDir(skillDir);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), 'Just body, no frontmatter.');

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toHaveLength(1);
    expect(skills[0].name).toBe('my-skill');
  });

  test('should handle empty source directories', () => {
    ensureDir(path.join(testRootDir, 'source/skills'));

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toEqual([]);
  });

  test('should read multiple skills', () => {
    const skill1Dir = path.join(testRootDir, 'source/skills/skill1');
    ensureDir(skill1Dir);
    fs.writeFileSync(path.join(skill1Dir, 'SKILL.md'), '---\nname: skill1\n---\nSkill1');

    const skill2Dir = path.join(testRootDir, 'source/skills/skill2');
    ensureDir(skill2Dir);
    fs.writeFileSync(path.join(skill2Dir, 'SKILL.md'), '---\nname: skill2\n---\nSkill2');

    const { skills } = readSourceFiles(testRootDir);

    expect(skills).toHaveLength(2);
  });

  test('should handle missing skills directory', () => {
    const { skills } = readSourceFiles(testRootDir);
    expect(skills).toEqual([]);
  });

  test('should parse all frontmatter fields correctly', () => {
    const skillContent = `---
name: grow-pages
description: Generate landing pages
license: MIT
user-invocable: true
allowed-tools: WebSearch,Bash,Read
---

Body content.`;

    const skillDir = path.join(testRootDir, 'source/skills/grow-pages');
    ensureDir(skillDir);
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillContent);

    const { skills } = readSourceFiles(testRootDir);

    expect(skills[0].name).toBe('grow-pages');
    expect(skills[0].description).toBe('Generate landing pages');
    expect(skills[0].license).toBe('MIT');
    expect(skills[0].userInvocable).toBe(true);
    expect(skills[0].allowedTools).toBe('WebSearch,Bash,Read');
  });
});

describe('replacePlaceholders', () => {
  test('should replace {{model}} with provider-specific value', () => {
    expect(replacePlaceholders('Ask {{model}} for help.', 'claude-code')).toBe('Ask Claude for help.');
    expect(replacePlaceholders('Ask {{model}} for help.', 'gemini')).toBe('Ask Gemini for help.');
    expect(replacePlaceholders('Ask {{model}} for help.', 'codex')).toBe('Ask GPT for help.');
    expect(replacePlaceholders('Ask {{model}} for help.', 'cursor')).toBe('Ask the model for help.');
    expect(replacePlaceholders('Ask {{model}} for help.', 'agents')).toBe('Ask the model for help.');
    expect(replacePlaceholders('Ask {{model}} for help.', 'kiro')).toBe('Ask Claude for help.');
  });

  test('should replace {{config_file}} with provider-specific value', () => {
    expect(replacePlaceholders('See {{config_file}}.', 'claude-code')).toBe('See CLAUDE.md.');
    expect(replacePlaceholders('See {{config_file}}.', 'cursor')).toBe('See .cursorrules.');
    expect(replacePlaceholders('See {{config_file}}.', 'gemini')).toBe('See GEMINI.md.');
    expect(replacePlaceholders('See {{config_file}}.', 'codex')).toBe('See AGENTS.md.');
    expect(replacePlaceholders('See {{config_file}}.', 'agents')).toBe('See .github/copilot-instructions.md.');
    expect(replacePlaceholders('See {{config_file}}.', 'kiro')).toBe('See .kiro/settings.json.');
  });

  test('should replace {{ask_instruction}} with provider-specific value', () => {
    const result = replacePlaceholders('{{ask_instruction}}', 'claude-code');
    expect(result).toBe('STOP and call the AskUserQuestion tool to clarify.');

    const cursorResult = replacePlaceholders('{{ask_instruction}}', 'cursor');
    expect(cursorResult).toBe('ask the user directly to clarify what you cannot infer.');
  });

  test('should replace {{available_commands}} with command list', () => {
    const result = replacePlaceholders('Commands: {{available_commands}}', 'claude-code', ['grow-pages']);
    expect(result).toBe('Commands: /grow-pages');
  });

  test('should replace {{command_prefix}} correctly per provider', () => {
    expect(replacePlaceholders('Run {{command_prefix}}grow-pages', 'claude-code')).toBe('Run /grow-pages');
    expect(replacePlaceholders('Run {{command_prefix}}grow-pages', 'codex')).toBe('Run $grow-pages');
  });

  test('should replace multiple placeholders in the same string', () => {
    const result = replacePlaceholders('{{model}} uses {{config_file}} and {{ask_instruction}}', 'claude-code');
    expect(result).toBe('Claude uses CLAUDE.md and STOP and call the AskUserQuestion tool to clarify.');
  });

  test('should fall back to cursor placeholders for unknown provider', () => {
    const result = replacePlaceholders('{{model}} {{config_file}}', 'unknown-provider');
    expect(result).toBe('the model .cursorrules');
  });
});

describe('prefixSkillReferences', () => {
  test('should prefix /skillname command references', () => {
    const result = prefixSkillReferences('Run /grow-pages to generate.', 'o-', ['grow-pages']);
    expect(result).toBe('Run /o-grow-pages to generate.');
  });

  test('should prefix "the skillname skill" references', () => {
    const result = prefixSkillReferences('Use the grow-pages skill.', 'o-', ['grow-pages']);
    expect(result).toBe('Use the o-grow-pages skill.');
  });

  test('should return content unchanged with empty prefix', () => {
    const result = prefixSkillReferences('Run /grow-pages.', '', ['grow-pages']);
    expect(result).toBe('Run /grow-pages.');
  });

  test('should return content unchanged with empty skill names', () => {
    const result = prefixSkillReferences('Run /grow-pages.', 'o-', []);
    expect(result).toBe('Run /grow-pages.');
  });

  test('should not match /skillname inside longer words', () => {
    const result = prefixSkillReferences('The /grow-pagesmore process.', 'o-', ['grow-pages']);
    expect(result).toBe('The /grow-pagesmore process.');
  });

  test('should match /skillname at end of string', () => {
    const result = prefixSkillReferences('Run /grow-pages', 'o-', ['grow-pages']);
    expect(result).toBe('Run /o-grow-pages');
  });

  test('should match /skillname before punctuation', () => {
    const result = prefixSkillReferences('Try /grow-pages.', 'o-', ['grow-pages']);
    expect(result).toContain('/o-grow-pages.');
  });
});
