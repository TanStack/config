import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import-x'
import globals from 'globals'
import { javascriptRules } from './javascript.js'
import { importRules } from './import.js'
import { typescriptRules } from './typescript.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export const tanstackConfig = [
  {
    name: 'tanstack/setup',
    files: ['**/*.{js,svelte,ts,tsx,vue}'],
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
      import: pluginImport,
      // @ts-expect-error
      ts: tseslint.plugin,
    },
    rules: {
      ...javascriptRules,
      ...importRules,
      ...typescriptRules,
    },
  },
]
