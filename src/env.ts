import type { DetectOptions, ResolvedEnvironment } from './types.js';

interface BrowserGlobals {
  readonly navigator?: { readonly userAgent?: string; readonly vendor?: string };
  readonly chrome?: unknown;
  readonly opera?: unknown;
  readonly opr?: unknown;
}

function getGlobals(): BrowserGlobals {
  if (typeof globalThis === 'undefined') {
    return {};
  }
  return globalThis as unknown as BrowserGlobals;
}

/**
 * Normalizes user-provided {@link DetectOptions} against the runtime globals.
 *
 * - When `options.userAgent` is provided, it wins.
 * - Otherwise we fall back to `globalThis.navigator.userAgent`.
 * - When neither is available (e.g. Node with no UA), every field becomes
 *   the empty string / `false` so downstream detectors short-circuit safely.
 *
 * @internal
 */
export function resolveEnvironment(options?: DetectOptions): ResolvedEnvironment {
  const globals = getGlobals();
  const nav = globals.navigator;

  const userAgent = options?.userAgent ?? nav?.userAgent ?? '';
  const vendor = options?.vendor ?? nav?.vendor ?? '';

  // When the caller passed an explicit UA, treat globals as absent — otherwise
  // a Node test against a Chrome UA could be confused by a stray `window.chrome`
  // from a jsdom-style environment. This keeps the function pure w.r.t. its
  // input when an input is provided.
  const useGlobals = options?.userAgent === undefined;

  return {
    userAgent,
    vendor,
    hasChromeGlobal: useGlobals && typeof globals.chrome !== 'undefined',
    hasOperaGlobal:
      useGlobals && (typeof globals.opera !== 'undefined' || typeof globals.opr !== 'undefined'),
  };
}
