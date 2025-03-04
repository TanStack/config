// https://github.com/un-ts/eslint-plugin-import-x

/** @type {import('eslint').Linter.RulesRecord} */
export const importRules = {
  /** Bans the use of inline type-only markers for named imports */
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  /** Reports any imports that come after non-import statements */
  'import/first': 'error',
  /** Stylistic preference */
  'import/newline-after-import': 'error',
  /** No require() or module.exports */
  'import/no-commonjs': 'error',
  /** No import loops */
  'import/no-cycle': 'error',
  /** Reports if a resolved path is imported more than once */
  'import/no-duplicates': 'error',
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
}
