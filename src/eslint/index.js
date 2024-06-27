import tseslint from 'typescript-eslint'
import pluginImport from 'eslint-plugin-import-x'
import globals from 'globals'
// @ts-expect-error
import eslint from '@eslint/js'
// @ts-expect-error
import configPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export const rootConfig = [
  {
    name: 'tanstack/setup',
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2020,
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        extraFileExtensions: ['.js', '.svelte', '.vue'],
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      import: pluginImport,
      ts: tseslint.plugin,
    },
  },
  {
    name: 'tanstack/js',
    rules: {
      ...eslint.configs.recommended.rules,
      'no-shadow': 'error',
      /** Handled by TypeScript */
      'no-undef': 'off',
      /** Prefer let and const */
      'no-var': 'error',
      /** Prefer const if never re-assigned */
      'prefer-const': 'error',
      /** Stylistic consistency */
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  {
    name: 'tanstack/prettier',
    ...configPrettier,
  },
  {
    name: 'tanstack/import',
    rules: {
      /** Stylistic preference */
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error',
      /** Stylistic preference */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
        },
      ],
    },
  },
  {
    name: 'tanstack/ts',
    rules: {
      /** Prefer Array<T> format */
      'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      /** Prevent @ts-ignore, allow @ts-expect-error */
      'ts/ban-ts-comment': ['error', { 'ts-expect-error': false }],
      /** Enforce import type { T } */
      'ts/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      /** Shorthand method style is less strict */
      'ts/method-signature-style': ['error', 'property'],
      /** Enforces generic type convention */
      'ts/naming-convention': [
        'error',
        {
          selector: 'typeParameter',
          format: ['PascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
          custom: {
            regex: '^(T|T[A-Z][A-Za-z]+)$',
            match: true,
          },
        },
      ],
      /** From recommended preset */
      'ts/no-namespace': 'error',
      /** From recommended preset */
      'ts/no-misused-new': 'error',
      /** Detects conditionals which will always evaluate truthy or falsy */
      'ts/no-unnecessary-condition': 'error',
      /** Checks if the the explicit type is identical to the inferred type */
      'ts/no-unnecessary-type-assertion': 'error',
      /** Don't over-define types for simple things like strings */
      'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
      /** Newer strategy */
      'ts/prefer-as-const': 'error',
      /** From recommended preset */
      'ts/prefer-for-of': 'error',
      /** From recommended preset */
      'ts/triple-slash-reference': 'error',
    },
  },
]
