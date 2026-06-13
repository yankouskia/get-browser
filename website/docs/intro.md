---
id: intro
title: Introduction
description: A tiny, SSR-safe TypeScript utility that tells you which browser is on the other end. Zero dependencies, ~1.4 kB.
slug: /intro
sidebar_position: 1
---

# Introduction

**`get-browser` answers three questions: which browser is this, what engine renders it, and which OS is it on?**

```ts
import { detect, getEngine, getOS, browsers, engines, oses } from 'get-browser';

detect();                         // → 'chrome' | 'edge' | 'firefox' | ...
getEngine();                      // → 'blink' | 'gecko' | 'webkit' | 'trident' | 'presto' | 'edgehtml' | 'unknown'
getOS();                          // → 'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'chromeos' | 'unknown'

detect()    === browsers.SAFARI;  // → true on Safari (with the constant type-checked)
getEngine() === engines.WEBKIT;   // → true on Safari AND every iOS browser (Chrome-iOS, Firefox-iOS, …)
getOS()     === oses.MACOS;       // → true on macOS — show ⌘ K instead of Ctrl K
```

That's the whole pitch. **~1.4 kB** min+gzip, zero dependencies, dual ESM + CJS, strict TypeScript types, and an SSR-safe API. It pairs `detect()`, `getEngine()`, and `getOS()` with a handful of single-purpose predicates (`isChrome`, `isMobile`, …) when all you want is a boolean.

## Should I use this?

**Yes** if you need a small, typed, *who-is-this?* check for:

- 🔧 Working around a known browser bug
- 🎨 Applying an **engine-level** fix (e.g. a WebKit quirk that hits every iOS browser)
- 📦 Loading a polyfill only when needed
- 📊 Tagging analytics with browser family / engine
- 🖼️ Rendering a "Download for your browser" / "Download for your OS" badge
- ⌘ Picking the right keyboard shortcut for the current OS
- 🛍️ Linking to the right App Store / Play Store
- 🚪 Bouncing users out of Instagram / TikTok / Facebook in-app browsers before OAuth
- 🏗️ Server-side branching on the request `User-Agent` header or `Sec-CH-UA-Platform`

**No** if you need:

- Browser or OS *version numbers* → use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js)
- Device-model parsing (`iPhone 16 Pro Max`) → use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js)
- A feature check ("does this browser support X?") → use `@supports`, `matchMedia`, or capability probes

See [feature detection vs UA sniffing](/docs/guides/feature-vs-ua) for the longer story.

## What you get

- **🪶 Tiny** — ~1.4 kB min+gzip, zero dependencies, fully tree-shakeable (single predicates ship at ~400 bytes).
- **🧠 Typed** — `detect()` returns the `Browser` union, never plain `string`. Exhaustive `switch` statements compile.
- **🏗️ SSR-safe** — every detector takes `{ userAgent, vendor }`. No `window` at import time. Works in Node, Next.js, Remix, Astro, Workers, Deno.
- **📦 Dual ESM + CJS** — `import` and `require` both work, types ship for both. UMD bundle for `<script>` tags.

:::tip See it without installing
The **[Playground](/playground)** runs `get-browser` against your real `navigator.userAgent` (or any UA string you paste). Best way to see the API in 30 seconds.
:::

## Next steps

- 🚀 **[Install](/docs/installation)** — pnpm / npm / yarn / bun, or CDN.
- ⚡ **[Quickstart](/docs/quickstart)** — the 10-line tour.
- 🔌 **[API reference](/docs/api/detect)** — every export, with examples.
- 🍳 **[Recipes](/docs/recipes)** — copy-paste patterns for common tasks.
- 🌐 **[Browser support](/docs/browser-support)** — exactly which UAs the library recognizes.
- 🔄 **[v1 → v2 migration](/docs/migration)** — what changed.
