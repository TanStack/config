import type { DummyRuleMap } from 'oxlint'

/**
 * Port of `stylisticRules` from `@tanstack/eslint-config`, run from
 * `@stylistic/eslint-plugin` as a JS plugin.
 *
 * @see https://eslint.style/packages/js
 */
export const stylisticRules: DummyRuleMap = {
  /** Enforce consistency of spacing after the start of a comment */
  '@stylistic/spaced-comment': 'error',
}
