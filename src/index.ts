/**
 * `get-browser` — Lightweight, SSR-safe browser detection.
 *
 * Zero runtime dependencies, dual ESM + CJS, strict TypeScript types. Every
 * predicate accepts an optional `{ userAgent, vendor }` so it works equally
 * well in the browser, in Node-based SSR, and in unit tests.
 *
 * @example Quickstart
 * ```ts
 * import { detect, isMobile, browsers } from 'get-browser';
 *
 * if (detect() === browsers.SAFARI && isMobile()) {
 *   applyMobileSafariFix();
 * }
 * ```
 *
 * @packageDocumentation
 */

export { detect } from './detect.js';
export { isAndroid } from './is-android.js';
export { isChrome } from './is-chrome.js';
export { isEdge } from './is-edge.js';
export { isFirefox } from './is-firefox.js';
export { isIE } from './is-ie.js';
export { isMobile } from './is-mobile.js';
export { isOpera } from './is-opera.js';
export { isSafari } from './is-safari.js';
export { type Browser, browsers, type DetectOptions } from './types.js';
