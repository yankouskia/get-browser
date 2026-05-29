# get-browser

## 2.2.0

### Minor Changes

- [`74aa21b`](https://github.com/yankouskia/get-browser/commit/74aa21b1bb79b189a3bd78ef0ac29ff700f3b618) Thanks [@yankouskia](https://github.com/yankouskia)! - Add `isInAppBrowser()` — detect when the page is loaded inside a mobile in-app browser.

  Returns `true` inside Instagram, Facebook (`FBAN`/`FBAV`/`FB_IAB`), X / Twitter, LinkedIn, TikTok (`TikTok`/`musical_ly`/`Trill`), Snapchat, WeChat (`MicroMessenger`), Line, Telegram, and Pinterest. Returns `false` for standalone browsers and for desktop Electron apps (Slack/Discord/Teams).

  This is the most impactful signal you can add to a consumer app:

  - **OAuth flows** — Google/Apple/Microsoft block sign-in inside third-party WebViews.
  - **Deep links** and **payment SDKs** — both expect a top-level browsing context.
  - **Analytics** — without it, Instagram-traffic and Safari-traffic are indistinguishable.

  ```ts
  import { isInAppBrowser } from "get-browser";

  if (isInAppBrowser()) showOpenInBrowserBanner();
  ```

  SSR-safe via the standard `{ userAgent }` option. Bundle delta: **+120 B** for the full ESM bundle, and **0 bytes** for callers that don't import `isInAppBrowser` — `dist/index.mjs` tree-shakes cleanly thanks to a regex literal (not `new RegExp`). The library is still under 1.5 kB min+gzip.

## 2.1.0

### Minor Changes

- [`d9e5347`](https://github.com/yankouskia/get-browser/commit/d9e53474358023243360bc8f9f574297d0241287) Thanks [@yankouskia](https://github.com/yankouskia)! - Add `getOS()` — canonical operating-system detection.

  `getOS()` returns one of `'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'chromeos' | 'unknown'`, mirroring `detect()`'s shape. Three new exports ship alongside it:

  - `oses` — the frozen enum, parallel to `browsers`.
  - `OS` — the union type.
  - `ClientHints` — interface for parsed User-Agent Client Hints.

  `DetectOptions` gained an optional `clientHints?: { platform?: string }` field. When set, `getOS()` reads it in preference to the UA string — pass `Sec-CH-UA-Platform` directly for the most reliable SSR detection. This is the only signal that survives Chromium's User-Agent Reduction.

  ```ts
  import { getOS, oses } from "get-browser";

  const shortcut = getOS() === oses.MACOS ? "⌘ K" : "Ctrl K";

  // SSR — prefer the header.
  getOS({
    userAgent: req.headers.get("user-agent") ?? "",
    clientHints: {
      platform: req.headers.get("sec-ch-ua-platform") ?? undefined,
    },
  });
  ```

  Non-breaking: every existing export is unchanged; `DetectOptions` only gained an optional field. Bundle delta: ~250 B (ESM full grew from 827 B to 1.09 kB brotli; tree-shaken `detect`-only is unchanged).

## 2.0.0

### Major Changes

`get-browser` v2 — full ground-up modernization. Strict TypeScript, dual ESM + CJS, SSR-safe API, ≥98% test coverage, modern toolchain (pnpm, tsup, Biome, Vitest, Changesets).

See [`BREAKING_CHANGES.md`](./BREAKING_CHANGES.md) for the full migration guide. Highlights:

- **Dual ESM/CJS via `exports` map.** `import` and `require` both work; types ship for both conditions. UMD bundle moved to a stable subpath at `dist/umd/get-browser.global.js` (global is now `window.GetBrowser`).
- **TypeScript types.** Every export is fully typed; `detect()` returns the `Browser` union, not plain `string`.
- **SSR-safe.** Every predicate accepts an optional `{ userAgent, vendor }` so it works in Next.js/Remix/Astro, in tests, and in any non-browser environment without throwing.
- **Strict booleans.** `isOpera()` and `isSafari()` now return real `true`/`false` instead of truthy regex matches.
- **Bug fixes.** Chromium-based Edge is now correctly detected as `edge` (was `chrome`). `isChrome` no longer compares an object to the string `"undefined"`. `isMobile` now correctly matches iPad UAs.
- **Modern engines.** `engines.node >= 20`. Node 14/16/18 are EOL and no longer supported.

### Other Changes

- New documentation site built with Docusaurus and deployed to GitHub Pages, including a live playground that runs `detect()` against the visitor's actual user-agent.
- 168 tests covering Chrome 131/140, Edge 131/140, Firefox 122/138, Safari 17/18/26, Opera 117, plus iOS/Android/iPad variants.
- Bundle size: ~1.5 kB min+gzip (ESM full), ~400 bytes per single-predicate import.
