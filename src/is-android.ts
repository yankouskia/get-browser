import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is an **Android WebView / Android Browser**.
 *
 * This is the embedded WebKit-derived browser used by Android system apps, not
 * the same thing as Chrome for Android (which has its own `Chrome/` token —
 * use {@link isChrome}).
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if Android WebView, otherwise `false`.
 */
export function isAndroid(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return (
    userAgent.includes('Android') &&
    userAgent.includes('Mozilla/5.0') &&
    userAgent.includes('AppleWebKit')
  );
}
