import { defineConfig, mergeConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { tanstackViteConfig } from '@tanstack/vite-config'

const config = defineConfig({
  plugins: [vue()],
  test: {
    name: 'vue-integration',
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
