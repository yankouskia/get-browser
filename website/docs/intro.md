---
id: intro
title: Introduction
description: A tiny, SSR-safe TypeScript utility that tells you which browser is on the other end. Zero dependencies, ~1 kB.
slug: /intro
sidebar_position: 1
---

# Introduction

**`get-browser` answers one question: which browser is this?**

```ts
import { detect, browsers } from 'get-browser';

detect();                         // → 'chrome' | 'edge' | 'firefox' | ...
detect() === browsers.SAFARI;     // → true on Safari (with the constant type-checked)
```

That's the whole pitch. **~1 kB** min+gzip, zero dependencies, dual ESM + CJS, strict TypeScript types, and an SSR-safe API. It pairs `detect()` with a handful of single-purpose predicates (`isChrome`, `isMobile`, …) when all you want is a boolean.

## Should I use this?

**Yes** if you need a small, typed, "which browser is this?" check for:

- 🔧 Working around a known browser bug
- 📦 Loading a polyfill only when needed
- 📊 Tagging analytics with browser family / engine
- 🖼️ Rendering a "Download for your browser" badge
- 🏗️ Server-side branching on the request `User-Agent` header

**No** if you need:

- Engine version numbers → use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js)
- OS / device parsing → use [`ua-parser-js`](https://www.npmjs.com/package/ua-parser-js)
- A feature check ("does this browser support X?") → use `@supports`, `matchMedia`, or capability probes

See [feature detection vs UA sniffing](/docs/guides/feature-vs-ua) for the longer story.

## What you get

- **🪶 Tiny** — ~1 kB min+gzip, zero dependencies, fully tree-shakeable (single predicates ship at ~400 bytes).
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
