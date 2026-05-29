import { resolveEnvironment } from './env.js';
import type { DetectOptions } from './types.js';

// Tokens we match — each branch detects one app's distinctive UA fragment:
//   FBAN/, FBAV/, FB_IAB/         Facebook (iOS uses FBAN/FBAV; Android uses FB_IAB)
//   Instagram                     Instagram
//   Twitter for iPhone / iPad     X / Twitter iOS
//   TwitterAndroid                X / Twitter Android
//   LinkedInApp                   LinkedIn (iOS and Android)
//   TikTok                        TikTok current
//   musical_ly_<v>                TikTok legacy / China builds (anchored on `_`)
//   Trill_<v>                     TikTok in some markets (anchored on `_` — avoids
//                                 colliding with Triller, the competing TikTok-alike)
//   Snapchat                      Snapchat
//   WeChat / MicroMessenger       WeChat (MicroMessenger is the original name)
//   Line/<v>                      Line — anchored on the slash; "Line" alone is too generic
//   Telegram                      Telegram mobile
//   Pinterest                     Pinterest
//
// A regex literal (rather than `new RegExp(...)`) lets esbuild prove the
// declaration is side-effect-free and tree-shake the whole module away when
// `isInAppBrowser` isn't imported.
const IN_APP_BROWSER_PATTERN =
  /\bFB(?:AN|AV|_IAB)\b|\bInstagram\b|\bTwitter for (?:iPhone|iPad)\b|\bTwitterAndroid\b|\bLinkedInApp\b|\bTikTok\b|\bmusical_ly_|\bTrill_|\bSnapchat\b|\b(?:WeChat|MicroMessenger)\b|\bLine\/|\bTelegram\b|\bPinterest\b/i;

/**
 * `true` when the current environment is an **in-app browser** — the embedded
 * WebView used by a social or messaging app, not a standalone browser.
 *
 * Why you'd want to know:
 *
 * - **OAuth flows** — Google and other identity providers block sign-in inside
 *   most third-party WebViews.
 * - **Deep links** — `target="_blank"`, custom protocols, and app-store
 *   redirects often fail or open the wrong app.
 * - **Payment SDKs** — Apple Pay, Google Pay, Stripe's `redirect`-based flows
 *   misbehave inside in-app browsers.
 * - **Analytics** — segmenting by traffic source matters a lot more when half
 *   your visitors arrived from an Instagram or TikTok link.
 *
 * Currently catches:
 *
 * - Facebook (`FBAN/`, `FBAV/`, `FB_IAB/`)
 * - Instagram (`Instagram`)
 * - X / Twitter (`Twitter for iPhone/iPad`, `TwitterAndroid`)
 * - LinkedIn (`LinkedInApp`)
 * - TikTok (`TikTok`, `musical_ly_<v>`, `Trill_<v>`)
 * - Snapchat (`Snapchat`)
 * - WeChat (`WeChat`, `MicroMessenger`)
 * - Line (`Line/`)
 * - Telegram (`Telegram`)
 * - Pinterest (`Pinterest`)
 *
 * **Not** caught: standalone browsers, desktop Electron apps (Slack, Discord,
 * Teams desktop are full Chromium environments and don't have the WebView
 * pitfalls). The Android system WebView (`isAndroid`) is a separate, lower-
 * level concept — Facebook on Android is *both* an Android WebView *and* an
 * in-app browser; the predicates compose.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string
 *   explicitly. Commonly used with a request-header UA on the server.
 * @returns `true` if the UA looks like an in-app browser, otherwise `false`.
 *
 * @example
 * ```ts
 * import { isInAppBrowser } from 'get-browser';
 *
 * if (isInAppBrowser()) {
 *   // OAuth providers block this — bounce to a real browser first.
 *   showOpenInBrowserBanner();
 * }
 * ```
 *
 * @example
 * ```ts
 * // SSR — annotate analytics events with the WebView flag for source attribution.
 * import { isInAppBrowser } from 'get-browser';
 *
 * const inApp = isInAppBrowser({
 *   userAgent: request.headers.get('user-agent') ?? '',
 * });
 * analytics.track('page_view', { in_app_browser: inApp });
 * ```
 */
export function isInAppBrowser(options?: DetectOptions): boolean {
  const { userAgent } = resolveEnvironment(options);
  return IN_APP_BROWSER_PATTERN.test(userAgent);
}
