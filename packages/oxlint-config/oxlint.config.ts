import { defineConfig } from 'oxlint'
import { tanstackConfig } from '@tanstack/oxlint-config'

export default defineConfig({
  extends: [tanstackConfig],
})
