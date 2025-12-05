import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import stylisticPlugin from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import-x'
import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'
import { javascriptRules } from './javascript.js'
import { importRules } from './import.js'
import { typescriptRules } from './typescript.js'
import { nodeRules } from './node.js'
import { stylisticRules } from './stylistic.js'
import type { Linter } from 'eslint'

const GLOB_EXCLUDE = [
  '**/.nx/**',
  '**/.svelte-kit/**',
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
  '**/snap/**',
  '**/vite.config.*.timestamp-*.*',
]

const jsRules = {
  ...javascriptRules,
  ...typescriptRules,
  ...importRules,
  ...nodeRules,
  ...stylisticRules,
}

const jsPlugins = {
  '@stylistic': stylisticPlugin,
  '@typescript-eslint': tseslint.plugin,
  import: importPlugin,
  node: nodePlugin,
}

export const tanstackConfig: Array<Linter.Config> = [
  {
    name: 'tanstack/ignores',
    ignores: GLOB_EXCLUDE,
  },
  {
    name: 'tanstack/javascript',
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    // @ts-expect-error
    plugins: jsPlugins,
    rules: jsRules,
  },
  {
    name: 'tanstack/vue',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        parser: tseslint.parser,
        project: true,
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
      },
    },
    // @ts-expect-error
    plugins: jsPlugins,
    rules: jsRules,
  },
]
