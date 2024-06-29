---
id: eslint
title: ESLint
---

## Purpose

This package unifies the shared ESLint config used across all TanStack projects. It is designed to be framework-agnostic, and does not include any framework-specific plugins.

## Setup

### package.json

- Make sure you have ESLint v8.57.0+ installed
- We will upgrade to ESLint v9 once `typescript-eslint` v8 and `eslint-plugin-react-hooks` v5 release

### eslint.config.js

```js
import { tanstackConfig } from '@tanstack/config/eslint'

export default [
  ...tanstackConfig,
  {
    // Custom rules go here
  },
]
```

## Plugins

- [@eslint/js](https://github.com/eslint/eslint) - The core ESLint rules
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) - Enables TypeScript support
- [eslint-plugin-import-x](https://github.com/un-ts/eslint-plugin-import-x) - Lints imports and exports
- [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) - Miscellaneous useful rules

## Rules

You can inspect the enabled rules by running `pnpm dlx @eslint/config-inspector`, or by browsing the source [here](https://github.com/TanStack/config/tree/main/src/eslint). Each rule has a comment explaining why it is included in the shared config.
