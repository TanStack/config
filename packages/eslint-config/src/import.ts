import type { Linter } from 'eslint'

/**
 * Classifies the same import prefixes as internal as the `internalPattern` of
 * `@tanstack/oxfmt-config`, so `import/order` agrees with its `sortImports`
 */
export const importSettings: Linter.Config['settings'] = {
  'import-x/internal-regex': '^(~/|@/|#)',
}

/**
 * @see https://github.com/un-ts/eslint-plugin-import-x
 */
export const importRules: Linter.RulesRecord = {
  /** Bans the use of inline type-only markers for named imports */
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  /** Reports any imports that come after non-import statements */
  'import/first': 'error',
  /** Stylistic preference */
  'import/newline-after-import': 'error',
  /** No require() or module.exports */
  'import/no-commonjs': 'error',
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
