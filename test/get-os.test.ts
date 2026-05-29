import { describe, expect, it } from 'vitest';
import { getOS } from '../src/get-os.js';
import { oses } from '../src/types.js';
import { CH_PLATFORM, UA } from './fixtures.js';

describe('getOS', () => {
  describe('UA-string heuristic', () => {
    it.each([
      ['Chrome Windows', UA.chromeWinDesktop, oses.WINDOWS],
      ['Chrome macOS', UA.chromeMacDesktop, oses.MACOS],
      ['Chrome Android', UA.chromeAndroid, oses.ANDROID],
      ['Chrome iOS', UA.chromeIos, oses.IOS],
      ['Chromium Linux', UA.chromiumLinux, oses.LINUX],
      ['Edge Windows', UA.edgeWinDesktop, oses.WINDOWS],
      ['Edge macOS', UA.edgeMacDesktop, oses.MACOS],
      ['Edge Android', UA.edgeAndroid, oses.ANDROID],
      ['Edge iOS', UA.edgeIos, oses.IOS],
      ['Edge legacy Windows', UA.edgeLegacy, oses.WINDOWS],
      ['Firefox desktop (Linux)', UA.firefoxDesktop, oses.LINUX],
      ['Firefox Windows', UA.firefoxWindows, oses.WINDOWS],
      ['Firefox Android', UA.firefoxAndroid, oses.ANDROID],
      ['Firefox iOS', UA.firefoxIos, oses.IOS],
      ['Safari macOS', UA.safariMac, oses.MACOS],
      ['Safari iPhone', UA.safariIPhone, oses.IOS],
      ['Safari iPad', UA.safariIPad, oses.IOS],
      ['Opera desktop', UA.operaDesktop, oses.WINDOWS],
      ['Opera Presto', UA.operaPresto, oses.WINDOWS],
      ['Opera Mini', UA.operaMini, oses.ANDROID],
      ['IE 11', UA.ie11, oses.WINDOWS],
      ['IE 10', UA.ie10, oses.WINDOWS],
      ['IE 9', UA.ie9, oses.WINDOWS],
      ['IE 8', UA.ie8, oses.WINDOWS],
      ['Android WebView', UA.androidWebView, oses.ANDROID],
      ['Android legacy browser', UA.androidBrowser, oses.ANDROID],
      ['ChromeOS', UA.chromeOSDesktop, oses.CHROMEOS],
      // 2026 fixtures — version-stable smoke tests
      ['Chrome 140 macOS', UA.chrome2026Mac, oses.MACOS],
      ['Chrome 140 Windows', UA.chrome2026Windows, oses.WINDOWS],
      ['Chrome 140 Android', UA.chrome2026Android, oses.ANDROID],
      ['Chrome 140 iOS', UA.chrome2026Ios, oses.IOS],
      ['Edge 140 Windows', UA.edge2026Windows, oses.WINDOWS],
      ['Edge 140 macOS', UA.edge2026Mac, oses.MACOS],
      ['Edge 140 Android', UA.edge2026Android, oses.ANDROID],
      ['Edge 140 iOS', UA.edge2026Ios, oses.IOS],
      ['Firefox 138 macOS', UA.firefox2026Mac, oses.MACOS],
      ['Firefox 138 Windows', UA.firefox2026Windows, oses.WINDOWS],
      ['Firefox 138 Android', UA.firefox2026Android, oses.ANDROID],
      ['Firefox 138 iOS', UA.firefox2026Ios, oses.IOS],
      ['Safari 18 macOS Sequoia', UA.safari2026MacSequoia, oses.MACOS],
      ['Safari 26 macOS Tahoe', UA.safari2026MacTahoe, oses.MACOS],
      ['Safari 18 iPhone', UA.safari2026Iphone, oses.IOS],
      ['Safari 18 iPad', UA.safari2026Ipad, oses.IOS],
      ['Opera 117 desktop', UA.opera2026Desktop, oses.WINDOWS],
    ])('reports %s as %s', (_label, ua, expected) => {
      expect(getOS({ userAgent: ua })).toBe(expected);
    });

    it.each([
      ['empty', UA.empty],
      ['unknown bot', UA.unknown],
    ])('reports %s as oses.UNKNOWN', (_label, ua) => {
      expect(getOS({ userAgent: ua })).toBe(oses.UNKNOWN);
    });
  });

  describe('ordering / disambiguation', () => {
    it('Android wins over Linux even though Android UAs contain "Linux"', () => {
      // Real Android UAs include "Linux" — the order in getOS() catches Android first.
      expect(getOS({ userAgent: UA.chromeAndroid })).toBe(oses.ANDROID);
      expect(UA.chromeAndroid).toContain('Linux');
    });

    it('ChromeOS wins over Linux despite the X11 token', () => {
      // ChromeOS UAs look Linux-y (X11 + AppleWebKit). The `CrOS` token wins.
      expect(getOS({ userAgent: UA.chromeOSDesktop })).toBe(oses.CHROMEOS);
      expect(UA.chromeOSDesktop).toContain('X11');
    });

    it('iOS wins over macOS for a UA that contains both tokens', () => {
      // iPhone/iPad UAs mention "Mac OS X" inside "iPhone OS X like Mac OS X".
      expect(getOS({ userAgent: UA.safariIPhone })).toBe(oses.IOS);
      expect(UA.safariIPhone).toContain('Mac OS X');
    });
  });

  describe('Client Hints', () => {
    it.each([
      [CH_PLATFORM.macOS, oses.MACOS],
      [CH_PLATFORM.windows, oses.WINDOWS],
      [CH_PLATFORM.linux, oses.LINUX],
      [CH_PLATFORM.iOS, oses.IOS],
      [CH_PLATFORM.android, oses.ANDROID],
      [CH_PLATFORM.chromeOS, oses.CHROMEOS],
    ])('maps %s onto %s', (hint, expected) => {
      expect(getOS({ clientHints: { platform: hint } })).toBe(expected);
    });

    it('tolerates an unquoted Sec-CH-UA-Platform value', () => {
      expect(getOS({ clientHints: { platform: CH_PLATFORM.unquoted } })).toBe(oses.MACOS);
    });

    it('is case-insensitive (lowercase "windows", mixed-case "WiNdOwS")', () => {
      expect(getOS({ clientHints: { platform: '"windows"' } })).toBe(oses.WINDOWS);
      expect(getOS({ clientHints: { platform: '"WiNdOwS"' } })).toBe(oses.WINDOWS);
    });

    it('maps "Chromium OS" as well as "Chrome OS"', () => {
      expect(getOS({ clientHints: { platform: '"Chromium OS"' } })).toBe(oses.CHROMEOS);
    });

    it('lets the client hint override a conflicting UA string', () => {
      // UA says iOS, the hint says Android — the hint wins (this is the
      // forward-compatible path Chrome's UA Reduction pushes you toward).
      expect(
        getOS({
          userAgent: UA.safariIPhone,
          clientHints: { platform: '"Android"' },
        }),
      ).toBe(oses.ANDROID);
    });

    it('falls back to UA when the hint is empty or unknown', () => {
      expect(
        getOS({
          userAgent: UA.chromeWinDesktop,
          clientHints: { platform: CH_PLATFORM.empty },
        }),
      ).toBe(oses.WINDOWS);
      expect(
        getOS({
          userAgent: UA.chromeWinDesktop,
          clientHints: { platform: '"PlayStation 5"' },
        }),
      ).toBe(oses.WINDOWS);
    });

    it('returns UNKNOWN when both the hint and the UA are unhelpful', () => {
      expect(
        getOS({
          userAgent: UA.unknown,
          clientHints: { platform: '"Mystery OS"' },
        }),
      ).toBe(oses.UNKNOWN);
    });
  });

  it('does not throw without options', () => {
    expect(() => getOS()).not.toThrow();
  });
});
