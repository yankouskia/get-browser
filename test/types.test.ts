import { describe, expect, it } from 'vitest';
import { browsers } from '../src/types.js';

describe('browsers enum', () => {
  it('is a frozen object', () => {
    expect(Object.isFrozen(browsers)).toBe(true);
  });

  it('has every expected key', () => {
    expect(browsers).toEqual({
      ANDROID: 'android',
      CHROME: 'chrome',
      EDGE: 'edge',
      FIREFOX: 'firefox',
      IE: 'ie',
      OPERA: 'opera',
      SAFARI: 'safari',
      UNKNOWN: 'unknown',
    });
  });

  it('rejects mutation in strict mode', () => {
    expect(() => {
      // @ts-expect-error — mutation is intentionally prevented at compile time.
      browsers.CHROME = 'something-else';
    }).toThrow(TypeError);
  });
});
