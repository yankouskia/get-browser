import { describe, expect, it } from 'vitest';
import * as api from '../src/index.js';

describe('public API surface', () => {
  it('exports the full v2.x runtime surface', () => {
    const exports = Object.keys(api).sort();
    expect(exports).toEqual([
      'browsers',
      'detect',
      'getOS',
      'isAndroid',
      'isChrome',
      'isEdge',
      'isFirefox',
      'isIE',
      'isMobile',
      'isOpera',
      'isSafari',
      'oses',
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

  it('getOS returns one of the canonical OS strings', () => {
    const result = api.getOS({ userAgent: '' });
    expect(Object.values(api.oses)).toContain(result);
  });
});
