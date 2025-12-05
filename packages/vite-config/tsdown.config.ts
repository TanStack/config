import { defineConfig } from 'tsdown'
import type { UserConfig } from 'tsdown'

const config: UserConfig = defineConfig({
  entry: ['./src/index.ts'],
  format: ['esm'],
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

export default config
