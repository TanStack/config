---
id: oxfmt
title: Oxfmt
---

## Purpose

This package unifies the shared [Oxfmt](https://oxc.rs/docs/guide/usage/formatter) config used across all TanStack projects. 

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/oxfmt-config
```

## Setup

### package.json

- Make sure you have Oxfmt v0.72.0+ installed

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
