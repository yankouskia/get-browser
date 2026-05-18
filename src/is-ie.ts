import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Internet Explorer 6+**.
 *
 * Matches the legacy `MSIE` token (IE 6–10) and the `Trident/` engine token
 * (IE 11). Does not match Microsoft Edge — use {@link isEdge} for that.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if IE, otherwise `false`.
 *
 * @example
 * ```ts
 * if (isIE()) {
 *   showLegacyWarning();
 * }
 * ```
 */
export function isIE(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return userAgent.includes('MSIE ') || userAgent.includes('Trident/');
}
