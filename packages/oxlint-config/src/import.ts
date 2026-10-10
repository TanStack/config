import type { DummyRuleMap } from 'oxlint'

/**
 * Port of `importRules` from `@tanstack/eslint-config`.
 *
 * Oxlint does not implement `import/order`, so it runs from
 * `eslint-plugin-import-x` as the `import-js` JS plugin.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
 * @see https://github.com/un-ts/eslint-plugin-import-x
 */
export const importRules: DummyRuleMap = {
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
  'import-js/order': [
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
