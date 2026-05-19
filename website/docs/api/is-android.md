---
id: is-android
title: isAndroid()
sidebar_label: isAndroid()
---

# `isAndroid()`

> `true` when the current environment is an **Android WebView** / legacy **Android Browser** — *not* Chrome for Android.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | UA containing `Android` + `Mozilla/5.0` + `AppleWebKit`, minus any more-specific browser |

## Heuristic

UA must contain **all** of `Android`, `Mozilla/5.0`, and `AppleWebKit`. This matches:

- Embedded WebViews used by Android system apps (Twitter, Facebook in-app browser, Gmail).
- The legacy Android Browser (pre-2014, shipped before Chrome for Android became the default).

Chrome for Android has a `Chrome/` token and is matched by [`isChrome()`](./is-chrome) first — `detect()` reports `'chrome'` for it. The Android bucket is reached only when no more-specific browser claims the UA.

## Example

```ts
import { isAndroid } from 'get-browser';

if (isAndroid()) {
  // Probably an in-app browser. Avoid features that require app-level APIs
  // (camera permissions, share sheets, etc.).
}
```

### Detecting in-app browsers

Most in-app browsers (Facebook, Instagram, Twitter, Gmail, …) embed a WebView. A heuristic:

```ts
import { isAndroid } from 'get-browser';

function looksLikeInAppBrowser(ua = navigator.userAgent) {
  return isAndroid() && /\b(FBAN|FBAV|Instagram|Twitter|Line|Snapchat)\b/i.test(ua);
}
```

## See also

- [`isChrome()`](./is-chrome) — Chrome for Android wins ordering.
- [`isMobile()`](./is-mobile)
- [`detect()`](./detect)
