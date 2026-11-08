import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm'],
  platform: 'node',
  unbundle: true,
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  fixedExtension: false,
  exports: {
    devExports: true,
  },
  publint: {
    strict: true,
  },
  attw: {
    profile: 'esm-only',
    level: 'error',
  },
})
