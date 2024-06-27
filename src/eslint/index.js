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
      'no-var': 'error',
      'prefer-const': 'error',
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
    name: 'tanstack/ts',
    rules: {
      'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'ts/ban-ts-comment': ['error', { 'allow-with-description': true }],
      'ts/consistent-type-imports': ['error', { prefer: 'type-imports' }],
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
      'ts/no-namespace': 'error',
      'ts/no-misused-new': 'error',
      'ts/no-unnecessary-condition': 'error',
      'ts/no-unnecessary-type-assertion': 'error',
      'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
      'ts/prefer-as-const': 'error',
      'ts/prefer-for-of': 'error',
      'ts/triple-slash-reference': 'error',
    },
  },
]
