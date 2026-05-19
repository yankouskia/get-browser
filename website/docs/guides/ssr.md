---
id: ssr
title: Server-side rendering
sidebar_label: SSR
description: Use get-browser inside server frameworks (Node, Next.js, Remix, Astro, Express, Cloudflare Workers, Deno) without window or navigator.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server-side rendering

:::info Works everywhere there's a UA header
Node, Bun, Deno, Cloudflare Workers, Vercel Edge, Fastly Compute@Edge, AWS Lambda. The library is platform-neutral — same import, same call shape.
:::

`get-browser` is built for SSR from the ground up. The library:

- **Never touches `window` or `navigator` at import time.** Importing `get-browser` in a Node module or worker is safe.
- **Falls back gracefully** when there's no UA available — every detector returns `false`, `detect()` returns `'unknown'`.
- **Accepts an explicit `{ userAgent, vendor }`** on every function, so you can pin detection to the incoming request.

```ts
import { detect, isMobile } from 'get-browser';

const browser = detect({ userAgent: req.headers['user-agent'] ?? '' });
```

When you pass an explicit `userAgent`, the library **ignores `globalThis.navigator` entirely** — handy for unit tests that run inside happy-dom / jsdom but want a clean UA.

## Framework recipes

Pick your stack:

<Tabs groupId="framework" queryString>
  <TabItem value="next-route" label="Next.js Route" default>

```ts title="app/api/browser/route.ts"
import { detect, isMobile } from 'get-browser';

export async function GET(req: Request) {
  const userAgent = req.headers.get('user-agent') ?? '';
  return Response.json({
    browser: detect({ userAgent }),
    mobile: isMobile({ userAgent }),
  });
}
```

  </TabItem>
  <TabItem value="next-server" label="Next.js Server Component">

```tsx title="app/page.tsx"
import { headers } from 'next/headers';
import { detect, browsers } from 'get-browser';

export default async function Page() {
  const ua = (await headers()).get('user-agent') ?? '';
  const browser = detect({ userAgent: ua });

  return (
    <main data-browser={browser}>
      {browser === browsers.IE ? <UpgradeNotice /> : <App />}
    </main>
  );
}
```

  </TabItem>
  <TabItem value="next-edge" label="Next.js Edge / Workers">

```ts title="app/api/browser/route.ts"
export const runtime = 'edge';

import { detect } from 'get-browser';

export function GET(req: Request) {
  return Response.json({
    browser: detect({ userAgent: req.headers.get('user-agent') ?? '' }),
  });
}
```

  </TabItem>
  <TabItem value="remix" label="Remix">

```ts title="app/routes/index.tsx"
import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { detect } from 'get-browser';

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    browser: detect({ userAgent: request.headers.get('user-agent') ?? '' }),
  });
}
```

  </TabItem>
  <TabItem value="astro" label="Astro">

```astro title="src/pages/index.astro"
---
import { detect } from 'get-browser';
const ua = Astro.request.headers.get('user-agent') ?? '';
const browser = detect({ userAgent: ua });
---

<html data-browser={browser}>
  <body>
    <slot />
  </body>
</html>
```

  </TabItem>
  <TabItem value="express" label="Express">

```ts
import express from 'express';
import { detect, isMobile } from 'get-browser';

const app = express();

app.use((req, res, next) => {
  const ua = req.get('user-agent') ?? '';
  res.locals.browser = detect({ userAgent: ua });
  res.locals.isMobile = isMobile({ userAgent: ua });
  next();
});
```

  </TabItem>
  <TabItem value="fastify" label="Fastify">

```ts
import Fastify from 'fastify';
import { detect } from 'get-browser';

const app = Fastify();

app.addHook('preHandler', async (req, reply) => {
  reply.locals = {
    ...reply.locals,
    browser: detect({ userAgent: req.headers['user-agent'] ?? '' }),
  };
});
```

  </TabItem>
  <TabItem value="hono" label="Hono">

```ts
import { Hono } from 'hono';
import { detect } from 'get-browser';

const app = new Hono();

app.get('/', (c) => {
  const browser = detect({ userAgent: c.req.header('user-agent') ?? '' });
  return c.json({ browser });
});
```

  </TabItem>
  <TabItem value="deno" label="Deno">

```ts
import { detect } from 'npm:get-browser';

Deno.serve((req) => {
  return Response.json({
    browser: detect({ userAgent: req.headers.get('user-agent') ?? '' }),
  });
});
```

  </TabItem>
  <TabItem value="bun" label="Bun">

```ts
import { detect } from 'get-browser';

Bun.serve({
  fetch(req) {
    return Response.json({
      browser: detect({ userAgent: req.headers.get('user-agent') ?? '' }),
    });
  },
});
```

  </TabItem>
</Tabs>

## Hydration mismatches

If you render different markup on the server (based on the incoming UA) than on the client (based on `navigator`), React will warn about hydration mismatches. Two safe options:

1. **Pass the server-resolved browser down as a prop / context.** Don't call `detect()` again on the client for the initial render — use the server's answer.
2. **Wrap browser-specific UI in a "client only" boundary** (e.g. `useEffect` or Next.js dynamic import with `{ ssr: false }`).

```tsx
import { type Browser } from 'get-browser';
const ServerBrowserContext = React.createContext<Browser>('unknown');

function App({ initialBrowser }: { initialBrowser: Browser }) {
  return (
    <ServerBrowserContext.Provider value={initialBrowser}>
      <Page />
    </ServerBrowserContext.Provider>
  );
}
```

:::tip Pattern: detect once, propagate
On the server, call `detect({ userAgent })` once per request and stash it on the context. On the client, the same value flows down via props — zero re-detection, zero mismatch.
:::

## See also

- [Framework integrations →](./frameworks) — React hooks, Vue composables, Svelte stores, Solid signals
- [Recipes](/docs/recipes) — copy-paste patterns for common tasks
- [`detect()` API](/docs/api/detect) — full signature and behaviour
