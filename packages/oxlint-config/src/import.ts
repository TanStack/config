import type { DummyRuleMap } from 'oxlint'

/**
 * Port of `importRules` from `@tanstack/eslint-config`.
 *
 * Not ported: `import/order`, which Oxlint does not implement. Import order
 * is left to the formatter, such as Oxfmt's `sortImports`.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules.html
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
}
