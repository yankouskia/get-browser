/**
 * Curated User-Agent fixtures for testing browser detection.
 *
 * Each entry is a real, recent UA string copied from the WhatIsMyBrowser /
 * useragents.me public databases. Keeping them as named constants makes test
 * failures readable and lets us add new ones without surgery in every spec.
 */

export const UA = {
  // Chrome
  chromeWinDesktop:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  chromeMacDesktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  chromeAndroid:
    'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
  chromeIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.135 Mobile/15E148 Safari/604.1',
  chromiumLinux:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/120.0.0.0 Chrome/120.0.0.0 Safari/537.36',

  // Edge (Chromium-based)
  edgeWinDesktop:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.86',
  edgeMacDesktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.86',
  edgeAndroid:
    'Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.193 Mobile Safari/537.36 EdgA/120.0.2210.122',
  edgeIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 EdgiOS/131.0.2903.66 Mobile/15E148 Safari/604.1',
  edgeLegacy:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063',

  // Firefox
  firefoxDesktop: 'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
  firefoxWindows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
  firefoxAndroid: 'Mozilla/5.0 (Android 14; Mobile; rv:122.0) Gecko/122.0 Firefox/122.0',
  firefoxIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/124.1 Mobile/15E148 Safari/605.1.15',

  // Safari
  safariMac:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  safariIPhone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  safariIPad:
    'Mozilla/5.0 (iPad; CPU OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',

  // Opera
  operaDesktop:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
  operaPresto: 'Opera/9.80 (Windows NT 6.0) Presto/2.12.388 Version/12.14',
  operaMini:
    'Opera/9.80 (Android; Opera Mini/65.2.2254/197.91; U; en) Presto/2.12.423 Version/12.16',

  // Internet Explorer
  ie11: 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  ie10: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
  ie9: 'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
  ie8: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)',

  // Android WebView
  androidWebView:
    'Mozilla/5.0 (Linux; Android 10; HD1900 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/85.0.4183.127 Mobile Safari/537.36',
  androidBrowser:
    'Mozilla/5.0 (Linux; U; Android 4.4.4; en-us; LG-D852 Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',

  // ── Modern 2026-shipping browsers ─────────────────────────────────────
  // Detection works on stable UA tokens (`Chrome/`, `Edg/`, `Firefox/`, `CriOS/`,
  // `FxiOS/`, `EdgA/`, `EdgiOS/`, `OPR/`), so version bumps don't matter for
  // correctness — but pinning a current set here makes regressions obvious.

  chrome2026Mac:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  chrome2026Windows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
  chrome2026Android:
    'Mozilla/5.0 (Linux; Android 15; Pixel 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36',
  chrome2026Ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/140.0.0.0 Mobile/15E148 Safari/604.1',

  edge2026Windows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
  edge2026Mac:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0',
  edge2026Android:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 EdgA/140.0.0.0',
  edge2026Ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 EdgiOS/140.0.0.0 Mobile/15E148 Safari/604.1',

  firefox2026Mac:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 14.0; rv:138.0) Gecko/20100101 Firefox/138.0',
  firefox2026Windows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:138.0) Gecko/20100101 Firefox/138.0',
  firefox2026Android: 'Mozilla/5.0 (Android 15; Mobile; rv:138.0) Gecko/138.0 Firefox/138.0',
  firefox2026Ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/138.0 Mobile/15E148 Safari/605.1.15',

  // Safari 18 = macOS 15 Sequoia / iOS 18. Safari 26 = macOS Tahoe — Apple
  // jumped Safari's version number to align with the calendar year.
  safari2026MacSequoia:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15',
  safari2026MacTahoe:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Safari/605.1.15',
  safari2026Iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1',
  safari2026Ipad:
    'Mozilla/5.0 (iPad; CPU OS 18_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1',

  opera2026Desktop:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 OPR/117.0.0.0',

  // ChromeOS — emitted by Chrome on Chromebooks. The `CrOS` token is what
  // separates a Chromebook UA from a Linux UA.
  chromeOSDesktop:
    'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',

  // Sentinels
  empty: '',
  unknown: 'SomeBot/1.0 (+https://example.test)',
} as const;

/**
 * Canonical `Sec-CH-UA-Platform` header values per the spec.
 * https://wicg.github.io/ua-client-hints/#sec-ch-ua-platform
 *
 * The raw header is a structured-string, so values arrive double-quoted.
 */
export const CH_PLATFORM = {
  macOS: '"macOS"',
  windows: '"Windows"',
  linux: '"Linux"',
  iOS: '"iOS"',
  android: '"Android"',
  chromeOS: '"Chrome OS"',
  unquoted: 'macOS', // tolerated form
  empty: '',
} as const;

export const VENDOR = {
  google: 'Google Inc.',
  apple: 'Apple Computer, Inc.',
  none: '',
} as const;
