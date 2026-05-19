---
id: is-ie
title: isIE()
sidebar_label: isIE()
---

# `isIE()`

> `true` when the current environment is **Internet Explorer 6–11**.

| | |
| --- | --- |
| **Signature** | `(options?: DetectOptions) => boolean` |
| **Matches** | `MSIE ` (6–10), `Trident/` (11) |
| **Does not match** | Microsoft Edge — see [`isEdge()`](./is-edge) |

## Matches

- `MSIE ` UA token — IE 6, 7, 8, 9, 10.
- `Trident/` engine token — IE 11.

Does **not** match Microsoft Edge — that's [`isEdge()`](./is-edge).

## Example

```ts
import { isIE } from 'get-browser';

if (isIE()) {
  showLegacyWarning();
}
```

### Microsoft retired IE in 2022

Outside of intranet apps and specialized industries, IE has been [end-of-life since June 15, 2022](https://learn.microsoft.com/en-us/lifecycle/announcements/internet-explorer-11-end-of-support-on-windows-10). Detecting it is usually a signal to *gracefully refuse to render* rather than feature-flag.

```ts
import { isIE } from 'get-browser';

if (isIE()) {
  window.location.replace('/unsupported');
}
```

## See also

- [`isEdge()`](./is-edge) — modern Microsoft browser.
- [`detect()`](./detect)
