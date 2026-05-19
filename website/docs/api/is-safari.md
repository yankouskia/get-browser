---
id: is-safari
title: isSafari()
sidebar_label: isSafari()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `isSafari()`

> `true` when the current environment is **Apple Safari** on macOS or iOS — but **not** other browsers using iOS WebKit (Chrome iOS, Firefox iOS, Edge iOS, Opera iOS).

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Tree-shakes to** | ~400 bytes |
| **Excludes** | Chrome iOS, Firefox iOS, Edge iOS, Opera iOS |

## Heuristic

1. `navigator.vendor` must start with `"Apple"`.
2. The UA must contain `Safari` but **not** any of `CriOS`, `FxiOS`, `EdgiOS`, `OPiOS`, `Chrome`, `Chromium`, or `OPR`.

When you pass `{ userAgent }` without `vendor` (e.g. SSR with just the request header), the function falls back to UA-only matching — same rules, no vendor check.

## Examples

<Tabs groupId="example" queryString>
  <TabItem value="default" label="Default" default>

```ts
import { isSafari, isMobile } from 'get-browser';

if (isSafari() && isMobile()) {
  applyMobileSafariFix();
}
```

  </TabItem>
  <TabItem value="scroll" label="Scroll fix">

```ts
// iOS Safari calculates 100vh including the address bar — paint a custom var.
import { isSafari, isMobile } from 'get-browser';

if (isSafari() && isMobile()) {
  const setVh = () => {
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`,
    );
  };
  setVh();
  window.addEventListener('resize', setVh, { passive: true });
}
```

```css title="Then in your CSS"
.full-height { height: calc(var(--vh, 1vh) * 100); }
```

  </TabItem>
  <TabItem value="ssr" label="SSR">

```ts
import { isSafari } from 'get-browser';

// iPhone request header — vendor isn't available server-side, so the UA check
// is authoritative.
isSafari({
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) '
    + 'AppleWebKit/605.1.15 Version/18.4 Mobile/15E148 Safari/604.1',
}); // → true
```

  </TabItem>
  <TabItem value="reject" label="Reject Chrome iOS">

```ts
import { isSafari, detect } from 'get-browser';

// On a CriOS UA — even though it's WebKit underneath — these correctly differ:
const ua = 'Mozilla/5.0 (iPhone; ...) AppleWebKit/605.1.15 CriOS/140.0.6778.135 ...';
detect({ userAgent: ua });    // → 'chrome'
isSafari({ userAgent: ua });  // → false
```

  </TabItem>
</Tabs>

## iPadOS gotcha

:::warning iPad ≡ Mac (sometimes)
Since iPadOS 13 (2019), iPad's default Safari UA looks **exactly like macOS Safari** — Apple ships a Mac UA so iPads request desktop sites. There is no reliable way to distinguish them from a Mac. `isSafari()` returns `true` in both cases, and [`isMobile()`](./is-mobile) cannot identify the iPad.

When the user toggles **Request Mobile Website**, the UA reverts to including `iPad` — in that case `isMobile()` also returns `true`.
:::

```ts
const desktopMacOrIpad =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.4 Safari/605.1.15';
const requestMobileIpad =
  'Mozilla/5.0 (iPad; CPU OS 18_4 like Mac OS X) AppleWebKit/605.1.15 Version/18.4 Mobile/15E148 Safari/604.1';

isSafari({ userAgent: desktopMacOrIpad, vendor: 'Apple Computer, Inc.' }); // true
isSafari({ userAgent: requestMobileIpad, vendor: 'Apple Computer, Inc.' }); // true
```

## See also

- [`detect()`](./detect)
- [`isMobile()`](./is-mobile)
- [Playground](/playground) — paste an iPad UA and watch the predicates.
