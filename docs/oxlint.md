---
id: oxlint
title: Oxlint
---

## Purpose

This package is a port of the [shared ESLint config](./eslint.md) to [Oxlint](https://oxc.rs/docs/guide/usage/linter). It enables the same rules using Oxlint's native rules, apart from the stylistic rules that are left to the formatter. Like the ESLint config, it is framework-agnostic.

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/oxlint-config oxlint oxlint-tsgolint
```

## Setup

### package.json

- Make sure you have Oxlint v1.87+ installed
- `oxlint-tsgolint` is required, as the config enables type-aware linting

### oxlint.config.ts

```ts
import { tanstackConfig } from '@tanstack/oxlint-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  extends: [tanstackConfig],
  // Not inherited through `extends`
  env: tanstackConfig.env,
  ignorePatterns: tanstackConfig.ignorePatterns,
  rules: {
    // Custom rules go here
  },
})
```

Oxlint does not inherit `env`, `ignorePatterns` or `settings` through `extends`, so pass `env` and `ignorePatterns` through as shown. Rules, plugins, JS plugins, categories and options are inherited.

## Differences from the ESLint config

- `no-octal` is not enabled, because Oxlint does not implement it. Legacy octal literals are already a syntax error in ES modules.
- `@typescript-eslint/naming-convention` is replaced by `tanstack/type-parameter-naming`, which enforces the same type parameter pattern.
- `import/order` and `@stylistic/spaced-comment` are not enabled. Import order is left to the formatter, such as Oxfmt's [`sortImports`](https://oxc.rs/docs/guide/usage/formatter), so the config doesn't need `eslint-plugin-import-x` or `@stylistic/eslint-plugin`.
- `n/prefer-node-protocol` is replaced by `unicorn/prefer-node-protocol`.
- The rules apply to every file Oxlint lints, not only `*.{js,ts,tsx}` and `*.vue`. Oxlint only lints the `<script>` blocks of `.vue`, `.svelte` and `.astro` files.

## Rules

You can inspect the enabled rules by browsing the source [here](https://github.com/TanStack/config/tree/main/packages/oxlint-config). Each rule has a comment explaining why it is included in the shared config.
