import { tanstackViteConfig } from '@tanstack/vite-config'
import vue from '@vitejs/plugin-vue'
import { defineConfig, mergeConfig } from 'vitest/config'

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
