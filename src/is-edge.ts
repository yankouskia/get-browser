import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Microsoft Edge**.
 *
 * Matches both:
 * - Legacy EdgeHTML — UA token `Edge/`.
 * - Chromium-Edge (2020+) — UA token `Edg/`, `EdgA/` (Android), or `EdgiOS/` (iOS).
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if Edge, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isEdge } from 'get-browser';
 * isEdge(); // true on modern Chromium-based Edge
 * ```
 */
export function isEdge(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return /\b(?:Edge|Edg|EdgA|EdgiOS)\//.test(userAgent);
}
