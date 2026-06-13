import { resolveEnvironment } from './env.js';
import { type DetectOptions, type Engine, engines } from './types.js';

/**
 * Detects the **rendering engine** and returns its canonical {@link Engine} name.
 *
 * The engine is frequently the answer you actually want: rendering quirks live
 * in the engine, not the brand. The headline case is iOS — Apple requires every
 * browser to use WKWebView, so Chrome-iOS, Firefox-iOS, and Edge-iOS all render
 * with **WebKit** despite reporting as Chrome / Firefox / Edge via {@link detect}.
 * `getEngine()` reads the UA directly and gets this right, where a naive
 * `browser → engine` lookup would not.
 *
 * **Detection order — most-specific first:**
 *
 * 1. **Trident** — `Trident/` or `MSIE` (Internet Explorer).
 * 2. **EdgeHTML** — the legacy `Edge/` token (Edge 12–18). Checked before Blink
 *    because those UAs also carry a `Chrome/` token.
 * 3. **Presto** — `Presto/` or `Opera Mini` (Opera 12 and earlier).
 * 4. **WebKit (iOS)** — any `iPhone` / `iPad` / `iPod` UA, or an explicit
 *    `CriOS` / `FxiOS` / `EdgiOS` / `OPiOS` token. Every browser on iOS is WebKit.
 * 5. **Gecko** — a real `Gecko/<digits>` build token or `Firefox/` (note that
 *    Chromium UAs say "like Gecko", which is deliberately *not* matched).
 * 6. **Blink** — `Chrome/`, `Chromium/`, `Edg/`, or `OPR/` (the whole modern
 *    Chromium family, including current Android WebView).
 * 7. **WebKit (Safari / legacy)** — a remaining `Safari/` or `AppleWebKit` token,
 *    which by this point means desktop Safari or the pre-2014 Android Browser.
 * 8. Fallback: `engines.UNKNOWN`.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string explicitly.
 * @returns One of the {@link engines} values, narrowed to the {@link Engine} union.
 *
 * @example
 * ```ts
 * import { getEngine, engines } from 'get-browser';
 *
 * // Catches Safari AND every browser on iOS in one check.
 * if (getEngine() === engines.WEBKIT) {
 *   applyWebkitScrollFix();
 * }
 * ```
 *
 * @example
 * ```ts
 * // Honest analytics — segment by what actually renders the page.
 * import { getEngine } from 'get-browser';
 *
 * analytics.track('page_view', { engine: getEngine() });
 * ```
 */
export function getEngine(options?: DetectOptions): Engine {
  const { userAgent } = resolveEnvironment(options);

  if (/Trident\/|\bMSIE\b/.test(userAgent)) return engines.TRIDENT;
  if (/\bEdge\/\d/.test(userAgent)) return engines.EDGEHTML;
  if (/\bPresto\/|Opera Mini/.test(userAgent)) return engines.PRESTO;

  // Apple forces WKWebView for every iOS browser — classify by platform before
  // any Chrome/Gecko token can mislead us.
  if (/iPhone|iPad|iPod|CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent)) return engines.WEBKIT;

  // A genuine Gecko build token is `Gecko/<digits>`; Chromium says "like Gecko".
  if (/\bGecko\/\d/.test(userAgent) || /\bFirefox\//.test(userAgent)) return engines.GECKO;

  if (/\bChrome\/|\bChromium\/|\bEdg\/|\bOPR\//.test(userAgent)) return engines.BLINK;

  // Whatever WebKit-flavoured UA is left is desktop Safari or the legacy
  // Android Browser — Chromium-family browsers were already claimed above.
  if (/\bSafari\/|AppleWebKit/.test(userAgent)) return engines.WEBKIT;

  return engines.UNKNOWN;
}
