import { expectTypeOf } from 'expect-type';
import { describe, it } from 'vitest';
import {
  type Browser,
  browsers,
  type ClientHints,
  type DetectOptions,
  detect,
  getOS,
  isChrome,
  isMobile,
  type OS,
  oses,
} from '../src/index.js';

describe('public types', () => {
  it('detect() returns the Browser union, never plain string', () => {
    expectTypeOf(detect()).toEqualTypeOf<Browser>();
    expectTypeOf<Browser>().not.toEqualTypeOf<string>();
  });

  it('getOS() returns the OS union, never plain string', () => {
    expectTypeOf(getOS()).toEqualTypeOf<OS>();
    expectTypeOf<OS>().not.toEqualTypeOf<string>();
  });

  it('every predicate has signature (options?: DetectOptions) => boolean', () => {
    expectTypeOf(isChrome).parameters.toEqualTypeOf<[options?: DetectOptions]>();
    expectTypeOf(isChrome).returns.toBeBoolean();
    expectTypeOf(isMobile).returns.toBeBoolean();
  });

  it('getOS() takes the same DetectOptions shape as the predicates', () => {
    expectTypeOf(getOS).parameters.toEqualTypeOf<[options?: DetectOptions]>();
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

  it('OS is the exact union of the oses values', () => {
    type Expected = 'android' | 'chromeos' | 'ios' | 'linux' | 'macos' | 'windows' | 'unknown';
    expectTypeOf<OS>().toEqualTypeOf<Expected>();
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

  it('oses object is readonly at the type level', () => {
    expectTypeOf(oses).toEqualTypeOf<{
      readonly ANDROID: 'android';
      readonly CHROMEOS: 'chromeos';
      readonly IOS: 'ios';
      readonly LINUX: 'linux';
      readonly MACOS: 'macos';
      readonly WINDOWS: 'windows';
      readonly UNKNOWN: 'unknown';
    }>();
  });

  it('DetectOptions accepts all-optional inputs including clientHints', () => {
    expectTypeOf<DetectOptions>().toEqualTypeOf<{
      readonly userAgent?: string;
      readonly vendor?: string;
      readonly clientHints?: ClientHints;
    }>();
  });

  it('ClientHints.platform is an optional string', () => {
    expectTypeOf<ClientHints>().toEqualTypeOf<{
      readonly platform?: string;
    }>();
  });
});
