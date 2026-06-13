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
 * The set of canonical operating-system identifiers returned by {@link getOS}.
 *
 * Mirrors the {@link browsers} pattern: lowercase, single-token strings safe
 * to put in URLs, filenames, and JSON payloads.
 */
export const oses = Object.freeze({
  ANDROID: 'android',
  CHROMEOS: 'chromeos',
  IOS: 'ios',
  LINUX: 'linux',
  MACOS: 'macos',
  WINDOWS: 'windows',
  UNKNOWN: 'unknown',
} as const);

/**
 * Discriminated union of every value in {@link oses}.
 *
 * `getOS()` is typed to return this. Note that `'android'` and `'unknown'`
 * are also valid {@link Browser} values, but they refer to different things
 * (an Android *browser* vs. the Android *OS*) — they're never returned by
 * the same function.
 */
export type OS = (typeof oses)[keyof typeof oses];

/**
 * The set of canonical rendering-engine identifiers returned by {@link getEngine}.
 *
 * The engine is often a more useful axis than the browser: rendering bugs are
 * engine-level, and Apple forces *every* iOS browser onto WebKit, so
 * `getEngine() === engines.WEBKIT` catches Safari, Chrome-iOS, Firefox-iOS, and
 * Edge-iOS in one check — something {@link detect} can't express.
 *
 * - `blink` — the Chromium engine (Chrome, Edge, Opera, Brave, modern Android WebView).
 * - `gecko` — Firefox on every platform *except* iOS.
 * - `webkit` — Safari, plus every browser on iOS/iPadOS, plus the pre-2014 Android Browser.
 * - `trident` — Internet Explorer.
 * - `presto` — the original Opera engine (Opera 12 and earlier, Opera Mini).
 * - `edgehtml` — legacy Microsoft Edge (versions 12–18, the `Edge/` token).
 * - `unknown` — bots, brand-new engines, empty UA.
 */
export const engines = Object.freeze({
  BLINK: 'blink',
  EDGEHTML: 'edgehtml',
  GECKO: 'gecko',
  PRESTO: 'presto',
  TRIDENT: 'trident',
  WEBKIT: 'webkit',
  UNKNOWN: 'unknown',
} as const);

/**
 * Discriminated union of every value in {@link engines}.
 *
 * `getEngine()` is typed to return this. `'unknown'` overlaps with the
 * {@link Browser} and {@link OS} unions but refers to a different dimension.
 */
export type Engine = (typeof engines)[keyof typeof engines];

/**
 * Parsed User-Agent Client Hints. When supplied via {@link DetectOptions},
 * a detector reads these in preference to the UA string — which is important
 * because Chromium's User-Agent Reduction is removing entropy from UA strings
 * in favour of these structured headers.
 *
 * Today only {@link getOS} consumes this; other detectors fall back to UA.
 */
export interface ClientHints {
  /**
   * Value of the `Sec-CH-UA-Platform` request header (with or without
   * surrounding quotes). Recognised values: `"macOS"`, `"Windows"`, `"Linux"`,
   * `"iOS"`, `"Android"`, `"Chrome OS"` / `"Chromium OS"`. Anything else falls
   * back to the UA string.
   */
  readonly platform?: string;
}

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
  /**
   * Parsed User-Agent Client Hints. Consumed by {@link getOS}; reserved for
   * future use by other detectors. See {@link ClientHints}.
   */
  readonly clientHints?: ClientHints;
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
