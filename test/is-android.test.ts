import { describe, expect, it } from 'vitest';
import { isAndroid } from '../src/is-android.js';
import { UA } from './fixtures.js';

describe('isAndroid', () => {
  it('matches Android system WebView', () => {
    expect(isAndroid({ userAgent: UA.androidWebView })).toBe(true);
  });

  it('matches the legacy Android Browser', () => {
    expect(isAndroid({ userAgent: UA.androidBrowser })).toBe(true);
  });

  it('also matches Chrome-on-Android (UA contains Mozilla/5.0 + Android + AppleWebKit)', () => {
    // This is by design — Chrome-on-Android UAs contain all three tokens. The
    // top-level detect() handles disambiguation by ordering isChrome before
    // isAndroid. The unit predicate is intentionally inclusive.
    expect(isAndroid({ userAgent: UA.chromeAndroid })).toBe(true);
  });

  it('rejects desktop browsers', () => {
    expect(isAndroid({ userAgent: UA.chromeWinDesktop })).toBe(false);
    expect(isAndroid({ userAgent: UA.firefoxWindows })).toBe(false);
    expect(isAndroid({ userAgent: UA.safariMac })).toBe(false);
    expect(isAndroid({ userAgent: UA.ie11 })).toBe(false);
  });

  it('rejects iOS browsers', () => {
    expect(isAndroid({ userAgent: UA.safariIPhone })).toBe(false);
    expect(isAndroid({ userAgent: UA.chromeIos })).toBe(false);
    expect(isAndroid({ userAgent: UA.firefoxIos })).toBe(false);
  });

  it('returns false on empty / unknown UA', () => {
    expect(isAndroid({ userAgent: UA.empty })).toBe(false);
    expect(isAndroid({ userAgent: UA.unknown })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isAndroid()).toBe(false);
  });
});
