# Breaking Changes — v1.x → v2.0.0

`get-browser` v2 is a ground-up modernization. The **named exports and their
semantics are preserved**; the changes below mostly affect packaging, return
shapes, and a couple of long-standing detection bugs.

> Migration TL;DR: if you `import` from `get-browser` with a bundler, you
> almost certainly don't need to change anything. If you load the library
> via a `<script>` tag, the file path moved.

---

## 1. UMD bundle is no longer the package main entry

**Before (v1):** `main` pointed at `dist/index.js`, a UMD bundle that
exposed a browser global named `browser`.

```html
<!-- v1 -->
<script src="node_modules/get-browser/dist/index.js"></script>
<script>
  browser.detect();
</script>
```

**After (v2):** The package is **dual ESM + CJS** via an `exports` map. A
UMD/IIFE bundle is still shipped, but at a stable subpath.

```html
<!-- v2 -->
<script src="node_modules/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  GetBrowser.detect();
</script>
```

Pick one of:

- **ESM / bundler users** (Vite, webpack, Rollup, Next.js, etc.): no change.
  ```js
  import { detect, isMobile } from 'get-browser';
  ```
- **CJS users**: no change.
  ```js
  const { detect, isMobile } = require('get-browser');
  ```
- **`<script>` users**: update the path and the global name from
  `window.browser` to `window.GetBrowser`.

---

## 2. `isX()` predicates now return strict `boolean`

**Before (v1):** `isOpera()` and `isSafari()` returned the truthy expression,
not `true`/`false`. For example, `isOpera()` could return the regex match
array.

**After (v2):** Every predicate returns exactly `true` or `false`. Type
signature is `(options?: DetectOptions) => boolean`.

```js
// v1
typeof isOpera() // 'object' (RegExpMatchArray) or 'boolean'

// v2
typeof isOpera() // always 'boolean'
```

If you used these in a strict-equality check (`isOpera() === true`), you
were silently broken on v1 and are now correct on v2. If you used them in a
`if (isOpera())` context, behavior is unchanged.

---

## 3. Chromium-based Edge is now detected as `edge`

**Before (v1):** Edge detection only matched the legacy EdgeHTML `Edge/` UA
token. Modern Chromium-Edge (`Edg/`, shipped January 2020) was reported as
Chrome.

**After (v2):** Both `Edge/` (legacy) and `Edg/` (Chromium) are matched. The
chrome detector explicitly excludes Chromium-Edge.

If you were relying on Chromium-Edge being indistinguishable from Chrome,
you will need to handle the `edge` case.

---

## 4. `chrome` detection fix

**Before (v1):** `is-chrome.js` contained `chrome !== 'undefined'`, comparing
an object to the string `'undefined'` — always truthy. The check was a no-op.

**After (v2):** Replaced with the intended `typeof window.chrome !== 'undefined'`.
In practice this rarely changed real-world outputs because the other heuristics
in the same predicate dominated, but the predicate is now correct.

---

## 5. Detectors are SSR-safe and accept an injected user agent

**New in v2.** Each detector accepts an optional `DetectOptions` parameter
so it can run on the server, in tests, or in any non-browser environment
without a `ReferenceError`.

```ts
import { detect, isChrome } from 'get-browser';

// Browser — unchanged
detect();

// Node.js / SSR — pass the UA explicitly
detect({ userAgent: request.headers['user-agent'] ?? '' });
isChrome({ userAgent: 'Mozilla/5.0 (...) Chrome/120 ...' });
```

When called in a non-browser context with no options, predicates return
`false` cleanly instead of throwing.

---

## 6. Dropped Node EOL targets

`engines.node` is now `>= 20.0.0`. Node 14, 16, and 18 are end-of-life as of
2026 and are no longer tested. The library still runs on older Node if you
ignore the warning, but it is unsupported.

---

## 7. Removed: per-detector standalone bundle entries

**Before (v1):** Webpack emitted `dist/is-chrome.js`, `dist/is-safari.js`, etc.,
each as its own UMD bundle.

**After (v2):** Removed. The bundlers downstream consumers use (esbuild,
Rollup, Vite, Webpack 5, Turbopack) tree-shake the single ESM entry, which
makes per-detector files redundant and adds maintenance cost. If you imported
from a subpath like `get-browser/dist/is-chrome`, switch to the named import:

```js
// v1
const isChrome = require('get-browser/dist/is-chrome');

// v2
const { isChrome } = require('get-browser');
```

---

## Nothing else changed

- All named exports (`browsers`, `detect`, `isMobile`, `isAndroid`, `isChrome`,
  `isEdge`, `isFirefox`, `isIE`, `isOpera`, `isSafari`) are still present and
  importable from the package root.
- `browsers` is still a frozen object with the same string keys/values.
- `detect()` returns the same set of strings.
