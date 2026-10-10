---
id: oxlint
title: Oxlint
---

## Purpose

This package is a port of the [shared ESLint config](./eslint.md) to [Oxlint](https://oxc.rs/docs/guide/usage/linter). It enables the same rules, using Oxlint's native rules where they exist, and runs the rest as JS plugins. Like the ESLint config, it is framework-agnostic.

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
- `import/order` runs from `eslint-plugin-import-x` under the `import-js` name, and `n/prefer-node-protocol` is replaced by `unicorn/prefer-node-protocol`.
- The rules apply to every file Oxlint lints, not only `*.{js,ts,tsx}` and `*.vue`. Oxlint only lints the `<script>` blocks of `.vue`, `.svelte` and `.astro` files.

## Plugins

- [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) - Runs `import/order`, which Oxlint does not implement
- [@stylistic/eslint-plugin](https://eslint.style) - Runs `spaced-comment`

Both plugins are dependencies of this package, so they don't need to be installed separately.

## Rules

You can inspect the enabled rules by browsing the source [here](https://github.com/TanStack/config/tree/main/packages/oxlint-config). Each rule has a comment explaining why it is included in the shared config.
