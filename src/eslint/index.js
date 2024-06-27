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
    name: 'tanstack/eslint/rules',
    rules: {
      ...eslint.configs.recommended.rules,
      'no-async-promise-executor': 'off',
      'no-empty': 'off',
      'no-redeclare': 'off',
      'no-shadow': 'error',
      'no-undef': 'off',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  },
  {
    name: 'tanstack/prettier/rules',
    ...configPrettier,
  },
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    name: 'tanstack/import/rules',
    rules: {
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error',
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
    name: 'tanstack/ts/rules',
    rules: {
      'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'ts/ban-types': 'off',
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'ts/explicit-module-boundary-types': 'off',
      'ts/method-signature-style': ['error', 'property'],
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
      'ts/no-empty-interface': 'off',
      'ts/no-explicit-any': 'off',
      'ts/no-non-null-assertion': 'off',
      'ts/no-unnecessary-condition': 'error',
      'ts/no-unnecessary-type-assertion': 'error',
      'ts/no-unused-vars': 'off',
      'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
    },
  },
]
