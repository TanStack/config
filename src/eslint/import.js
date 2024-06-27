/** @type {import('eslint').Linter.FlatConfig} */
export const importRules = {
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
}
