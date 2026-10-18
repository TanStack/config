import { tanstackConfig } from '@tanstack/oxfmt-config'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...tanstackConfig,
  ignorePatterns: [...tanstackConfig.ignorePatterns, '**/snap'],
})
