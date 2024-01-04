import { mergeConfig, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { tanstackBuildConfig } from '@tanstack/config/build'

const config = defineConfig({
  plugins: [vue()],
  test: {
    name: 'vue-integration',
    watch: false,
  },
})

export default mergeConfig(
  config,
  tanstackBuildConfig({
    entry: 'src/index.ts',
    srcDir: 'src',
  }),
)
