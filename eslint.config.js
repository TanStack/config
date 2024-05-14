import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    ignores: [
      '**/snap',
    ],
  },
  {
    rules: {
      'antfu/if-newline': 'off',
      'antfu/top-level-function': 'off',
      'style/arrow-parens': ['error', 'always'],
      'style/brace-style': ['error', '1tbs'],
      'curly': 'off',
      'node/prefer-global/process': 'off',
      'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
      'ts/ban-ts-comment': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
      'no-console': 'off',
    },
  },
)
