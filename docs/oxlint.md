---
id: oxlint
title: Oxlint
---

## Purpose

This package unifies the shared [Oxlint](https://oxc.rs/docs/guide/usage/linter) config used across all TanStack projects. It is designed to be framework-agnostic, and does not include any framework-specific plugins.

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/oxlint-config
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

## Rules

You can inspect the enabled rules by browsing the source [here](https://github.com/TanStack/config/tree/main/packages/oxlint-config). Each rule has a comment explaining why it is included in the shared config.
