import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import-x'
// @ts-expect-error
import pluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import { javascriptRules } from './javascript.js'
import { importRules } from './import.js'
import { typescriptRules } from './typescript.js'
import { unicornRules } from './unicorn.js'

const GLOB_INCLUDE = ['**/*.{js,svelte,ts,tsx,vue}']

const GLOB_EXCLUDE = [
  '**/.nx/**',
  '**/.svelte-kit/**',
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
  '**/snap/**',
]

/** @type {import('eslint').Linter.FlatConfig[]} */
export const tanstackConfig = [
  {
    name: 'tanstack/ignores',
    ignores: GLOB_EXCLUDE,
  },
  {
    name: 'tanstack/setup',
    files: GLOB_INCLUDE,
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      // @ts-expect-error
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        extraFileExtensions: ['.svelte', '.vue'],
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      // @ts-expect-error
      ts: tseslint.plugin,
      // @ts-expect-error
      import: pluginImport,
      unicorn: pluginUnicorn,
    },
    rules: {
      ...javascriptRules,
      ...typescriptRules,
      ...importRules,
      ...unicornRules,
    },
  },
]
