---
id: recipes
title: Recipes
description: Cookbook of common get-browser patterns — polyfills, banners, analytics, download badges, in-app browsers, viewport fixes, debug overlays, and more.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Recipes

End-to-end snippets for common tasks. Each recipe is self-contained — copy what you need.

:::tip Working example
Open the **[Playground](/playground)** in a second tab as you read. Every snippet here uses the same `detect()` / `isMobile()` / predicates — you can experiment with UAs while you copy.
:::

## CSS targeting

### Set a `<body>` class so CSS can branch

<Tabs groupId="ssr-or-csr" queryString>
  <TabItem value="client" label="Client (browser)" default>

```ts
import { detect, isMobile } from 'get-browser';

document.body.classList.add(`browser-${detect()}`);
if (isMobile()) document.body.classList.add('is-mobile');
```

```css
.browser-safari .scroll-region {
  -webkit-overflow-scrolling: touch;
}
.is-mobile .desktop-only { display: none; }
```

  </TabItem>
  <TabItem value="ssr" label="Server (Next.js)">

```tsx title="app/layout.tsx"
import { headers } from 'next/headers';
import { detect, isMobile } from 'get-browser';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const ua = (await headers()).get('user-agent') ?? '';
  const browser = detect({ userAgent: ua });
  const mobile = isMobile({ userAgent: ua });

  return (
    <html>
      <body className={`browser-${browser} ${mobile ? 'is-mobile' : 'is-desktop'}`}>
        {children}
      </body>
    </html>
  );
}
```

  </TabItem>
</Tabs>

## Cross-platform UI

### `⌘ K` on macOS, `Ctrl K` on Windows / Linux

```tsx
import { getOS, oses } from 'get-browser';

export function CommandPaletteHint() {
  const mod = getOS() === oses.MACOS ? '⌘' : 'Ctrl';
  return <kbd>{mod} K</kbd>;
}
```

### Download button — pick the right asset for the OS

```tsx
import { getOS, oses, type OS } from 'get-browser';

const DOWNLOADS: Partial<Record<OS, { label: string; href: string }>> = {
  [oses.WINDOWS]: { label: 'Download for Windows', href: '/dl/app.exe' },
  [oses.MACOS]:   { label: 'Download for macOS',   href: '/dl/app.dmg' },
  [oses.LINUX]:   { label: 'Download for Linux',   href: '/dl/app.deb' },
  [oses.IOS]:     { label: 'Open in App Store',    href: 'https://apps.apple.com/…' },
  [oses.ANDROID]: { label: 'Open in Play Store',   href: 'https://play.google.com/…' },
};

export function PrimaryCTA() {
  const cta = DOWNLOADS[getOS()] ?? { label: 'Get the app', href: '/install' };
  return <a href={cta.href} className="cta">{cta.label}</a>;
}
```

### SSR — read `Sec-CH-UA-Platform` for the most reliable signal

```ts title="middleware.ts (Next.js Edge)"
import { NextResponse } from 'next/server';
import { getOS } from 'get-browser';

export function middleware(req: Request) {
  const os = getOS({
    userAgent: req.headers.get('user-agent') ?? '',
    clientHints: {
      platform: req.headers.get('sec-ch-ua-platform') ?? undefined,
    },
  });
  // Stamp a header so downstream renderers can branch without re-detecting.
  const res = NextResponse.next();
  res.headers.set('x-detected-os', os);
  return res;
}
```

`Sec-CH-UA-Platform` is the only signal that *survives* Chromium's User-Agent Reduction — when it's available, prefer it.

## Store badges

### "Install for your browser" button

```tsx
import { browsers, detect, type Browser } from 'get-browser';

const STORE_LINK: Record<Browser, string | null> = {
  chrome:  'https://chromewebstore.google.com/detail/...',
  edge:    'https://microsoftedge.microsoft.com/addons/detail/...',
  firefox: 'https://addons.mozilla.org/firefox/addon/...',
  safari:  'https://apps.apple.com/app/...',
  opera:   'https://addons.opera.com/extensions/details/...',
  ie:      null,
  android: null,
  unknown: null,
};

export function StoreBadge() {
  const browser = detect();
  const href = STORE_LINK[browser];
  if (!href) return null;
  return (
    <a href={href} className="store-badge">
      Install for {browser}
    </a>
  );
}
```

