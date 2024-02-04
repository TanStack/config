import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackBuildConfig } from '@tanstack/config/build'

const config = defineConfig({
  plugins: [react()],
  test: {
    name: 'react-integration',
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
