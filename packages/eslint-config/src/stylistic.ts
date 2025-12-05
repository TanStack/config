import type { Linter } from 'eslint'

/**
 * @see https://eslint.style/packages/js
 */
export const stylisticRules: Linter.RulesRecord = {
  /** Enforce consistency of spacing after the start of a comment */
  '@stylistic/spaced-comment': 'error',
}
