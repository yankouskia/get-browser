---
id: is-edge
title: isEdge()
sidebar_label: isEdge()
---

# `isEdge()`

> `true` when the current environment is **Microsoft Edge** — both flavours.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | `Edge/`, `Edg/`, `EdgA/`, `EdgiOS/` |
| **Wins over** | `isChrome()` for Chromium-Edge UAs |

## Matches

- **Legacy EdgeHTML** (2015–2019) — UA token `Edge/`.
- **Chromium-Edge** (2020+) — UA token `Edg/`, `EdgA/` (Android), or `EdgiOS/` (iOS).

## Example

```ts
import { isEdge } from 'get-browser';

if (isEdge()) {
  // Edge-specific code path
}
```

### Why it precedes `isChrome()` in `detect()`

Chromium-Edge advertises **both** `Chrome/` and `Edg/`. Without ordering, both predicates would return `true` and `detect()` would have to make a tie-breaker call. Running `isEdge` first guarantees Edge wins.

```ts
import { detect, isChrome, isEdge } from 'get-browser';

const ua = 'Mozilla/5.0 (Windows NT 10.0) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0';

detect({ userAgent: ua });   // → 'edge'
isEdge({ userAgent: ua });   // → true
isChrome({ userAgent: ua }); // → false  (excluded by the Edg/ token)
```

## See also

- [`isChrome()`](./is-chrome), [`isOpera()`](./is-opera) — sibling Chromium browsers.
- [`detect()`](./detect) — the most-specific-first walk.
