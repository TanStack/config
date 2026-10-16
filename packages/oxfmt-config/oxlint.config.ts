import { tanstackConfig } from '@tanstack/oxlint-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [tanstackConfig],
  env: tanstackConfig.env,
  ignorePatterns: tanstackConfig.ignorePatterns,
})
