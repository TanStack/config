---
id: overview
title: Overview
---

TanStack Config allows you to publish, update, and maintain your packages
without having to provide complex configuration.

# Required Pre-Requisites

The following tools are required to be installed on the system running TanStack Config scripts:

- [Node.js 18.17+](https://nodejs.org/en/download/current/)
- [Git CLI](https://git-scm.com/downloads)
- [GitHub CLI](https://cli.github.com/) (pre-installed on GitHub Actions CI/CD)
- [PNPM](https://pnpm.io/)

> PNPM is currently the only supported package manager for TanStack Config.

# Installation

To install TanStack Config, run the following command:

```bash
pnpm add --save-dev @tanstack/config
```

# Usage

You have two options for using TanStack Config:

- [CLI Usage](#cli-usage)
- [Programmatic Usage](#programmatic-usage)

## CLI Usage

To run the publish script for your package, run the following command:

```bash
pnpm run tanstack-config publish
```

## Programmatic Usage

To use the TanStack Config programmatically, you can import the `publish` function:

```ts
import { publish } from '@tanstack/config';

publish({
  branchConfigs: configOpts.branchConfigs,
  packages: configOpts.packages,
  rootDir: configOpts.rootDir,
  branch: process.env.BRANCH,
  tag: process.env.TAG,
  ghToken: process.env.GH_TOKEN,
})
  .then(() => {
    console.log('Successfully published packages!');
  })
  .catch(console.error)
```

> The programmatic usage is only available for ESM packages. To support this, you have to have:
>
> ```json
> {
>   "type": "module"
> }
> ```
>
> in your `package.json` file and use `import` instead of `require`.
