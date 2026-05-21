---
id: migration
title: Migrating from v1 to v2
sidebar_label: Migration v1 → v2
description: Breaking changes between get-browser 1.x and 2.x, and the steps to upgrade.
---

# Migrating from v1 to v2

`get-browser` 2.0 was a strict TypeScript port with a tightened public API and modern packaging. Most code keeps working — the breaking changes are around types and types-only behaviour.

> **Source of truth:** [`BREAKING_CHANGES.md`](https://github.com/yankouskia/get-browser/blob/master/BREAKING_CHANGES.md) is the canonical, machine-checked changelog. This page summarizes it.

## At a glance

| Change | v1 | v2 |
| --- | --- | --- |
| `detect()` return type | `string` | `Browser` (closed union) |
| Predicates return | `boolean` | `boolean` (unchanged) |
| `browsers` shape | mutable `{ chrome: 'chrome', … }` | `Object.freeze` with `as const` |
| SSR / explicit UA support | implicit / missing | first-class — every export accepts `{ userAgent, vendor }` |
| Packaging | CJS only, `main` field | dual ESM + CJS via `exports` map, UMD bundle |
| Node.js minimum | 14 | 20 |
| TypeScript minimum | 4.5 | 5.0 |
| Types in dist | hand-rolled | generated, dual `.d.ts` + `.d.cts` |
| `isMobile` regex | original detectmobilebrowsers.com | modernized; now correctly matches iPad in "Request Mobile Website" mode |
| Bundle (min+gz) | ~3 kB | ~1 kB |

## Step 1: bump the dependency

```bash
pnpm add get-browser@^2
```

## Step 2: update Node + TypeScript

v2 requires:

- **Node ≥ 20** (active LTS — 20, 22, 24).
- **TypeScript ≥ 5.0** (lower versions may have issues with `verbatimModuleSyntax`).

## Step 3: tighten the return type of `detect()`

In v1 the return was plain `string`. In v2 it's the closed `Browser` union — usually a free upgrade, but any code that compared against `string` literals will now benefit from the compiler enforcing exhaustiveness.

```ts
// v1 — compiles, but no help if you typo
const b: string = detect();
if (b === 'safri') applyFix(); // never true, no warning

// v2 — typo is a compile error
import { type Browser, detect, browsers } from 'get-browser';
const b: Browser = detect();
if (b === browsers.SAFARI) applyFix();
```

## Step 4: switch to `import` (recommended)

CJS still works:

```ts
const { detect } = require('get-browser'); // v2 — still fine
```

But ESM is the default and gets you better tree-shaking:

```ts
import { detect } from 'get-browser';
```

## Step 5: take advantage of the SSR signature

If you were doing this:

```ts
// v1 — read from a global you set on the server
import { detect } from 'get-browser';
global.navigator = { userAgent: req.headers['user-agent'] };
const b = detect();
delete global.navigator;
```

… replace with:

```ts
// v2 — explicit, pure
import { detect } from 'get-browser';
const b = detect({ userAgent: req.headers['user-agent'] ?? '' });
```

## Step 6: review `isMobile()` for iPad expectations

v2's `isMobile()` correctly matches `iPad` in user-agents that include the `iPad` token (Safari "Request Mobile Website", in-app WebViews). If your app previously assumed iPads never matched `isMobile()`, double-check the affected code paths.

## What is **not** breaking

- All function names — `detect`, `isChrome`, `isEdge`, `isFirefox`, `isSafari`, `isOpera`, `isIE`, `isAndroid`, `isMobile` — are unchanged.
- All return values — same eight `Browser` strings, same `boolean` semantics.
- The `browsers` enum's values (`'chrome'`, `'safari'`, …) are the same strings.

## Need help?

Open an issue at [github.com/yankouskia/get-browser/issues](https://github.com/yankouskia/get-browser/issues).
