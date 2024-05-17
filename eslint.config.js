import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: [
      '**/snap',
      '**/vite.config.js.timestamp-*',
      '**/vite.config.ts.timestamp-*',
    ],
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'jsdoc/require-returns-description': 'off',
      'style/arrow-parens': ['error', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'node/prefer-global/process': 'off',
      'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
      'curly': 'off',
      'no-console': 'off',
    },
  },
)
