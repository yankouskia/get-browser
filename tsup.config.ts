import { defineConfig } from 'tsup';

const banner = `/*! get-browser — MIT © yankouskia & contributors */`;

export default defineConfig([
  // Library: dual ESM + CJS with .d.ts for both conditions.
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    target: 'es2022',
    platform: 'neutral',
    outDir: 'dist',
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    splitting: false,
    minify: false,
    outExtension({ format }) {
      return { js: format === 'cjs' ? '.cjs' : '.mjs' };
    },
    banner: { js: banner },
  },
  // UMD/IIFE: single file for <script> consumers, exposes `window.GetBrowser`.
  {
    entry: { 'get-browser': 'src/index.ts' },
    format: ['iife'],
    target: 'es2018',
    platform: 'browser',
    globalName: 'GetBrowser',
    outDir: 'dist/umd',
    dts: false,
    sourcemap: true,
    clean: false,
    minify: true,
    splitting: false,
    treeshake: true,
    outExtension() {
      return { js: '.global.js' };
    },
    banner: { js: banner },
  },
]);
