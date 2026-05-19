import { describe, expect, it } from 'vitest';
import { isOpera } from '../src/is-opera.js';
import { UA } from './fixtures.js';

describe('isOpera', () => {
  it('matches Chromium-era Opera (OPR/)', () => {
    expect(isOpera({ userAgent: UA.operaDesktop })).toBe(true);
  });

  it('matches Presto-era Opera', () => {
    expect(isOpera({ userAgent: UA.operaPresto })).toBe(true);
  });

  it('matches Opera Mini', () => {
    expect(isOpera({ userAgent: UA.operaMini })).toBe(true);
  });

  it('rejects Chrome, Edge, Firefox, Safari, IE, Android', () => {
    expect(isOpera({ userAgent: UA.chromeWinDesktop })).toBe(false);
    expect(isOpera({ userAgent: UA.edgeWinDesktop })).toBe(false);
    expect(isOpera({ userAgent: UA.firefoxDesktop })).toBe(false);
    expect(isOpera({ userAgent: UA.safariMac })).toBe(false);
    expect(isOpera({ userAgent: UA.ie11 })).toBe(false);
    expect(isOpera({ userAgent: UA.androidWebView })).toBe(false);
  });

  it('returns false on empty / unknown UA', () => {
    expect(isOpera({ userAgent: UA.empty })).toBe(false);
    expect(isOpera({ userAgent: UA.unknown })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isOpera()).toBe(false);
  });
});
