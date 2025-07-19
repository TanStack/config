import tseslint from 'typescript-eslint'
import jsoncParser from 'jsonc-eslint-parser'
import vueParser from 'vue-eslint-parser'
import yamlParser from 'yaml-eslint-parser'
import stylisticPlugin from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import-x'
import nodePlugin from 'eslint-plugin-n'
import pnpmPlugin from 'eslint-plugin-pnpm'
import globals from 'globals'
import { javascriptRules } from './javascript.js'
import { importRules } from './import.js'
import { typescriptRules } from './typescript.js'
import { nodeRules } from './node.js'
import { stylisticRules } from './stylistic.js'

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

/** @type {import('eslint').Linter.Config[]} */
export const tanstackConfig = [
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
  {
    name: 'tanstack/package-json',
    files: ['package.json', '**/package.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      pnpm: pnpmPlugin,
    },
    rules: {
      'pnpm/json-enforce-catalog': 'error',
      'pnpm/json-valid-catalog': 'error',
      'pnpm/json-prefer-workspace-settings': 'error',
    },
  },
  {
    name: 'tanstack/pnpm-workspace',
    files: ['pnpm-workspace.yaml'],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      pnpm: pnpmPlugin,
    },
    rules: {
      'pnpm/yaml-no-unused-catalog-item': 'error',
      'pnpm/yaml-no-duplicate-catalog-item': 'error',
    },
  },
]
