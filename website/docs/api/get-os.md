---
id: get-os
title: getOS()
description: Canonical operating-system detection — returns the OS union, with optional Client-Hint support for SSR.
sidebar_label: getOS()
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `getOS()`

> The OS counterpart to [`detect()`](./detect). Returns one of the [`oses`](#the-oses-enum) values, narrowed to the [`OS`](./types#os) union. Reads `Sec-CH-UA-Platform` when you give it one.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => OS` |
| **Returns** | `'macos' \| 'windows' \| 'linux' \| 'ios' \| 'android' \| 'chromeos' \| 'unknown'` |
| **Bundle cost** | ~250 bytes when tree-shaken on its own |
| **SSR safe** | ✅ Pass `{ userAgent }` and/or `{ clientHints: { platform } }` |

## Signature

```ts
function getOS(options?: DetectOptions): OS;
```

```ts
interface DetectOptions {
  readonly userAgent?: string;
  readonly vendor?: string;
  readonly clientHints?: ClientHints;
}

interface ClientHints {
  /** Value of `Sec-CH-UA-Platform`. Quoted or unquoted; case-insensitive. */
  readonly platform?: string;
}

type OS =
  | 'android'
  | 'chromeos'
  | 'ios'
  | 'linux'
  | 'macos'
  | 'windows'
  | 'unknown';
```

## Why this exists

The library already had [`isAndroid()`](./is-android) — but that's the Android *WebView browser*, not the Android *OS*. The other OSes had no first-class answer at all. `getOS()` plugs that hole with a single canonical primitive:

```ts
import { getOS, oses } from 'get-browser';

const shortcut = getOS() === oses.MACOS ? '⌘ K' : 'Ctrl K';
```

It pairs naturally with `detect()`:

| Question | Answer |
| --- | --- |
| *Which browser is this?* | `detect()` |
| *Which OS is it running on?* | `getOS()` |

## Detection order

Most-reliable signal first — most-specific UA token next:

1. **Client Hints** — `options.clientHints.platform` (the `Sec-CH-UA-Platform` request header). Wins if present and recognised.
2. **iOS** — UA contains `iPhone` / `iPad` / `iPod`.
3. **ChromeOS** — UA contains `CrOS`.
4. **Android** — UA contains `Android` (checked before Linux, because Android UAs include `Linux`).
5. **Windows** — UA contains `Windows NT`, `Win64`, `Win32`, or `Windows Phone`.
6. **macOS** — UA contains `Mac OS X` or `Macintosh`.
7. **Linux** — UA contains `Linux` (covers desktop Linux and ChromeOS-derived browsers that omit the `CrOS` marker).
8. **`'unknown'`** — bots, brand-new platforms, empty UA.

## Examples

<Tabs groupId="example" queryString>
<TabItem value="shortcut" label="⌘ vs Ctrl shortcut">

```ts
import { getOS, oses } from 'get-browser';

const modifier = getOS() === oses.MACOS ? '⌘' : 'Ctrl';
hint.textContent = `${modifier} K to open the command palette`;
```

</TabItem>
<TabItem value="download" label="Download button">

```ts
import { getOS, oses } from 'get-browser';

const downloads = {
  [oses.WINDOWS]: { label: 'Download for Windows', href: '/dl/app.exe' },
  [oses.MACOS]:   { label: 'Download for macOS',   href: '/dl/app.dmg' },
  [oses.LINUX]:   { label: 'Download for Linux',   href: '/dl/app.deb' },
  [oses.IOS]:     { label: 'Open in App Store',    href: 'https://apps.apple.com/…' },
  [oses.ANDROID]: { label: 'Open in Play Store',   href: 'https://play.google.com/…' },
} as const;

const cta = downloads[getOS()] ?? { label: 'Get the app', href: '/install' };
```

</TabItem>
<TabItem value="ssr" label="SSR (Edge / Workers)">

```ts
// Next.js Edge / Cloudflare Worker — prefer the client-hint header.
import { getOS } from 'get-browser';

export function GET(req: Request) {
  const os = getOS({
    userAgent: req.headers.get('user-agent') ?? '',
    clientHints: {
      platform: req.headers.get('sec-ch-ua-platform') ?? undefined,
    },
  });
  return Response.json({ os });
}
```

`Sec-CH-UA-Platform` is the only signal that *survives* Chromium's User-Agent Reduction. If the browser sends it, prefer it.

</TabItem>
<TabItem value="test" label="Unit test">

```ts
import { describe, expect, it } from 'vitest';
import { getOS, oses } from 'get-browser';

it('routes Mac visitors to the dmg download', () => {
  const ua =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
  expect(getOS({ userAgent: ua })).toBe(oses.MACOS);
});
```

</TabItem>
</Tabs>

## The `oses` enum

```ts
export const oses: {
  readonly ANDROID:  'android';
  readonly CHROMEOS: 'chromeos';
  readonly IOS:      'ios';
  readonly LINUX:    'linux';
  readonly MACOS:    'macos';
  readonly WINDOWS:  'windows';
  readonly UNKNOWN:  'unknown';
};
```

Use it the same way you'd use [`browsers`](./browsers) — `getOS() === oses.MACOS` beats `getOS() === 'macos'` because the enum value is the typo-proof canonical reference.

## Client Hints (`Sec-CH-UA-Platform`)

`Sec-CH-UA-Platform` is a structured-headers string: the raw header value is wrapped in double quotes, e.g. `"macOS"`. `getOS()` tolerates both quoted and unquoted input and matches case-insensitively:

| Header value | Result |
| --- | --- |
| `"macOS"`, `"Mac OS X"`, `"Darwin"` | `oses.MACOS` |
| `"Windows"` | `oses.WINDOWS` |
| `"Linux"` | `oses.LINUX` |
| `"iOS"` | `oses.IOS` |
| `"Android"` | `oses.ANDROID` |
| `"Chrome OS"`, `"Chromium OS"` | `oses.CHROMEOS` |
| anything else | UA fallback |

The conflict-resolution rule: **if a known hint is provided, it wins** — even when it contradicts the UA. That's the forward-compatible path Chromium recommends, because the UA string is *deliberately* losing entropy.

## Caveats

### iPadOS Safari masquerading as macOS

When **"Request Desktop Website"** is on (the default in iPadOS 13+), Safari ships a Macintosh UA indistinguishable from a real Mac. Pure UA detection returns `'macos'` in that case.

Two workarounds:

```ts
// SSR — preferred. Safari sends "iOS" in Sec-CH-UA-Platform.
getOS({
  userAgent: req.headers.get('user-agent') ?? '',
  clientHints: { platform: req.headers.get('sec-ch-ua-platform') ?? undefined },
});

// Client-side — combine with a touch-point check.
import { getOS, oses } from 'get-browser';
const os = getOS();
const isReallyMac = os === oses.MACOS && navigator.maxTouchPoints <= 1;
```

### When you should *not* reach for `getOS()`

If you're picking CSS, prefer `@media` / `@supports`. If you're feature-detecting, prefer the feature directly. `getOS()` is for product decisions where the OS itself is the answer — shortcuts, store links, download targets.

## See also

- [`detect()`](./detect) — the browser counterpart.
- [`isAndroid()`](./is-android) — Android **browser**, not OS. (Use `getOS() === oses.ANDROID` for the OS.)
- [`oses`](#the-oses-enum) — the frozen enum.
- [`types`](./types) — `OS`, `ClientHints`, `DetectOptions`.
