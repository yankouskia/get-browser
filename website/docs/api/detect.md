---
id: detect
title: detect()
description: The single canonical answer — returns the Browser union for the current user-agent.
sidebar_label: detect()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `detect()`

> The headline export. Returns one of the [`browsers`](./browsers) values, narrowed to the [`Browser`](./types#browser) union.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => Browser` |
| **Returns** | `'android' \| 'chrome' \| 'edge' \| 'firefox' \| 'ie' \| 'opera' \| 'safari' \| 'unknown'` |
| **Bundle cost** | ~1.3 kB (full library, min+gz) |
| **SSR safe** | ✅ Pass `{ userAgent }` to pin |

## Signature

```ts
function detect(options?: DetectOptions): Browser;
```

```ts
interface DetectOptions {
  readonly userAgent?: string;
  readonly vendor?: string;
}

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

## Behaviour

Detection runs **most-specific first** to avoid Chromium-family collisions. Order:

1. **Edge** (legacy `Edge/`, Chromium `Edg/`, mobile `EdgA/`/`EdgiOS/`)
2. **Opera** (Presto `Opera/`, Chromium `OPR/`, or `window.opera`/`window.opr`)
3. **IE** (`MSIE` 6–10 or `Trident/` 11)
4. **Firefox** (any platform, including `FxiOS/`)
5. **Chrome** (desktop `Chrome/`, iOS `CriOS/`, pure `Chromium/`)
6. **Safari** (Apple vendor + Safari UA, minus other-browser-on-iOS tokens)
7. **Android WebView** (last-resort match on `Mozilla/5.0 + Android + AppleWebKit` minus the above)
8. **`'unknown'`** — bots, new browsers, empty UA

## Examples

<Tabs groupId="example" queryString>
  <TabItem value="default" label="Default" default>

```ts
import { detect } from 'get-browser';

const browser = detect();
// In Chrome 140 on macOS  → 'chrome'
// In Safari 18 on iPhone  → 'safari'
// In Node (no navigator)  → 'unknown'
```

  </TabItem>
  <TabItem value="switch" label="Exhaustive switch">

```ts
import { type Browser, detect, browsers } from 'get-browser';

const message = (b: Browser): string => {
  switch (b) {
    case browsers.CHROME:  return 'Chromium-flavored.';
    case browsers.EDGE:    return 'Microsoft Edge.';
    case browsers.FIREFOX: return 'Mozilla Firefox.';
    case browsers.SAFARI:  return 'Apple Safari.';
    case browsers.OPERA:   return 'Opera.';
    case browsers.IE:      return 'Internet Explorer (please upgrade).';
    case browsers.ANDROID: return 'Android WebView.';
    case browsers.UNKNOWN: return 'A bot, perhaps.';
  }
};

message(detect());
```

The compiler refuses to build if you forget a case.

  </TabItem>
  <TabItem value="ssr" label="SSR / explicit UA">

```ts
import { detect } from 'get-browser';

const edgeChromiumUA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0';

detect({ userAgent: edgeChromiumUA });
// → 'edge'  (Edge wins over Chrome because Edg/ is more specific)
```

  </TabItem>
  <TabItem value="testing" label="Testing">

```ts
import { describe, expect, it } from 'vitest';
import { detect } from 'get-browser';

const SAMPLES = [
  ['Mozilla/5.0 ... Chrome/140.0.0.0 ...',  'chrome'],
  ['Mozilla/5.0 ... Firefox/138.0',          'firefox'],
  ['Mozilla/5.0 (iPhone; ...) Safari/604.1', 'safari'],
] as const;

describe('detect', () => {
  it.each(SAMPLES)('reports %s as %s', (ua, expected) => {
    expect(detect({ userAgent: ua, vendor: '' })).toBe(expected);
  });
});
```

Pure function when given an explicit UA — no DOM mocking required.

  </TabItem>
  <TabItem value="server" label="Server route">

```ts
// Next.js Route Handler — Node runtime
import { detect } from 'get-browser';

export async function GET(req: Request) {
  return Response.json({
    browser: detect({ userAgent: req.headers.get('user-agent') ?? '' }),
  });
}
```

  </TabItem>
</Tabs>

## Notes

:::info Treats explicit input as authoritative
When you pass `{ userAgent }`, the library does **not** read `globalThis.navigator` — this keeps the function pure with respect to its inputs (no surprise contamination from jsdom or Playwright globals).
:::

:::caution No version numbers
This library returns the family name only. Use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js) if you need versions.
:::

:::tip `'unknown'` is not a bug
Bot UAs, brand-new browsers, and empty strings all resolve to `'unknown'` — handle it as a safe fallback rather than an error.
:::

## See also

- [`isChrome()`](./is-chrome), [`isSafari()`](./is-safari), and friends — boolean variants.
- [`browsers`](./browsers) — the frozen enum of valid return values.
- [`DetectOptions`](./types#detectoptions) — the options shape.
- **[Playground](/playground)** — try `detect()` against any UA string.
