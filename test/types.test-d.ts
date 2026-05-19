import { expectTypeOf } from 'expect-type';
import { describe, it } from 'vitest';
import {
  type Browser,
  browsers,
  type DetectOptions,
  detect,
  isChrome,
  isMobile,
} from '../src/index.js';

describe('public types', () => {
  it('detect() returns the Browser union, never plain string', () => {
    expectTypeOf(detect()).toEqualTypeOf<Browser>();
    expectTypeOf<Browser>().not.toEqualTypeOf<string>();
  });

  it('every predicate has signature (options?: DetectOptions) => boolean', () => {
    expectTypeOf(isChrome).parameters.toEqualTypeOf<[options?: DetectOptions]>();
    expectTypeOf(isChrome).returns.toBeBoolean();
    expectTypeOf(isMobile).returns.toBeBoolean();
  });

  it('Browser is the exact union of the browsers values', () => {
    type Expected =
      | 'android'
      | 'chrome'
      | 'edge'
      | 'firefox'
      | 'ie'
      | 'opera'
      | 'safari'
      | 'unknown';
    expectTypeOf<Browser>().toEqualTypeOf<Expected>();
  });

  it('browsers object is readonly at the type level', () => {
    expectTypeOf(browsers).toEqualTypeOf<{
      readonly ANDROID: 'android';
      readonly CHROME: 'chrome';
      readonly EDGE: 'edge';
      readonly FIREFOX: 'firefox';
      readonly IE: 'ie';
      readonly OPERA: 'opera';
      readonly SAFARI: 'safari';
      readonly UNKNOWN: 'unknown';
    }>();
  });

  it('DetectOptions accepts all-optional inputs', () => {
    expectTypeOf<DetectOptions>().toEqualTypeOf<{
      readonly userAgent?: string;
      readonly vendor?: string;
    }>();
  });
});
