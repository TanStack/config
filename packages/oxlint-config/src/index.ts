import { fileURLToPath } from 'node:url'
import { defineConfig } from 'oxlint'
import { javascriptRules } from './javascript.ts'
import { importRules } from './import.ts'
import { typescriptRules } from './typescript.ts'
import { nodeRules } from './node.ts'
import { stylisticRules } from './stylistic.ts'
import type { OxlintConfig } from 'oxlint'

/**
 * JS plugins are resolved from this package, so consumers don't need to
 * install them, and get the versions this config was written against.
 */
const resolve = (specifier: string): string =>
  fileURLToPath(import.meta.resolve(specifier))

/**
 * Oxlint does not inherit `env`, `ignorePatterns` or `settings` through
 * `extends`, so `env` and `ignorePatterns` are always set, for consumers to
 * pass through.
 */
type TanstackConfig = OxlintConfig &
  Required<Pick<OxlintConfig, 'env' | 'ignorePatterns'>>

export const tanstackConfig: TanstackConfig = defineConfig({
  plugins: ['import', 'typescript', 'unicorn'],
  jsPlugins: [
    { name: 'import-js', specifier: resolve('eslint-plugin-import-x') },
    { name: '@stylistic', specifier: resolve('@stylistic/eslint-plugin') },
    { name: 'tanstack', specifier: resolve('@tanstack/oxlint-config/plugin') },
  ],
  categories: {
    correctness: 'off',
  },
  options: {
    typeAware: true,
  },
  env: {
    browser: true,
    es2020: true,
  },
  ignorePatterns: [
    '**/.nx/**',
    '**/.svelte-kit/**',
    '**/build/**',
    '**/coverage/**',
    '**/dist/**',
    '**/snap/**',
    '**/vite.config.*.timestamp-*.*',
  ],
  rules: {
    ...javascriptRules,
    ...typescriptRules,
    ...importRules,
    ...nodeRules,
    ...stylisticRules,
  },
})

export {
  javascriptRules,
  importRules,
  typescriptRules,
  nodeRules,
  stylisticRules,
}
