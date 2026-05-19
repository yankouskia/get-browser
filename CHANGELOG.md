# get-browser

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
