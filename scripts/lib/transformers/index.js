import { createTransformer } from './factory.js';
import { PROVIDERS } from './providers.js';

export const transformCursor = createTransformer(PROVIDERS.cursor);
export const transformClaudeCode = createTransformer(PROVIDERS['claude-code']);
export const transformGemini = createTransformer(PROVIDERS.gemini);
export const transformCodex = createTransformer(PROVIDERS.codex);

export { createTransformer, PROVIDERS };
