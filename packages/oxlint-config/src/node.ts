import type { DummyRuleMap } from 'oxlint'

/**
 * Port of `nodeRules` from `@tanstack/eslint-config`, using the native
 * `unicorn` equivalent of `n/prefer-node-protocol`.
 *
 * @see https://oxc.rs/docs/guide/usage/linter/rules/unicorn/prefer-node-protocol.html
 */
export const nodeRules: DummyRuleMap = {
  /** Enforce usage of the `node:` prefix for builtin imports */
  'unicorn/prefer-node-protocol': 'error',
}
