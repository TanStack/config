import type { OxfmtConfig } from 'oxfmt'

const GLOB_EXCLUDE = [
  '**/.next',
  '**/.nx/cache',
  '**/.svelte-kit',
  '**/build',
  '**/coverage',
  '**/dist',
  '.changeset/*.md',
  'pnpm-lock.yaml',
]

/**
 * @see https://oxc.rs/docs/guide/usage/formatter/config-file-reference
 */
export const tanstackConfig: OxfmtConfig & { ignorePatterns: Array<string> } = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  sortPackageJson: false,
  /** Matches `import/order` from `@tanstack/eslint-config` */
  sortImports: {
    /** Same group order as `import/order`, with type imports split by origin */
    groups: [
      'builtin',
      'external',
      ['internal', 'subpath'],
      'parent',
      'sibling',
      'index',
      'type-builtin',
      'type-external',
      ['type-internal', 'type-subpath'],
      'type-parent',
      'type-sibling',
      'type-index',
      'unknown',
    ],
    /** `import/order` does not enforce newlines between groups */
    newlinesBetween: false,
    /** Case-sensitive, like `sort-imports` */
    ignoreCase: false,
  },
  ignorePatterns: GLOB_EXCLUDE,
}
