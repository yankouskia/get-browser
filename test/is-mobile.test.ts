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
    ['Android WebView', UA.androidWebView],
    ['Opera Mini', UA.operaMini],
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
