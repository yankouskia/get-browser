import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Opera** (Presto-era or Chromium-era,
 * desktop or mobile).
 *
 * Matches either the `Opera` UA token (Presto) or the `OPR/` token (Chromium).
 * Also accepts the `window.opera` / `window.opr` global when present.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if Opera, otherwise `false`.
 */
export function isOpera(options?: DetectOptions): boolean {
  const { userAgent, hasOperaGlobal } = resolveEnvironment(options);
  return hasOperaGlobal || /\bOpera\b|\bOPR\//.test(userAgent);
}
