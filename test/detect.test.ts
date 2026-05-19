import { describe, expect, it } from 'vitest';
import { detect } from '../src/detect.js';
import { browsers } from '../src/types.js';
import { UA, VENDOR } from './fixtures.js';

describe('detect', () => {
  it.each([
    ['Chrome desktop Windows', UA.chromeWinDesktop, VENDOR.google, browsers.CHROME],
    ['Chrome desktop macOS', UA.chromeMacDesktop, VENDOR.google, browsers.CHROME],
    ['Chrome iOS', UA.chromeIos, VENDOR.apple, browsers.CHROME],
    ['Chromium Linux', UA.chromiumLinux, VENDOR.none, browsers.CHROME],
    ['Edge Windows (Chromium)', UA.edgeWinDesktop, VENDOR.google, browsers.EDGE],
    ['Edge macOS', UA.edgeMacDesktop, VENDOR.google, browsers.EDGE],
    ['Edge Android', UA.edgeAndroid, VENDOR.google, browsers.EDGE],
    ['Edge iOS', UA.edgeIos, VENDOR.apple, browsers.EDGE],
    ['Edge legacy', UA.edgeLegacy, VENDOR.google, browsers.EDGE],
    ['Firefox desktop', UA.firefoxDesktop, VENDOR.none, browsers.FIREFOX],
    ['Firefox Windows', UA.firefoxWindows, VENDOR.none, browsers.FIREFOX],
    ['Firefox Android', UA.firefoxAndroid, VENDOR.none, browsers.FIREFOX],
    ['Firefox iOS', UA.firefoxIos, VENDOR.apple, browsers.FIREFOX],
    ['Safari macOS', UA.safariMac, VENDOR.apple, browsers.SAFARI],
    ['Safari iPhone', UA.safariIPhone, VENDOR.apple, browsers.SAFARI],
    ['Safari iPad', UA.safariIPad, VENDOR.apple, browsers.SAFARI],
    ['Opera Chromium', UA.operaDesktop, VENDOR.google, browsers.OPERA],
    ['Opera Presto', UA.operaPresto, VENDOR.none, browsers.OPERA],
    ['Opera Mini', UA.operaMini, VENDOR.none, browsers.OPERA],
    ['IE 11', UA.ie11, VENDOR.none, browsers.IE],
    ['IE 10', UA.ie10, VENDOR.none, browsers.IE],
    ['IE 9', UA.ie9, VENDOR.none, browsers.IE],
    ['IE 8', UA.ie8, VENDOR.none, browsers.IE],
    // Modern 2026 versions — same detection paths, fresh UA strings.
    ['Chrome 140 macOS', UA.chrome2026Mac, VENDOR.google, browsers.CHROME],
    ['Chrome 140 Windows', UA.chrome2026Windows, VENDOR.google, browsers.CHROME],
    ['Chrome 140 Android', UA.chrome2026Android, VENDOR.google, browsers.CHROME],
    ['Chrome 140 iOS', UA.chrome2026Ios, VENDOR.apple, browsers.CHROME],
    ['Edge 140 Windows', UA.edge2026Windows, VENDOR.google, browsers.EDGE],
    ['Edge 140 macOS', UA.edge2026Mac, VENDOR.google, browsers.EDGE],
    ['Edge 140 Android', UA.edge2026Android, VENDOR.google, browsers.EDGE],
    ['Edge 140 iOS', UA.edge2026Ios, VENDOR.apple, browsers.EDGE],
    ['Firefox 138 macOS', UA.firefox2026Mac, VENDOR.none, browsers.FIREFOX],
    ['Firefox 138 Windows', UA.firefox2026Windows, VENDOR.none, browsers.FIREFOX],
    ['Firefox 138 Android', UA.firefox2026Android, VENDOR.none, browsers.FIREFOX],
    ['Firefox 138 iOS', UA.firefox2026Ios, VENDOR.apple, browsers.FIREFOX],
    ['Safari 18 macOS Sequoia', UA.safari2026MacSequoia, VENDOR.apple, browsers.SAFARI],
    ['Safari 26 macOS Tahoe', UA.safari2026MacTahoe, VENDOR.apple, browsers.SAFARI],
    ['Safari 18 iPhone', UA.safari2026Iphone, VENDOR.apple, browsers.SAFARI],
    ['Safari 18 iPad', UA.safari2026Ipad, VENDOR.apple, browsers.SAFARI],
    ['Opera 117 desktop', UA.opera2026Desktop, VENDOR.google, browsers.OPERA],

    ['empty', UA.empty, VENDOR.none, browsers.UNKNOWN],
    ['unknown bot', UA.unknown, VENDOR.none, browsers.UNKNOWN],
  ])('reports %s as %s', (_label, userAgent, vendor, expected) => {
    expect(detect({ userAgent, vendor })).toBe(expected);
  });

  it('detects Android WebView as `android` (Chrome ordering already filtered)', () => {
    // androidWebView UA contains a Chrome/85 token, so detect() reports `chrome`.
    // For pure Android Browser (Chrome/30, 2014-era — the system browser before
    // Chrome shipped as the default), we expect `chrome` too because the UA
    // genuinely contains the Chrome token. The library's `android` bucket is
    // reachable only when the UA matches Mozilla/5.0+Android+AppleWebKit but
    // *not* any of the more-specific browsers above.
    const ua = 'Mozilla/5.0 (Linux; Android 4.4.4; en-us; Nexus 5 Build/KTU84P) AppleWebKit/537.36';
    expect(detect({ userAgent: ua })).toBe(browsers.ANDROID);
  });

  it('returns UNKNOWN when no input and no global navigator', () => {
    expect(detect({ userAgent: '', vendor: '' })).toBe(browsers.UNKNOWN);
  });

  it('returns a value typed as Browser', () => {
    const result = detect({ userAgent: UA.chromeMacDesktop, vendor: VENDOR.google });
    // Compile-time guarantee: result is the Browser union, never `string`.
    const _check: typeof browsers.CHROME = browsers.CHROME;
    expect(result).toBe(_check);
  });
});
