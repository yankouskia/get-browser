import { describe, expect, it } from 'vitest';
import { getEngine } from '../src/get-engine.js';
import { engines } from '../src/types.js';
import { UA } from './fixtures.js';

describe('getEngine', () => {
  describe('Blink (Chromium family)', () => {
    it.each([
      ['Chrome Windows', UA.chromeWinDesktop],
      ['Chrome macOS', UA.chromeMacDesktop],
      ['Chrome Android', UA.chromeAndroid],
      ['Chromium Linux', UA.chromiumLinux],
      ['Edge Windows (Chromium)', UA.edgeWinDesktop],
      ['Edge macOS (Chromium)', UA.edgeMacDesktop],
      ['Edge Android (Chromium)', UA.edgeAndroid],
      ['Opera desktop (OPR)', UA.operaDesktop],
      ['ChromeOS', UA.chromeOSDesktop],
      // Modern Android system WebView is Chromium-based → Blink.
      ['Android WebView', UA.androidWebView],
      // Android 4.4 Browser is already Chrome 30 → Blink.
      ['Android legacy Browser', UA.androidBrowser],
      ['Chrome 140 macOS', UA.chrome2026Mac],
      ['Chrome 140 Windows', UA.chrome2026Windows],
      ['Chrome 140 Android', UA.chrome2026Android],
      ['Edge 140 Windows', UA.edge2026Windows],
      ['Opera 117 desktop', UA.opera2026Desktop],
    ])('reports %s as blink', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.BLINK);
    });
  });

  describe('Gecko (Firefox, non-iOS)', () => {
    it.each([
      ['Firefox desktop Linux', UA.firefoxDesktop],
      ['Firefox Windows', UA.firefoxWindows],
      ['Firefox Android', UA.firefoxAndroid],
      ['Firefox 138 macOS', UA.firefox2026Mac],
      ['Firefox 138 Windows', UA.firefox2026Windows],
      ['Firefox 138 Android', UA.firefox2026Android],
    ])('reports %s as gecko', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.GECKO);
    });
  });

  describe('WebKit (Safari + every iOS browser)', () => {
    it.each([
      ['Safari macOS', UA.safariMac],
      ['Safari iPhone', UA.safariIPhone],
      ['Safari iPad', UA.safariIPad],
      ['Safari 18 macOS Sequoia', UA.safari2026MacSequoia],
      ['Safari 26 macOS Tahoe', UA.safari2026MacTahoe],
      ['Safari 18 iPhone', UA.safari2026Iphone],
      ['Safari 18 iPad', UA.safari2026Ipad],
      // The killer case: iOS browsers are forced onto WebKit despite their brand.
      ['Chrome iOS (CriOS)', UA.chromeIos],
      ['Chrome 140 iOS (CriOS)', UA.chrome2026Ios],
      ['Firefox iOS (FxiOS)', UA.firefoxIos],
      ['Firefox 138 iOS (FxiOS)', UA.firefox2026Ios],
      ['Edge iOS (EdgiOS)', UA.edgeIos],
      ['Edge 140 iOS (EdgiOS)', UA.edge2026Ios],
    ])('reports %s as webkit', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.WEBKIT);
    });
  });

  describe('Trident (Internet Explorer)', () => {
    it.each([
      ['IE 11', UA.ie11],
      ['IE 10', UA.ie10],
      ['IE 9', UA.ie9],
      ['IE 8', UA.ie8],
    ])('reports %s as trident', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.TRIDENT);
    });
  });

  describe('Presto (old Opera)', () => {
    it.each([
      ['Opera 12 Presto', UA.operaPresto],
      ['Opera Mini', UA.operaMini],
    ])('reports %s as presto', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.PRESTO);
    });
  });

  describe('EdgeHTML (legacy Edge)', () => {
    it('reports legacy Edge as edgehtml (not blink, despite the Chrome token)', () => {
      // edgeLegacy UA carries both "Chrome/52" and "Edge/15" — EdgeHTML must win.
      expect(getEngine({ userAgent: UA.edgeLegacy })).toBe(engines.EDGEHTML);
      expect(UA.edgeLegacy).toContain('Chrome/');
    });
  });

  describe('unknown / edge cases', () => {
    it.each([
      ['empty', UA.empty],
      ['unknown bot', UA.unknown],
    ])('reports %s as unknown', (_label, ua) => {
      expect(getEngine({ userAgent: ua })).toBe(engines.UNKNOWN);
    });

    it('does not throw without options', () => {
      expect(() => getEngine()).not.toThrow();
    });
  });

  describe('ordering / disambiguation', () => {
    it('"like Gecko" in a Chromium UA does NOT make it Gecko', () => {
      // Every WebKit/Blink UA contains "(KHTML, like Gecko)" — must not match Gecko.
      expect(UA.chromeWinDesktop).toContain('like Gecko');
      expect(getEngine({ userAgent: UA.chromeWinDesktop })).toBe(engines.BLINK);
    });

    it('Chrome-on-iOS is WebKit, even though detect() calls it chrome', async () => {
      const { detect } = await import('../src/detect.js');
      expect(detect({ userAgent: UA.chromeIos })).toBe('chrome');
      expect(getEngine({ userAgent: UA.chromeIos })).toBe(engines.WEBKIT);
    });

    it('legacy Edge is edgehtml while modern Edge is blink', () => {
      expect(getEngine({ userAgent: UA.edgeLegacy })).toBe(engines.EDGEHTML);
      expect(getEngine({ userAgent: UA.edgeWinDesktop })).toBe(engines.BLINK);
    });
  });
});
