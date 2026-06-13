---
id: types
title: Types
sidebar_label: Types
---

# Types

Type-only exports. Use `import type` so they're erased at runtime:

```ts
import type { Browser, OS, Engine, DetectOptions, ClientHints } from 'get-browser';
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

### Exhaustive mapping

A `Browser` value can drive an exhaustive `switch` — the compiler refuses to build if you miss a case:

```ts
import { type Browser } from 'get-browser';

type Vendor = 'Google' | 'Microsoft' | 'Mozilla' | 'Apple' | 'Other';

const vendorOf = (b: Browser): Vendor => {
  switch (b) {
    case 'chrome':
    case 'android': return 'Google';
    case 'edge':
    case 'ie':      return 'Microsoft';
    case 'firefox': return 'Mozilla';
    case 'safari':  return 'Apple';
    case 'opera':
    case 'unknown': return 'Other';
  }
};
```

If a future major adds `'samsung'` to `Browser`, the `vendorOf` switch breaks the build — exactly what you want.

> Want the **rendering engine**? Don't hand-roll a `browser → engine` map — it's wrong on iOS. Use [`getEngine()`](./get-engine), documented as [`Engine`](#engine) below.

## `OS`

```ts
type OS =
  | 'android'
  | 'chromeos'
  | 'ios'
  | 'linux'
  | 'macos'
  | 'windows'
  | 'unknown';
```

What [`getOS()`](./get-os) returns. Derived from [`oses`](./get-os#the-oses-enum) the same way `Browser` is derived from `browsers`.

`'android'` overlaps with `Browser`'s `'android'` (Android *WebView*) — but they're never produced by the same call. Use the source of the value, not its string, to know which dimension you're looking at.

## `Engine`

```ts
type Engine =
  | 'blink'
  | 'edgehtml'
  | 'gecko'
  | 'presto'
  | 'trident'
  | 'webkit'
  | 'unknown';
```

What [`getEngine()`](./get-engine) returns. Derived from [`engines`](./get-engine#the-engines-enum) the same way `Browser` is derived from `browsers`. This is the *rendering* axis — and unlike a hand-rolled `browser → engine` map, it's correct on iOS (every iOS browser is `'webkit'`).

## `DetectOptions`

```ts
interface DetectOptions {
  /** Full UA string to test against. Falls back to navigator.userAgent. */
  readonly userAgent?: string;
  /** navigator.vendor-equivalent string. Falls back to navigator.vendor. */
  readonly vendor?: string;
  /** Parsed User-Agent Client Hints. Consumed by getOS(); reserved for future use elsewhere. */
  readonly clientHints?: ClientHints;
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

## `ClientHints`

```ts
interface ClientHints {
  /**
   * Value of Sec-CH-UA-Platform. Quoted or unquoted; case-insensitive.
   * One of: "macOS", "Windows", "Linux", "iOS", "Android", "Chrome OS",
   * "Chromium OS". Anything else falls back to UA matching.
   */
  readonly platform?: string;
}
```

Parsed [User-Agent Client Hints](https://wicg.github.io/ua-client-hints/). Today only [`getOS()`](./get-os) consumes this — it reads `platform` from the `Sec-CH-UA-Platform` request header. Other detectors will grow Client-Hint support over time without breaking changes.

The headline reason to prefer hints: Chrome's [User-Agent Reduction](https://developer.chrome.com/docs/privacy-security/user-agent-reduction) is *removing* signal from the UA string. Hints are the long-term answer.

## See also

- [`detect()`](./detect)
- [`getOS()`](./get-os)
- [`browsers`](./browsers)
