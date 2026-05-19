import { describe, expect, it } from 'vitest';
import { isMobile } from '../src/is-mobile.js';
import { UA } from './fixtures.js';

describe('isMobile', () => {
  it.each([
    ['Chrome on Android', UA.chromeAndroid],
    ['Edge on Android', UA.edgeAndroid],
    ['Firefox on Android', UA.firefoxAndroid],
    ['Safari iPhone', UA.safariIPhone],
    ['Chrome iOS', UA.chromeIos],
    ['Firefox iOS', UA.firefoxIos],
    ['Edge iOS', UA.edgeIos],
    ['Safari iPad', UA.safariIPad],
    ['Android WebView', UA.androidWebView],
    ['Opera Mini', UA.operaMini],
    ['Chrome 140 Android', UA.chrome2026Android],
    ['Chrome 140 iOS', UA.chrome2026Ios],
    ['Edge 140 Android', UA.edge2026Android],
    ['Edge 140 iOS', UA.edge2026Ios],
    ['Firefox 138 Android', UA.firefox2026Android],
    ['Firefox 138 iOS', UA.firefox2026Ios],
    ['Safari 18 iPhone', UA.safari2026Iphone],
    ['Safari 18 iPad', UA.safari2026Ipad],
  ])('matches %s', (_label, ua) => {
    expect(isMobile({ userAgent: ua })).toBe(true);
  });

  it.each([
    ['Chrome desktop Windows', UA.chromeWinDesktop],
    ['Chrome desktop macOS', UA.chromeMacDesktop],
    ['Firefox desktop', UA.firefoxDesktop],
    ['Safari desktop', UA.safariMac],
    ['Edge desktop', UA.edgeWinDesktop],
    ['Opera desktop', UA.operaDesktop],
    ['Chrome 140 macOS', UA.chrome2026Mac],
    ['Chrome 140 Windows', UA.chrome2026Windows],
    ['Edge 140 Windows', UA.edge2026Windows],
    ['Firefox 138 macOS', UA.firefox2026Mac],
    ['Safari 18 macOS Sequoia', UA.safari2026MacSequoia],
    ['Safari 26 macOS Tahoe', UA.safari2026MacTahoe],
    ['Opera 117 desktop', UA.opera2026Desktop],
    ['IE 11', UA.ie11],
    ['empty', UA.empty],
    ['unknown', UA.unknown],
  ])('rejects %s', (_label, ua) => {
    expect(isMobile({ userAgent: ua })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isMobile()).toBe(false);
  });
});
