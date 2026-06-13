---
"get-browser": minor
---

Add `getEngine()` — canonical rendering-engine detection.

Returns one of `'blink' | 'gecko' | 'webkit' | 'trident' | 'presto' | 'edgehtml' | 'unknown'`, mirroring `detect()` and `getOS()`. Ships with the `engines` frozen enum and the `Engine` type.

The engine is often the axis you actually want, because rendering bugs are engine-level:

- **iOS forces WebKit on every browser.** Chrome-iOS, Firefox-iOS, and Edge-iOS all render with WebKit. `getEngine()` reads the platform from the UA and returns `'webkit'` for all of them — a `browser → engine` lookup gets this wrong.
- **The whole Chromium family is Blink.** `getEngine() === engines.WEBKIT` (or `BLINK`) is one comparison instead of five.

```ts
import { getEngine, engines } from 'get-browser';

if (getEngine() === engines.WEBKIT) applyWebkitScrollFix(); // Safari + all iOS browsers
```

SSR-safe via the standard `{ userAgent }` option. Non-breaking — every existing export is unchanged. Bundle: the full ESM bundle stays at ~1.4 kB brotli (well under the 3 kB budget); `getEngine` tree-shakes away for callers that don't import it.

The docs that previously hand-rolled an `engineOf(detect())` mapping (analytics guide, recipes, quickstart, README) now use `getEngine()` — which also fixes the iOS mis-classification those examples shipped.
