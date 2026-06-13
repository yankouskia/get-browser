---
id: get-engine
title: getEngine()
description: Canonical rendering-engine detection — returns the Engine union. Correctly reports every iOS browser as WebKit.
sidebar_label: getEngine()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `getEngine()`

> The rendering-engine counterpart to [`detect()`](./detect). Returns one of the [`engines`](#the-engines-enum) values, narrowed to the [`Engine`](./types#engine) union.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => Engine` |
| **Returns** | `'blink' \| 'gecko' \| 'webkit' \| 'trident' \| 'presto' \| 'edgehtml' \| 'unknown'` |
| **SSR safe** | ✅ Pass `{ userAgent }` to pin |

## Why the engine, not the brand?

Rendering bugs live in the **engine**, not the badge on the icon. Two reasons this is the function you often actually want:

1. **iOS forces WebKit on everyone.** Apple requires every browser on iOS/iPadOS to use WKWebView. Chrome-iOS, Firefox-iOS, and Edge-iOS all render with **WebKit** — they just paint a different UI on top. `detect()` honestly reports them as `chrome` / `firefox` / `edge`, but for a *rendering* workaround you want `getEngine()`, which reports `webkit` for all of them in one check.

2. **The whole Chromium family shares Blink.** Chrome, Edge, Opera, Brave, Vivaldi, Arc — all Blink. If your fix is engine-level, `getEngine() === engines.BLINK` is one comparison instead of five.

```ts
import { getEngine, engines } from 'get-browser';

// One check covers Safari + Chrome-iOS + Firefox-iOS + Edge-iOS.
if (getEngine() === engines.WEBKIT) {
  applyWebkitScrollFix();
}
```

:::tip Don't hand-roll `browser → engine`
A naive `{ chrome: 'blink', safari: 'webkit', … }[detect()]` lookup is **wrong on iOS** — it maps Chrome-iOS to Blink when the page is really rendered by WebKit. `getEngine()` reads the platform from the UA and gets it right.
:::

## The `engines` enum

```ts
export const engines: {
  readonly BLINK:    'blink';
  readonly EDGEHTML: 'edgehtml';
  readonly GECKO:    'gecko';
  readonly PRESTO:   'presto';
  readonly TRIDENT:  'trident';
  readonly WEBKIT:   'webkit';
  readonly UNKNOWN:  'unknown';
};
```

| Value | Engine | Browsers |
| --- | --- | --- |
| `blink` | Blink (Chromium) | Chrome, Edge, Opera, Brave, Vivaldi, Arc, modern Android WebView |
| `gecko` | Gecko | Firefox on every platform **except** iOS |
| `webkit` | WebKit | Safari, **every** browser on iOS/iPadOS, pre-2014 Android Browser |
| `trident` | Trident | Internet Explorer 6–11 |
| `presto` | Presto | Opera 12 and earlier, Opera Mini |
| `edgehtml` | EdgeHTML | Legacy Microsoft Edge 12–18 (the `Edge/` token) |
| `unknown` | — | bots, brand-new engines, empty UA |

> **Blink vs "Chromium":** Blink is the engine; Chromium is the project it lives in. The canonical value is `'blink'` — that's the actual rendering engine, and it's what `ua-parser-js` and `bowser` report too.

## Detection order

Most-specific first:

1. **Trident** — `Trident/` or `MSIE`.
2. **EdgeHTML** — the legacy `Edge/` token (checked before Blink, since those UAs also carry `Chrome/`).
3. **Presto** — `Presto/` or `Opera Mini`.
4. **WebKit (iOS)** — any `iPhone` / `iPad` / `iPod`, or `CriOS` / `FxiOS` / `EdgiOS` / `OPiOS`. Every iOS browser is WebKit.
5. **Gecko** — a real `Gecko/<digits>` build token or `Firefox/` (Chromium's `"like Gecko"` is deliberately not matched).
6. **Blink** — `Chrome/`, `Chromium/`, `Edg/`, or `OPR/`.
7. **WebKit (Safari / legacy)** — any remaining `Safari/` / `AppleWebKit` — desktop Safari or the legacy Android Browser.
8. **`'unknown'`**.

## Examples

<Tabs groupId="example" queryString>
<TabItem value="webkit" label="WebKit workaround">

```ts
import { getEngine, engines } from 'get-browser';

// iOS Safari (and therefore every iOS browser) needs the 100vh fix.
if (getEngine() === engines.WEBKIT) {
  const setVh = () =>
    document.documentElement.style.setProperty('--vh', `${innerHeight * 0.01}px`);
  setVh();
  addEventListener('resize', setVh, { passive: true });
}
```

</TabItem>
<TabItem value="analytics" label="Honest analytics">

```ts
import { detect, getEngine } from 'get-browser';

// `browser` answers "who", `engine` answers "what renders it" — and it's
// correct on iOS, where every browser is really WebKit.
analytics.track('page_view', {
  browser: detect(),
  engine: getEngine(),
});
```

</TabItem>
<TabItem value="ssr" label="SSR">

```ts
import { getEngine } from 'get-browser';

export function GET(req: Request) {
  const engine = getEngine({ userAgent: req.headers.get('user-agent') ?? '' });
  return Response.json({ engine });
}
```

</TabItem>
<TabItem value="test" label="Unit test">

```ts
import { describe, expect, it } from 'vitest';
import { getEngine, engines } from 'get-browser';

it('treats Chrome-on-iOS as WebKit', () => {
  const ua =
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 ' +
    '(KHTML, like Gecko) CriOS/131.0.6778.135 Mobile/15E148 Safari/604.1';
  expect(getEngine({ userAgent: ua })).toBe(engines.WEBKIT);
});
```

</TabItem>
</Tabs>

## Pairs with `detect()` and `getOS()`

Three orthogonal axes — *who*, *what renders it*, *where it runs*:

```ts
import { detect, getEngine, getOS } from 'get-browser';

// Chrome on an iPhone:
detect();     // → 'chrome'   (the brand)
getEngine();  // → 'webkit'   (what actually paints — WKWebView)
getOS();      // → 'ios'      (the platform)
```

## Caveats

- **Not a feature check.** Knowing the engine is *not* the same as knowing a feature is supported. For "does this support `:has()`?" use `CSS.supports()` / `@supports`. `getEngine()` is for grouping known engine-level quirks and for analytics.
- **`edgehtml` / `presto` are effectively extinct** but reported honestly when their UAs appear. Exhaustive `switch` statements should still handle them (or use a `default`).

## See also

- [`detect()`](./detect) — the browser brand.
- [`getOS()`](./get-os) — the operating system.
- [`engines`](#the-engines-enum) — the frozen enum.
- [`types`](./types#engine) — the `Engine` union.
