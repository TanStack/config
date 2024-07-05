// https://github.com/eslint-community/eslint-plugin-n

/** @type {import('eslint').Linter.RulesRecord} */
export const nodeRules = {
  /** Enforce usage of the `node:` prefix for builtin imports */
  'node/prefer-node-protocol': 'error',
}
