/**
 * The set of canonical browser identifiers returned by {@link detect}.
 *
 * The values are stable, lowercase, single-token strings that are safe to
 * embed in URLs, filenames, and JSON payloads.
 */
export const browsers = Object.freeze({
  ANDROID: 'android',
  CHROME: 'chrome',
  EDGE: 'edge',
  FIREFOX: 'firefox',
  IE: 'ie',
  OPERA: 'opera',
  SAFARI: 'safari',
  UNKNOWN: 'unknown',
} as const);

/**
 * Discriminated union of every value in {@link browsers}.
 *
 * `detect()` is typed to return this. Use it instead of `string` when storing
 * the result of a detection.
 */
export type Browser = (typeof browsers)[keyof typeof browsers];

/**
 * Optional input to every detector. Pass a `userAgent` (and optionally
 * `vendor`) to detect against a string explicitly — useful for SSR,
 * server-rendered HTML, request-based feature flags, and tests.
 *
 * When omitted, the detector reads from `globalThis.navigator`. In a
 * non-browser environment with no `navigator`, the detector returns `false`
 * cleanly rather than throwing.
 */
export interface DetectOptions {
  /** Full UA string to test against. Falls back to `navigator.userAgent`. */
  readonly userAgent?: string;
  /** `navigator.vendor`-equivalent string. Falls back to `navigator.vendor`. */
  readonly vendor?: string;
}

/**
 * Internal: a resolved view of the runtime environment with every input
 * normalized to a string. Used by individual detectors.
 *
 * @internal
 */
export interface ResolvedEnvironment {
  readonly userAgent: string;
  readonly vendor: string;
  readonly hasChromeGlobal: boolean;
  readonly hasOperaGlobal: boolean;
}
