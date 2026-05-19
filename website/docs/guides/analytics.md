---
id: analytics
title: Analytics tagging
sidebar_label: Analytics
description: Tag analytics events with browser family, engine, or platform using get-browser.
---

# Analytics tagging

A common, totally-legitimate use of UA sniffing: enrich analytics events with a normalized browser identifier.

## Engine family

```ts
import { type Browser, detect } from 'get-browser';

type Engine = 'chromium' | 'gecko' | 'webkit' | 'trident' | 'legacy-webkit' | 'unknown';

const engineOf = (b: Browser): Engine => {
  switch (b) {
    case 'chrome':
    case 'edge':
    case 'opera':  return 'chromium';
    case 'firefox': return 'gecko';
    case 'safari':  return 'webkit';
    case 'ie':      return 'trident';
    case 'android': return 'legacy-webkit';
    case 'unknown': return 'unknown';
  }
};

analytics.track('page_view', {
  browser: detect(),
  engine: engineOf(detect()),
});
```

The compiler enforces the switch is exhaustive — if a future major adds a value to `Browser`, it stops being a valid `Engine` mapping.

## Form factor

```ts
import { detect, isMobile } from 'get-browser';

analytics.track('cta_click', {
  browser: detect(),
  form_factor: isMobile() ? 'mobile' : 'desktop',
});
```

## Single helper

A real-world snippet collapsing everything into one object you can spread into any event:

```ts title="src/lib/analytics.ts"
import { type Browser, detect, isMobile } from 'get-browser';

export interface UAContext {
  browser: Browser;
  engine: 'chromium' | 'gecko' | 'webkit' | 'trident' | 'legacy-webkit' | 'unknown';
  form_factor: 'mobile' | 'desktop';
}

const engineOf = (b: Browser): UAContext['engine'] => {
  switch (b) {
    case 'chrome':
    case 'edge':
    case 'opera':  return 'chromium';
    case 'firefox': return 'gecko';
    case 'safari':  return 'webkit';
    case 'ie':      return 'trident';
    case 'android': return 'legacy-webkit';
    case 'unknown': return 'unknown';
  }
};

export function getUAContext(userAgent?: string): UAContext {
  const opts = userAgent ? { userAgent } : undefined;
  const browser = detect(opts);
  return {
    browser,
    engine: engineOf(browser),
    form_factor: isMobile(opts) ? 'mobile' : 'desktop',
  };
}
```

```ts
import { getUAContext } from '@/lib/analytics';

analytics.track('signup_complete', {
  ...getUAContext(),
  plan: 'pro',
});
```

## Server-side, before the page renders

```ts title="app/api/track/route.ts"
import { detect, isMobile } from 'get-browser';

export async function POST(req: Request) {
  const event = await req.json();
  const ua = req.headers.get('user-agent') ?? '';

  await analytics.identify(event.userId, {
    browser: detect({ userAgent: ua }),
    form_factor: isMobile({ userAgent: ua }) ? 'mobile' : 'desktop',
  });

  return Response.json({ ok: true });
}
```

## See also

- [SSR guide](./ssr)
- [Recipes](/docs/recipes)
