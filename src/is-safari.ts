import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Safari** (macOS or iOS).
 *
 * Heuristic:
 * 1. `navigator.vendor` must start with "Apple".
 * 2. The UA must not advertise itself as Chrome-iOS (`CriOS/`),
 *    Firefox-iOS (`FxiOS/`), Edge-iOS (`EdgiOS/`), or Opera-iOS (`OPiOS/`) —
 *    those are third-party browsers wrapping iOS WebKit, not Safari itself.
 *
 * When called with an explicit `userAgent` but no `vendor`, the function treats
 * any UA containing "Safari" (without the disqualifying tokens above) as Safari.
 *
 * @param options - SSR-safe override; pass `{ userAgent, vendor }` to test explicitly.
 * @returns `true` if Safari, otherwise `false`.
 */
export function isSafari(options?: DetectOptions): boolean {
  const { userAgent, vendor } = resolveEnvironment(options);

  const looksLikeSafariUA =
    userAgent.includes('Safari') &&
    !/\b(?:CriOS|FxiOS|EdgiOS|OPiOS|Chrome|Chromium|OPR)\//.test(userAgent);

  if (vendor) {
    return vendor.includes('Apple') && looksLikeSafariUA;
  }

  // No vendor available (Node, server-injected UA only) → trust the UA alone.
  return looksLikeSafariUA;
}
