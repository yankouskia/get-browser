---
"get-browser": minor
---

Add `getOS()` — canonical operating-system detection.

`getOS()` returns one of `'macos' | 'windows' | 'linux' | 'ios' | 'android' | 'chromeos' | 'unknown'`, mirroring `detect()`'s shape. Three new exports ship alongside it:

- `oses` — the frozen enum, parallel to `browsers`.
- `OS` — the union type.
- `ClientHints` — interface for parsed User-Agent Client Hints.

`DetectOptions` gained an optional `clientHints?: { platform?: string }` field. When set, `getOS()` reads it in preference to the UA string — pass `Sec-CH-UA-Platform` directly for the most reliable SSR detection. This is the only signal that survives Chromium's User-Agent Reduction.

```ts
import { getOS, oses } from 'get-browser';

const shortcut = getOS() === oses.MACOS ? '⌘ K' : 'Ctrl K';

// SSR — prefer the header.
getOS({
  userAgent: req.headers.get('user-agent') ?? '',
  clientHints: { platform: req.headers.get('sec-ch-ua-platform') ?? undefined },
});
```

Non-breaking: every existing export is unchanged; `DetectOptions` only gained an optional field. Bundle delta: ~250 B (ESM full grew from 827 B to 1.09 kB brotli; tree-shaken `detect`-only is unchanged).