The `Record<Browser, string | null>` type means TypeScript refuses to compile if you forget a browser.

## Unsupported browsers

### IE redirect at the edge

```ts title="middleware.ts (Next.js)"
import { NextResponse } from 'next/server';
import { isIE } from 'get-browser';

export function middleware(req: Request) {
  if (isIE({ userAgent: req.headers.get('user-agent') ?? '' })) {
    return NextResponse.redirect(new URL('/unsupported', req.url));
  }
  return NextResponse.next();
}
```

### Friendly client-side fallback

```tsx
import { isIE } from 'get-browser';

export function App() {
  if (isIE()) {
    return (
      <div className="unsupported">
        <h1>You're on Internet Explorer</h1>
        <p>Microsoft retired IE in June 2022. Please use Edge, Chrome, or Firefox.</p>
      </div>
    );
  }
  return <RegularApp />;
}
```

## Conditional polyfills

### Load only when needed

```ts
import { isSafari } from 'get-browser';

if (isSafari() && !('inert' in HTMLElement.prototype)) {
  await import('wicg-inert');
}
```

### Server-driven polyfill manifest

When you control the script tags from the server, you can keep the polyfill payload off the wire entirely for browsers that don't need it.

```ts title="app/scripts.ts"
import { isSafari, isIE } from 'get-browser';

export function polyfillsFor(userAgent: string): string[] {
  return [
    !( 'inert' in HTMLElement.prototype ) && isSafari({ userAgent }) && '/polyfills/inert.js',
    isIE({ userAgent }) && '/polyfills/promise.js',
  ].filter(Boolean) as string[];
}
```

## In-app browsers

### Bounce users out before OAuth

Google, Apple, and Microsoft block sign-in inside in-app browsers. Detect the situation up front and hand the user back to the system browser:

```ts
import { isInAppBrowser } from 'get-browser';

export function SignInButton() {
  if (isInAppBrowser()) {
    return (
      <a href="/auth/oauth-bounce" className="cta">
        Tap to continue with Google
        <small>opens in your browser</small>
      </a>
    );
  }
  return <button onClick={startOAuth}>Sign in with Google</button>;
}
```

The library ships [`isInAppBrowser()`](./api/is-in-app-browser) — no need to roll your own regex. It detects Instagram, Facebook (`FBAN`/`FBAV`/`FB_IAB`), TikTok (`TikTok`, `musical_ly`), X / Twitter, LinkedIn, Snapchat, WeChat (`MicroMessenger`), Line, Telegram, and Pinterest.

### App-specific copy

The boolean is usually enough, but if you want different microcopy per app:

```ts
import { isInAppBrowser } from 'get-browser';

function inAppHint(ua = navigator.userAgent): string | null {
  if (!isInAppBrowser({ userAgent: ua })) return null;
  if (/\bInstagram\b/.test(ua))      return 'Tap ⋯ → "Open in browser"';
  if (/\bFB(?:AN|AV|_IAB)\b/.test(ua)) return 'Tap ⋯ → "Open in browser"';
  if (/\bTikTok\b/.test(ua))           return 'Tap "Open in browser"';
  return 'Open in your browser to continue';
}
```

### SSR — annotate analytics events

```ts title="middleware.ts (Next.js Edge)"
import { NextResponse } from 'next/server';
import { isInAppBrowser } from 'get-browser';

export function middleware(req: Request) {
  const res = NextResponse.next();
  res.headers.set(
    'x-in-app',
    isInAppBrowser({ userAgent: req.headers.get('user-agent') ?? '' }) ? '1' : '0',
  );
  return res;
}
```

