import { tanstackViteConfig } from '@tanstack/vite-config'
import { defineConfig, mergeConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    name: 'vanilla-integration',
    watch: false,
  },
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: './src/index.ts',
    srcDir: './src',
  }),
)
