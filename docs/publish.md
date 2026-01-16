---
id: publish
title: Publish
---

## Installation

To install the package, run the following command:

```bash
pnpm add -D @tanstack/publish-config
```

## Usage

To use the TanStack Config programmatically, you can import the `publish` function:

```ts
import { publish } from '@tanstack/publish-config'

publish({
  branchConfigs: configOpts.branchConfigs,
  packages: configOpts.packages,
  rootDir: configOpts.rootDir,
  branch: process.env.BRANCH,
  tag: process.env.TAG,
  ghToken: process.env.GH_TOKEN,
})
  .then(() => {
    console.log('Successfully published packages!')
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

## Trusted Publishing

Trusted publishing is the new npm strategy to allow publishing packages without npm tokens, using OIDC authentication. It currently requires you to set up for each package individually; however, once enabled, no further interaction is required!

### Step 1

- If the package already has a published version on npm, you can skip this step.
- If the package has never been published, you can publish a "placeholder" package to do the setup process. This CLI tool streamlines this: [setup-npm-trusted-publish](https://github.com/azu/setup-npm-trusted-publish)

### Step 2

- If you're only setting up one package, you can skip this step. Otherwise, the tools below help dramatically when setting up 5+ packages all at once.
- [open-packages-on-npm](https://github.com/antfu/open-packages-on-npm)
- [sxzz's userscript](https://github.com/sxzz/userscripts/blob/main/src/npm-trusted-publisher.md)

### Step 3

- Fill in the fields on the package's settings page, similar to this. You will need to authenticate with MFA to save these settings.

![Settings](https://raw.githubusercontent.com/TanStack/config/refs/heads/main/media/trusted-publisher.png)
