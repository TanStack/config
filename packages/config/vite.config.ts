import { defineConfig } from 'vite'
import { tanstackViteConfig } from '@tanstack/vite-config'

export default defineConfig(
  tanstackViteConfig({
    entry: [
      './src/eslint.ts',
      './src/publish.ts',
      './src/typedoc.ts',
      './src/vite.ts',
    ],
    srcDir: './src',
    cjs: false,
  }),
)
