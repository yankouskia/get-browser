---
id: is-chrome
title: isChrome()
sidebar_label: isChrome()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `isChrome()`

> `true` when the current environment is **Google Chrome** — or any browser built directly on Chromium (Chrome Beta, Canary, Brave, Vivaldi, …) — but **not** Chromium-Edge or Opera.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Tree-shakes to** | ~400 bytes if imported alone |
| **Excludes** | Edge, Opera, Firefox-on-iOS, Safari, IE |

## Matches

- Desktop Chrome — `Chrome/` token with `navigator.vendor === 'Google Inc.'` (or `window.chrome` global as a UA-spoof backstop).
- Chrome iOS — `CriOS/` token.
- Pure Chromium — `Chromium/` token (Brave, Vivaldi, etc.).

Excludes UAs containing `Edge/`, `Edg/`, `EdgA/`, `EdgiOS/`, `Opera`, or `OPR/`.

## Examples

<Tabs groupId="example" queryString>
  <TabItem value="default" label="Default" default>

```ts
import { isChrome } from 'get-browser';

if (isChrome()) {
  // safe to use Chrome-only APIs guarded by feature checks
  enableChromeFeature();
}
```

  </TabItem>
  <TabItem value="ssr" label="SSR">

```ts
import { isChrome } from 'get-browser';

isChrome({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
    + 'AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36',
  vendor: 'Google Inc.',
}); // → true
```

  </TabItem>
  <TabItem value="combo" label="Combined with isMobile">

```ts
import { isChrome, isMobile } from 'get-browser';

// Chrome Android — common quirks live here
if (isChrome() && isMobile()) {
  document.body.classList.add('chrome-android');
}
```

  </TabItem>
  <TabItem value="brave" label="Brave / Chromium siblings">

```ts
import { detect } from 'get-browser';

// Brave & Vivaldi both report as 'chrome' — they're pure Chromium underneath.
// The library does NOT distinguish them. Use the Brave-specific
// navigator.brave API for that.
const isBrave = await navigator.brave?.isBrave?.() ?? false;
const family  = detect();   // 'chrome'
```

  </TabItem>
</Tabs>

:::tip Pure-Chromium fingerprint
`Chrome/`-with-Apple-vendor on iOS is *not* desktop Chrome — it's Chrome iOS, which uses WebKit under the hood. `isChrome()` returns `true` for both, but they have very different capabilities.
:::

## See also

- [`isEdge()`](./is-edge) — Chromium-Edge is **not** Chrome.
- [`isOpera()`](./is-opera) — Chromium-Opera is **not** Chrome.
- [`detect()`](./detect) — single canonical answer instead of N booleans.
