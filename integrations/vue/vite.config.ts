import { mergeConfig, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { tanstackBuildConfig } from '@tanstack/config/build'

export default mergeConfig(
  tanstackBuildConfig({
    entry: 'src/index.ts',
    srcDir: 'src',
    exclude: ['src/__tests__'],
  }),
  defineConfig({
    plugins: [vue()],
    test: {
      name: 'react',
      watch: false,
    },
  }),
)
