import { describe, expect, it } from 'vitest';
import * as api from '../src/index.js';

describe('public API surface', () => {
  it('exports the full v1.x surface plus types', () => {
    const exports = Object.keys(api).sort();
    expect(exports).toEqual([
      'browsers',
      'detect',
      'isAndroid',
      'isChrome',
      'isEdge',
      'isFirefox',
      'isIE',
      'isMobile',
      'isOpera',
      'isSafari',
    ]);
  });

  it('every predicate returns a strict boolean', () => {
    const predicates: Array<(opts?: { userAgent?: string; vendor?: string }) => unknown> = [
      api.isAndroid,
      api.isChrome,
      api.isEdge,
      api.isFirefox,
      api.isIE,
      api.isMobile,
      api.isOpera,
      api.isSafari,
    ];
    for (const fn of predicates) {
      expect(typeof fn({ userAgent: '', vendor: '' })).toBe('boolean');
    }
  });
});
