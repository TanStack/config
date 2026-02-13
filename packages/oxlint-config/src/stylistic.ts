import type { OxlintConfig } from 'oxlint'

export const stylisticConfig: OxlintConfig = {
  jsPlugins: [{ name: '@stylistic', specifier: '@stylistic/eslint-plugin' }],
  rules: {
    /** Enforce consistency of spacing after the start of a comment */
    '@stylistic/spaced-comment': 'error',
  },
}
