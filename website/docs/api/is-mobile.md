---
id: is-mobile
title: isMobile()
sidebar_label: isMobile()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `isMobile()`

> `true` when the current environment **looks like a mobile or tablet device**, based on a UA regex.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | iPhone, iPod, iPad, Android+Mobile, BlackBerry, webOS, Opera Mini, etc. |
| **Tree-shakes to** | ~600 bytes (regex weight) |

## What it matches

A compiled regex of common mobile / tablet tokens — derived from [detectmobilebrowsers.com](http://detectmobilebrowsers.com) and lightly modernized:

- `iPhone`, `iPod`, `iPad`
- `Android` + `Mobile`
- `BlackBerry`, `webOS`, `Symbian`, `Maemo`, `Windows CE`
- Mobile-specific Firefox builds (`Mobile.+Firefox`)
- `Opera Mobi`, `Opera Mini`
- Many others — see [`src/is-mobile.ts`](https://github.com/yankouskia/get-browser/blob/master/src/is-mobile.ts).

:::caution This is a heuristic, not a feature check
For breakpoint decisions, prefer:

```ts
window.matchMedia('(pointer: coarse)').matches; // touch-first device
window.matchMedia('(max-width: 768px)').matches; // narrow viewport
```

```css
@media (max-width: 768px) { /* … */ }
@media (pointer: coarse) { /* … */ }
```

`isMobile()` is appropriate for analytics, server hints, and download-badge logic.
:::

## Examples

<Tabs groupId="example" queryString>
  <TabItem value="default" label="Default" default>

```ts
import { isMobile } from 'get-browser';

if (isMobile()) {
  document.body.classList.add('is-mobile');
}
```

  </TabItem>
  <TabItem value="ssr" label="SSR">

```ts title="Express middleware"
import { isMobile } from 'get-browser';

app.use((req, res, next) => {
  res.locals.bodyClass = isMobile({ userAgent: req.get('user-agent') ?? '' })
    ? 'is-mobile'
    : 'is-desktop';
  next();
});
```

  </TabItem>
  <TabItem value="combo" label="With browser family">

```ts
import { isMobile, isSafari, isChrome } from 'get-browser';

// Distinguish Safari iOS from desktop Safari — they're both 'safari' to
// detect(), but their layout / capability quirks differ.
const isMobileSafari  = isSafari() && isMobile();
const isMobileChrome  = isChrome() && isMobile();
```

  </TabItem>
  <TabItem value="conditional" label="Conditional load">

```ts
import { isMobile } from 'get-browser';

if (isMobile()) {
  // Defer the desktop-only chart library
  const { default: HeavyChart } = await import('./heavy-chart');
  // …
}
```

  </TabItem>
</Tabs>

## iPadOS limitation

iPadOS 13+ defaults to a Mac UA — we can only identify iPads that **explicitly self-identify** (Safari's **Request Mobile Website** mode, embedded WebViews, etc.). See the [`isSafari()` notes](./is-safari#ipados-gotcha) for the full story.

## See also

- [`isAndroid()`](./is-android)
- [`isSafari()`](./is-safari)
- [`detect()`](./detect)
