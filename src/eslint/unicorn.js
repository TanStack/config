// https://github.com/un-ts/eslint-plugin-import-x

/** @type {import('eslint').Linter.RulesRecord} */
export const unicornRules = {
  /** Finds CommonJS-only directives in ESM code */
  'unicorn/prefer-module': 'error',
  /** Enforce usage of the `node:` prefix for builtin imports */
  'unicorn/prefer-node-protocol': 'error',
}
