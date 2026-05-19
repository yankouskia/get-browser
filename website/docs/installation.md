---
id: installation
title: Installation
description: Install get-browser with pnpm, npm, yarn, or bun. Or drop in the UMD bundle via a <script> tag.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

`get-browser` is published to npm as [`get-browser`](https://www.npmjs.com/package/get-browser). It ships **dual ESM + CJS** through the `exports` map, plus a **UMD/IIFE bundle** for `<script>` tags. Pick your weapon:

<Tabs groupId="pkg" queryString>
  <TabItem value="pnpm" label="pnpm" default>

```bash
pnpm add get-browser
```

  </TabItem>
  <TabItem value="npm" label="npm">

```bash
npm install get-browser
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
yarn add get-browser
```

  </TabItem>
  <TabItem value="bun" label="bun">

```bash
bun add get-browser
```

  </TabItem>
</Tabs>

That's it. No peer dependencies, no postinstall scripts, nothing to configure.

## `<script>` tag (UMD / IIFE)

A minified bundle that exposes the `GetBrowser` global is published alongside the package. Drop it in a static page without a build step:

<Tabs groupId="cdn" queryString>
  <TabItem value="unpkg" label="unpkg" default>

```html
<script src="https://unpkg.com/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  console.log(GetBrowser.detect());
  if (GetBrowser.isMobile()) {
    document.body.classList.add('is-mobile');
  }
</script>
```

  </TabItem>
  <TabItem value="jsdelivr" label="jsDelivr">

```html
<script src="https://cdn.jsdelivr.net/npm/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  console.log(GetBrowser.detect());
</script>
```

  </TabItem>
  <TabItem value="esm" label="ESM (import maps)">

```html
<script type="importmap">
  { "imports": { "get-browser": "https://esm.sh/get-browser" } }
</script>
<script type="module">
  import { detect } from 'get-browser';
  console.log(detect());
</script>
```

  </TabItem>
</Tabs>

## Import style

Both ESM and CJS work — the `exports` map resolves types correctly for each:

<Tabs groupId="module" queryString>
  <TabItem value="esm" label="ESM" default>

```ts
import { detect, isMobile, browsers, type Browser } from 'get-browser';

const b: Browser = detect();
```

  </TabItem>
  <TabItem value="cjs" label="CommonJS">

```ts
const { detect, isMobile, browsers } = require('get-browser');
/** @type {import('get-browser').Browser} */
const b = detect();
```

  </TabItem>
  <TabItem value="umd" label="UMD global">

```html
<script src="https://unpkg.com/get-browser/dist/umd/get-browser.global.js"></script>
<script>
  const b = GetBrowser.detect();
</script>
```

  </TabItem>
</Tabs>

## Requirements

| | Minimum |
| --- | --- |
| **Node.js** | `>= 20` (active LTS — 20, 22, 24) |
| **TypeScript** | `>= 5.0` (lower may have issues with `verbatimModuleSyntax`) |
| **Browsers** | Evergreen — last 2 versions of Chrome, Edge, Firefox, Safari. UMD bundle is compiled to ES2018. |

## Module resolution

The package exposes the modern `exports` map:

```json
{
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts",  "default": "./dist/index.mjs" },
      "require": { "types": "./dist/index.d.cts", "default": "./dist/index.cjs" }
    }
  }
}
```

`"sideEffects": false` is set, so unused detectors are dropped during tree-shaking — importing only `isChrome` ships ~400 bytes.

## Verifying the install

```bash
pnpm exec tsc --noEmit -e 'import { detect, browsers } from "get-browser"; const b = detect(); b === browsers.CHROME;'
```

If that compiles, you’re good to go.

:::tip Next step
Continue with the **[Quickstart](/docs/quickstart)** for the 10-line tour, or jump straight into the **[Playground](/playground)** to see every predicate in action.
:::
