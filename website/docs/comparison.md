---
id: comparison
title: Comparison with alternatives
description: How get-browser stacks up against ua-parser-js, bowser, and detect-browser — bundle size, feature set, and when to pick each.
---

import SizeChart from '@site/src/components/SizeChart';

# Comparison with alternatives

`get-browser` is intentionally the smallest and most narrowly-scoped library in this space. The pitch in one image:

<SizeChart />

## Feature matrix

| | `get-browser` | [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js) | [`bowser`](https://www.npmjs.com/package/bowser) | [`detect-browser`](https://www.npmjs.com/package/detect-browser) |
| --- | :-: | :-: | :-: | :-: |
| Bundle (min+gz) | 🏆 **~1 kB** | ~10 kB | ~7 kB | ~2 kB |
| Tree-shakes to single predicate | ✅ ~400 B | ❌ | ❌ | ❌ |
| Dual ESM + CJS | ✅ | ✅ | ✅ | ⚠️ |
| Strict union return type | ✅ | ❌ | ⚠️ | ⚠️ |
| Frozen `const` for switch statements | ✅ | ❌ | ⚠️ | ✅ |
| Boolean predicates (`isChrome()`, …) | ✅ | ❌ | ⚠️ via API | ❌ |
| SSR-safe (no `window` at import) | ✅ | ✅ | ✅ | ✅ |
| Returns browser **family** | ✅ | ✅ | ✅ | ✅ |
| Returns engine **version** | ❌ | ✅ | ✅ | ✅ |
| Returns OS / device | ❌ | ✅ | ✅ | ⚠️ |
| Zero runtime dependencies | ✅ | ✅ | ✅ | ✅ |
| Last published | 2026 | 2026 | 2024 | 2024 |
| TypeScript-first authoring | ✅ | ⚠️ | ⚠️ | ❌ |

## When to pick what

<table>
  <tr>
    <td width="25%" valign="top">

### `get-browser`

You need to know **which browser**, not how old or what device. You care about bundle size, types, and SSR. You're fine reading versions from elsewhere (you usually don't need them).

    </td>
    <td width="25%" valign="top">

### `ua-parser-js`

You need full device info — name + version + engine + OS + device model. Most comprehensive, most popular, but ~6× the bundle.

    </td>
    <td width="25%" valign="top">

### `bowser`

You want a fluent satisfies-API: `bowser.getParser(ua).satisfies({ chrome: '>=100' })`. Nice ergonomics if version-range checks are central to your code.

    </td>
    <td width="25%" valign="top">

### `detect-browser`

You want versions but not the full parser footprint. Less recent maintenance momentum than the others.

    </td>
  </tr>
</table>

## Migration cheat-sheet

If you're coming from one of the other libraries, the mapping is straightforward:

```ts title="From ua-parser-js"
// Before
import { UAParser } from 'ua-parser-js';
const ua = new UAParser().getBrowser();
if (ua.name === 'Chrome') { /* … */ }

// After
import { isChrome } from 'get-browser';
if (isChrome()) { /* … */ }
```

```ts title="From bowser"
// Before
import Bowser from 'bowser';
const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
if (browser === 'Safari') { /* … */ }

// After
import { isSafari } from 'get-browser';
if (isSafari()) { /* … */ }
```

```ts title="From detect-browser"
// Before
import { detect } from 'detect-browser';
const { name } = detect() ?? {};
if (name === 'chrome') { /* … */ }

// After
import { detect, browsers } from 'get-browser';
if (detect() === browsers.CHROME) { /* … */ }
```

## What `get-browser` is **not**

`get-browser` deliberately ignores:

- **Versions.** Most use-cases for "version" are actually [feature-detection in disguise](./guides/feature-vs-ua).
- **OS detection.** `'Windows'` vs `'macOS'` vs `'Linux'` is rarely actionable on its own.
- **Bots and crawlers.** Crawlers identify themselves — match `Googlebot/` etc. with a regex if you need to.

The library's goal: do **one thing well**, at the smallest possible cost.

## See also

- [Browser support](./browser-support) — exactly which UAs the library recognizes
- [Introduction](./intro) — the elevator pitch
