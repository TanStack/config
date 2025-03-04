// https://eslint.org/docs/latest/rules/

/** @type {import('eslint').Linter.RulesRecord} */
export const javascriptRules = {
  /** TODO */
  'for-direction': 'error',
  'no-async-promise-executor': 'error',
  'no-case-declarations': 'error',
  'no-class-assign': 'error',
  'no-compare-neg-zero': 'error',
  'no-cond-assign': 'error',
  'no-constant-binary-expression': 'error',
  'no-constant-condition': 'error',
  'no-control-regex': 'error',
  'no-debugger': 'error',
  'no-delete-var': 'error',
  'no-dupe-else-if': 'error',
  'no-duplicate-case': 'error',
  'no-empty-character-class': 'error',
  'no-empty-pattern': 'error',
  'no-empty-static-block': 'error',
  'no-ex-assign': 'error',
  'no-extra-boolean-cast': 'error',
  'no-fallthrough': 'error',
  'no-global-assign': 'error',
  'no-invalid-regexp': 'error',
  'no-irregular-whitespace': 'error',
  'no-loss-of-precision': 'error',
  'no-misleading-character-class': 'error',
  'no-nonoctal-decimal-escape': 'error',
  'no-octal': 'error',
  'no-regex-spaces': 'error',
  'no-self-assign': 'error',
  /** Warn about variable with identical names in the outer scope */
  'no-shadow': 'warn',
  'no-shadow-restricted-names': 'error',
  'no-sparse-arrays': 'error',
  'no-unsafe-finally': 'error',
  'no-unsafe-optional-chaining': 'error',
  'no-unused-labels': 'error',
  'no-unused-private-class-members': 'error',
  'no-useless-backreference': 'error',
  'no-useless-catch': 'error',
  'no-useless-escape': 'error',
  /** Prefer let and const */
  'no-var': 'error',
  'no-with': 'error',
  /** Prefer const if never re-assigned */
  'prefer-const': 'error',
  'require-yield': 'error',
  /** Stylistic consistency */
  'sort-imports': ['error', { ignoreDeclarationSort: true }],
  'use-isnan': 'error',
  /** Enforce comparing typeof against valid strings */
  'valid-typeof': 'error',
}
