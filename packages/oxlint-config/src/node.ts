import type { OxlintConfig } from 'oxlint'

export const nodeConfig: OxlintConfig = {
  plugins: ['unicorn'],
  rules: {
    /** Enforce usage of the `node:` prefix for builtin imports */
    'unicorn/prefer-node-protocol': 'error',
  },
}
