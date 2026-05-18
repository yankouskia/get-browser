import { isAndroid } from './is-android.js';
import { isChrome } from './is-chrome.js';
import { isEdge } from './is-edge.js';
import { isFirefox } from './is-firefox.js';
import { isIE } from './is-ie.js';
import { isOpera } from './is-opera.js';
import { isSafari } from './is-safari.js';
import { type Browser, browsers, type DetectOptions } from './types.js';

/**
 * Detects the current browser and returns its canonical {@link Browser} name.
 *
 * Detection order is **most-specific first** to avoid Chromium-Edge / Chrome
 * collisions and similar overlaps:
 *
 * 1. Edge (including Chromium-Edge)
 * 2. Opera
 * 3. IE
 * 4. Firefox
 * 5. Chrome (and pure Chromium)
 * 6. Safari
 * 7. Android WebView
 * 8. fallback: `browsers.UNKNOWN`
 *
 * @param options - SSR-safe override; pass `{ userAgent, vendor }` to detect
 *   against an explicit UA string (e.g. from an incoming request header).
 * @returns One of the {@link browsers} values, narrowed to the {@link Browser} union.
 *
 * @example
 * ```ts
 * import { detect, browsers } from 'get-browser';
 *
 * const name = detect();
 * if (name === browsers.SAFARI) {
 *   patchSafariScrollBug();
 * }
 * ```
 *
 * @example
 * ```ts
 * // SSR — detect from a request header
 * import { detect } from 'get-browser';
 *
 * const ua = request.headers.get('user-agent') ?? '';
 * const browser = detect({ userAgent: ua });
 * ```
 */
export function detect(options?: DetectOptions): Browser {
  if (isEdge(options)) return browsers.EDGE;
  if (isOpera(options)) return browsers.OPERA;
  if (isIE(options)) return browsers.IE;
  if (isFirefox(options)) return browsers.FIREFOX;
  if (isChrome(options)) return browsers.CHROME;
  if (isSafari(options)) return browsers.SAFARI;
  if (isAndroid(options)) return browsers.ANDROID;
  return browsers.UNKNOWN;
}
