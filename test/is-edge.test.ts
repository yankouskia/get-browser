import { describe, expect, it } from 'vitest';
import { isEdge } from '../src/is-edge.js';
import { UA } from './fixtures.js';

describe('isEdge', () => {
  it('matches Chromium Edge on Windows (Edg/)', () => {
    expect(isEdge({ userAgent: UA.edgeWinDesktop })).toBe(true);
  });

  it('matches Chromium Edge on macOS', () => {
    expect(isEdge({ userAgent: UA.edgeMacDesktop })).toBe(true);
  });

  it('matches Edge on Android (EdgA/)', () => {
    expect(isEdge({ userAgent: UA.edgeAndroid })).toBe(true);
  });

  it('matches Edge on iOS (EdgiOS/)', () => {
    expect(isEdge({ userAgent: UA.edgeIos })).toBe(true);
  });

  it('matches legacy EdgeHTML (Edge/)', () => {
    expect(isEdge({ userAgent: UA.edgeLegacy })).toBe(true);
  });

  it('rejects regular Chrome', () => {
    expect(isEdge({ userAgent: UA.chromeWinDesktop })).toBe(false);
    expect(isEdge({ userAgent: UA.chromeMacDesktop })).toBe(false);
  });

  it('rejects Firefox, Safari, Opera, IE, Android WebView', () => {
    expect(isEdge({ userAgent: UA.firefoxDesktop })).toBe(false);
    expect(isEdge({ userAgent: UA.safariMac })).toBe(false);
    expect(isEdge({ userAgent: UA.operaDesktop })).toBe(false);
    expect(isEdge({ userAgent: UA.ie11 })).toBe(false);
    expect(isEdge({ userAgent: UA.androidWebView })).toBe(false);
  });

  it('returns false on empty / unknown UA', () => {
    expect(isEdge({ userAgent: UA.empty })).toBe(false);
    expect(isEdge({ userAgent: UA.unknown })).toBe(false);
  });

  it('does not throw without options', () => {
    expect(isEdge()).toBe(false);
  });
});
