import type { OxlintConfig } from 'oxlint'

export const importConfig: OxlintConfig = {
  plugins: ['import'],
  rules: {
    /** Bans the use of inline type-only markers for named imports */
    'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    /** Reports any imports that come after non-import statements */
    'import/first': 'error',

    /** Stylistic preference */
    // 'import/newline-after-import': 'error', // No implementation yet / unsupported

    /** No require() or module.exports */
    'import/no-commonjs': 'error',
    /** Reports if a resolved path is imported more than once */
    'import/no-duplicates': 'error',

    /** Stylistic preference */
    // // No implementation yet / unsupported
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin',
    //       'external',
    //       'internal',
    //       'parent',
    //       'sibling',
    //       'index',
    //       'object',
    //       'type',
    //     ],
    //   },
    // ],
  },
}
