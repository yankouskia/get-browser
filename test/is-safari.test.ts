import { describe, expect, it } from 'vitest';
import { isSafari } from '../src/is-safari.js';
import { UA, VENDOR } from './fixtures.js';

describe('isSafari', () => {
  it('matches Safari on macOS (vendor = Apple)', () => {
    expect(isSafari({ userAgent: UA.safariMac, vendor: VENDOR.apple })).toBe(true);
  });

  it('matches Safari on iPhone (vendor = Apple)', () => {
    expect(isSafari({ userAgent: UA.safariIPhone, vendor: VENDOR.apple })).toBe(true);
  });

  it('matches Safari on iPad (vendor = Apple)', () => {
    expect(isSafari({ userAgent: UA.safariIPad, vendor: VENDOR.apple })).toBe(true);
  });

  it('matches Safari UA without vendor (server-side use)', () => {
    expect(isSafari({ userAgent: UA.safariMac })).toBe(true);
  });

  it('rejects Chrome (even though UA contains Safari token)', () => {
    expect(isSafari({ userAgent: UA.chromeMacDesktop, vendor: VENDOR.google })).toBe(false);
    expect(isSafari({ userAgent: UA.chromeIos, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects Firefox on iOS', () => {
    expect(isSafari({ userAgent: UA.firefoxIos, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects Edge on iOS', () => {
    expect(isSafari({ userAgent: UA.edgeIos, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects Chromium-Edge with Apple-like vendor', () => {
    expect(isSafari({ userAgent: UA.edgeMacDesktop, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects Opera with Apple-like vendor', () => {
    expect(isSafari({ userAgent: UA.operaDesktop, vendor: VENDOR.apple })).toBe(false);
  });

  it('rejects when Apple vendor present but UA is not Safari', () => {
    expect(isSafari({ userAgent: UA.firefoxDesktop, vendor: VENDOR.apple })).toBe(false);
  });

  it('returns false on empty / unknown UA', () => {
    expect(isSafari({ userAgent: UA.empty })).toBe(false);
    expect(isSafari({ userAgent: UA.unknown })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isSafari()).toBe(false);
  });
});
