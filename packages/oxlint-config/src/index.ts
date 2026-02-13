import type { OxlintConfig } from 'oxlint'
import { defineConfig } from 'oxlint'
import { javascriptConfig } from './javascript.ts'
import { importConfig } from './import.ts'
import { typescriptConfig } from './typescript.ts'
import { nodeConfig } from './node.ts'
import { stylisticConfig } from './stylistic.ts'

const GLOB_EXCLUDE = [
  '**/.nx/**',
  '**/.svelte-kit/**',
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
  '**/snap/**',
  '**/vite.config.*.timestamp-*.*',
]

export const tanstackConfig: OxlintConfig = defineConfig({
  extends: [
    javascriptConfig,
    typescriptConfig,
    importConfig,
    nodeConfig,
    stylisticConfig,
  ],
  env: {
    builtin: true,
    es2020: true,
    browser: true,
  },
  ignorePatterns: GLOB_EXCLUDE,
})
