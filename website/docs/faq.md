---
id: faq
title: FAQ
description: Common questions about get-browser.
---

# FAQ

## Should I use `get-browser` or feature detection?

Most of the time, [feature detection](./guides/feature-vs-ua) is the right answer. Reach for `get-browser` when you actually need the *identity* of the browser — working around a known bug, choosing a polyfill, rendering a "Download for your browser" badge, or tagging analytics.

## Does `get-browser` return the browser **version**?

No. The library returns the **family** only — `'chrome'`, `'safari'`, etc. If you need versions, use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js) or [`bowser`](https://www.npmjs.com/package/bowser).

## Why does Chromium-Edge return `'edge'` and not `'chrome'`?

Chromium-Edge ships a UA that contains **both** `Chrome/` and `Edg/`. The library walks detection [most-specific-first](./browser-support#detection-ordering), so `Edg/` wins. The same logic applies to Opera (`OPR/`) and other Chromium-derived browsers.

## My iPad reports `'safari'` and `isMobile()` returns `false` — why?

Since iPadOS 13 (2019), iPad's default Safari UA is **indistinguishable from macOS Safari**. Apple ships a Mac UA on purpose, so iPads receive desktop layouts by default. The library cannot tell those two apart from the UA alone.

When the user toggles **Request Mobile Website**, the UA reverts to including `iPad` — and `isMobile()` returns `true`. See the [`isSafari()` notes](./api/is-safari#ipados-gotcha) for details.

## Will I get a hydration mismatch with SSR?

Only if you render different markup on the server (based on the request UA) than on the client (based on `navigator`). The library is happy to be called on either side. To avoid mismatches, **resolve the browser on the server and pass it down as a prop / context**, then re-use that value for the initial client render. See the [SSR guide](./guides/ssr#hydration-mismatches).

## Is `get-browser` ESM-only?

No — it ships both ESM and CJS via the [`exports` map](https://nodejs.org/api/packages.html#exports). Both `import` and `require` work, and the types resolve correctly for each.

## Is it tree-shakeable?

Yes. Every detector is a named export, and the package sets `"sideEffects": false`. Importing only `isChrome` ships only `isChrome` (plus the ~50 lines of shared environment resolution).

## What browsers can `get-browser` detect?

See the [Browser support](./browser-support) page. TL;DR: Chrome, Edge, Firefox, Safari, Opera, IE 6–11, Android WebView, plus their major mobile / desktop variants.

## Does it require `navigator`?

No. If `navigator` isn't available (Node, Workers, Deno), every detector cleanly returns `false` and `detect()` returns `'unknown'`. Or pass `{ userAgent }` explicitly.

## Why not just regex the UA myself?

You can! The library is ~1.5 kB because the regexes aren't trivial — Chrome-on-Edge, Firefox-on-iOS, Safari-vs-CriOS, Opera Mini, and the long tail of mobile detection have edge cases that aren't obvious. We've debugged them so you don't have to.

## License?

[MIT](https://github.com/yankouskia/get-browser/blob/master/LICENSE).

## How do I report a UA the library misclassifies?

Open an issue with the full UA string and what you expected: [github.com/yankouskia/get-browser/issues](https://github.com/yankouskia/get-browser/issues). The fixture suite is open for additions.
