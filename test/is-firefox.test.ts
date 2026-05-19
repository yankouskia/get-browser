import { describe, expect, it } from 'vitest';
import { isFirefox } from '../src/is-firefox.js';
import { UA } from './fixtures.js';

describe('isFirefox', () => {
  it.each([
    ['linux desktop', UA.firefoxDesktop],
    ['windows desktop', UA.firefoxWindows],
    ['android', UA.firefoxAndroid],
    ['iOS (FxiOS)', UA.firefoxIos],
  ])('matches Firefox on %s', (_label, ua) => {
    expect(isFirefox({ userAgent: ua })).toBe(true);
  });

  it.each([
    ['Chrome', UA.chromeWinDesktop],
    ['Edge', UA.edgeWinDesktop],
    ['Safari', UA.safariMac],
    ['Opera', UA.operaDesktop],
    ['IE 11', UA.ie11],
    ['Android WebView', UA.androidWebView],
    ['empty', UA.empty],
    ['unknown bot', UA.unknown],
  ])('rejects %s', (_label, ua) => {
    expect(isFirefox({ userAgent: ua })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isFirefox()).toBe(false);
  });
});
