---
id: is-opera
title: isOpera()
sidebar_label: isOpera()
---

# `isOpera()`

> `true` when the current environment is **Opera** — Presto-era or Chromium-era, desktop or mobile.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | `Opera/`, `OPR/`, `window.opera`, `window.opr` |

## Matches

- `Opera/` UA token (Presto, pre-2013).
- `OPR/` UA token (Chromium-Opera, 2013+).
- `window.opera` or `window.opr` global (UA-spoof backstop).

## Example

```ts
import { isOpera } from 'get-browser';

if (isOpera()) {
  // Opera-specific shim
}
```

### Opera Mini

Opera Mini renders pages through Opera's proxy servers and historically lacks JavaScript features common to modern browsers. The UA contains both `Opera Mini/` and the Presto `Opera/` token, so `isOpera()` returns `true`.

```ts
isOpera({
  userAgent: 'Opera/9.80 (Android; Opera Mini/65.2.2254/197.91; U; en) Presto/2.12.423',
}); // → true
```

## See also

- [`detect()`](./detect)
- [`isChrome()`](./is-chrome) — Chromium-Opera is **not** Chrome.
