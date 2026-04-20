/**
 * Provider configurations for the transformer factory.
 *
 * Each config specifies:
 * - provider: key into PROVIDER_PLACEHOLDERS (e.g. 'claude-code')
 * - configDir: dot-directory name (e.g. '.claude')
 * - displayName: human-readable name for log output (e.g. 'Claude Code')
 * - frontmatterFields: which optional fields to emit beyond name + description
 * - bodyTransform: optional function (body, skill) => transformed body
 */
export const PROVIDERS = {
  cursor: {
    provider: 'cursor',
    configDir: '.cursor',
    displayName: 'Cursor',
    frontmatterFields: ['license', 'compatibility', 'metadata'],
  },
  'claude-code': {
    provider: 'claude-code',
    configDir: '.claude',
    displayName: 'Claude Code',
    frontmatterFields: ['user-invocable', 'argument-hint', 'license', 'compatibility', 'metadata', 'allowed-tools'],
  },
  gemini: {
    provider: 'gemini',
    configDir: '.gemini',
    displayName: 'Gemini',
    frontmatterFields: [],
  },
  codex: {
    provider: 'codex',
    configDir: '.codex',
    displayName: 'Codex',
    frontmatterFields: ['argument-hint', 'license'],
  },
};
