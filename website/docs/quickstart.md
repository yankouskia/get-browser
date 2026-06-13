---
id: quickstart
title: Quickstart
description: A 10-line tour of detect(), predicates, and SSR usage.
sidebar_position: 3
---

# Quickstart

A 10-line tour. Each snippet stands alone — copy what you need.

:::tip Want to skip ahead?
Open the **[Playground](/playground)** in another tab. You can paste any user-agent there and watch each predicate resolve live — handy while you read.
:::

## `detect()` — one canonical answer

`detect()` returns one of the values in the [`browsers`](/docs/api/browsers) frozen enum, typed as the [`Browser`](/docs/api/types) union.

```ts
import { detect, browsers } from 'get-browser';

switch (detect()) {
  case browsers.CHROME:  loadChromeExtensionShim();  break;
  case browsers.SAFARI:  patchSafariScrollBug();     break;
  case browsers.FIREFOX: enableFirefoxOnlyFeature(); break;
  case browsers.UNKNOWN: /* bot or new browser */    break;
}
```

TypeScript will refuse to compile if you forget a case and have `noFallthroughCasesInSwitch` on.

## Predicates — yes/no questions

Each predicate is a tree-shakeable named export that returns a strict `boolean`:

```ts
import {
  isAndroid, isChrome, isEdge, isFirefox,
  isIE, isMobile, isOpera, isSafari,
} from 'get-browser';

if (isMobile() && !isChrome()) {
  showNonChromeMobileBanner();
}
```

The bundler keeps only the predicates you actually import.

## Server-side / SSR

Every function takes an optional `{ userAgent, vendor }`. Pass the request UA on the server — the library never touches `window`:

```ts title="Next.js Route Handler — Node runtime"
import { detect, isMobile } from 'get-browser';

export async function GET(req: Request) {
  const userAgent = req.headers.get('user-agent') ?? '';
  return Response.json({
    browser: detect({ userAgent }),
    mobile: isMobile({ userAgent }),
  });
}
```

More framework recipes live in the [SSR guide](/docs/guides/ssr).

## `<script>` tag

If you’re not using a bundler:

```html
<script src="https://unpkg.com/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  console.log(GetBrowser.detect());
  if (GetBrowser.isMobile()) document.body.classList.add('is-mobile');
</script>
```

## Type-driven tagging

`Browser` is a closed union, so a lookup table gets free exhaustiveness checking:

```ts
import { type Browser, detect } from 'get-browser';

const vendorOf = (browser: Browser): string =>
  ({
    chrome:  'Google',
    android: 'Google',
    edge:    'Microsoft',
    ie:      'Microsoft',
    firefox: 'Mozilla',
    safari:  'Apple',
    opera:   'Opera',
    unknown: 'Unknown',
  })[browser];

analytics.track('page_view', { vendor: vendorOf(detect()) });
```

If a future major bumps `Browser`, the compiler flags the unhandled key. No `default:` needed.

:::tip Tagging the rendering engine?
Don't map `browser → engine` by hand — it's **wrong on iOS** (Chrome-iOS renders with WebKit, not Blink). Call [`getEngine()`](/docs/api/get-engine), which reads the platform from the UA: `analytics.track('page_view', { engine: getEngine() })`.
:::

## Next

- **[API reference](/docs/api/detect)** — every export.
- **[Recipes](/docs/recipes)** — common patterns end-to-end.
- **[Playground](/playground)** — paste a UA, see it resolve.
