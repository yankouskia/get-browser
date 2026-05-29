/**
 * `get-browser` — Lightweight, SSR-safe browser detection.
 *
 * Zero runtime dependencies, dual ESM + CJS, strict TypeScript types. Every
 * predicate accepts an optional `{ userAgent, vendor }` so it works equally
 * well in the browser, in Node-based SSR, and in unit tests.
 *
 * @example Quickstart
 * ```ts
 * import { detect, getOS, isMobile, browsers, oses } from 'get-browser';
 *
 * if (detect() === browsers.SAFARI && isMobile()) {
 *   applyMobileSafariFix();
 * }
 *
 * if (getOS() === oses.MACOS) showCmdKShortcut();
 * ```
 *
 * @packageDocumentation
 */

export { detect } from './detect.js';
export { getOS } from './get-os.js';
export { isAndroid } from './is-android.js';
export { isChrome } from './is-chrome.js';
export { isEdge } from './is-edge.js';
export { isFirefox } from './is-firefox.js';
export { isIE } from './is-ie.js';
export { isInAppBrowser } from './is-in-app-browser.js';
export { isMobile } from './is-mobile.js';
export { isOpera } from './is-opera.js';
export { isSafari } from './is-safari.js';
export {
  type Browser,
  browsers,
  type ClientHints,
  type DetectOptions,
  type OS,
  oses,
} from './types.js';