Once `x-in-app` is on every event, funnels finally separate Instagram-traffic from Safari-traffic — without it the two are indistinguishable and conversion rates lie.

## Mobile-Safari viewport

```ts
import { isSafari, isMobile } from 'get-browser';

if (isSafari() && isMobile()) {
  // 100vh on iOS Safari includes the address bar by default — paint a custom var.
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  };
  setVh();
  window.addEventListener('resize', setVh, { passive: true });
}
```

```css
.full-height { height: calc(var(--vh, 1vh) * 100); }
```

## Analytics tagging

A real-world snippet collapsing browser, engine, and form-factor into one object you can spread into any event. See the [Analytics guide](./guides/analytics) for the full version.

```ts title="src/lib/analytics.ts"
import { detect, getEngine, isMobile } from 'get-browser';

export function getUAContext(userAgent?: string) {
  const opts = userAgent ? { userAgent } : undefined;
  return {
    browser: detect(opts),    // 'chrome' | 'safari' | …
    engine: getEngine(opts),  // 'blink'  | 'webkit' | … — correct on iOS
    form_factor: isMobile(opts) ? 'mobile' : 'desktop',
  };
}
```

`getEngine()` reads the engine from the UA, so Chrome-iOS / Firefox-iOS report `'webkit'` (what actually renders) instead of being mis-mapped to `'blink'` / `'gecko'`. See [`getEngine()`](./api/get-engine).

```ts
analytics.track('page_view', {
  ...getUAContext(),
  plan: 'pro',
});
```

## A/B and feature-flag fallbacks

### Default a flag based on the browser

```ts
import { detect, type Browser } from 'get-browser';
import { useFlag } from '@/flags';

// Some features ship to Chromium first because that's where you can iterate fastest.
const DEFAULT_BY_BROWSER: Partial<Record<Browser, boolean>> = {
  chrome:  true,
  edge:    true,
  firefox: false,
  safari:  false,
};

export function useNewSearchBar() {
  const fallback = DEFAULT_BY_BROWSER[detect()] ?? false;
  return useFlag('new-search-bar', fallback);
}
```

## Developer experience

### Debug overlay (dev-only)

Useful when reproducing a bug across browsers.

```tsx
import { useEffect, useState } from 'react';
import { type Browser, detect, isMobile } from 'get-browser';

export function DebugOverlay() {
  const [open, setOpen] = useState(false);
  if (process.env.NODE_ENV !== 'development') return null;

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === '~' && setOpen((o) => !o);
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, []);

  if (!open) return null;

  return (
    <pre style={{ position: 'fixed', bottom: 0, right: 0, padding: 12, background: '#111', color: '#eee', fontFamily: 'monospace', fontSize: 12 }}>
      {JSON.stringify({
        browser: detect(),
        isMobile: isMobile(),
        ua: navigator.userAgent,
      }, null, 2)}
    </pre>
  );
}
```

Press `~` to toggle.

## Testing

### Vitest fixture loop

```ts title="component.test.ts"
import { describe, expect, it } from 'vitest';
import { detect } from 'get-browser';

const FIXTURES = [
  ['Chrome 140',  'Mozilla/5.0 (...) Chrome/140.0.0.0 Safari/537.36',                 'chrome'],
  ['Safari iOS',  'Mozilla/5.0 (iPhone; ...) Version/18.4 Mobile/15E148 Safari/604.1', 'safari'],
  ['Firefox 138', 'Mozilla/5.0 (...; rv:138.0) Gecko/20100101 Firefox/138.0',          'firefox'],
] as const;

describe('detect', () => {
  it.each(FIXTURES)('reports %s as %s', (_label, ua, expected) => {
    expect(detect({ userAgent: ua, vendor: '' })).toBe(expected);
  });
});
```

Pure function when given an explicit UA — no DOM mocking required.

## See also

- [SSR guide](./guides/ssr)
- [Framework integrations](./guides/frameworks)
- [Analytics guide](./guides/analytics)
- [Playground](/playground) — paste a UA and see the result live.
