---
id: browsers
title: browsers
sidebar_label: browsers
---

# `browsers`

A frozen, lowercase enum of every value `detect()` can return. Use it instead of typing string literals.

## Shape

```ts
export const browsers: {
  readonly ANDROID: 'android';
  readonly CHROME:  'chrome';
  readonly EDGE:    'edge';
  readonly FIREFOX: 'firefox';
  readonly IE:      'ie';
  readonly OPERA:   'opera';
  readonly SAFARI:  'safari';
  readonly UNKNOWN: 'unknown';
};
```

`Object.freeze`'d at build time — attempting to mutate it is a `TypeError` in strict mode.

## Why use it

Three reasons:

1. **Refactor-safe.** Renaming `'chrome'` to `'chromium'` in a future major would be a one-line type change — every call site updates automatically.
2. **No typos.** `browsers.SAFRAI` is a compile error; `'safrai'` is silently wrong.
3. **Exhaustive switches.** `case browsers.CHROME:` is type-narrowed to the literal `'chrome'`, so the compiler enforces exhaustiveness.

## Example

```ts
import { detect, browsers } from 'get-browser';

const browser = detect();

if (browser === browsers.SAFARI) {
  patchSafariScrollBug();
}

// Or as a switch — the compiler enforces every case is handled
switch (browser) {
  case browsers.CHROME:  return 'Google';
  case browsers.ANDROID: return 'Google';
  case browsers.EDGE:    return 'Microsoft';
  case browsers.IE:      return 'Microsoft';
  case browsers.FIREFOX: return 'Mozilla';
  case browsers.SAFARI:  return 'Apple';
  case browsers.OPERA:   return 'Opera';
  case browsers.UNKNOWN: return 'Unknown';
}
```

> Mapping to the **rendering engine** instead? Don't switch on the browser — that's wrong on iOS. Use [`getEngine()`](./get-engine).

## See also

- [`Browser`](./types#browser) — the union type derived from these values.
- [`detect()`](./detect)
- [`getEngine()`](./get-engine) — the rendering engine, the honest way.
