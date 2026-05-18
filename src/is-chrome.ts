import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

/**
 * `true` when the current environment is **Google Chrome** (or any browser
 * built directly on Chromium — Chrome Beta, Canary, Brave, Vivaldi, etc.) but
 * **not** Chromium-Edge or Opera, which are detected separately by
 * {@link isEdge} and {@link isOpera}.
 *
 * Matches the desktop UA pattern, Chrome-iOS (`CriOS/`), and the generic
 * `Chromium/` token.
 *
 * @param options - SSR-safe override; pass `{ userAgent, vendor }` to test explicitly.
 * @returns `true` if Chrome (or pure Chromium), otherwise `false`.
 */
export function isChrome(options?: DetectOptions): boolean {
  const { userAgent, vendor, hasChromeGlobal } = resolveEnvironment(options);

  // Exclude Chromium-based competitors that piggy-back on the Chrome UA.
  const isChromiumEdge = /\b(?:Edge|Edg|EdgA|EdgiOS)\//.test(userAgent);
  const isOperaUA = /\bOpera\b|\bOPR\//.test(userAgent);
  if (isChromiumEdge || isOperaUA) return false;

  const isIOSChrome = userAgent.includes('CriOS/');
  const isPureChromium = userAgent.includes('Chromium/');

  const looksLikeDesktopChrome =
    userAgent.includes('Chrome/') &&
    // When called with a UA-only override (no globals), the vendor check is the
    // strongest filter. When called in a real browser, hasChromeGlobal acts as
    // a backstop for UA spoofing.
    (vendor === '' || vendor === 'Google Inc.' || hasChromeGlobal);

  return isIOSChrome || isPureChromium || looksLikeDesktopChrome;
}
