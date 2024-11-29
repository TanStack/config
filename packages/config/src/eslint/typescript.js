// https://typescript-eslint.io/rules/

/** @type {import('eslint').Linter.RulesRecord} */
export const typescriptRules = {
  /** Prefer Array<T> format */
  '@typescript-eslint/array-type': [
    'error',
    { default: 'generic', readonly: 'generic' },
  ],
  /** Prevent @ts-ignore, allow @ts-expect-error */
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': false,
      'ts-ignore': 'allow-with-description',
    },
  ],
  /** Enforce import type { T } */
  '@typescript-eslint/consistent-type-imports': [
    'error',
    { prefer: 'type-imports' },
  ],
  /** Shorthand method style is less strict */
  '@typescript-eslint/method-signature-style': ['error', 'property'],
  /** Enforces generic type convention */
  '@typescript-eslint/naming-convention': [
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
  /** Duplicate values can lead to bugs that are hard to track down */
  '@typescript-eslint/no-duplicate-enum-values': 'error',
  /** Using the operator any more than once does nothing */
  '@typescript-eslint/no-extra-non-null-assertion': 'error',
  /** There are several potential bugs with this compared to other loops */
  '@typescript-eslint/no-for-in-array': 'error',
  /** Don't over-define types for simple things like strings */
  '@typescript-eslint/no-inferrable-types': [
    'error',
    { ignoreParameters: true },
  ],
  /** Enforce valid definition of new and constructor */
  '@typescript-eslint/no-misused-new': 'error',
  /** Disallow TypeScript namespaces */
  '@typescript-eslint/no-namespace': 'error',
  /** Disallow non-null assertions after an optional chain expression */
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
  /** Detects conditionals which will always evaluate truthy or falsy */
  '@typescript-eslint/no-unnecessary-condition': 'error',
  /** Checks if the the explicit type is identical to the inferred type */
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  /** Disallow using the unsafe built-in Function type */
  '@typescript-eslint/no-unsafe-function-type': 'error',
  /** Disallow using confusing built-in primitive class wrappers */
  '@typescript-eslint/no-wrapper-object-types': 'error',
  /** Enforce the use of as const over literal type */
  '@typescript-eslint/prefer-as-const': 'error',
  /** Prefer for-of loop over the standard for loop */
  '@typescript-eslint/prefer-for-of': 'warn',
  /** Warn about async functions which have no await expression */
  '@typescript-eslint/require-await': 'warn',
  /** Prefer of ES6-style import declarations */
  '@typescript-eslint/triple-slash-reference': 'error',
}
