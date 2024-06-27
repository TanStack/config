// https://github.com/un-ts/eslint-plugin-import-x

/** @type {import('eslint').Linter.FlatConfig} */
export const importRules = {
  name: 'tanstack/import',
  rules: {
    /** Stylistic preference */
    'import/newline-after-import': 'error',
    /** No require() or module.exports */
    'import/no-commonjs': 'error',
    /** No import loops */
    'import/no-cycle': 'error',
    /** Reports if a resolved path is imported more than once */
    'import/no-duplicates': 'error',
    /** Default export name cannot match named export */
    'import/no-named-as-default': 'error',
    /** Don't access named imports from default export */
    'import/no-named-as-default-member': 'error',
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
