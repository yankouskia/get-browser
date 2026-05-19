import { afterEach, describe, expect, it, vi } from 'vitest';
import { resolveEnvironment } from '../src/env.js';

describe('resolveEnvironment', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns empty strings when no options and no navigator', () => {
    vi.stubGlobal('navigator', undefined);
    const env = resolveEnvironment();
    expect(env.userAgent).toBe('');
    expect(env.vendor).toBe('');
    expect(env.hasChromeGlobal).toBe(false);
    expect(env.hasOperaGlobal).toBe(false);
  });

  it('reads from globalThis.navigator when no options', () => {
    vi.stubGlobal('navigator', { userAgent: 'TestUA/1.0', vendor: 'Test Inc.' });
    const env = resolveEnvironment();
    expect(env.userAgent).toBe('TestUA/1.0');
    expect(env.vendor).toBe('Test Inc.');
  });

  it('options.userAgent overrides navigator', () => {
    vi.stubGlobal('navigator', { userAgent: 'Native UA', vendor: 'Test' });
    const env = resolveEnvironment({ userAgent: 'Injected UA' });
    expect(env.userAgent).toBe('Injected UA');
  });

  it('options.vendor overrides navigator.vendor', () => {
    vi.stubGlobal('navigator', { userAgent: 'Native UA', vendor: 'Native Vendor' });
    const env = resolveEnvironment({ vendor: 'Injected' });
    expect(env.vendor).toBe('Injected');
    expect(env.userAgent).toBe('Native UA');
  });

  it('detects chrome global when present and using ambient globals', () => {
    vi.stubGlobal('navigator', { userAgent: 'x', vendor: 'y' });
    vi.stubGlobal('chrome', { runtime: {} });
    const env = resolveEnvironment();
    expect(env.hasChromeGlobal).toBe(true);
  });

  it('ignores globals when caller passes an explicit UA (deterministic for tests/SSR)', () => {
    vi.stubGlobal('navigator', { userAgent: 'x', vendor: 'y' });
    vi.stubGlobal('chrome', { runtime: {} });
    vi.stubGlobal('opr', {});
    const env = resolveEnvironment({ userAgent: 'something' });
    expect(env.hasChromeGlobal).toBe(false);
    expect(env.hasOperaGlobal).toBe(false);
  });

  it('detects opera global via either window.opera or window.opr', () => {
    vi.stubGlobal('navigator', { userAgent: 'x', vendor: '' });
    vi.stubGlobal('opera', true);
    expect(resolveEnvironment().hasOperaGlobal).toBe(true);

    vi.unstubAllGlobals();
    vi.stubGlobal('navigator', { userAgent: 'x', vendor: '' });
    vi.stubGlobal('opr', {});
    expect(resolveEnvironment().hasOperaGlobal).toBe(true);
  });
});
