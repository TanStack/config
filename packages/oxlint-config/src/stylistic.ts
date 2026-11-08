import type { DummyRuleMap } from 'oxlint'

/**
 * Port of `stylisticRules` from `@tanstack/eslint-config`. Oxfmt does not
 * change comment spacing, so this rule is still enforced by the linter.
 *
 * @see https://eslint.style/rules/spaced-comment
 */
export const stylisticRules: DummyRuleMap = {
  /** Enforce consistency of spacing after the start of a comment */
  '@stylistic/spaced-comment': 'error',
}
