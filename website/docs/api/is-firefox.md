---
id: is-firefox
title: isFirefox()
sidebar_label: isFirefox()
---

# `isFirefox()`

> `true` when the current environment is **Mozilla Firefox** — stable, Beta, Developer Edition, Nightly — on any platform, **including Firefox for iOS** (`FxiOS/`).

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | `Firefox/`, `FxiOS/` (any platform, any edition) |

## Matches

- `Firefox/` — desktop and Android editions.
- `FxiOS/` — Firefox on iOS (which is actually WebKit under the hood, but Mozilla branded).

## Example

```ts
import { isFirefox } from 'get-browser';

if (isFirefox()) {
  applyFirefoxOnlyWorkaround();
}
```

### SSR

```ts
isFirefox({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0; rv:138.0) Gecko/20100101 Firefox/138.0',
});
// → true
```

## See also

- [`detect()`](./detect)
- [`isMobile()`](./is-mobile) — Firefox-on-mobile combined check.
