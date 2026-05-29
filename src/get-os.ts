import { resolveEnvironment } from './env.js';
import { type DetectOptions, type OS, oses } from './types.js';

/**
 * Detects the operating system and returns its canonical {@link OS} name.
 *
 * **Detection order — most reliable first:**
 *
 * 1. **Client Hints** — if `options.clientHints.platform` is set (e.g. from a
 *    `Sec-CH-UA-Platform` request header), that wins. This is the only signal
 *    that survives Chromium's User-Agent Reduction.
 * 2. **iOS** — explicit `iPhone` / `iPad` / `iPod` tokens.
 * 3. **ChromeOS** — `CrOS` token.
 * 4. **Android** — `Android` token (checked before Linux, since Android UAs
 *    contain `Linux`).
 * 5. **Windows** — `Windows NT` / `Win64` / `Win32` / `Windows Phone`.
 * 6. **macOS** — `Mac OS X` / `Macintosh`.
 * 7. **Linux** — `Linux` (covers desktop Linux and ChromeOS-derived browsers
 *    that omit the `CrOS` marker).
 * 8. Fallback: `oses.UNKNOWN`.
 *
 * **Note on iPadOS 13+ Safari:** when "Request Desktop Website" is on (the
 * default), Safari sends a Macintosh UA indistinguishable from a real Mac.
 * Without a client hint, this is reported as `'macos'`. Pass
 * `clientHints: { platform: 'iOS' }` (Safari sends `"iOS"` in
 * `Sec-CH-UA-Platform`) to disambiguate on the server.
 *
 * @param options - SSR-safe override; pass `{ userAgent }` to test a UA string
 *   explicitly, or `{ clientHints: { platform } }` to use a Sec-CH-UA-Platform
 *   header.
 * @returns One of the {@link oses} values, narrowed to the {@link OS} union.
 *
 * @example
 * ```ts
 * import { getOS, oses } from 'get-browser';
 *
 * const shortcut = getOS() === oses.MACOS ? '⌘ K' : 'Ctrl K';
 * ```
 *
 * @example
 * ```ts
 * // SSR — Next.js Edge / Cloudflare Worker: prefer the client-hint header.
 * import { getOS } from 'get-browser';
 *
 * export function GET(req: Request) {
 *   const os = getOS({
 *     userAgent: req.headers.get('user-agent') ?? '',
 *     clientHints: {
 *       platform: req.headers.get('sec-ch-ua-platform') ?? undefined,
 *     },
 *   });
 *   return Response.json({ os });
 * }
 * ```
 */
export function getOS(options?: DetectOptions): OS {
  const hint = options?.clientHints?.platform;
  if (hint) {
    const fromHint = matchClientHintPlatform(hint);
    if (fromHint) return fromHint;
  }

  const { userAgent } = resolveEnvironment(options);

  if (/iPhone|iPad|iPod/i.test(userAgent)) return oses.IOS;
  if (/CrOS/.test(userAgent)) return oses.CHROMEOS;
  if (/Android/i.test(userAgent)) return oses.ANDROID;
  if (/Windows NT|Win64|Win32|Windows Phone/.test(userAgent)) return oses.WINDOWS;
  if (/Mac OS X|Macintosh/.test(userAgent)) return oses.MACOS;
  if (/Linux/i.test(userAgent)) return oses.LINUX;

  return oses.UNKNOWN;
}

/**
 * Map a `Sec-CH-UA-Platform` value onto an {@link OS}. `Sec-CH-UA-Platform`
 * is a structured-headers string, so the raw header value is wrapped in
 * double quotes — `"macOS"`, `"Windows"`, etc. We tolerate quoted *and*
 * unquoted input, and we match case-insensitively.
 *
 * Returns `undefined` when the value isn't one of the known platforms so the
 * caller can fall back to UA-string heuristics.
 */
function matchClientHintPlatform(value: string): OS | undefined {
  const v = value.replace(/^"|"$/g, '').trim().toLowerCase();
  if (v === 'macos' || v === 'mac os x' || v === 'darwin') return oses.MACOS;
  if (v === 'windows') return oses.WINDOWS;
  if (v === 'linux') return oses.LINUX;
  if (v === 'ios') return oses.IOS;
  if (v === 'android') return oses.ANDROID;
  if (v === 'chrome os' || v === 'chromium os' || v === 'chromeos') return oses.CHROMEOS;
  return undefined;
}
