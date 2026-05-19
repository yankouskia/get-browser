---
id: frameworks
title: Framework integrations
sidebar_label: Frameworks
description: React hooks, Vue composables, Svelte stores, and Solid signals built on get-browser.
---

# Framework integrations

`get-browser` is framework-agnostic — it's just functions. But sometimes you want a typed hook / composable that re-renders on the values you care about. These are copy-paste recipes you can drop into your project.

## React hook

```tsx title="src/hooks/use-browser.ts"
import { useSyncExternalStore } from 'react';
import { type Browser, detect } from 'get-browser';

const subscribe = () => () => {};
const getServerSnapshot = (): Browser => 'unknown';

export function useBrowser(): Browser {
  return useSyncExternalStore(subscribe, () => detect(), getServerSnapshot);
}
```

Usage:

```tsx
import { useBrowser } from './hooks/use-browser';
import { browsers } from 'get-browser';

function DownloadBadge() {
  const browser = useBrowser();
  return browser === browsers.SAFARI ? <SafariBadge /> : <ChromeBadge />;
}
```

> **Why `useSyncExternalStore`?** It's the React-recommended way to read a non-React data source so SSR and CSR snapshots stay consistent. The empty `subscribe` is intentional — the user-agent doesn't change during a session, so we never re-fire.

For a hook that updates when you pass a custom UA at runtime (e.g. in tests), wrap `detect` in `useMemo`:

```tsx
import { useMemo } from 'react';
import { detect } from 'get-browser';

export function useBrowserWithOverride(userAgent?: string) {
  return useMemo(() => detect(userAgent ? { userAgent } : undefined), [userAgent]);
}
```

## Vue 3 composable

```ts title="src/composables/useBrowser.ts"
import { ref } from 'vue';
import { type Browser, detect } from 'get-browser';

export function useBrowser() {
  const browser = ref<Browser>(detect());
  return { browser };
}
```

Usage:

```vue
<script setup lang="ts">
import { useBrowser } from '@/composables/useBrowser';
import { browsers } from 'get-browser';

const { browser } = useBrowser();
</script>

<template>
  <p v-if="browser === browsers.IE">Please upgrade your browser.</p>
</template>
```

## Svelte 5 store

```ts title="src/lib/browser.svelte.ts"
import { detect, type Browser } from 'get-browser';

export function createBrowser() {
  let value = $state<Browser>('unknown');

  if (typeof window !== 'undefined') {
    value = detect();
  }

  return {
    get value() {
      return value;
    },
  };
}
```

Usage:

```svelte
<script lang="ts">
  import { createBrowser } from '$lib/browser.svelte.ts';
  import { browsers } from 'get-browser';

  const browser = createBrowser();
</script>

{#if browser.value === browsers.SAFARI}
  <p>You're on Safari.</p>
{/if}
```

## Solid signal

```ts title="src/lib/browser.ts"
import { createSignal } from 'solid-js';
import { detect, type Browser } from 'get-browser';

export const [browser, setBrowser] = createSignal<Browser>(detect());
```

Usage:

```tsx
import { browser } from './lib/browser';
import { browsers } from 'get-browser';

function App() {
  return (
    <Show when={browser() === browsers.SAFARI}>
      <SafariOnly />
    </Show>
  );
}
```

## Angular service

```ts title="src/app/browser.service.ts"
import { Injectable } from '@angular/core';
import { detect, type Browser } from 'get-browser';

@Injectable({ providedIn: 'root' })
export class BrowserService {
  readonly browser: Browser = detect();
}
```

## See also

- [SSR guide](./ssr)
- [Recipes](/docs/recipes)
