import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Mozilla Firefox** (any edition —
 * stable, Beta, Developer Edition, Nightly) on any platform, including
 * Firefox for iOS (`FxiOS/`).
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if Firefox, otherwise `false`.
 */
export function isFirefox(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return /\b(?:Firefox|FxiOS)\//i.test(userAgent);
}
