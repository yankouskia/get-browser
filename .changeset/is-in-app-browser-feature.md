---
"get-browser": minor
---

Add `isInAppBrowser()` — detect when the page is loaded inside a mobile in-app browser.

Returns `true` inside Instagram, Facebook (`FBAN`/`FBAV`/`FB_IAB`), X / Twitter, LinkedIn, TikTok (`TikTok`/`musical_ly`/`Trill`), Snapchat, WeChat (`MicroMessenger`), Line, Telegram, and Pinterest. Returns `false` for standalone browsers and for desktop Electron apps (Slack/Discord/Teams).

This is the most impactful signal you can add to a consumer app:

- **OAuth flows** — Google/Apple/Microsoft block sign-in inside third-party WebViews.
- **Deep links** and **payment SDKs** — both expect a top-level browsing context.
- **Analytics** — without it, Instagram-traffic and Safari-traffic are indistinguishable.

```ts
import { isInAppBrowser } from 'get-browser';

if (isInAppBrowser()) showOpenInBrowserBanner();
```

SSR-safe via the standard `{ userAgent }` option. Bundle delta: **+120 B** for the full ESM bundle, and **0 bytes** for callers that don't import `isInAppBrowser` — `dist/index.mjs` tree-shakes cleanly thanks to a regex literal (not `new RegExp`). The library is still under 1.5 kB min+gzip.
