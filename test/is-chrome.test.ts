import { describe, expect, it } from 'vitest';
import { isChrome } from '../src/is-chrome.js';
import { UA, VENDOR } from './fixtures.js';

describe('isChrome', () => {
  it('matches Chrome on desktop Windows', () => {
    expect(isChrome({ userAgent: UA.chromeWinDesktop, vendor: VENDOR.google })).toBe(true);
  });

  it('matches Chrome on desktop macOS', () => {
    expect(isChrome({ userAgent: UA.chromeMacDesktop, vendor: VENDOR.google })).toBe(true);
  });

  it('matches Chrome on Android', () => {
    expect(isChrome({ userAgent: UA.chromeAndroid, vendor: VENDOR.google })).toBe(true);
  });

  it('matches Chrome on iOS via CriOS token', () => {
    expect(isChrome({ userAgent: UA.chromeIos })).toBe(true);
  });

  it('matches pure Chromium', () => {
    expect(isChrome({ userAgent: UA.chromiumLinux })).toBe(true);
  });

  it('rejects Chromium-based Edge', () => {
    expect(isChrome({ userAgent: UA.edgeWinDesktop, vendor: VENDOR.google })).toBe(false);
    expect(isChrome({ userAgent: UA.edgeAndroid })).toBe(false);
    expect(isChrome({ userAgent: UA.edgeIos })).toBe(false);
  });

  it('rejects Opera (OPR token)', () => {
    expect(isChrome({ userAgent: UA.operaDesktop, vendor: VENDOR.google })).toBe(false);
  });

  it('rejects Safari', () => {
    expect(isChrome({ userAgent: UA.safariMac, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects Firefox', () => {
    expect(isChrome({ userAgent: UA.firefoxDesktop })).toBe(false);
  });

  it('rejects IE', () => {
    expect(isChrome({ userAgent: UA.ie11 })).toBe(false);
  });

  it('returns false for an empty environment', () => {
    expect(isChrome({ userAgent: UA.empty })).toBe(false);
    expect(isChrome({ userAgent: UA.unknown })).toBe(false);
  });

  it('reads from globalThis.navigator when no options passed', () => {
    expect(isChrome()).toBe(false);
  });
});
