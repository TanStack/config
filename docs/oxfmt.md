---
id: oxfmt
title: Oxfmt
---

## Purpose

This package unifies the shared [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) config used across all TanStack projects. It matches the TanStack Prettier settings, and enables `sortImports` to cover the import ordering enforced by `@tanstack/eslint-config`.

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/oxfmt-config oxfmt
```

## Setup

### oxfmt.config.ts

```ts
import { tanstackConfig } from '@tanstack/oxfmt-config'
import { defineConfig } from 'oxfmt'

export default defineConfig({
  ...tanstackConfig,
  ignorePatterns: [
    ...tanstackConfig.ignorePatterns,
    // Custom ignore patterns go here
  ],
})
```

## Options

You can browse the source [here](https://github.com/TanStack/config/tree/main/packages/oxfmt-config). Notable options:

- `sortImports` sorts import declarations into the same groups as the `import/order` rule from `@tanstack/eslint-config`
- `sortPackageJson` is disabled
