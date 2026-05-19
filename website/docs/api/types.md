---
id: types
title: Types
sidebar_label: Types
---

# Types

Type-only exports. Import with `import type` to make sure they're erased at runtime:

```ts
import { type Browser, type DetectOptions } from 'get-browser';
```

## `Browser`

```ts
type Browser =
  | 'android'
  | 'chrome'
  | 'edge'
  | 'firefox'
  | 'ie'
  | 'opera'
  | 'safari'
  | 'unknown';
```

The full set of values [`detect()`](./detect) can return — and the canonical type for storing a detection result. Derived as:

```ts
type Browser = (typeof browsers)[keyof typeof browsers];
```

Using `Browser` instead of plain `string` gives you:

- **Refactor safety.** Renaming any value updates every type-checked use site.
- **Exhaustiveness.** `switch` statements without a `default` flag missing cases.
- **Autocomplete.** Editors offer the eight literal options.

### Tagging analytics

A classic use:

```ts
import { type Browser } from 'get-browser';

type Engine = 'chromium' | 'gecko' | 'webkit' | 'trident' | 'legacy-webkit' | 'unknown';

const engineOf = (b: Browser): Engine => {
  switch (b) {
    case 'chrome':
    case 'edge':
    case 'opera':  return 'chromium';
    case 'firefox': return 'gecko';
    case 'safari':  return 'webkit';
    case 'ie':      return 'trident';
    case 'android': return 'legacy-webkit';
    case 'unknown': return 'unknown';
  }
};
```

If a future major adds `'samsung'` to `Browser`, the `engineOf` switch breaks the build — exactly what you want.

## `DetectOptions`

```ts
interface DetectOptions {
  /** Full UA string to test against. Falls back to navigator.userAgent. */
  readonly userAgent?: string;
  /** navigator.vendor-equivalent string. Falls back to navigator.vendor. */
  readonly vendor?: string;
}
```

The optional shape every detector accepts. Pass it to make a detection deterministic — useful for:

- **SSR** — populate from request headers.
- **Tests** — pin a UA so the suite doesn't depend on the runner's identity.
- **Multi-tenant SaaS** — different policies based on the actual visitor, not the worker process.

When `options.userAgent` is provided, the detectors **ignore `globalThis.navigator` entirely** — even if it exists. That keeps the function pure with respect to its input.

```ts
import { isChrome } from 'get-browser';

// Forces a chrome UA regardless of where this runs.
isChrome({
  userAgent: 'Mozilla/5.0 ... Chrome/140.0.0.0 ...',
  vendor: 'Google Inc.',
});
```

## See also

- [`detect()`](./detect)
- [`browsers`](./browsers)
