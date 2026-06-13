---
id: analytics
title: Analytics tagging
sidebar_label: Analytics
description: Tag analytics events with browser family, engine, or platform using get-browser.
---

# Analytics tagging

A common, totally-legitimate use of UA sniffing: enrich analytics events with a normalized browser identifier.

## Engine family

Use [`getEngine()`](/docs/api/get-engine) — it reads the engine straight from the UA:

```ts
import { detect, getEngine } from 'get-browser';

analytics.track('page_view', {
  browser: detect(),   // 'chrome' | 'safari' | …  — the brand
  engine: getEngine(), // 'blink'  | 'webkit' | …  — what actually renders
});
```

Why not just map `detect()` to an engine yourself? Because that mapping is **wrong on iOS**. A `{ chrome: 'blink', … }` lookup reports Chrome-iOS as Blink, but Apple forces every iOS browser onto WebKit — so the page is really rendered by WebKit. `getEngine()` knows the platform and returns `'webkit'` for Chrome-iOS, Firefox-iOS, and Edge-iOS. For engine-level analytics that's the difference between a true and a false signal.

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
import { type Browser, detect, type Engine, getEngine, isMobile } from 'get-browser';

export interface UAContext {
  browser: Browser;
  engine: Engine;
  form_factor: 'mobile' | 'desktop';
}

export function getUAContext(userAgent?: string): UAContext {
  const opts = userAgent ? { userAgent } : undefined;
  return {
    browser: detect(opts),
    engine: getEngine(opts),
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
