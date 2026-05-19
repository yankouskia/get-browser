---
"get-browser": major
---

`get-browser` v2 — full ground-up modernization. Strict TypeScript, dual ESM
+ CJS, SSR-safe API, ≥98% test coverage, modern toolchain (pnpm, tsup, Biome,
Vitest, Changesets, TypeDoc).

See [`BREAKING_CHANGES.md`](./BREAKING_CHANGES.md) for the full migration
guide. Highlights:

- **Dual ESM/CJS via `exports` map.** `import` and `require` both work; types
  ship for both conditions. UMD bundle moved to a stable subpath at
  `dist/umd/get-browser.global.js` (global is now `window.GetBrowser`).
- **TypeScript types.** Every export is fully typed; `detect()` returns the
  `Browser` union, not plain `string`.
- **SSR-safe.** Every predicate accepts an optional `{ userAgent, vendor }`
  so it works in Next.js/Remix/Astro, in tests, and in any non-browser
  environment without throwing.
- **Strict booleans.** `isOpera()` and `isSafari()` now return real `true`/
  `false` instead of truthy regex matches.
- **Bug fixes.** Chromium-based Edge is now correctly detected as `edge`
  (was `chrome`). `is-chrome` no longer compares an object to the string
  `"undefined"`.
- **Modern engines.** `engines.node >= 20`. Node 14/16/18 are EOL and no
  longer supported.
