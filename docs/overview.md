---
id: overview
title: Overview
---

TanStack Config allows you to publish, update, and maintain your packages without having to provide complex configuration.

## Required Pre-Requisites

The following tools are required to use this package:

- [Node.js v18.17+](https://nodejs.org/en/download/current/)
- [Git CLI](https://git-scm.com/downloads)
- [GitHub CLI](https://cli.github.com/) (pre-installed on GitHub Actions)
- [pnpm v8+](https://pnpm.io/)

> pnpm is the only supported package manager for TanStack Config.

## Installation

To install the package, run the following command:

```bash
# AIO
pnpm add -D @tanstack/config

# ESLint
pnpm add -D @tanstack/eslint-config

# Publish
pnpm add -D @tanstack/publish-config

# Typedoc
pnpm add -D @tanstack/typedoc-config

# Vite
pnpm add -D @tanstack/vite-config
```

## Utilities

- [ESLint](./eslint.md)
- [Publish](./publish.md)
- [Vite](./vite.md)

## Conventions

- [CI/CD](./ci-cd.md)
- [Dependencies](./dependencies.md)
- [Package Structure](./package-structure.md)
