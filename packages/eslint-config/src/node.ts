import type { Linter } from 'eslint'

/**
 * @see https://github.com/eslint-community/eslint-plugin-n
 */
export const nodeRules: Linter.RulesRecord = {
  /** Enforce usage of the `node:` prefix for builtin imports */
  'node/prefer-node-protocol': 'error',
}
