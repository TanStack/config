import tseslint from 'typescript-eslint'
import vueparser from 'vue-eslint-parser'
import stylisticJs from '@stylistic/eslint-plugin-js'
import pluginImport from 'eslint-plugin-import-x'
import pluginNode from 'eslint-plugin-n'
import globals from 'globals'
import { javascriptRules } from './javascript.js'
import { importRules } from './import.js'
import { typescriptRules } from './typescript.js'
import { nodeRules } from './node.js'
import { stylisticRules } from './stylistic.js'

const JS_GLOB_INCLUDE = ['**/*.{js,ts,tsx}']
const VUE_GLOB_INCLUDE = ['**/*.vue']

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
  '@stylistic/js': stylisticJs,
  '@typescript-eslint': tseslint.plugin,
  import: pluginImport,
  node: pluginNode,
}

/** @type {import('eslint').Linter.Config[]} */
export const tanstackConfig = [
  {
    name: 'tanstack/ignores',
    ignores: GLOB_EXCLUDE,
  },
  {
    name: 'tanstack/setup',
    files: JS_GLOB_INCLUDE,
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      // @ts-expect-error
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
    files: VUE_GLOB_INCLUDE,
    languageOptions: {
      parser: vueparser,
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
