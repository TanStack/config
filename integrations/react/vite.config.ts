import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackViteConfig } from '@tanstack/vite-config'

const config = defineConfig({
  plugins: [react()],
  test: {
    name: 'react-integration',
    watch: false,
  },
})

export default mergeConfig(
  config,
  tanstackViteConfig({
    entry: ['./src/index.ts'],
    srcDir: './src',
  }),
)
