---
id: is-in-app-browser
title: isInAppBrowser()
description: Detect whether the page is loaded inside a mobile in-app browser — Instagram, Facebook, TikTok, X / Twitter, LinkedIn, Snapchat, WeChat, Line, Telegram, Pinterest.
sidebar_label: isInAppBrowser()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `isInAppBrowser()`

> `true` when the page is loaded inside a **mobile in-app browser** — the embedded WebView that social and messaging apps use when you tap a link in-app.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **SSR safe** | ✅ Pass `{ userAgent }` to pin |
| **Bundle cost** | ~130 B incremental on top of an existing `get-browser` import. **0 B** when tree-shaken out. |

## Why this matters

In-app browsers look like regular browsers but break in subtle ways that ship-stopping. The most painful:

| Surface | Behaviour |
| --- | --- |
| **OAuth sign-in** | Google, Apple, and Microsoft explicitly block sign-in inside third-party WebViews. Users see a generic "this browser is not supported" error and bail. |
| **Deep links** | `target="_blank"`, custom URL schemes, and app-store redirects often open inside the WebView or fail silently. |
| **Payments** | Apple Pay, Google Pay, Stripe `redirect` flows, and PayPal sandbox all expect a top-level browsing context the WebView doesn't provide. |
| **PWA install / push** | Service workers register but never wake up — the WebView dies when the parent app closes. |
| **Analytics** | Without this signal, Instagram-traffic and Safari-traffic look identical and conversion rates lie to you. |

If you sell a product, run a SaaS sign-up, or care about funnel completion: detecting this is non-optional.

## Detected apps

| App | UA token(s) matched |
| --- | --- |
| **Facebook** | `FBAN/`, `FBAV/`, `FB_IAB/` |
| **Instagram** | `Instagram` |
| **X / Twitter** | `Twitter for iPhone` / `Twitter for iPad`, `TwitterAndroid` |
| **LinkedIn** | `LinkedInApp` |
| **TikTok** | `TikTok`, `musical_ly_<v>`, `Trill_<v>` (legacy / regional builds; the trailing `_` keeps the matcher from colliding with Triller and other look-alikes) |
| **Snapchat** | `Snapchat` |
| **WeChat** | `WeChat`, `MicroMessenger` |
| **Line** | `Line/` |
| **Telegram** | `Telegram` |
| **Pinterest** | `Pinterest` |

The list is curated for the apps that genuinely break the surfaces above. Desktop Electron apps (Slack, Discord, Microsoft Teams) are **not** caught — they ship a full Chromium without the WebView pitfalls.

## Examples

<Tabs groupId="example" queryString>
<TabItem value="oauth" label="Pre-OAuth bounce">

```tsx
import { isInAppBrowser } from 'get-browser';

// `startOAuth` is your normal SDK / NextAuth / Clerk handler.
declare function startOAuth(): void;

export function SignInButton() {
  if (isInAppBrowser()) {
    // Render an anchor (not a button) so the in-app browser treats the click
    // as a navigation. A server endpoint can issue a 302 to the OAuth URL with
    // a special `target=_system`-style header — most WebViews respect that and
    // hand the flow off to Safari / Chrome.
    return (
      <a href="/auth/oauth-bounce" className="cta">
        Continue with Google (opens in your browser)
      </a>
    );
  }
  return <button onClick={startOAuth}>Sign in with Google</button>;
}
```

</TabItem>
<TabItem value="ssr" label="SSR — annotate analytics">

```ts
import { isInAppBrowser, detect, getOS } from 'get-browser';

export function GET(req: Request) {
  const userAgent = req.headers.get('user-agent') ?? '';

  return Response.json({
    browser: detect({ userAgent }),
    os: getOS({ userAgent }),
    in_app: isInAppBrowser({ userAgent }),
  });
}
```

Once `in_app` is in your analytics events, you can finally separate Instagram-traffic and Safari-traffic in funnels — they look identical without it.

</TabItem>
<TabItem value="app" label="App-specific behaviour">

```ts
import { isInAppBrowser } from 'get-browser';

// `showInstagramHint`, `showFacebookHint`, etc. are placeholders for whatever
// your UI does — usually setting some hint state shown above the sign-in button.
declare function showInstagramHint(): void;
declare function showFacebookHint(): void;
declare function showTikTokHint(): void;
declare function showGenericInAppHint(): void;

const ua = navigator.userAgent;

if (isInAppBrowser()) {
  if (/\bInstagram\b/.test(ua))            showInstagramHint();
  else if (/\bFB(?:AN|AV|_IAB)\b/.test(ua)) showFacebookHint();
  else if (/\bTikTok\b/.test(ua))           showTikTokHint();
  else                                       showGenericInAppHint();
}
```

The library ships the boolean; if you want app-specific copy, layer a tiny `RegExp` test on top — re-use the same anchors the library uses (kept consistent across the docs and the source).

</TabItem>
<TabItem value="test" label="Unit test">

```ts
import { describe, expect, it } from 'vitest';
import { isInAppBrowser } from 'get-browser';

describe('in-app browser detection', () => {
  it.each([
    ['Instagram', 'Mozilla/5.0 (iPhone; ...) Instagram 332.0.0.16.110 (iPhone16,2; iOS 17_5_1)'],
    ['Facebook',  'Mozilla/5.0 (iPhone; ...) Mobile/15E148 [FBAN/FBIOS;FBAV/451.0.0.34.108]'],
    ['TikTok',    'Mozilla/5.0 (iPhone; ...) Mobile/15E148 TikTok/34.6.0'],
  ])('detects %s', (_, ua) => {
    expect(isInAppBrowser({ userAgent: ua })).toBe(true);
  });

  it('does not match a regular Safari', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1';
    expect(isInAppBrowser({ userAgent: ua })).toBe(false);
  });
});
```

</TabItem>
</Tabs>

## Composes with other predicates

`isInAppBrowser` is **orthogonal** to `detect()`, `getOS()`, and the browser-family predicates. A Facebook user on Android is *all* of: an Android OS, an Android system WebView, and an in-app browser — every detector reports its own dimension correctly.

```ts
import { detect, getOS, isInAppBrowser, isAndroid, isMobile } from 'get-browser';

// Inside Facebook on a Pixel 8:
detect();           // → 'chrome'   (the underlying engine)
getOS();            // → 'android'  (the OS)
isAndroid();        // → true       (Android system WebView)
isMobile();         // → true       (yep)
isInAppBrowser();   // → true       (it's Facebook)
```

## Caveats

### The token list moves slowly, but it moves

UA tokens for these apps are quite stable — `FBAN`/`FBAV` have been around since Facebook for iOS shipped. But new apps appear, and apps occasionally rebrand (TikTok was `musical_ly`). If you spot a missing app shipping a distinctive UA fragment, an issue / PR with the real UA is welcome.

### Desktop in-app contexts

Slack, Discord, Microsoft Teams desktop apps are Electron — full Chromium. They're not caught here because they don't have the OAuth / deep-link pitfalls of the mobile WebViews. If your product treats them as in-app for analytics, layer your own check.

### Versions

The matchers anchor on the *app* tokens, not on version. A Facebook UA from 2019 and a Facebook UA from 2026 both report `true` — version bumps don't break detection.

## See also

- [`detect()`](./detect) — which underlying browser engine.
- [`getOS()`](./get-os) — which OS.
- [`isAndroid()`](./is-android) — Android system WebView (a lower-level concept).
- [Recipes → In-app browsers](../recipes#in-app-browsers)
