import { mergeConfig, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackBuildConfig } from '@tanstack/config/build'

export default mergeConfig(
  tanstackBuildConfig({
    entry: 'src/index.ts',
    srcDir: 'src',
    exclude: ['src/__tests__'],
  }),
  defineConfig({
    plugins: [react()],
    test: {
      name: 'react',
      watch: false,
    },
  }),
)
