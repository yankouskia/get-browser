import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

// Source: detectmobilebrowsers.com (public-domain) — narrowed slightly for the
// kinds of UAs that exist in 2026 (kept the head test, dropped the trailing
// 4-char chunk test which is mostly noise and creates false positives on
// modern non-mobile UAs).
// `ip(?:hone|od|ad)` covers iPhone / iPod / iPad. Note that iPadOS 13+ defaults
// to a Mac UA — we can only catch iPads that explicitly self-identify (Safari's
// "Request Mobile Website" mode, in-app webviews, etc.).
const MOBILE_PATTERN =
  /(?:android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(?:hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(?:ob|in)i|palm(?: os)?|phone|p(?:ixi|re)\/|plucker|pocket|psp|series(?:4|6)0|symbian|treo|up\.(?:browser|link)|vodafone|wap|windows ce|xda|xiino/i;

/**
 * `true` when the current environment looks like a **mobile or tablet device**.
 *
 * This is a UA-string heuristic, not a feature detection. For layout breakpoint
 * decisions in modern apps you almost always want a CSS `@media` query or
 * `matchMedia('(pointer: coarse)')` instead. This predicate is appropriate for
 * server-side use (capability hints in request handlers) and analytics tagging.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns `true` if the UA matches a known mobile/tablet, otherwise `false`.
 */
export function isMobile(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return MOBILE_PATTERN.test(userAgent);
}
