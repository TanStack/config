import { defineConfig, mergeConfig } from 'vitest/config'
import solid from 'vite-plugin-solid'
import { tanstackBuildConfig } from '@tanstack/config/build'

const config = defineConfig({
  plugins: [solid()],
  test: {
    name: 'solid-integration',
    watch: false,
  },
})

export default mergeConfig(
  config,
  tanstackBuildConfig({
    entry: './src/index.ts',
    srcDir: './src',
  }),
)
