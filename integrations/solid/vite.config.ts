import { defineConfig, mergeConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'
import { tanstackViteConfig } from '@tanstack/config/vite'

const config = defineConfig({
  plugins: [solid()],
  test: {
    name: 'solid-integration',
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
