import { describe, expect, it } from 'vitest';
import { isIE } from '../src/is-ie.js';
import { UA } from './fixtures.js';

describe('isIE', () => {
  it.each([
    ['IE 8 (MSIE)', UA.ie8],
    ['IE 9 (MSIE)', UA.ie9],
    ['IE 10 (MSIE)', UA.ie10],
    ['IE 11 (Trident)', UA.ie11],
  ])('matches %s', (_label, ua) => {
    expect(isIE({ userAgent: ua })).toBe(true);
  });

  it.each([
    ['Chromium-Edge', UA.edgeWinDesktop],
    ['legacy Edge', UA.edgeLegacy],
    ['Chrome', UA.chromeWinDesktop],
    ['Firefox', UA.firefoxWindows],
    ['Safari', UA.safariMac],
    ['Opera', UA.operaDesktop],
    ['empty', UA.empty],
  ])('rejects %s', (_label, ua) => {
    expect(isIE({ userAgent: ua })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isIE()).toBe(false);
  });
});
