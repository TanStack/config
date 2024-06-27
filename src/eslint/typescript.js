/** @type {import('eslint').Linter.FlatConfig} */
export const typescriptRules = {
  name: 'tanstack/typescript',
  rules: {
    /** Prefer Array<T> format */
    'ts/array-type': ['error', { default: 'generic', readonly: 'generic' }],
    /** Prevent @ts-ignore, allow @ts-expect-error */
    'ts/ban-ts-comment': ['error', { 'ts-expect-error': false }],
    /** Enforce import type { T } */
    'ts/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    /** Shorthand method style is less strict */
    'ts/method-signature-style': ['error', 'property'],
    /** Enforces generic type convention */
    'ts/naming-convention': [
      'error',
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
        custom: {
          regex: '^(T|T[A-Z][A-Za-z]+)$',
          match: true,
        },
      },
    ],
    /** Using the operator any more than once does nothing */
    'ts/no-extra-non-null-assertion': 'error',
    /** From recommended preset */
    'ts/no-namespace': 'error',
    /** From recommended preset */
    'ts/no-misused-new': 'error',
    /** Detects conditionals which will always evaluate truthy or falsy */
    'ts/no-unnecessary-condition': 'error',
    /** Checks if the the explicit type is identical to the inferred type */
    'ts/no-unnecessary-type-assertion': 'error',
    /** Don't over-define types for simple things like strings */
    'ts/no-inferrable-types': ['error', { ignoreParameters: true }],
    /** Newer strategy */
    'ts/prefer-as-const': 'error',
    /** From recommended preset */
    'ts/prefer-for-of': 'error',
    /** From recommended preset */
    'ts/triple-slash-reference': 'error',
  },
}
